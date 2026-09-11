/* Progress: XP, levels, badges, completed lessons — saved in the browser. */
(function () {
  const KEY = 'pythonquest.v1';

  const LEVELS = [
    { xp: 0,    name: 'Newbie Coder' },
    { xp: 400,  name: 'Code Cadet' },
    { xp: 900,  name: 'Print Master' },
    { xp: 1500, name: 'Variable Wizard' },
    { xp: 2200, name: 'Loop Wrangler' },
    { xp: 3000, name: 'Bug Hunter' },
    { xp: 3900, name: 'Function Knight' },
    { xp: 4900, name: 'Game Smith' },
    { xp: 6000, name: 'Pixel Wizard' },
    { xp: 7200, name: 'Boss Slayer' },
    { xp: 8500, name: 'Game Engineer' },
    { xp: 10000, name: 'Python Game Developer' }
  ];

  const empty = { xp: 0, awarded: {}, lessons: {}, badges: {}, code: {}, notes: {} };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...empty };
      return Object.assign({ ...empty }, JSON.parse(raw));
    } catch (e) {
      return { ...empty };
    }
  }

  let state = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
    render();
  }

  function levelInfo() {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) if (state.xp >= LEVELS[i].xp) idx = i;
    const cur = LEVELS[idx];
    const next = LEVELS[idx + 1];
    return {
      level: idx + 1,
      name: cur.name,
      into: state.xp - cur.xp,
      need: next ? next.xp - cur.xp : 0,
      max: !next
    };
  }

  function render() {
    const li = levelInfo();
    const num = document.getElementById('levelNum');
    const nam = document.getElementById('levelName');
    const fill = document.getElementById('xpFill');
    const txt = document.getElementById('xpText');
    if (!num) return;
    num.textContent = li.level;
    nam.textContent = li.name;
    if (li.max) {
      fill.style.width = '100%';
      txt.textContent = state.xp + ' XP — MAX!';
    } else {
      fill.style.width = Math.min(100, (li.into / li.need) * 100) + '%';
      txt.textContent = li.into + ' / ' + li.need + ' XP';
    }
  }

  /* Award XP only once per id. */
  function award(id, amount, label) {
    if (state.awarded[id]) return false;
    state.awarded[id] = amount;
    const before = levelInfo().level;
    state.xp += amount;
    save();
    Quest.toast('+' + amount + ' XP ' + (label || ''), '⭐');
    if (levelInfo().level > before) {
      Quest.toast('LEVEL UP! You are now ' + levelInfo().name + '!', '🎉');
      Quest.confetti();
    }
    return true;
  }

  const Progress = {
    LEVELS,
    get state() { return state; },
    levelInfo,
    render,
    award,
    isAwarded: (id) => !!state.awarded[id],
    completeLesson(lessonId, xp) {
      const first = !state.lessons[lessonId];
      state.lessons[lessonId] = true;
      save();
      award('lesson:' + lessonId, xp || 100, 'lesson complete!');
      return first;
    },
    isLessonDone: (id) => !!state.lessons[id],
    earnBadge(name, emoji) {
      if (state.badges[name]) return;
      state.badges[name] = emoji || '🏆';
      save();
      Quest.toast('BADGE UNLOCKED: ' + name, emoji || '🏆');
      Quest.confetti();
    },
    hasBadge: (n) => !!state.badges[n],
    badges: () => state.badges,
    saveCode(id, code) { state.code[id] = code; save(); },
    getCode: (id) => state.code[id],
    saveNote(id, txt) { state.notes[id] = txt; save(); },
    getNote: (id) => state.notes[id] || '',
    reset() {
      state = { ...empty, awarded: {}, lessons: {}, badges: {}, code: {}, notes: {} };
      save();
    }
  };

  window.Progress = Progress;
})();
