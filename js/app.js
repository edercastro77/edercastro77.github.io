/* Router + pages. */
(function () {
  const view = document.getElementById('view');
  const STAGES = window.QUEST_STAGES || [];

  /* ---------- little helpers ---------- */
  const Quest = {
    toast(msg, emoji) {
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = (emoji ? emoji + ' ' : '') + msg;
      document.getElementById('toaster').appendChild(t);
      setTimeout(() => t.remove(), 2600);
    },
    confetti() {
      const fx = document.getElementById('fx');
      const chars = ['🎉', '⭐', '🏆', '🐍', '💎', '✨', '🎮'];
      for (let i = 0; i < 22; i++) {
        const s = document.createElement('span');
        s.textContent = chars[Math.floor(Math.random() * chars.length)];
        s.style.left = Math.random() * 100 + '%';
        s.style.top = '-40px';
        s.style.animationDelay = (Math.random() * 0.5) + 's';
        fx.appendChild(s);
        setTimeout(() => s.remove(), 2200);
      }
    }
  };
  window.Quest = Quest;

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function allLessons() {
    const out = [];
    STAGES.forEach(s => s.lessons.forEach(l => out.push({ stage: s, lesson: l })));
    return out;
  }
  function findLesson(id) {
    return allLessons().find(x => x.lesson.id === id);
  }
  function stageProgress(stage) {
    const done = stage.lessons.filter(l => Progress.isLessonDone(l.id)).length;
    return { done, total: stage.lessons.length, pct: Math.round(done / stage.lessons.length * 100) };
  }

  /* ---------- pages ---------- */
  function pageHome() {
    view.innerHTML = '';
    const hero = el('div', 'hero');
    hero.innerHTML =
      '<span class="quest-emoji">🐍🎮</span>' +
      '<h1>PYTHON QUEST</h1>' +
      '<p class="tag">Learn Python by making video games. Type code, press RUN, see it come alive.</p>';
    view.appendChild(hero);

    const total = allLessons().length;
    const done = allLessons().filter(x => Progress.isLessonDone(x.lesson.id)).length;
    const s = el('div', 'card center');
    s.innerHTML = '<h3 style="margin:0">Your quest so far</h3>' +
      '<p class="muted" style="margin:.3em 0">' + done + ' of ' + total + ' missions complete · ' +
      Progress.state.xp + ' XP · Level ' + Progress.levelInfo().level + ' ' + Progress.levelInfo().name + '</p>' +
      '<div class="progress-mini"><div style="width:' + (done / total * 100) + '%"></div></div>';
    view.appendChild(s);

    const next = allLessons().find(x => !Progress.isLessonDone(x.lesson.id));
    if (next) {
      const c = el('div', 'card center');
      c.innerHTML = '<div class="muted">Your next mission</div>' +
        '<h2 style="margin:.2em 0">' + next.lesson.emoji + ' ' + next.lesson.title + '</h2>';
      const b = el('a', 'btn run', 'START ▶');
      b.href = '#/lesson/' + next.lesson.id;
      b.style.textDecoration = 'none';
      c.appendChild(b);
      view.appendChild(c);
    }

    view.appendChild(el('h2', null, '🗺️ The Quest Map'));
    STAGES.forEach((stage, i) => {
      const p = stageProgress(stage);
      const a = el('a', 'stage-card');
      a.href = '#/stage/' + stage.id;
      a.innerHTML =
        '<div class="stage-emoji">' + stage.emoji + '</div>' +
        '<div class="stage-body">' +
        '<h3>Stage ' + i + ' — ' + stage.title + '</h3>' +
        '<p>' + stage.subtitle + '</p>' +
        '<div class="stage-meta">' +
        '<span class="pill' + (p.done === p.total ? ' done' : '') + '">' + p.done + '/' + p.total + ' missions</span>' +
        '<span class="pill badge">🏅 ' + stage.badge + '</span>' +
        '</div>' +
        '<div class="progress-mini"><div style="width:' + p.pct + '%"></div></div>' +
        '</div>';
      view.appendChild(a);
    });

    const how = el('div', 'card');
    how.innerHTML =
      '<h2>🧭 How this quest works</h2>' +
      '<ul>' +
      '<li><b>🌐 Playground world</b> — you write Python right here on the page and press <b>RUN ▶</b>.</li>' +
      '<li><b>💻 Real computer world</b> — you make a real <code>.py</code> file and run it in the terminal, like a real developer.</li>' +
      '<li><b>🎮 Game Lab</b> — the same Python, but with pictures, movement and sound.</li>' +
      '<li><b>🐞 Bugs are puzzles</b>, not mistakes. Breaking the code on purpose is part of the training!</li>' +
      '<li>You earn <b>XP</b>, <b>levels</b> and <b>badges</b> as you go. Everything is saved in this browser.</li>' +
      '</ul>';
    view.appendChild(how);

    const dedication = el('div', 'dedication');
    dedication.innerHTML =
      '<div class="ded-emoji">🐍❤️🎮</div>' +
      '<p class="ded-to">For <b>Aldrick Castro</b></p>' +
      '<p class="ded-text">I built this quest just for you, so you can learn Python and make the video games ' +
      'you imagine. Take your time, break things, and enjoy every bug you fix. ' +
      'I cannot wait to play the games you create.</p>' +
      '<p class="ded-from">— Dad, Eder Castro</p>';
    view.appendChild(dedication);
  }

  function pageStage(id) {
    const stage = STAGES.find(s => s.id === id);
    if (!stage) return pageHome();
    view.innerHTML = '';
    view.appendChild(el('div', 'crumbs', '<a href="#/">🗺️ Map</a> › ' + stage.title));
    const head = el('div', 'card');
    const p = stageProgress(stage);
    head.innerHTML =
      '<h1>' + stage.emoji + ' ' + stage.title + '</h1>' +
      '<p class="muted">' + stage.subtitle + '</p>' +
      '<p><b>Goal:</b> ' + stage.goal + '</p>' +
      '<div class="stage-meta"><span class="pill">' + p.done + '/' + p.total + ' missions</span>' +
      '<span class="pill badge">Badge: ' + stage.badge + '</span></div>' +
      '<div class="progress-mini"><div style="width:' + p.pct + '%"></div></div>';
    view.appendChild(head);

    stage.lessons.forEach((l, i) => {
      const a = el('a', 'lesson-row' + (Progress.isLessonDone(l.id) ? ' done' : ''));
      a.href = '#/lesson/' + l.id;
      a.innerHTML =
        '<div class="num">' + (Progress.isLessonDone(l.id) ? '✅' : l.emoji) + '</div>' +
        '<div class="t"><b>Mission ' + (i + 1) + ': ' + l.title + '</b><small>' + (l.goal || '') + '</small></div>' +
        '<div class="pill">' + (l.xp || 100) + ' XP</div>';
      view.appendChild(a);
    });
  }

  function pageLesson(id) {
    GameLab.stop();
    const found = findLesson(id);
    if (!found) return pageHome();
    const { stage, lesson } = found;
    const list = allLessons();
    const idx = list.findIndex(x => x.lesson.id === id);
    const prev = list[idx - 1], next = list[idx + 1];

    view.innerHTML = '';
    view.appendChild(el('div', 'crumbs',
      '<a href="#/">🗺️ Map</a> › <a href="#/stage/' + stage.id + '">' + stage.title + '</a>'));

    const title = el('div', 'lesson-title');
    title.innerHTML = '<span class="em">' + lesson.emoji + '</span><div><h1>' + lesson.title + '</h1>' +
      '<div class="muted">' + (lesson.goal || '') + '</div></div>';
    view.appendChild(title);

    view.appendChild(Blocks.render(lesson.blocks, lesson.id));

    /* finish button */
    const fin = el('div', 'card center');
    const already = Progress.isLessonDone(lesson.id);
    fin.innerHTML = '<h3>' + (already ? '✅ Mission complete!' : 'Finished this mission?') + '</h3>';
    const btn = el('button', 'btn run', already ? '✔ Completed' : 'COMPLETE MISSION 🏁 +' + (lesson.xp || 100) + ' XP');
    btn.onclick = () => {
      Progress.completeLesson(lesson.id, lesson.xp || 100);
      Quest.confetti();
      btn.textContent = '✔ Completed';
      const p = stageProgress(stage);
      if (p.done === p.total) Progress.earnBadge(stage.badge, stage.emoji);
      if (allLessons().every(x => Progress.isLessonDone(x.lesson.id))) {
        Progress.earnBadge('Python Game Developer', '🐍');
      }
      if (next) location.hash = '#/lesson/' + next.lesson.id;
    };
    fin.appendChild(btn);
    view.appendChild(fin);

    const nav = el('div', 'nav-links');
    if (prev) { const a = el('a', 'btn', '← ' + prev.lesson.title); a.href = '#/lesson/' + prev.lesson.id; a.style.textDecoration = 'none'; nav.appendChild(a); }
    else nav.appendChild(el('span'));
    if (next) { const a = el('a', 'btn', next.lesson.title + ' →'); a.href = '#/lesson/' + next.lesson.id; a.style.textDecoration = 'none'; nav.appendChild(a); }
    view.appendChild(nav);
  }

  const PLAYGROUND_START =
    '# Welcome to the Python Playground!\n' +
    '# Change anything you like, then press RUN.\n\n' +
    'import random\n\n' +
    'monster = "🐉 Dragon"\n' +
    'health = random.randint(10, 100)\n\n' +
    'print("A wild", monster, "appears!")\n' +
    'print("It has", health, "health!")\n';

  function pagePlayground() {
    GameLab.stop();
    view.innerHTML = '';
    view.appendChild(el('h1', null, '🌐 Python Playground'));
    view.appendChild(el('p', 'muted', 'Your own sandbox. Write any Python you want and press RUN. Nothing can break!'));
    view.appendChild(Blocks.render([{ t: 'run', code: PLAYGROUND_START }], 'playground'));
    const tip = el('div', 'callout tip');
    tip.innerHTML = '<span class="ct">Tip</span>Press <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> to run without touching the mouse. Your code is saved automatically.';
    view.appendChild(tip);
  }

  const LAB_START =
    'import gamelab\n\n' +
    'gamelab.screen(480, 300)\n\n' +
    'player_x = 240\n' +
    'player_y = 150\n\n' +
    'def each_frame():\n' +
    '    global player_x, player_y\n' +
    '    if gamelab.key("left"):  player_x = player_x - 4\n' +
    '    if gamelab.key("right"): player_x = player_x + 4\n' +
    '    if gamelab.key("up"):    player_y = player_y - 4\n' +
    '    if gamelab.key("down"):  player_y = player_y + 4\n\n' +
    '    gamelab.clear("#0b1220")\n' +
    '    gamelab.text("Move me with the arrow keys!", 20, 20, 18, "#9fb2cd")\n' +
    '    gamelab.sprite("🚀", player_x, player_y, 48)\n\n' +
    'gamelab.on_frame(each_frame)\n';

  function pageLab() {
    GameLab.stop();
    view.innerHTML = '';
    view.appendChild(el('h1', null, '🎮 Game Lab'));
    view.appendChild(el('p', 'muted', 'Real Python that draws real graphics. Build whatever you want here.'));
    view.appendChild(Blocks.render([{ t: 'lab', code: LAB_START, w: 480, h: 300 }], 'gamelab-free'));
    const c = el('div', 'card');
    c.innerHTML =
      '<h2>📖 Game Lab commands</h2>' +
      '<table class="simple">' +
      '<tr><th>Command</th><th>What it does</th></tr>' +
      '<tr><td><code>gamelab.screen(w, h)</code></td><td>make the game window</td></tr>' +
      '<tr><td><code>gamelab.clear("black")</code></td><td>paint over everything</td></tr>' +
      '<tr><td><code>gamelab.sprite("🐉", x, y, size)</code></td><td>draw an emoji character</td></tr>' +
      '<tr><td><code>gamelab.rect(x, y, w, h, color)</code></td><td>draw a box</td></tr>' +
      '<tr><td><code>gamelab.circle(x, y, r, color)</code></td><td>draw a circle</td></tr>' +
      '<tr><td><code>gamelab.text("Hi", x, y, size, color)</code></td><td>write words on the screen</td></tr>' +
      '<tr><td><code>gamelab.key("left")</code></td><td>True while a key is held down</td></tr>' +
      '<tr><td><code>gamelab.hit(x1,y1,s1, x2,y2,s2)</code></td><td>True if two sprites touch</td></tr>' +
      '<tr><td><code>gamelab.sound("coin")</code></td><td>coin, hit, jump, win, lose</td></tr>' +
      '<tr><td><code>gamelab.width()</code> / <code>height()</code></td><td>size of the screen</td></tr>' +
      '<tr><td><code>gamelab.on_frame(f)</code></td><td>run your function 60 times a second</td></tr>' +
      '<tr><td><code>gamelab.stop()</code></td><td>end the game</td></tr>' +
      '</table>';
    view.appendChild(c);
  }

  function pageTerminal() {
    GameLab.stop();
    view.innerHTML = '';
    view.appendChild(el('h1', null, '💻 Terminal Training'));
    const intro = el('div', 'card');
    intro.innerHTML =
      '<p>Normally you talk to a computer by <b>clicking</b>. Programmers can also talk to it by <b>typing</b>.</p>' +
      '<p>The place where you type those instructions is called the <b>terminal</b>.</p>' +
      '<table class="simple">' +
      '<tr><th>Command</th><th>Means</th></tr>' +
      '<tr><td><code>dir</code></td><td>"Show me what is inside this folder."</td></tr>' +
      '<tr><td><code>cd Games</code></td><td>"Go inside the Games folder."</td></tr>' +
      '<tr><td><code>cd ..</code></td><td>"Go back one folder."</td></tr>' +
      '<tr><td><code>cls</code></td><td>"Clean the screen."</td></tr>' +
      '<tr><td><code>python treasure.py</code></td><td>"Python, run this program!"</td></tr>' +
      '</table>' +
      '<p class="muted">You do not have to memorize these. You just have to know the terminal is another way to give orders.</p>';
    view.appendChild(intro);

    const holder = el('div', 'card');
    view.appendChild(holder);
    QuestTerminal.create(holder, {
      intro: ['Pretend Terminal — nothing here can break your real computer.', 'Type  help  to see what you can do.', ''],
      onCommand: (e) => {
        if (e.cmd.toLowerCase().includes('python treasure.py')) {
          Progress.award('term:treasure', 100, 'you found the treasure!');
          Progress.earnBadge('Terminal Explorer', '💻');
        }
      }
    });
    const goal = el('div', 'callout tip');
    goal.innerHTML = '<span class="ct">🎯 Boss mission</span>Find and run <code>treasure.py</code>. Path: <code>PythonQuest</code> → <code>Games</code>. Reward: 100 XP + a badge!';
    view.appendChild(goal);
  }

  function pageBadges() {
    GameLab.stop();
    view.innerHTML = '';
    view.appendChild(el('h1', null, '🏆 Trophy Room'));
    const li = Progress.levelInfo();
    const c = el('div', 'card center');
    c.innerHTML = '<h2 style="margin:0">Level ' + li.level + ' — ' + li.name + '</h2>' +
      '<p class="muted">' + Progress.state.xp + ' total XP</p>';
    view.appendChild(c);

    const all = STAGES.map(s => ({ name: s.badge, emoji: s.emoji }))
      .concat([{ name: 'Terminal Explorer', emoji: '💻' }, { name: 'Python Game Developer', emoji: '🐍' }]);
    const grid = el('div', 'badge-grid');
    all.forEach(b => {
      const has = Progress.hasBadge(b.name);
      const d = el('div', 'badge' + (has ? '' : ' locked'));
      d.innerHTML = '<span class="be">' + (has ? b.emoji : '🔒') + '</span><div class="bn">' + b.name + '</div>';
      grid.appendChild(d);
    });
    view.appendChild(grid);

    view.appendChild(el('h2', null, '⭐ Level ladder'));
    const lv = el('div', 'card');
    lv.innerHTML = '<table class="simple"><tr><th>Level</th><th>Name</th><th>XP needed</th></tr>' +
      Progress.LEVELS.map((l, i) =>
        '<tr><td>' + (i + 1) + '</td><td>' + (Progress.state.xp >= l.xp ? '✅ ' : '🔒 ') + l.name + '</td><td>' + l.xp + '</td></tr>').join('') +
      '</table>';
    view.appendChild(lv);
  }

  function pageParents() {
    GameLab.stop();
    view.innerHTML = '';
    view.appendChild(el('h1', null, '👨‍👩‍👦 Guide for grown-ups'));
    const c = el('div', 'card');
    c.innerHTML =
      '<h2>How to use Python Quest</h2>' +
      '<ul>' +
      '<li><b>No fixed calendar.</b> Do a mission when there is energy for it. A mission is roughly 20–40 minutes. 2–4 short sessions a week works well.</li>' +
      '<li><b>Never explain for more than a few minutes without running something.</b> Type → Run → See.</li>' +
      '<li><b>Always let him change the code.</b> Names, colours, monsters, numbers — his ideas, his game.</li>' +
      '<li><b>Let him break things on purpose.</b> Then read the error together: <i>"the computer found something for us to fix"</i>.</li>' +
      '<li><b>Guide, do not type.</b> Ask questions instead of giving answers. The goal is "I can make things with code", not a finished product.</li>' +
      '<li><b>Training wheels come off slowly:</b> copy this → change this → complete this → write this → build your own.</li>' +
      '</ul>' +
      '<h2>The two worlds</h2>' +
      '<p>Every stage teaches the same Python twice: in the browser <b>Playground</b> (instant, no setup) and on the <b>real computer</b> (a real <code>.py</code> file run from the terminal). The second one is what makes him feel like a real developer.</p>' +
      '<h2>Setting up the real computer (once)</h2>' +
      '<ol>' +
      '<li>Install Python from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener">python.org/downloads</a>. On Windows, tick <b>"Add python.exe to PATH"</b> during install.</li>' +
      '<li>Install a code editor: <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Visual Studio Code</a>.</li>' +
      '<li>Create a folder <code>PythonQuest</code> with subfolders <code>Games</code> and <code>Lessons</code>.</li>' +
      '<li>Check it works: open the terminal and type <code>python --version</code>.</li>' +
      '<li>Later, for Stage 3 games on the real computer: <code>pip install pygame</code>.</li>' +
      '</ol>' +
      '<h2>About Game Lab</h2>' +
      '<p>Pygame cannot run inside a browser, so Stage 3 uses <b>Game Lab</b>: a tiny engine with the exact same ideas (screen, game loop, sprites, keys, collisions, sound) that runs instantly online. Each of those missions also includes the equivalent <b>pygame</b> code to try on the real computer.</p>' +
      '<h2>Progress data</h2>' +
      '<p>XP, badges and code are stored only in this browser (localStorage). Nothing is uploaded anywhere.</p>';
    view.appendChild(c);

    const danger = el('div', 'card');
    danger.innerHTML = '<h3>Start over</h3><p class="muted">This erases all XP, badges and saved code in this browser.</p>';
    const b = el('button', 'btn', '🗑️ Reset all progress');
    b.onclick = () => {
      if (confirm('Erase ALL progress, XP, badges and saved code? This cannot be undone.')) {
        Progress.reset();
        Quest.toast('Progress erased. New quest!', '🔄');
        location.hash = '#/';
      }
    };
    danger.appendChild(b);
    view.appendChild(danger);
  }

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const parts = hash.split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (!parts.length) return pageHome();
    switch (parts[0]) {
      case 'stage': return pageStage(parts[1]);
      case 'lesson': return pageLesson(parts[1]);
      case 'playground': return pagePlayground();
      case 'lab': return pageLab();
      case 'terminal': return pageTerminal();
      case 'badges': return pageBadges();
      case 'parents': return pageParents();
      default: return pageHome();
    }
  }

  window.addEventListener('hashchange', route);
  Progress.render();
  route();
})();
