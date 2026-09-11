/* STAGE 0 — COMPUTER EXPLORER */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's0',
  title: 'Computer Explorer',
  emoji: '🖥️',
  badge: 'Computer Explorer',
  subtitle: 'What is a program? What is a file? What is that black window with the typing?',
  goal: 'Understand what a program is, where programs live, and how to make the computer run one.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's0m1', emoji: '🤖', xp: 100,
      title: 'What Is Programming?',
      goal: 'Give the computer your very first order.',
      blocks: [
        { t: 'text', html: `<p>A computer is <b>incredibly fast</b>… and <b>incredibly clueless</b>.</p>
          <p>It can add a million numbers in one second, but it will never do anything on its own. It waits. Forever. Until somebody tells it exactly what to do.</p>
          <p>That somebody is going to be <b>you</b>.</p>` },

        { t: 'idea', html: `<b>Programming</b> means giving the computer a list of instructions. That list is called a <b>program</b>.` },

        { t: 'text', html: `<p>Here is your first instruction. It is called <code>print</code>, and it means:</p>
          <p style="font-size:1.2rem">👉 <i>"Computer, show this message on the screen."</i></p>
          <p>Press the big green <b>RUN ▶</b> button and watch what happens.</p>` },

        {
          t: 'run', code: `print("Hello!")`,
          tasks: [
            'Change <code>Hello!</code> to your own name and run it again.',
            'Add a second line: <code>print("I am learning to code!")</code>',
            'Add an emoji: <code>print("I am a coder 🐍")</code>'
          ]
        },

        { t: 'fun', html: `The quotation marks <code>" "</code> are like a <b>bag</b>. Anything you put inside the bag, Python just shows. It does not try to understand it.` },

        { t: 'brain', title: 'Predict before you run', html: `What do you think this program will show? Say it out loud <b>first</b>, then press RUN.` },

        {
          t: 'run', code: `print("3 + 4")
print(3 + 4)`,
          tasks: ['Were you right? The quotes changed everything!']
        },

        { t: 'text', html: `<p>Did you see it? With quotes, Python shows the <b>text</b> <code>3 + 4</code>. Without quotes, Python actually <b>does the maths</b> and shows <code>7</code>.</p>` },

        {
          t: 'fix', goal: 'This program is broken on purpose. Run it, read the message, then fix it. (A quote is missing!)',
          code: `print("The dragon wakes up)`
        },

        { t: 'tip', title: 'Bugs are puzzles', html: `A broken program is <b>not</b> a failure. It is the computer saying: <i>"I found something we need to fix."</i> Real programmers see hundreds of these every day. You just found your first one. 🐞` },

        {
          t: 'quiz', q: 'What does print() do?',
          options: ['It sends the text to a paper printer', 'It shows a message on the screen', 'It deletes the text', 'It makes the computer faster'],
          correct: 1,
          why: 'print means "show this on the screen". (It got its name a long time ago, when computers really did print on paper!)'
        },

        {
          t: 'mission', emoji: '🎯', title: 'MISSION: Introduce yourself', xp: 60,
          html: `<p>Using the playground above, make the computer show exactly three lines:</p>
            <pre style="font-family:var(--mono)">Hello!
My name is ______.
I am learning to code!</pre>
            <p>Then press the button below.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m2', emoji: '📁', xp: 100,
      title: 'Files and Folders',
      goal: 'Find out where programs live.',
      blocks: [
        { t: 'text', html: `<p>Every program you have ever used — Minecraft, YouTube, Roblox — is stored in <b>files</b>.</p>
          <p>A file is a box of information with a name. Files are kept inside <b>folders</b>, and folders can hold other folders, like Russian dolls.</p>` },

        {
          t: 'code', caption: 'A computer is a tree of folders', code: `MyComputer
 ├── Documents
 ├── Pictures
 ├── Games
 └── Python
      ├── hello.py
      ├── dragon.py
      └── my_game.py`
        },

        { t: 'idea', html: `The end of a file's name tells you what kind of file it is.<br>
          <code>.jpg</code> = a picture &nbsp;·&nbsp; <code>.mp3</code> = a song &nbsp;·&nbsp; <code>.py</code> = <b>a Python program</b>` },

        { t: 'text', html: `<p>So when you see a name like this:</p>` },
        { t: 'code', caption: 'A Python program', code: `dragon.py` },
        { t: 'text', html: `<p>…you can read it out loud as: <i>"a Python program called dragon"</i>.</p>` },

        {
          t: 'quiz', q: 'Which one of these is a Python program?',
          options: ['cat.jpg', 'song.mp3', 'treasure.py', 'homework.txt'],
          correct: 2,
          why: 'Python programs always end with .py'
        },

        { t: 'warn', title: 'Sneaky trap', html: `A file called <code>dragon.py.txt</code> is <b>not</b> a Python program — it is a text file wearing a costume. The <i>last</i> part is what counts.` },

        {
          t: 'mission', emoji: '🗂️', title: 'MISSION: Build your quest base', xp: 80,
          html: `<p>On your real computer, create this folder (ask a grown-up if you need help):</p>
            <pre style="font-family:var(--mono)">PythonQuest
 ├── Games
 ├── Lessons
 └── README.txt</pre>
            <p>This is your headquarters for the whole year. Every game you make will live here.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m3', emoji: '💻', xp: 100,
      title: 'What Is a Terminal?',
      goal: 'Learn the secret way to talk to a computer.',
      blocks: [
        { t: 'text', html: `<p>You usually talk to your computer by <b>clicking</b>:</p>
          <p style="text-align:center;font-size:1.1rem">You → 🖱️ click → 💻 Computer</p>
          <p>But there is another way. A faster, older, more powerful way that programmers use every single day:</p>
          <p style="text-align:center;font-size:1.1rem">You → ⌨️ type a command → 💻 Computer</p>
          <p>The place where you type those commands is called the <b>terminal</b>.</p>` },

        { t: 'idea', html: `The terminal is just <b>talking to your computer with words instead of clicks</b>. That is all it is. It looks scary. It is not.` },

        {
          t: 'code', caption: 'Your first four magic words', code: `dir          ->  "Show me what is in this folder."
cd Games     ->  "Go inside the Games folder."
cd ..        ->  "Go back one folder."
cls          ->  "Clean the screen."`
        },

        { t: 'tip', title: 'Do NOT memorize', html: `Nobody memorizes commands. Programmers forget them and look them up all the time. You only need to remember <b>the idea</b>: I can type orders to my computer.` },

        {
          t: 'terminal',
          goal: `<p>Here is a <b>pretend terminal</b>. Nothing you type here can break anything.</p>
                 <p>Try these, one at a time:</p><ol><li><code>dir</code></li><li><code>cd Pictures</code></li><li><code>dir</code></li><li><code>cd ..</code></li><li><code>cls</code></li></ol>`,
          winCommand: 'cd ..', xp: 40
        },

        {
          t: 'quiz', q: 'You are inside the Games folder and you want to go back out. What do you type?',
          options: ['dir', 'cd ..', 'cls', 'back'],
          correct: 1,
          why: 'The two dots ".." always mean "the folder above this one".'
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m4', emoji: '🗺️', xp: 120,
      title: 'Terminal Adventure',
      goal: 'Explore a computer using only your keyboard.',
      blocks: [
        { t: 'text', html: `<p>Time for an adventure. You are going to travel <b>inside</b> a computer, using only typed commands. No mouse allowed! 🐭🚫</p>
          <p>Your ship's instruments are:</p>
          <ul><li><code>dir</code> — look around</li><li><code>cd folder</code> — walk into a room</li><li><code>cd ..</code> — walk back out</li></ul>` },

        {
          t: 'terminal',
          goal: `<p><b>🎯 Your quest:</b></p>
                 <ol>
                   <li>Type <code>dir</code> and look around.</li>
                   <li>Travel into <code>PythonQuest</code>.</li>
                   <li>Look around again.</li>
                   <li>Travel into <code>Games</code>.</li>
                   <li>Look around. What programs do you see?</li>
                 </ol>
                 <p>Get all the way to <code>C:\\PythonQuest\\Games</code> to win this mission.</p>`,
          winCommand: 'cd Games', xp: 60
        },

        { t: 'fun', html: `Look at the start of the line: <code>C:\\PythonQuest\\Games&gt;</code>. That is the computer telling you <b>where you are standing right now</b>, like a map pin. 📍` },

        {
          t: 'quiz', q: 'The terminal shows: C:\\PythonQuest\\Games&gt; — where are you?',
          options: ['Inside the Games folder, which is inside PythonQuest', 'Inside PythonQuest, which is inside Games', 'Nowhere, you are lost', 'Inside a game called C'],
          correct: 0,
          why: 'You read the path left to right, like walking deeper and deeper into folders.'
        },

        {
          t: 'mission', emoji: '🧭', title: 'MISSION: Real explorer', xp: 60,
          html: `<p>Now do the same thing on your <b>real</b> computer. Open the terminal (on Windows: press the Start key, type <code>cmd</code>, press Enter) and use <code>dir</code> and <code>cd</code> until you reach your <code>PythonQuest</code> folder.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m5', emoji: '🐍', xp: 100,
      title: 'What Is Python?',
      goal: 'Meet the language you will speak for the next year.',
      blocks: [
        { t: 'text', html: `<p>Humans speak English, Spanish, Japanese… Computers need a language too. A <b>programming language</b> is a set of words a computer understands.</p>
          <p>There are lots of them:</p>
          <ul>
            <li>🐍 <b>Python</b> — easy to read, great for beginners, used for games, science and AI</li>
            <li>🎮 <b>C#</b> — used in the Unity game engine</li>
            <li>🌐 <b>JavaScript</b> — makes websites move (this website uses it!)</li>
            <li>⚡ <b>C++</b> — very fast, used in giant games like Fortnite</li>
          </ul>` },

        { t: 'idea', html: `We chose <b>Python</b> because it looks almost like English. Look: <code>if health &lt; 0: print("Game Over")</code>. You can almost <i>read</i> that out loud.` },

        { t: 'fun', html: `Python is not named after the snake! It is named after a funny old TV show called <i>Monty Python</i>. But the snake logo is way cooler, so everyone kept it. 🐍` },

        {
          t: 'run', code: `print("Python is a programming language.")
print("It was born in 1991 — older than your parents' phones!")
print("Today it is used by NASA, YouTube, Instagram and Netflix.")`,
          tasks: ['Add one more line about something YOU want to build with Python.']
        },

        {
          t: 'quiz', q: 'Why is Python a good first language?',
          options: ['Because it is the fastest language in the world', 'Because it is easy to read, almost like English', 'Because only kids can use it', 'Because it is the only language for games'],
          correct: 1,
          why: 'Easy to read means easy to learn — and Python is used by professionals too!'
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m6', emoji: '📄', xp: 120,
      title: 'Your First Python File',
      goal: 'Create a real .py file and run it like a real developer.',
      blocks: [
        { t: 'text', html: `<p>Up to now you have been coding in the <b>Playground</b> — instant, easy, fun.</p>
          <p>But real programs live in real files. Time to enter the second world. 💻</p>` },

        { t: 'idea', html: `<b>Two worlds, same Python:</b><br>🌐 <b>Playground</b> = "I am playing with code."<br>💻 <b>Real computer</b> = "I am actually creating software."` },

        {
          t: 'run', code: `print("Hello, World!")
print("I am learning Python!")`,
          html: `<p>First, try it here:</p>`
        },

        {
          t: 'real', title: 'Make it real', filename: 'hello.py',
          html: `<p>Now the same program, but for real. Open your editor, create a new file inside <code>PythonQuest\\Lessons</code>, and save it as <code>hello.py</code>.</p>`,
          code: `print("Hello, World!")
print("I am learning Python!")`,
          commands: `cd PythonQuest\\Lessons
python hello.py`
        },

        { t: 'text', html: `<p>If your screen shows this…</p>` },
        { t: 'code', caption: 'Terminal', code: `C:\\PythonQuest\\Lessons> python hello.py
Hello, World!
I am learning Python!` },
        { t: 'text', html: `<p style="font-size:1.4rem;text-align:center">🎉 <b>YOU ARE A PROGRAMMER.</b> 🎉</p>
          <p>You wrote a file. You told the computer to run it. The computer obeyed. That is the whole job!</p>` },

        { t: 'warn', title: 'If it does not work', html: `<ul>
          <li><code>python is not recognized</code> → Python is not installed yet, or the "Add to PATH" box was not ticked. Ask a grown-up to check the Grown-ups page.</li>
          <li><code>can't open file</code> → you are in the wrong folder. Use <code>dir</code> to check that <code>hello.py</code> is really there.</li>
        </ul>` },

        {
          t: 'mission', emoji: '📄', title: 'MISSION: hello.py lives!', xp: 100,
          html: `<p>Create <code>hello.py</code> on your real computer and run it from the terminal with <code>python hello.py</code>.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m7', emoji: '🐉', xp: 120,
      title: 'Make Your First Game Screen',
      goal: 'Build the title screen of your very own game.',
      blocks: [
        { t: 'text', html: `<p>Every great game starts with a great title screen. Yours starts <b>right now</b>.</p>` },

        {
          t: 'run', code: `print("*************************")
print("*     DRAGON QUEST      *")
print("*************************")
print()
print("Welcome, brave hero!")
print("Your adventure begins...")`,
          tasks: [
            'Change the title to <b>your</b> game name.',
            'Add your hero\'s name.',
            'Add a funny message.',
            'Add a dragon with emojis: <code>print("🐉🔥🗡️")</code>',
            'Make the stars ***** longer or shorter — can you make them line up perfectly?'
          ]
        },

        { t: 'fun', html: `An empty <code>print()</code> with nothing inside makes an <b>empty line</b>. Programmers use it to give the screen room to breathe.` },

        { t: 'brain', html: `Why do we use so many <code>print</code> lines instead of one? Because each <code>print</code> makes exactly <b>one line</b> on the screen. To draw a box, you draw it one line at a time — just like pixel art. 🎨` },

        {
          t: 'real', title: 'Your first game file', filename: 'my_game.py',
          html: `<p>Save your title screen as a real game file inside <code>PythonQuest\\Games</code>.</p>`,
          code: `print("*************************")
print("*     DRAGON QUEST      *")
print("*************************")
print()
print("Welcome, brave hero!")
print("Your adventure begins...")`,
          commands: `cd PythonQuest\\Games
python my_game.py`
        },

        {
          t: 'mission', emoji: '🎮', title: 'MISSION: Title screen', xp: 80,
          html: `<p>Design a title screen for a game that <b>you</b> invent. New name, new hero, new message. Show it to someone in your house.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's0m8', emoji: '🏆', xp: 150,
      title: 'BOSS BATTLE: The Lost Treasure',
      goal: 'Use everything you learned to find the treasure program.',
      blocks: [
        { t: 'text', html: `<p>🔥 <b>BOSS BATTLE!</b> 🔥</p>
          <p>Somewhere inside this computer there is a program called <code>treasure.py</code>. Nobody has run it in a hundred years.</p>
          <p>Your weapons: <code>dir</code>, <code>cd</code>, <code>cd ..</code>, and <code>python</code>.</p>` },

        {
          t: 'terminal',
          goal: `<p><b>🎯 Boss quest:</b> find <code>treasure.py</code> and run it with <code>python treasure.py</code>.</p>
                 <p>Hint: heroes usually keep treasure near their games…</p>`,
          winCommand: 'python treasure.py', xp: 150
        },

        { t: 'tip', title: 'Stuck?', html: `Type <code>dir</code> after <b>every</b> move. Real programmers look around constantly — they do not walk around blind.` },

        {
          t: 'quiz', q: 'What is the correct order to run a program in a folder?',
          options: [
            'python treasure.py, then cd Games',
            'cd into the folder, dir to check the file is there, then python treasure.py',
            'cls, then python',
            'You cannot run programs from the terminal'
          ],
          correct: 1,
          why: 'Go to the right place first — Python can only run a file that is in the folder you are standing in.'
        },

        {
          t: 'mission', emoji: '💻', title: 'MISSION: Real boss battle', xp: 100,
          html: `<p>On your real computer, put a file called <code>treasure.py</code> inside <code>PythonQuest\\Games</code> with this inside:</p>
            <pre style="font-family:var(--mono)">print("🗺️ You dig in the sand...")
print("💎 You found the treasure!")</pre>
            <p>Then run it from the real terminal. When it works — you have finished Stage 0! 🏅</p>`
        }
      ]
    }
  ]
});
