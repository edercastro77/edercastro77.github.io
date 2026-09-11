/* A pretend terminal so the student can practise commands safely. */
(function () {
  function dir(children) { return { type: 'dir', children }; }
  function file(output) { return { type: 'file', output }; }

  function defaultFS() {
    return dir({
      Documents: dir({ 'homework.txt': file(null), 'story.txt': file(null) }),
      Pictures: dir({ 'dragon.png': file(null), 'cat.jpg': file(null) }),
      Games: dir({ 'minecraft.txt': file(null) }),
      PythonQuest: dir({
        Games: dir({
          'dragon.py': file('🐉 A dragon appears!\nIt breathes fire... you dodge!\nYou win the fight!'),
          'treasure.py': file('🗺️  You dig in the sand...\n💎 You found the treasure!\n🏆 +100 XP')
        }),
        Lessons: dir({
          'lesson1.py': file('Hello, World!\nI am learning Python!'),
          'lesson2.py': file('Name: Dragon Slayer\nHealth: 100\nCoins: 20')
        }),
        'README.txt': file(null)
      })
    });
  }

  const HELP = [
    'Commands you can use here:',
    '  dir              show what is inside this folder',
    '  cd <folder>      go INTO a folder',
    '  cd ..            go BACK one folder',
    '  cls              clear the screen',
    '  python <file>    run a Python program',
    '  help             show this list'
  ].join('\n');

  function Terminal(el, opts) {
    opts = opts || {};
    const fs = opts.fs || defaultFS();
    let path = (opts.start || 'C:').split('\\').filter(Boolean);
    if (path[0] !== 'C:') path.unshift('C:');

    const screen = document.createElement('div');
    screen.className = 'term';
    const inputRow = document.createElement('div');
    inputRow.className = 'term-input';
    const prompt = document.createElement('span');
    prompt.className = 'pr';
    const input = document.createElement('input');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', 'Type a terminal command');
    inputRow.appendChild(prompt);
    inputRow.appendChild(input);
    el.appendChild(screen);
    el.appendChild(inputRow);
    screen.addEventListener('click', () => input.focus());

    const history = [];
    let hIdx = 0;

    function cwd() { return path.join('\\') + '>'; }
    function node() {
      let n = { type: 'dir', children: fs.children };
      for (let i = 1; i < path.length; i++) n = n.children[path[i]];
      return n;
    }
    function print(text, cls) {
      const d = document.createElement('div');
      d.className = 'line' + (cls ? ' ' + cls : '');
      d.textContent = text;
      screen.appendChild(d);
      screen.scrollTop = screen.scrollHeight;
    }
    function echoCommand(cmd) {
      const d = document.createElement('div');
      d.className = 'line';
      d.innerHTML = '<span class="pr"></span><span class="cmd"></span>';
      d.firstChild.textContent = cwd() + ' ';
      d.lastChild.textContent = cmd;
      screen.appendChild(d);
      screen.scrollTop = screen.scrollHeight;
    }
    function refresh() { prompt.textContent = cwd(); }

    function run(raw) {
      const cmd = raw.trim();
      echoCommand(cmd);
      if (!cmd) { refresh(); return; }
      history.push(cmd); hIdx = history.length;

      const parts = cmd.split(/\s+/);
      const name = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');
      const here = node();

      if (name === 'help') print(HELP);
      else if (name === 'cls' || name === 'clear') screen.innerHTML = '';
      else if (name === 'dir' || name === 'ls') {
        const names = Object.keys(here.children);
        if (!names.length) print('This folder is empty.');
        names.forEach(n => print((here.children[n].type === 'dir' ? '📁 ' : '📄 ') + n));
      }
      else if (name === 'cd') {
        if (!arg) print(path.join('\\'));
        else if (arg === '..') { if (path.length > 1) path.pop(); }
        else if (arg === '\\' || arg === '/') path = ['C:'];
        else {
          const target = Object.keys(here.children)
            .find(n => n.toLowerCase() === arg.toLowerCase() && here.children[n].type === 'dir');
          if (target) path.push(target);
          else print('The system cannot find the path: ' + arg, 'warnline');
        }
      }
      else if (name === 'python' || name === 'py') {
        if (!arg) print('Python 3.12 (pretend version) — type: python filename.py', 'warnline');
        else {
          const target = Object.keys(here.children)
            .find(n => n.toLowerCase() === arg.toLowerCase() && here.children[n].type === 'file');
          if (!target) print("python: can't open file '" + arg + "': no such file in this folder", 'warnline');
          else if (!target.endsWith('.py')) print('That is not a Python program. Python files end with .py', 'warnline');
          else print(here.children[target].output || '(this program prints nothing)');
        }
      }
      else print("'" + name + "' is not a command here. Type: help", 'warnline');

      refresh();
      if (opts.onCommand) opts.onCommand({ cmd, name, arg, path: path.join('\\') }, term);
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { run(input.value); input.value = ''; }
      else if (e.key === 'ArrowUp') { if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } e.preventDefault(); }
      else if (e.key === 'ArrowDown') { hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ''; e.preventDefault(); }
    });

    const term = { print, run, focus: () => input.focus(), get path() { return path.join('\\'); } };
    refresh();
    (opts.intro || []).forEach(l => print(l));
    return term;
  }

  window.QuestTerminal = { create: Terminal, defaultFS };
})();
