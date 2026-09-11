/* PyRunner: runs real Python in the browser using Pyodide. */
(function () {
  const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

  let pyodide = null;
  let loading = null;
  const listeners = [];

  function status(msg) { listeners.forEach(fn => fn(msg)); }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not download Python. Check your internet connection.'));
      document.head.appendChild(s);
    });
  }

  /* input() has to block, and browsers only allow that with prompt().
     Some browsers (and embedded previews) refuse prompt(), so the student can
     also type answers in advance and we serve them from this queue. */
  let answers = [];
  window.__questAsk = function (question) {
    if (answers.length) return String(answers.shift());
    try {
      const v = window.prompt(question || 'The program is asking you something:');
      return v === null ? '\u0000CANCEL' : String(v);
    } catch (e) {
      return '\u0000NOPOPUP';
    }
  };

  const BOOT_PY = `
import builtins, sys

def _quest_input(prompt=""):
    import js
    text = str(js.window.__questAsk(str(prompt) if prompt else ""))
    if text == "\\u0000CANCEL":
        raise KeyboardInterrupt("You cancelled the question.")
    if text == "\\u0000NOPOPUP":
        raise RuntimeError("NoPopups")
    print(str(prompt) + text)
    return text

builtins.input = _quest_input
`;

  async function boot() {
    if (pyodide) return pyodide;
    if (loading) return loading;
    loading = (async () => {
      status('⏳ Waking up Python... (this happens once, it can take a few seconds)');
      if (!window.loadPyodide) await loadScript(PYODIDE_URL + 'pyodide.js');
      pyodide = await window.loadPyodide({ indexURL: PYODIDE_URL });
      pyodide.runPython(BOOT_PY);
      status('');
      return pyodide;
    })();
    return loading;
  }

  /* Friendly explanations for the most common beginner errors. */
  const HINTS = [
    [/SyntaxError: unterminated string/i, 'Looks like a quote " is missing. Every text needs a quote at the start AND at the end.'],
    [/SyntaxError: '\(' was never closed|unexpected EOF/i, 'A parenthesis ( was opened but never closed. Count your ( and ).'],
    [/SyntaxError: invalid syntax/i, 'Python could not understand a line. Check for a missing ( ) " or a missing : at the end of an if / while / for / def line.'],
    [/IndentationError: expected an indented block/i, 'After a line ending with : the next line needs to move to the right (4 spaces). That space is how Python knows what is inside.'],
    [/IndentationError|TabError/i, 'The spaces at the start of the line are not lined up. Use 4 spaces for each step inside.'],
    [/NameError: name '(.+)' is not defined/i, 'Python does not know a name you used. Maybe it is spelled differently, or the box (variable) was never created. Python thinks Name and name are different!'],
    [/TypeError: can only concatenate str|unsupported operand type\(s\) for \+: 'int' and 'str'/i, 'You tried to glue text and a number together with +. Use a comma in print, like print("Score:", score).'],
    [/TypeError: '(.+)' object is not callable/i, 'You used ( ) on something that is not a function.'],
    [/ZeroDivisionError/i, 'Nothing can be divided by zero — not even for a computer!'],
    [/IndexError/i, 'You asked for an item that is not in the list. Remember the first item is number 0.'],
    [/KeyError: (.+)/i, 'That key does not exist in the dictionary. Check the spelling.'],
    [/ValueError: invalid literal for int/i, 'You tried to turn text into a number, but the text was not a number.'],
    [/ModuleNotFoundError: No module named '(.+)'/i, 'That module is not available here. Pygame only works on your real computer, not in the browser.'],
    [/NoPopups/, 'This browser does not open question pop-ups. Type the answers in the "Answers" box under the code (one answer per line) and press RUN again.'],
    [/KeyboardInterrupt/i, 'You closed the question box, so the program stopped. That is fine!']
  ];

  function friendly(errText) {
    for (const [re, msg] of HINTS) if (re.test(errText)) return msg;
    return 'Read the LAST line of the message — it usually says exactly what Python did not understand.';
  }

  /* Trim the traceback so kids only see the useful part: the error message
     plus the line of THEIR code that caused it. */
  const NOISE = [/pyodide/i, /\/lib\/python/, /CodeRunner/, /self\./, /_gen/,
    /ast\.PyCF_ONLY_AST/, /^\s*File "/, /coroutine\s*=/, /\beval\(/, /\bcompile\(/,
    /^Traceback/];

  function cleanTrace(text) {
    const lines = String(text).split('\n').map(l => l.replace(/\s+$/, ''));
    let last = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^[A-Za-z_.]*(Error|Exception|Interrupt|Warning)\b/.test(lines[i].trim())) { last = i; break; }
    }
    if (last === -1) return lines.filter(l => l.trim()).slice(-2).join('\n').trim();

    const context = [];
    for (let i = Math.max(0, last - 3); i < last; i++) {
      const l = lines[i];
      if (!l.trim() || NOISE.some(re => re.test(l))) continue;
      if (/^\s*[\^~]+\s*$/.test(l) && !context.length) continue;   // caret with nothing to point at
      context.push(l);
    }
    return context.concat(lines[last]).join('\n').trim();
  }

  const PyRunner = {
    onStatus(fn) { listeners.push(fn); },
    isReady: () => !!pyodide,
    boot,
    explain: friendly,
    clean: cleanTrace,

    /* Answers typed in advance, used before asking with a pop-up. */
    setAnswers(list) { answers = (list || []).slice(); },

    /* Runs code and returns { output, error, hint }. */
    async run(code) {
      const py = await boot();
      let out = '';
      py.setStdout({ batched: (s) => { out += s + '\n'; } });
      py.setStderr({ batched: (s) => { out += s + '\n'; } });
      try {
        await py.runPythonAsync(code);
        return { output: out, error: null };
      } catch (e) {
        const raw = cleanTrace(e.message || String(e));
        return { output: out, error: raw, hint: friendly(raw) };
      }
    },

    /* Gives other modules (Game Lab) the live interpreter. */
    async instance() { return boot(); }
  };

  window.PyRunner = PyRunner;
})();
