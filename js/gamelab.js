/* Game Lab: a tiny 2D game engine that Python code can drive, drawn on a canvas.
   It works like Pygame (setup -> game loop -> draw), but runs in the browser. */
(function () {
  let installed = false;
  let active = null;          // the lab currently running
  const keys = new Set();

  const KEYMAP = {
    ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
    ' ': 'space', Enter: 'enter', Escape: 'escape'
  };

  function keyName(e) {
    if (KEYMAP[e.key]) return KEYMAP[e.key];
    return String(e.key).toLowerCase();
  }

  window.addEventListener('keydown', (e) => {
    const n = keyName(e);
    keys.add(n);
    if (active && ['left', 'right', 'up', 'down', 'space'].includes(n)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => keys.delete(keyName(e)));
  window.addEventListener('blur', () => keys.clear());

  let audioCtx = null;
  function beep(kind) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const tones = {
        coin: [880, 1320], hit: [180, 90], jump: [440, 760],
        win: [523, 659, 784, 1046], lose: [330, 220, 110], blip: [660, 660]
      };
      const seq = tones[kind] || tones.blip;
      seq.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'square';
        o.frequency.value = f;
        g.gain.value = 0.06;
        o.connect(g); g.connect(audioCtx.destination);
        const t = audioCtx.currentTime + i * 0.09;
        o.start(t); o.stop(t + 0.09);
      });
    } catch (e) { /* sound is optional */ }
  }

  /* --- the JS side of the Python `gamelab` module --- */
  const api = {
    screen(w, h, color) {
      if (!active) return;
      active.canvas.width = w; active.canvas.height = h;
      active.bg = color || '#0b1220';
      api.clear(active.bg);
    },
    clear(color) {
      if (!active) return;
      const c = active.ctx;
      c.fillStyle = color || active.bg || '#0b1220';
      c.fillRect(0, 0, active.canvas.width, active.canvas.height);
    },
    rect(x, y, w, h, color) {
      if (!active) return;
      active.ctx.fillStyle = color || 'white';
      active.ctx.fillRect(x, y, w, h);
    },
    circle(x, y, r, color) {
      if (!active) return;
      const c = active.ctx;
      c.fillStyle = color || 'white';
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    },
    text(msg, x, y, size, color) {
      if (!active) return;
      const c = active.ctx;
      c.fillStyle = color || 'white';
      c.font = 'bold ' + (size || 24) + 'px Trebuchet MS, sans-serif';
      c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText(String(msg), x, y);
    },
    sprite(emoji, x, y, size) {
      if (!active) return;
      const c = active.ctx;
      c.font = (size || 48) + 'px serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(String(emoji), x, y);
    },
    key(name) { return keys.has(String(name).toLowerCase()); },
    mouse_x() { return active ? active.mx : 0; },
    mouse_y() { return active ? active.my : 0; },
    width() { return active ? active.canvas.width : 0; },
    height() { return active ? active.canvas.height : 0; },
    hit(x1, y1, s1, x2, y2, s2) {
      return Math.abs(x1 - x2) < (s1 + s2) / 2 && Math.abs(y1 - y2) < (s1 + s2) / 2;
    },
    sound(kind) { beep(kind); },
    on_frame(fn) { if (active) active.frameFn = fn; },
    stop() { if (active) active.stopRequested = true; }
  };

  const GAMELAB_PY = `
import sys, types, _glab_js
from pyodide.ffi import create_proxy

_m = types.ModuleType("gamelab")
_frame_proxy = None

def screen(width=640, height=400, color="#0b1220"):
    """Create the game window."""
    _glab_js.screen(width, height, color)

def clear(color="#0b1220"):
    """Paint over everything (do this at the start of every frame)."""
    _glab_js.clear(color)

def rect(x, y, width, height, color="white"):
    _glab_js.rect(x, y, width, height, color)

def circle(x, y, radius, color="white"):
    _glab_js.circle(x, y, radius, color)

def text(message, x, y, size=24, color="white"):
    _glab_js.text(str(message), x, y, size, color)

def sprite(emoji, x, y, size=48):
    """Draw an emoji sprite. x, y is its CENTER."""
    _glab_js.sprite(emoji, x, y, size)

def key(name):
    """True while a key is held down: 'left', 'right', 'up', 'down', 'space', 'a'..."""
    return bool(_glab_js.key(name))

def mouse_x(): return _glab_js.mouse_x()
def mouse_y(): return _glab_js.mouse_y()
def width(): return _glab_js.width()
def height(): return _glab_js.height()

def hit(x1, y1, size1, x2, y2, size2):
    """True if two sprites are touching."""
    return bool(_glab_js.hit(x1, y1, size1, x2, y2, size2))

def sound(kind="blip"):
    """kind: 'coin', 'hit', 'jump', 'win', 'lose', 'blip'"""
    _glab_js.sound(kind)

def on_frame(function):
    """Tell the Game Lab which function to run 60 times per second."""
    global _frame_proxy
    if _frame_proxy is not None:
        try:
            _frame_proxy.destroy()
        except Exception:
            pass
    _frame_proxy = create_proxy(function)
    _glab_js.on_frame(_frame_proxy)

def stop():
    """End the game."""
    _glab_js.stop()

for _n in ("screen","clear","rect","circle","text","sprite","key","mouse_x","mouse_y",
           "width","height","hit","sound","on_frame","stop"):
    setattr(_m, _n, globals()[_n])
sys.modules["gamelab"] = _m
`;

  async function install() {
    const py = await PyRunner.instance();
    if (installed) return py;
    py.registerJsModule('_glab_js', api);
    py.runPython(GAMELAB_PY);
    installed = true;
    return py;
  }

  const GameLab = {
    /* Runs Python code that draws on the given canvas. */
    async start(canvas, code, print) {
      GameLab.stop();
      const py = await install();
      const ctx = canvas.getContext('2d');
      const lab = { canvas, ctx, bg: '#0b1220', frameFn: null, raf: 0, mx: 0, my: 0, stopRequested: false };
      active = lab;

      canvas.onmousemove = (e) => {
        const r = canvas.getBoundingClientRect();
        lab.mx = Math.round((e.clientX - r.left) * canvas.width / r.width);
        lab.my = Math.round((e.clientY - r.top) * canvas.height / r.height);
      };

      py.setStdout({ batched: (s) => print(s + '\n') });
      py.setStderr({ batched: (s) => print(s + '\n') });

      try {
        await py.runPythonAsync(code);
      } catch (e) {
        const msg = PyRunner.clean(e.message || String(e));
        print('\n🐞 ' + msg + '\n💡 ' + PyRunner.explain(msg) + '\n', true);
        active = null;
        return;
      }

      if (!lab.frameFn) return;   // a drawing without a game loop: nothing else to do

      const tick = () => {
        if (lab !== active || lab.stopRequested) { GameLab.stop(); return; }
        try {
          lab.frameFn();
        } catch (e) {
          const msg = PyRunner.clean(e.message || String(e));
          print('\n🐞 ' + msg + '\n💡 ' + PyRunner.explain(msg) + '\n', true);
          GameLab.stop();
          return;
        }
        lab.raf = requestAnimationFrame(tick);
      };
      lab.raf = requestAnimationFrame(tick);
    },

    stop() {
      if (!active) return;
      cancelAnimationFrame(active.raf);
      active.canvas.onmousemove = null;
      active = null;   // the Python proxy is reused/freed by gamelab.on_frame
    },

    running() { return !!active; }
  };

  window.GameLab = GameLab;
})();
