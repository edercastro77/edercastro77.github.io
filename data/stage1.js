/* STAGE 1 — PYTHON EXPLORER */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's1',
  title: 'Python Explorer',
  emoji: '🧭',
  badge: 'Python Explorer',
  subtitle: 'The building blocks: words, boxes, numbers, questions and choices.',
  goal: 'Learn the basic pieces of Python — always by making a piece of a game.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's1m1', emoji: '🗣️', xp: 100,
      title: 'print — Making the Computer Talk',
      goal: 'Control exactly what appears on the screen.',
      blocks: [
        { t: 'text', html: `<p>You already met <code>print</code>. Now let's become a master of it, because <b>everything your player sees in a text game comes from print</b>.</p>` },

        {
          t: 'run', code: `print("You wake up in a dark cave.")
print("A torch flickers on the wall.")
print("Two tunnels go deeper: LEFT and RIGHT.")`,
          tasks: ['Write 3 more lines of your own story.', 'Add emojis to make it come alive: 🕯️🦇🕸️']
        },

        { t: 'idea', html: `<code>print</code> can show more than one thing if you separate them with a <b>comma</b>. Python adds a space between them automatically.` },

        {
          t: 'run', code: `print("Level:", 5)
print("Hero:", "Alex", "the Brave")
print("HP:", 100, "/", 100)`,
          tasks: ['Print your own hero name and level.']
        },

        {
          t: 'predict', q: `What will this print? A dragon on one line, or on two lines?`,
          code: `print("🐉")
print("🔥")`
        },

        { t: 'tip', title: 'Comments', html: `Anything after a <code>#</code> is a <b>note for humans</b>. Python ignores it completely. Use notes to remind yourself what your code does.` },

        {
          t: 'run', code: `# This is my game intro
print("GAME START")   # Python ignores everything after the #
# print("This line is switched off!")`,
          tasks: ['Remove the <code>#</code> from the last line and run again. What happens?']
        },

        {
          t: 'quiz', q: 'How many lines will appear on screen?  print("a")  print("b")  print()  print("c")',
          options: ['3 lines', '4 lines (one of them empty)', '1 long line', 'None'],
          correct: 1,
          why: 'Every print makes one line — even an empty print() makes an empty line.'
        },

        {
          t: 'mission', emoji: '📜', title: 'MISSION: Story intro', xp: 60,
          html: `<p>Write the opening of a game: at least 5 print lines, one empty line for style, and at least one comment.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m2', emoji: '📦', xp: 120,
      title: 'Variables — Boxes That Remember',
      goal: 'Store your hero, your health and your coins.',
      blocks: [
        { t: 'text', html: `<p>A game has to <b>remember</b> things: your name, your health, your score.</p>
          <p>In Python we remember things in <b>variables</b>. A variable is a labelled box.</p>` },

        { t: 'idea', html: `<code>health = 100</code> means: <i>"Make a box called <b>health</b> and put <b>100</b> in it."</i><br>The <code>=</code> is not "equals" — it means <b>"put this in the box"</b>.` },

        {
          t: 'run', code: `player_name = "Alex"
health = 100
coins = 0

print("Name:", player_name)
print("Health:", health)
print("Coins:", coins)`,
          tasks: [
            'Change the name to your own hero.',
            'Give your hero 250 health.',
            'Add a new box called <code>level</code> and print it too.'
          ]
        },

        { t: 'warn', title: 'Naming rules', html: `<ul>
          <li>No spaces: use <code>player_name</code>, not <code>player name</code></li>
          <li>Never start with a number: <code>2fast</code> ❌, <code>fast2</code> ✅</li>
          <li>Python is picky: <code>Health</code> and <code>health</code> are two <b>different</b> boxes!</li>
        </ul>` },

        { t: 'brain', html: `The box can change! That is why it is called a <b>vari</b>able — it <b>varies</b>.` },

        {
          t: 'predict', q: `The dragon hits you twice. What health will be printed at the end?`,
          code: `health = 100
health = health - 30
health = health - 30

print("Health:", health)`,
          tasks: ['Add a third hit. Can you make the health reach exactly 0?']
        },

        { t: 'tip', html: `Read <code>health = health - 30</code> like this: <i>"take what is in the health box, remove 30, and put the answer back in the box."</i>` },

        {
          t: 'fix', goal: 'Python does not know one of these names. Run it, read the error, and fix the spelling.',
          code: `coins = 10
print("You have", coin, "coins")`
        },

        {
          t: 'quiz', q: 'After  score = 5   score = 20   what is inside score?',
          options: ['5', '25', '20', 'Both 5 and 20'],
          correct: 2,
          why: 'A box only holds one thing. Putting 20 in replaces the 5.'
        },

        {
          t: 'mission', emoji: '🧙', title: 'MISSION: Character sheet', xp: 80,
          html: `<p>Create a hero with at least 5 variables (name, health, coins, level, weapon) and print a nice character sheet with lines and stars around it.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m3', emoji: '🔢', xp: 120,
      title: 'Numbers and Maths',
      goal: 'Build a scoring system.',
      blocks: [
        { t: 'text', html: `<p>Games are secretly <b>full of maths</b>: damage, score, speed, coins, time. Luckily Python is a fantastic calculator.</p>` },

        {
          t: 'code', caption: 'The four magic symbols', code: `+   add          10 + 5   ->  15
-   subtract     10 - 5   ->  5
*   multiply     10 * 5   ->  50
/   divide       10 / 5   ->  2.0`
        },

        {
          t: 'run', code: `coins = 10
coins = coins + 5
print("You picked up 5 coins! Total:", coins)

coins = coins * 2
print("DOUBLE COINS EVENT! Total:", coins)`,
          tasks: ['Add a shop: subtract 12 coins for a sword.', 'Can you make the coins go below zero? Should a game allow that? 🤔']
        },

        { t: 'idea', html: `<code>score = score + 10</code> is so common that Python has a shortcut: <code>score += 10</code>. They do exactly the same thing.` },

        {
          t: 'run', code: `score = 0

score += 100    # killed a slime
score += 250    # found a chest
score -= 50     # fell in a trap

print("FINAL SCORE:", score)`,
          tasks: ['Add three more events of your own.', 'Try <code>score *= 2</code> for a bonus level.']
        },

        {
          t: 'predict', q: `Three coins are worth 7, 12 and 5. What will the total be?`,
          code: `coin1 = 7
coin2 = 12
coin3 = 5

total = coin1 + coin2 + coin3
print("You collected", total, "gold!")`
        },

        { t: 'fun', html: `Notice that <code>10 / 5</code> gives <code>2.0</code>, not <code>2</code>. Division always makes a <b>decimal</b> number. If you want a whole number, use <code>//</code> — try <code>print(10 // 3)</code>!` },

        {
          t: 'quiz', q: 'health = 100 ... health = health - 25 ... health = health - 25 ... What is health?',
          options: ['100', '75', '50', '25'],
          correct: 2,
          why: '100 - 25 = 75, then 75 - 25 = 50. Each line updates the box.'
        },

        {
          t: 'mission', emoji: '💰', title: 'MISSION: Damage calculator', xp: 80,
          html: `<p>Make a program where a hero with 100 HP is attacked 3 times by different monsters (different damage each), and prints the health after every hit.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m4', emoji: '✏️', xp: 120,
      title: 'Strings — Playing With Words',
      goal: 'Build messages that use your hero\'s name.',
      blocks: [
        { t: 'text', html: `<p>Text in programming has a funny name: a <b>string</b>. Imagine letters threaded on a string, like beads. 📿</p>
          <p>Anything inside quotes is a string: <code>"dragon"</code>, <code>"100"</code>, <code>"🐉"</code>.</p>` },

        {
          t: 'run', code: `name = "Alex"

print("Welcome " + name + "!")
print("Good luck, " + name + ". The dragon is hungry.")`,
          tasks: ['Change the name.', 'Notice the space inside <code>"Welcome "</code> — delete it and see what breaks!']
        },

        { t: 'warn', title: 'The classic beginner bug', html: `<code>+</code> glues strings together, but you <b>cannot</b> glue a string and a number. <code>"Score: " + 10</code> explodes 💥. Use a comma instead: <code>print("Score:", 10)</code>.` },

        {
          t: 'fix', goal: 'This code has the classic bug. Run it, read the message, then fix it (hint: use a comma).',
          code: `coins = 25
print("You have " + coins + " coins")`
        },

        { t: 'idea', html: `<b>f-strings</b> are the cool way to mix words and boxes. Put <code>f</code> before the quotes, and put variables inside <code>{ }</code>.` },

        {
          t: 'run', code: `name = "Alex"
health = 80
coins = 25

print(f"{name} has {health} HP and {coins} coins.")
print(f"If {name} finds 5 more coins: {coins + 5}")`,
          tasks: ['Rewrite it with your own hero.', 'Make a line that says how much health is missing (100 - health).']
        },

        {
          t: 'code', caption: 'Useful string tricks', code: `name = "alex"

print(name.upper())      # ALEX
print(name.lower())      # alex
print(len(name))         # 4  (how many letters)
print("🔥" * 10)         # 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥`
        },

        {
          t: 'run', code: `hero = "alex"
print("A NEW CHALLENGER:", hero.upper())
print("=" * 30)
print("🔥" * 8)`,
          tasks: ['Use <code>*</code> to draw a border for your title screen.']
        },

        {
          t: 'quiz', q: 'Which one shows:  Hello Alex!',
          options: ['print("Hello" + name + "!")', 'print(f"Hello {name}!")', 'print("Hello name!")', 'print(Hello, name)'],
          correct: 1,
          why: 'The f-string puts the value of the box inside the sentence. (The first option works too but forgets the space!)'
        },

        {
          t: 'mission', emoji: '📢', title: 'MISSION: Hero announcement', xp: 80,
          html: `<p>Write a dramatic announcement for your hero using an f-string, an <code>.upper()</code>, and a border made with <code>"=" * 30</code>.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m5', emoji: '⌨️', xp: 130,
      title: 'input — Talking Back',
      goal: 'Let the player type things into your game.',
      blocks: [
        { t: 'text', html: `<p>Right now your programs talk <b>to</b> the player. Time to let the player answer!</p>
          <p>The magic word is <code>input</code>.</p>` },

        { t: 'idea', html: `<code>name = input("What is your name? ")</code> means: <i>"Ask the question, wait for the player to type, and put the answer in the box called name."</i>` },

        { t: 'tip', title: 'How it works here', html: `When your program asks a question, a little pop-up appears. If your browser does not allow pop-ups, just type your answers in the <b>✍️ Answers</b> box below the code — one answer per line. On your real computer, the player types straight into the terminal.` },

        {
          t: 'run', code: `name = input("What is your name, hero? ")

print("Welcome,", name)
print("Your adventure begins!")`,
          tasks: ['Add a second question: favourite colour.', 'Use the answer in a sentence.']
        },

        {
          t: 'run', code: `print("=== CHARACTER CREATION ===")

name = input("Hero name: ")
color = input("Favourite colour: ")
animal = input("Favourite animal: ")

print()
print("YOUR HERO IS READY!")
print(f"{name} the {color} {animal}!")
print(f"{name} rides into battle... 🐉")`,
          tasks: [
            'Add a question about a weapon and use it in the story.',
            'Make the hero name appear in CAPITALS with <code>.upper()</code>.'
          ]
        },

        { t: 'warn', title: 'Very important', html: `<code>input</code> <b>always</b> gives you a <b>string</b>, even if the player types <code>7</code>. To do maths with it you must convert it: <code>age = int(input("Your age? "))</code>.` },

        {
          t: 'run', code: `number = int(input("Pick a number: "))
print("Your number doubled is:", number * 2)`,
          tasks: ['Remove the <code>int(</code> and <code>)</code> and run it again. Read the bug — it is a famous one!']
        },

        {
          t: 'quiz', q: 'The player types 5 into  age = input("Age? ")  — what is really inside age?',
          options: ['The number 5', 'The text "5"', 'Nothing', 'An error'],
          correct: 1,
          why: 'input always gives text. Use int() when you need to do maths with it.'
        },

        {
          t: 'mission', emoji: '🧝', title: 'MISSION: Character creator', xp: 100,
          html: `<p>Build a character creation screen that asks for a name, a colour, an animal and a favourite game — then prints an epic hero description using all four answers.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m6', emoji: '🔀', xp: 140,
      title: 'if / else — Making Choices',
      goal: 'Build a story where the player\'s choice matters.',
      blocks: [
        { t: 'text', html: `<p>This is the moment your programs become <b>games</b>.</p>
          <p>Until now, your code always did the same thing. With <code>if</code>, the computer can <b>decide</b>.</p>` },

        { t: 'idea', html: `<code>if</code> means <i>"only do this when something is true"</i>.<br><code>else</code> means <i>"otherwise, do this other thing"</i>.` },

        {
          t: 'code', caption: 'The shape of an if', code: `if something_is_true:
    do this          <-- 4 spaces = "inside the if"
else:
    do that instead`
        },

        { t: 'warn', title: 'Two things Python is fussy about', html: `<ol>
          <li>The <b>colon</b> <code>:</code> at the end of the if line.</li>
          <li>The <b>4 spaces</b> on the next line. Those spaces are how Python knows what is inside.</li>
        </ol>` },

        {
          t: 'run', code: `choice = input("Do you go LEFT or RIGHT? ")

if choice == "LEFT":
    print("💎 You found a treasure chest!")
else:
    print("🐉 A dragon found YOU!")`,
          tasks: [
            'Try both answers.',
            'Type <code>left</code> in lowercase. What happens? Why?',
            'Fix it so lowercase works too: <code>if choice.upper() == "LEFT":</code>'
          ]
        },

        { t: 'idea', html: `Notice the <b>double</b> equals <code>==</code>. One <code>=</code> means "put it in the box". Two <code>==</code> asks <i>"are these the same?"</i>` },

        { t: 'text', html: `<p>Need more than two paths? Use <code>elif</code> (short for "else if"). You can have as many as you want.</p>` },

        {
          t: 'run', code: `door = input("Choose a door: RED, BLUE or GREEN? ").upper()

if door == "RED":
    print("🔥 The room is on fire! You run out. -20 HP")
elif door == "BLUE":
    print("💧 A water slide! Wheee! You find 30 coins.")
elif door == "GREEN":
    print("🐉 The dragon's bedroom. Shhh...")
else:
    print("🚪 That door does not exist. You stand in the hallway, confused.")`,
          tasks: [
            'Add a YELLOW door with your own surprise.',
            'Make one of the doors lead to a victory!'
          ]
        },

        {
          t: 'fix', goal: 'Two things are missing here: a colon and some spaces. Run it, read the error, and repair it.',
          code: `health = 10

if health < 20
print("⚠️ Warning: low health!")`
        },

        {
          t: 'quiz', q: 'What is the difference between = and == ?',
          options: [
            'Nothing, they are the same',
            '= puts a value in a box, == asks if two things are equal',
            '== puts a value in a box, = asks a question',
            '== is only for numbers'
          ],
          correct: 1,
          why: 'One equals stores. Two equals compares. Mixing them up is the most common bug in the world!'
        },

        {
          t: 'mission', emoji: '🗺️', title: 'MISSION: Choose your path', xp: 100,
          html: `<p>Write an adventure with <b>three</b> different choices, each with a different ending. At least one ending must be a victory and one must be a disaster. 🐉</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m7', emoji: '⚖️', xp: 130,
      title: 'Comparisons — Health Bars and Game Over',
      goal: 'Make the game react to how much health you have left.',
      blocks: [
        { t: 'text', html: `<p>Games constantly ask questions: <i>Is my health zero? Do I have enough coins? Is the score higher than the record?</i></p>
          <p>Here are the question marks of Python:</p>` },

        {
          t: 'code', caption: 'Comparison signs', code: `==   is the same as        health == 0
!=   is NOT the same as    name != "boss"
>    is bigger than        score > 100
<    is smaller than       health < 20
>=   bigger or equal       coins >= 50
<=   smaller or equal      health <= 0`
        },

        {
          t: 'run', code: `health = 15

if health <= 0:
    print("💀 GAME OVER")
elif health < 20:
    print("❤️ DANGER! Health is very low:", health)
elif health < 60:
    print("🧡 You are hurt. Health:", health)
else:
    print("💚 You feel great! Health:", health)`,
          tasks: [
            'Change health to 0, then 50, then 95. Run it each time.',
            'Add a message for health above 100: "OVERCHARGED!"'
          ]
        },

        { t: 'brain', html: `Python checks the branches <b>in order</b> and stops at the first one that is true. That is why <code>&lt;= 0</code> must come <b>before</b> <code>&lt; 20</code>. Order matters!` },

        { t: 'idea', html: `Join two questions with <code>and</code> (both must be true) or <code>or</code> (at least one must be true).` },

        {
          t: 'run', code: `coins = 60
has_key = True

if coins >= 50 and has_key:
    print("🚪 The secret door opens!")
else:
    print("🔒 You need 50 coins AND the key.")`,
          tasks: [
            'Set <code>has_key = False</code> and run again.',
            'Change <code>and</code> to <code>or</code>. What changes?'
          ]
        },

        { t: 'fun', html: `<code>True</code> and <code>False</code> are special Python words for yes and no. They always start with a CAPITAL letter, and they never go in quotes.` },

        {
          t: 'quiz', q: 'Your health is 20. Which one is True?',
          options: ['health < 20', 'health <= 20', 'health > 20', 'health != 20'],
          correct: 1,
          why: '<= means "smaller OR equal". 20 is equal to 20, so it is True.'
        },

        {
          t: 'mission', emoji: '❤️', title: 'MISSION: Health system', xp: 100,
          html: `<p>Ask the player for their health with <code>int(input(...))</code>, then print a different message for at least 4 different health ranges, including Game Over.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's1m8', emoji: '💎', xp: 200,
      title: 'MINI GAME #1: Treasure Hunt',
      goal: 'Put everything together into a real playable game.',
      blocks: [
        { t: 'text', html: `<p>🎉 <b>Boss level!</b> You now know enough Python to make a real game.</p>
          <p>Here is a complete Treasure Hunt. Read it, run it, then <b>make it yours</b>.</p>` },

        {
          t: 'run', code: `print("=" * 34)
print("       💎 TREASURE HUNT 💎")
print("=" * 34)

name = input("What is your name, hero? ")
health = 100
coins = 0

print(f"\\nWelcome {name}! You have {health} HP.")
print("You stand at a fork in the cave.")

path = input("Do you go LEFT or RIGHT? ").upper()

if path == "LEFT":
    print("🕯️ You find a dusty room with a chest!")
    coins = coins + 50
    print(f"💰 +50 coins! You now have {coins}.")
else:
    print("🕸️ You walk into a giant spider web!")
    health = health - 30
    print(f"💔 -30 HP! You now have {health} HP.")

print("\\nSuddenly, a goblin jumps out! 👹")
action = input("Do you FIGHT or RUN? ").upper()

if action == "FIGHT":
    print("⚔️ You swing your sword!")
    health = health - 40
    coins = coins + 100
    print(f"You win the fight! -40 HP, +100 coins.")
else:
    print("🏃 You run away safely, but drop 20 coins.")
    coins = coins - 20

print("\\n" + "=" * 34)
print(f"Hero: {name}")
print(f"Health: {health}")
print(f"Coins: {coins}")

if health <= 0:
    print("💀 GAME OVER — you did not survive.")
elif coins >= 100:
    print("🏆 VICTORY! You are rich and alive!")
else:
    print("🙂 You survived, but the treasure is still out there...")
print("=" * 34)`,
          tasks: [
            'Change the story, the monsters and the numbers.',
            'Add a THIRD choice at the fork (like a hidden tunnel).',
            'Add a potion that gives back 25 HP.',
            'Make the goblin stronger — is the game still winnable?'
          ]
        },

        { t: 'tip', title: 'What is \\n ?', html: `<code>\\n</code> inside a string means "start a new line here". It is a quick way to add space without an extra print.` },

        {
          t: 'real', title: 'Your first real game', filename: 'treasure_hunt.py',
          html: `<p>Copy <b>your</b> version (the one you changed!) into a real file and play it in the terminal. Then challenge somebody at home to beat it.</p>`,
          code: `# Paste your own Treasure Hunt here!
print("💎 TREASURE HUNT 💎")`,
          commands: `cd PythonQuest\\Games
python treasure_hunt.py`
        },

        {
          t: 'mission', emoji: '🏆', title: 'BOSS MISSION: Ship your game', xp: 150,
          html: `<p>Your Treasure Hunt must have: a name question, a choice, a health change, a coin change, and 3 different endings.</p>
            <p>When somebody else has played it — you have earned the <b>Python Explorer</b> badge! 🏅</p>`
        }
      ]
    }
  ]
});
