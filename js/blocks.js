/* Turns lesson data into interactive HTML blocks. */
(function () {
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function editor(id, code) {
    const ta = el('textarea', 'editor');
    ta.spellcheck = false;
    ta.setAttribute('aria-label', 'Python code you can change');
    const saved = Progress.getCode(id);
    ta.value = saved != null ? saved : code;
    const grow = () => {
      ta.style.height = 'auto';
      ta.style.height = Math.max(110, ta.scrollHeight + 6) + 'px';
    };
    setTimeout(grow, 0);
    ta.addEventListener('input', () => { grow(); Progress.saveCode(id, ta.value); });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 4;
        Progress.saveCode(id, ta.value);
      }
    });
    return { ta, reset: () => { ta.value = code; Progress.saveCode(id, code); grow(); }, grow };
  }

  function outputBox() {
    const o = el('div', 'output empty');
    o.textContent = 'Your program\'s answer will appear here.';
    return o;
  }

  function showResult(out, res) {
    out.classList.remove('empty');
    out.textContent = '';
    if (res.output) out.appendChild(document.createTextNode(res.output));
    if (res.error) {
      out.appendChild(el('div', 'err', ''));
      out.lastChild.textContent = '🐞 Bug found!\n' + res.error;
      const h = el('div', 'hintline', '');
      h.textContent = '💡 ' + res.hint;
      out.appendChild(h);
    }
    if (!res.output && !res.error) out.textContent = '(The program ran, but it did not print anything.)';
  }

  /* ---- individual block builders ---- */
  const build = {
    text: (b) => el('div', 'block', b.html),

    idea: (b) => {
      const d = el('div', 'block');
      d.appendChild(el('div', 'big-idea', '💡 <b>Big idea:</b> ' + b.html));
      return d;
    },

    tip: (b) => note(b, 'tip', '✅ ' + (b.title || 'Tip')),
    warn: (b) => note(b, 'warn', '⚠️ ' + (b.title || 'Careful')),
    fun: (b) => note(b, 'fun', '🎈 ' + (b.title || 'Fun fact')),
    brain: (b) => note(b, 'brain', '🧠 ' + (b.title || 'Think about it')),

    code: (b) => {
      const d = el('div', 'block');
      const box = el('div', 'codebox');
      const head = el('div', 'cbhead');
      head.appendChild(el('span', null, b.caption || 'Python'));
      const copy = el('button', 'btn small ghost', 'Copy');
      copy.onclick = () => {
        navigator.clipboard && navigator.clipboard.writeText(b.code);
        copy.textContent = 'Copied!';
        setTimeout(() => copy.textContent = 'Copy', 1200);
      };
      head.appendChild(copy);
      const pre = el('pre');
      pre.textContent = b.code;
      box.appendChild(head); box.appendChild(pre);
      d.appendChild(box);
      return d;
    },

    run: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      if (b.title) d.appendChild(el('h3', null, '🌐 ' + b.title));
      if (b.html) d.appendChild(el('div', null, b.html));

      const box = el('div', 'codebox');
      const head = el('div', 'cbhead');
      head.appendChild(el('span', null, '🐍 Python Playground — you can change this code!'));
      box.appendChild(head);

      const ed = editor(id, b.code);
      box.appendChild(ed.ta);

      const bar = el('div', 'cbbar');
      const runBtn = el('button', 'btn run', 'RUN ▶');
      const resetBtn = el('button', 'btn small ghost', '↺ Reset');
      const status = el('span', 'loadbar');
      bar.appendChild(runBtn); bar.appendChild(resetBtn); bar.appendChild(status);
      box.appendChild(bar);

      const out = outputBox();
      box.appendChild(out);
      d.appendChild(box);

      /* Programs that ask questions get a box for typing the answers up front,
         so they work even where pop-ups are blocked. */
      let answersBox = null;
      if (/\binput\s*\(/.test(b.code)) {
        const wrap = el('div', 'callout tip');
        wrap.innerHTML = '<span class="ct">✍️ Answers</span>' +
          '<p>This program asks questions! Type your answers here, <b>one per line</b> (or leave it empty to answer in a pop-up).</p>';
        answersBox = el('textarea', 'editor');
        answersBox.style.minHeight = '70px';
        answersBox.placeholder = 'Alex\nLEFT';
        const holder = el('div', 'codebox');
        holder.appendChild(answersBox);
        wrap.appendChild(holder);
        d.appendChild(wrap);
      }

      resetBtn.onclick = () => ed.reset();
      runBtn.onclick = async () => {
        runBtn.disabled = true;
        status.textContent = PyRunner.isReady() ? '⏳ Running...' : '⏳ Waking up Python (first time only)...';
        PyRunner.setAnswers(answersBox ? answersBox.value.split('\n').filter(l => l.trim() !== '') : []);
        const res = await PyRunner.run(ed.ta.value);
        showResult(out, res);
        status.textContent = '';
        runBtn.disabled = false;
        if (!res.error) Progress.award('ran:' + id, 10, 'code ran!');
      };
      ed.ta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runBtn.click(); }
      });

      if (b.tasks && b.tasks.length) {
        const t = el('div', 'callout tip');
        t.innerHTML = '<span class="ct">🔧 Now YOU change it:</span><ul>' +
          b.tasks.map(x => '<li>' + x + '</li>').join('') + '</ul>';
        d.appendChild(t);
      }
      return d;
    },

    predict: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      const box = el('div', 'callout brain');
      box.innerHTML = '<span class="ct">🔮 Predict first!</span><p>' + b.q + '</p>';
      d.appendChild(box);
      d.appendChild(build.run({ code: b.code, tasks: b.tasks }, ctx));
      return d;
    },

    fix: (b, ctx) => {
      const d = el('div', 'block');
      const box = el('div', 'callout warn');
      box.innerHTML = '<span class="ct">🐞 Bug hunt!</span><p>' + (b.goal || 'This code is broken. Run it, read the message, and fix it!') + '</p>';
      d.appendChild(box);
      d.appendChild(build.run({ code: b.code, tasks: b.tasks }, ctx));
      return d;
    },

    quiz: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      const q = el('div', 'quiz');
      q.appendChild(el('div', 'q', '❓ ' + b.q));
      const why = el('div', 'why');
      let answered = Progress.isAwarded('quiz:' + id);
      b.options.forEach((opt, i) => {
        const btn = el('button', 'opt');
        btn.textContent = opt;
        btn.onclick = () => {
          if (answered) return;
          if (i === b.correct) {
            btn.classList.add('right');
            answered = true;
            why.textContent = '🎉 Correct! ' + (b.why || '');
            Progress.award('quiz:' + id, 25, 'right answer!');
          } else {
            btn.classList.add('wrong');
            why.textContent = '🤔 Not quite — try again. Bugs and wrong answers are just puzzles!';
          }
        };
        if (answered && i === b.correct) btn.classList.add('right');
        q.appendChild(btn);
      });
      if (answered) why.textContent = '🎉 Already solved! ' + (b.why || '');
      q.appendChild(why);
      d.appendChild(q);
      return d;
    },

    mission: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      const m = el('div', 'mission');
      m.appendChild(el('div', 'mi', b.emoji || '🎯'));
      const body = el('div', 'mt');
      body.appendChild(el('h3', null, b.title || 'MISSION'));
      body.appendChild(el('div', null, b.html));
      const done = Progress.isAwarded('mission:' + id);
      const btn = el('button', 'checkbtn' + (done ? ' done' : ''), done ? '✔ Done!' : 'I did it!');
      btn.onclick = () => {
        if (Progress.award('mission:' + id, b.xp || 50, 'mission complete!')) {
          btn.classList.add('done');
          btn.textContent = '✔ Done!';
          Quest.confetti();
        }
      };
      body.appendChild(btn);
      m.appendChild(body);
      d.appendChild(m);
      return d;
    },

    terminal: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      if (b.goal) {
        const g = el('div', 'callout tip');
        g.innerHTML = '<span class="ct">💻 Terminal mission:</span>' + b.goal;
        d.appendChild(g);
      }
      const holder = el('div');
      d.appendChild(holder);
      QuestTerminal.create(holder, {
        start: b.start,
        intro: b.intro || ['Pretend Terminal — type  help  to see the commands.', ''],
        onCommand: (e) => {
          if (b.winCommand && e.cmd.toLowerCase().includes(b.winCommand.toLowerCase())) {
            Progress.award('term:' + id, b.xp || 40, 'terminal mission!');
          }
        }
      });
      return d;
    },

    lab: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      if (b.title) d.appendChild(el('h3', null, '🎮 ' + b.title));
      if (b.html) d.appendChild(el('div', null, b.html));

      const box = el('div', 'codebox');
      const head = el('div', 'cbhead');
      head.appendChild(el('span', null, '🎮 Game Lab — real Python, real graphics'));
      box.appendChild(head);
      const ed = editor(id, b.code);
      box.appendChild(ed.ta);

      const lab = el('div', 'lab');
      const canvas = document.createElement('canvas');
      canvas.width = b.w || 480; canvas.height = b.h || 300;
      lab.appendChild(canvas);
      const bar = el('div', 'labbar');
      const play = el('button', 'btn run', 'PLAY ▶');
      const stop = el('button', 'btn small', '■ Stop');
      const reset = el('button', 'btn small ghost', '↺ Reset');
      const hint = el('span', 'keyhint', 'Click the game, then use the arrow keys.');
      bar.appendChild(play); bar.appendChild(stop); bar.appendChild(reset); bar.appendChild(hint);
      lab.appendChild(bar);
      const out = el('div', 'output empty');
      out.textContent = 'Press PLAY to start your game.';
      lab.appendChild(out);
      box.appendChild(lab);
      d.appendChild(box);

      const print = (s) => {
        out.classList.remove('empty');
        out.appendChild(document.createTextNode(s));
        out.scrollTop = out.scrollHeight;
      };
      play.onclick = async () => {
        out.textContent = ''; out.classList.remove('empty');
        play.disabled = true;
        hint.textContent = PyRunner.isReady() ? 'Loading your game...' : 'Waking up Python (first time only)...';
        await GameLab.start(canvas, ed.ta.value, print);
        hint.textContent = 'Click the game, then use the arrow keys.';
        play.disabled = false;
        Progress.award('lab:' + id, 20, 'game started!');
      };
      stop.onclick = () => { GameLab.stop(); print('\n⏹ Game stopped.\n'); };
      reset.onclick = () => { GameLab.stop(); ed.reset(); };

      if (b.tasks && b.tasks.length) {
        const t = el('div', 'callout tip');
        t.innerHTML = '<span class="ct">🔧 Now YOU change it:</span><ul>' +
          b.tasks.map(x => '<li>' + x + '</li>').join('') + '</ul>';
        d.appendChild(t);
      }
      return d;
    },

    real: (b) => {
      const d = el('div', 'block');
      const box = el('div', 'realbox');
      box.appendChild(el('div', 'rhead', '💻 REAL COMPUTER MISSION — ' + (b.title || 'do this on your own computer')));
      const body = el('div', 'rbody');
      if (b.html) body.appendChild(el('div', null, b.html));
      if (b.filename) {
        body.appendChild(el('p', null, 'Create a file called <code>' + b.filename + '</code> and put this inside:'));
        const pre = el('pre');
        pre.textContent = b.code;
        const cb = el('div', 'codebox');
        const hd = el('div', 'cbhead');
        hd.appendChild(el('span', null, b.filename));
        const copy = el('button', 'btn small ghost', 'Copy');
        copy.onclick = () => {
          navigator.clipboard && navigator.clipboard.writeText(b.code);
          copy.textContent = 'Copied!';
          setTimeout(() => copy.textContent = 'Copy', 1200);
        };
        hd.appendChild(copy);
        cb.appendChild(hd); cb.appendChild(pre);
        body.appendChild(cb);
      }
      if (b.commands) {
        body.appendChild(el('p', null, 'Then open the terminal in that folder and type:'));
        const pre2 = el('pre');
        pre2.textContent = b.commands;
        const cb2 = el('div', 'codebox');
        cb2.appendChild(el('div', 'cbhead', '<span>Terminal</span>'));
        cb2.appendChild(pre2);
        body.appendChild(cb2);
      }
      box.appendChild(body);
      d.appendChild(box);
      return d;
    },

    write: (b, ctx) => {
      const id = ctx.id(b);
      const d = el('div', 'block');
      const box = el('div', 'callout brain');
      box.innerHTML = '<span class="ct">✍️ ' + (b.title || 'Write your idea') + '</span><p>' + b.q + '</p>';
      const ta = el('textarea', 'editor');
      ta.style.fontFamily = 'var(--font)';
      ta.style.minHeight = '90px';
      ta.value = Progress.getNote(id);
      ta.placeholder = b.placeholder || 'Type your answer here — it is saved automatically.';
      ta.addEventListener('input', () => Progress.saveNote(id, ta.value));
      const wrap = el('div', 'codebox');
      wrap.appendChild(ta);
      box.appendChild(wrap);
      d.appendChild(box);
      return d;
    }
  };

  function note(b, kind, title) {
    const d = el('div', 'block');
    d.appendChild(el('div', 'callout ' + kind, '<span class="ct">' + title + '</span>' + b.html));
    return d;
  }

  window.Blocks = {
    render(blocks, lessonId) {
      const frag = document.createDocumentFragment();
      let i = 0;
      blocks.forEach((b) => {
        i++;
        const fn = build[b.t];
        if (!fn) return;
        frag.appendChild(fn(b, { id: () => lessonId + ':' + i }));
      });
      return frag;
    }
  };
})();
