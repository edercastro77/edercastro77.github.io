/* STAGE 5 — INDEPENDENT GAME CREATOR */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's5',
  title: 'Independent Game Creator',
  emoji: '🚀',
  badge: 'Game Creator',
  subtitle: 'No more following instructions. This game is 100% yours.',
  goal: 'Design, build, test and release your own original video game.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's5m1', emoji: '💡', xp: 150,
      title: 'The Idea',
      goal: 'Find the game only YOU would make.',
      blocks: [
        { t: 'text', html: `<p>Everything changes now. Until this point, someone told you what to build.</p>
          <p>From here on, <b>you are the game designer</b>. Nobody knows what your game is — not even you, yet. Let's find it. 🔍</p>` },

        { t: 'idea', html: `A game idea is not "a cool world". It is <b>a thing the player DOES, over and over, that feels good</b>. Jumping. Dodging. Collecting. Building. Sneaking. Shooting.` },

        {
          t: 'code', caption: 'Idea starter kit — mix and match!', code: `WHAT YOU DO        WHERE               WHAT IS AFTER YOU
---------------    ----------------    ------------------
collect            a space station     a giant robot
dodge              a haunted school    zombies
race               a candy world       the police
sneak              a jungle            a hungry cat
build              the ocean floor     the clock
rescue             a pizza restaurant  your little brother`
        },

        { t: 'write', title: 'Idea 1', q: 'Write a game idea in ONE sentence: "You are a ___ who must ___ before ___."', placeholder: 'You are a...' },
        { t: 'write', title: 'Idea 2', q: 'Now a completely different one. Sillier. Weirder.', placeholder: 'You are a...' },
        { t: 'write', title: 'Idea 3', q: 'One more. This time, base it on something you love (a pet, a sport, a book, a joke).', placeholder: 'You are a...' },

        { t: 'brain', title: 'Pick one', html: `Read your three ideas out loud to somebody. Watch their face. The one that makes them smile is usually the one to build.` },

        { t: 'write', title: 'THE CHOSEN ONE', q: 'Which idea are you building? Why is it fun?', placeholder: 'I am building... It is fun because...' },

        { t: 'warn', title: 'Keep it small', html: `"An open world with 100 levels and multiplayer" will never be finished. "Catch falling donuts while a seagull chases you" <b>will</b> be finished — and finished games are the ones people play. 🍩` },

        {
          t: 'mission', emoji: '💡', title: 'MISSION: Choose your game', xp: 120,
          html: `<p>Fill in all four boxes above and tell somebody in your house what your game is, in one sentence.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m2', emoji: '📘', xp: 150,
      title: 'The Design Document',
      goal: 'Write the plan real studios write.',
      blocks: [
        { t: 'text', html: `<p>Every real game starts with a <b>Game Design Document</b> — the plan everybody on the team follows. Yours will be short, because your team is you. 😎</p>` },

        { t: 'write', title: '1. Name and hook', q: 'What is your game called, and what is it in one sentence?', placeholder: 'Name:\nHook:' },
        { t: 'write', title: '2. The player', q: 'Who do you control? What can they do? (move? jump? shoot? grab?)', placeholder: 'The player is...\nThey can...' },
        { t: 'write', title: '3. The goal', q: 'How does the player WIN? How do they LOSE?', placeholder: 'You win when...\nYou lose when...' },
        { t: 'write', title: '4. The world', q: 'Where does it happen? What does the screen look like? What colours?', placeholder: 'The world is...' },
        { t: 'write', title: '5. Enemies and obstacles', q: 'What gets in the way? How does it behave?', placeholder: 'The enemies...' },
        { t: 'write', title: '6. Items and rewards', q: 'What can the player collect? What does each item do?', placeholder: 'Items:' },
        { t: 'write', title: '7. Controls', q: 'Exactly which keys do what?', placeholder: 'Arrow keys: ...\nSpace: ...' },
        { t: 'write', title: '8. Levels', q: 'How does the game get harder?', placeholder: 'Level 1...\nLevel 2...' },

        { t: 'tip', title: 'This document will change', html: `And that is fine! Designers change the plan all the time when they discover what is actually fun. Come back and edit these boxes whenever you learn something.` },

        {
          t: 'mission', emoji: '📘', title: 'MISSION: Design document', xp: 130,
          html: `<p>Fill in all eight boxes. Then draw the screen of your game on real paper, with labels for everything.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m3', emoji: '🧪', xp: 180,
      title: 'The Prototype',
      goal: 'Build the ugliest possible version — that is playable.',
      blocks: [
        { t: 'text', html: `<p>A <b>prototype</b> is the fastest, ugliest version of your game that you can actually play.</p>
          <p>No graphics. No menus. No sound. Just: <i>does the main action feel fun?</i></p>` },

        { t: 'idea', html: `Professionals build prototypes with coloured squares. If a game is fun with squares, it will be amazing with art. If it is boring with squares, better art will <b>not</b> save it.` },

        {
          t: 'lab', title: 'Prototype starter — make it yours', w: 480, h: 320,
          code: `import gamelab
import random

gamelab.screen(480, 320)

# --- YOUR GAME VARIABLES ---
player_x = 240.0
player_y = 260.0
thing_x = random.randint(30, 450)
thing_y = -30.0
score = 0

def each_frame():
    global player_x, player_y, thing_x, thing_y, score

    # --- 1. LOOK (controls) ---
    if gamelab.key("left"):  player_x = player_x - 6
    if gamelab.key("right"): player_x = player_x + 6

    # --- 2. THINK (rules) ---
    thing_y = thing_y + 4
    if thing_y > 340:
        thing_y = -30
        thing_x = random.randint(30, 450)

    if gamelab.hit(player_x, player_y, 40, thing_x, thing_y, 30):
        score = score + 1
        gamelab.sound("coin")
        thing_y = -30
        thing_x = random.randint(30, 450)

    # --- 3. DRAW (just squares for now!) ---
    gamelab.clear("#101a2b")
    gamelab.rect(thing_x - 15, thing_y - 15, 30, 30, "#ffd54a")
    gamelab.rect(player_x - 20, player_y - 20, 40, 40, "#4ade80")
    gamelab.text("Score: " + str(score), 10, 10, 20, "white")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Replace the rules with YOUR game\'s main action.',
            'Change only what you must — keep it ugly on purpose!',
            'Play it for 30 seconds. Is it fun? Be honest.'
          ]
        },

        { t: 'write', title: 'Playtest notes', q: 'You played your prototype. Was the main action fun? What would make it better?', placeholder: 'It felt...' },

        {
          t: 'mission', emoji: '🧪', title: 'MISSION: Playable prototype', xp: 150,
          html: `<p>Build a version of YOUR game where the main action works. Squares are fine. It must be playable for 30 seconds without crashing.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m4', emoji: '🦸', xp: 160,
      title: 'Build the Player',
      goal: 'Make the hero feel good to control.',
      blocks: [
        { t: 'text', html: `<p>The number one thing players notice is <b>how the character feels</b>. Too slow = boring. Too fast = out of control.</p>
          <p>This is called <b>game feel</b>, and you tune it by playing and changing numbers, over and over.</p>` },

        {
          t: 'code', caption: 'Things you can tune', code: `speed        how fast it moves
size         how big it is
walls        can it leave the screen?
animation    does it change when moving?
sound        does it make a noise?
abilities    jump? dash? shoot? shield?`
        },

        {
          t: 'lab', title: 'Player with acceleration (feels amazing!)', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

x = 240.0
speed_x = 0.0

def each_frame():
    global x, speed_x

    # Instead of moving, we change the SPEED. Much smoother!
    if gamelab.key("left"):  speed_x = speed_x - 0.6
    if gamelab.key("right"): speed_x = speed_x + 0.6

    speed_x = speed_x * 0.92        # friction slows it down
    x = x + speed_x

    if x < 20:  x = 20;  speed_x = 0
    if x > 460: x = 460; speed_x = 0

    gamelab.clear("#101a2b")
    gamelab.rect(0, 250, 480, 50, "#1e3a2f")
    gamelab.sprite("🏄", x, 225, 48)
    gamelab.text("speed: " + str(round(speed_x, 1)), 10, 10, 16, "#9fb2cd")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change the friction 0.92 to 0.99 (ice!) and to 0.6 (glue!).',
            'Change the acceleration 0.6 to 2.0.',
            'Which version feels best for YOUR game? Use that one.'
          ]
        },

        { t: 'brain', html: `Mario's jump was tuned for <b>months</b>. The way a character moves is not a detail — it <i>is</i> the game.` },

        {
          t: 'mission', emoji: '🦸', title: 'MISSION: Your hero', xp: 130,
          html: `<p>Put your real player character into your game: the right sprite, the right speed, screen limits, and at least one special ability.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m5', emoji: '🌍', xp: 160,
      title: 'Build the World',
      goal: 'Turn a black rectangle into a place.',
      blocks: [
        { t: 'text', html: `<p>Your world is what the player sees for the whole game. Even a few shapes can create a <b>place</b>: a sky, a floor, a moon, some trees.</p>` },

        {
          t: 'lab', title: 'A world made of shapes', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

stars = []
for i in range(40):
    stars.append({"x": random.randint(0, 480), "y": random.randint(0, 180)})

cloud_x = 100.0

def each_frame():
    global cloud_x

    gamelab.clear("#0a0f2b")                       # night sky

    for star in stars:
        gamelab.circle(star["x"], star["y"], 1, "white")

    gamelab.circle(400, 60, 34, "#f5f3ce")         # moon
    gamelab.rect(0, 230, 480, 70, "#14261c")       # ground

    cloud_x = cloud_x + 0.4
    if cloud_x > 520: cloud_x = -60
    gamelab.sprite("☁️", cloud_x, 80, 40)

    gamelab.sprite("🌲", 60, 215, 44)
    gamelab.sprite("🌲", 130, 220, 34)
    gamelab.sprite("🏰", 380, 205, 60)
    gamelab.sprite("🧝", 240, 220, 40)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change it to daytime.',
            'Build YOUR world instead: space? underwater? a kitchen?',
            'Add something that moves in the background.'
          ]
        },

        { t: 'tip', title: 'Depth trick', html: `Draw the far-away things <b>first</b> and the close things <b>last</b>. Whatever you draw last sits on top. That is how games fake 3D depth. 🎭` },

        {
          t: 'mission', emoji: '🌍', title: 'MISSION: Your world', xp: 130,
          html: `<p>Build the background of your game: at least 5 drawn elements, a colour scheme that fits the theme, and one moving background detail.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m6', emoji: '😈', xp: 170,
      title: 'Build the Enemies',
      goal: 'Create the trouble that makes your game a game.',
      blocks: [
        { t: 'text', html: `<p>Without a problem, there is no game. Enemies (or obstacles, or a timer) are the problem.</p>` },

        {
          t: 'code', caption: 'Classic enemy behaviours', code: `PATROL     walks back and forth
CHASER     moves toward the player
SHOOTER    stays put, fires at you
FALLER     drops from the top
RANDOM     moves unpredictably
SPAWNER    creates more enemies!`
        },

        {
          t: 'lab', title: 'Three enemies, three brains', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

player_x = 240.0

patrol = {"x": 100.0, "y": 80.0, "dir": 2.5}
chaser = {"x": 400.0, "y": 150.0}
faller = {"x": 240.0, "y": -30.0}

def each_frame():
    global player_x

    if gamelab.key("left"):  player_x = player_x - 6
    if gamelab.key("right"): player_x = player_x + 6

    # PATROL
    patrol["x"] = patrol["x"] + patrol["dir"]
    if patrol["x"] > 440 or patrol["x"] < 40:
        patrol["dir"] = -patrol["dir"]

    # CHASER
    if chaser["x"] < player_x: chaser["x"] = chaser["x"] + 1.5
    if chaser["x"] > player_x: chaser["x"] = chaser["x"] - 1.5
    if chaser["y"] < 250: chaser["y"] = chaser["y"] + 0.4

    # FALLER
    faller["y"] = faller["y"] + 5
    if faller["y"] > 320:
        faller["y"] = -30
        faller["x"] = random.randint(30, 450)

    gamelab.clear("#101a2b")
    gamelab.sprite("👾", patrol["x"], patrol["y"], 36)
    gamelab.sprite("👹", chaser["x"], chaser["y"], 36)
    gamelab.sprite("🪨", faller["x"], faller["y"], 32)
    gamelab.sprite("🧑‍🚀", player_x, 270, 44)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Pick the behaviour that fits YOUR game and delete the others.',
            'Make one of them hurt the player using <code>gamelab.hit</code>.',
            'Add more of your chosen enemy using a list and a loop.'
          ]
        },

        {
          t: 'mission', emoji: '😈', title: 'MISSION: Your enemies', xp: 140,
          html: `<p>Add your real enemies to your game: at least 2 of them, with a behaviour that fits your story, and a consequence when they touch the player.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m7', emoji: '🎁', xp: 160,
      title: 'Rewards, Score and Levels',
      goal: 'Give the player reasons to keep playing.',
      blocks: [
        { t: 'text', html: `<p>Why does anyone play "one more time"? Because the game keeps <b>rewarding</b> them: points, new items, new levels, new records.</p>` },

        { t: 'idea', html: `The reward loop: <b>do something risky → get a reward → want a bigger reward</b>. That loop is the engine of every game ever made. ⚙️` },

        { t: 'write', title: 'Your reward plan', q: 'What does the player earn, and what do they spend it on? How does your game get harder?', placeholder: 'The player collects...\nThe game gets harder by...' },

        {
          t: 'lab', title: 'Score, combo and level-up', w: 480, h: 320,
          code: `import gamelab
import random

gamelab.screen(480, 320)

x = 240.0
score = 0
combo = 0
level = 1
message = ""
message_timer = 0
speed = 4.0
item_x = random.randint(30, 450)
item_y = -30.0

def each_frame():
    global x, score, combo, level, message, message_timer, speed, item_x, item_y

    if gamelab.key("left"):  x = x - 7
    if gamelab.key("right"): x = x + 7
    if x < 20: x = 20
    if x > 460: x = 460

    item_y = item_y + speed
    if item_y > 340:
        item_y = -30
        item_x = random.randint(30, 450)
        combo = 0                       # missed it! combo lost

    if gamelab.hit(x, 270, 40, item_x, item_y, 30):
        combo = combo + 1
        score = score + 10 * combo      # combo multiplier!
        gamelab.sound("coin")
        item_y = -30
        item_x = random.randint(30, 450)
        if score > level * 200:
            level = level + 1
            speed = speed + 1.5
            message = "LEVEL " + str(level) + "!"
            message_timer = 60
            gamelab.sound("win")

    if message_timer > 0:
        message_timer = message_timer - 1
    else:
        message = ""

    gamelab.clear("#101a2b")
    gamelab.sprite("🍩", item_x, item_y, 30)
    gamelab.sprite("😋", x, 270, 44)
    gamelab.text("Score: " + str(score), 10, 10, 20, "#ffd54a")
    gamelab.text("Combo x" + str(combo), 10, 36, 16, "#4ade80")
    gamelab.text("Level " + str(level), 380, 10, 20, "#59b0ff")
    if message != "":
        gamelab.text(message, 160, 140, 34, "#ffd54a")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change the combo rule: maybe x2 every 3 catches?',
            'Add a reward for reaching level 5.',
            'Add a high score that stays on the screen after losing.'
          ]
        },

        {
          t: 'mission', emoji: '🎁', title: 'MISSION: Reward loop', xp: 130,
          html: `<p>Add a score, at least one bonus reward, and a difficulty that grows, to <b>your</b> game.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m8', emoji: '🔍', xp: 170,
      title: 'Testing and Bug Hunting',
      goal: 'Break your own game before anyone else does.',
      blocks: [
        { t: 'text', html: `<p>Now you become a <b>tester</b>: someone whose job is to break the game on purpose. It is the most fun job in the studio. 🔨</p>` },

        {
          t: 'code', caption: 'The tester\'s evil checklist', code: `[ ] Press ALL the keys at once
[ ] Walk into every wall and corner
[ ] Do nothing at all for 30 seconds
[ ] Try to leave the screen
[ ] Collect everything super fast
[ ] Lose on purpose
[ ] Win on purpose
[ ] Restart 5 times in a row
[ ] Let somebody else play WITHOUT explaining anything`
        },

        { t: 'idea', html: `The most powerful test of all: <b>watch somebody else play and say nothing</b>. Every time they look confused, you found a problem. Do not defend your game — just write it down. ✍️` },

        { t: 'write', title: 'Bug list', q: 'What broke? Write every bug you found, one per line.', placeholder: '1. The player can walk through the wall on the left\n2. ...' },
        { t: 'write', title: 'Playtester notes', q: 'Somebody else played your game. What confused them? What did they enjoy?', placeholder: 'They got confused when...\nThey laughed when...' },

        {
          t: 'code', caption: 'The four questions to ask your tester', code: `1. What did you think you were supposed to do?
2. What was confusing?
3. What was too easy or too hard?
4. What would make it more fun?`
        },

        { t: 'tip', title: 'Debugging trick', html: `When something is wrong, add <code>print(...)</code> lines to see what the numbers are really doing. Half of all bugs are found by printing a variable and going "…wait, WHY is it 0?" 🕵️` },

        {
          t: 'mission', emoji: '🔍', title: 'MISSION: Test and fix', xp: 150,
          html: `<p>Run the whole evil checklist on your game, write down every bug, and fix at least three of them. Then have somebody else play it.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m9', emoji: '🎬', xp: 180,
      title: 'Menus, Instructions and Polish',
      goal: 'Wrap your game so it looks finished.',
      blocks: [
        { t: 'text', html: `<p>A finished game is not just the gameplay. It is everything <b>around</b> it: the title, the instructions, the endings.</p>` },

        {
          t: 'code', caption: 'The complete game package', code: `TITLE SCREEN  -> game name + "press SPACE"
INSTRUCTIONS  -> which keys, what the goal is
THE GAME      -> the fun part
PAUSE         -> because life happens
GAME OVER     -> score + "press R to retry"
VICTORY       -> celebration! sound! confetti!
CREDITS       -> "A game by YOUR NAME" 😎`
        },

        {
          t: 'lab', title: 'The full wrapper (steal this structure!)', w: 480, h: 320,
          code: `import gamelab

gamelab.screen(480, 320)

state = "TITLE"
score = 0
x = 240.0

def each_frame():
    global state, score, x

    gamelab.clear("#101a2b")

    if state == "TITLE":
        gamelab.text("🍩 DONUT DASH 🍩", 105, 90, 32, "#ffd54a")
        gamelab.text("A game by YOUR NAME", 140, 140, 16, "#9fb2cd")
        gamelab.text("Press SPACE to start", 140, 200, 20, "#4ade80")
        gamelab.text("Press I for instructions", 135, 235, 16, "#59b0ff")
        if gamelab.key("space"):
            score = 0
            state = "PLAYING"
        if gamelab.key("i"):
            state = "INSTRUCTIONS"

    elif state == "INSTRUCTIONS":
        gamelab.text("HOW TO PLAY", 150, 60, 28, "#59b0ff")
        gamelab.text("← →  move", 150, 130, 20, "white")
        gamelab.text("Catch donuts, avoid broccoli", 90, 165, 18, "white")
        gamelab.text("3 misses and you lose!", 130, 200, 18, "white")
        gamelab.text("Press B to go back", 150, 260, 16, "#9fb2cd")
        if gamelab.key("b"):
            state = "TITLE"

    elif state == "PLAYING":
        if gamelab.key("left"):  x = x - 6
        if gamelab.key("right"): x = x + 6
        score = score + 1
        gamelab.text("Score: " + str(score), 10, 10, 20, "#ffd54a")
        gamelab.text("P = pause    W = win    L = lose", 10, 296, 14, "#9fb2cd")
        gamelab.sprite("😋", x, 250, 44)
        if gamelab.key("p"): state = "PAUSED"
        if gamelab.key("w"): state = "VICTORY"
        if gamelab.key("l"): state = "GAME_OVER"

    elif state == "PAUSED":
        gamelab.text("⏸️ PAUSED", 155, 130, 34, "white")
        gamelab.text("Press C to continue", 145, 190, 16, "#9fb2cd")
        if gamelab.key("c"): state = "PLAYING"

    elif state == "GAME_OVER":
        gamelab.text("💀 GAME OVER", 120, 120, 34, "#ff6b6b")
        gamelab.text("Score: " + str(score), 180, 170, 20, "white")
        gamelab.text("Press R to retry", 160, 215, 16, "#9fb2cd")
        if gamelab.key("r"): state = "TITLE"

    elif state == "VICTORY":
        gamelab.text("🏆 YOU WIN! 🏆", 120, 120, 34, "#4ade80")
        gamelab.text("Score: " + str(score), 180, 170, 20, "white")
        gamelab.text("Press R for the menu", 140, 215, 16, "#9fb2cd")
        if gamelab.key("r"): state = "TITLE"

gamelab.on_frame(each_frame)`,
          tasks: [
            'Replace everything with YOUR game name, story and keys.',
            'Add a credits screen with your name.',
            'Add a sound when the player wins.'
          ]
        },

        {
          t: 'mission', emoji: '🎬', title: 'MISSION: Wrap it up', xp: 150,
          html: `<p>Your game must now have: a title screen, instructions, a pause, a game-over screen, a victory screen and your name in the credits.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's5m10', emoji: '🏆', xp: 400,
      title: 'RELEASE: My First Real Video Game',
      goal: 'Finish it. Share it. Celebrate.',
      blocks: [
        { t: 'text', html: `<p style="font-size:1.3rem">🎉 <b>This is it. The final mission of the whole quest.</b> 🎉</p>
          <p>You are going to <b>release</b> your game: finish it, put it on your real computer, and let other people play it.</p>` },

        {
          t: 'code', caption: 'Release checklist', code: `[ ] The game has a name
[ ] Title screen
[ ] Instructions
[ ] The game works from start to finish
[ ] You can win
[ ] You can lose
[ ] Score or goal is clear
[ ] Sounds for the important moments
[ ] Restart without reloading
[ ] Your name in the credits
[ ] No crashes (you tested it!)
[ ] At least one person who is not you has played it`
        },

        {
          t: 'real', title: 'Put your game on your real computer', filename: 'my_game.py',
          html: `<p>Game Lab lives in the browser, but your real game should live on your computer with <b>Pygame</b>. Here is the same structure you already know, translated:</p>`,
          code: `import pygame
import random

pygame.init()
screen = pygame.display.set_mode((480, 320))
pygame.display.set_caption("MY GAME")
clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 32)

player_x = 240
score = 0
running = True

while running:
    # 1. LOOK
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player_x -= 6
    if keys[pygame.K_RIGHT]: player_x += 6

    # 2. THINK
    if player_x < 20:  player_x = 20
    if player_x > 460: player_x = 460

    # 3. DRAW
    screen.fill((16, 26, 43))
    pygame.draw.rect(screen, (74, 222, 128), (player_x - 20, 260, 40, 40))
    text = font.render("Score: " + str(score), True, (255, 213, 74))
    screen.blit(text, (10, 10))

    pygame.display.flip()
    clock.tick(60)      # 60 frames per second

pygame.quit()`,
          commands: `pip install pygame
cd PythonQuest\\Games
python my_game.py`
        },

        { t: 'tip', title: 'Translating Game Lab → Pygame', html: `<table class="simple">
          <tr><th>Game Lab</th><th>Pygame</th></tr>
          <tr><td>gamelab.screen(w, h)</td><td>pygame.display.set_mode((w, h))</td></tr>
          <tr><td>gamelab.clear(color)</td><td>screen.fill((r, g, b))</td></tr>
          <tr><td>gamelab.rect(...)</td><td>pygame.draw.rect(...)</td></tr>
          <tr><td>gamelab.key("left")</td><td>keys[pygame.K_LEFT]</td></tr>
          <tr><td>gamelab.on_frame(f)</td><td>while running:</td></tr>
        </table>
        The ideas are identical — only the spelling changes. That is what learning a second tool always feels like. 🧠` },

        { t: 'write', title: 'Your credits', q: 'Write the credits screen for your game.', placeholder: 'MY GAME\nDesigned and programmed by...\nThank you for playing!' },

        { t: 'idea', html: `<b>Ship it.</b> Not perfect. Not finished-forever. Just <b>done enough to be played</b>. Every developer on Earth releases something they still wanted to improve.` },

        {
          t: 'mission', emoji: '🏆', title: 'FINAL MISSION: Release your game', xp: 300,
          html: `<p>Tick every box on the release checklist, then do the most important step: <b>let somebody play it while you watch</b>.</p>
            <p>When they smile — you are finished. 🎮</p>`
        },

        {
          t: 'mission', emoji: '🐍', title: '🏅 FINAL ACHIEVEMENT: Python Game Developer', xp: 200,
          html: `<p style="font-size:1.2rem"><b>YOU BUILT YOUR OWN GAME.</b></p>
            <p>A year ago the computer was a machine you clicked. Now it is a machine that does what <b>you</b> tell it to do.</p>
            <p>You can explain what programming is. You can write Python. You can read an error and fix it. You can design, build, test and release a video game.</p>
            <p>Most importantly, you now know something that most people never learn:</p>
            <p style="font-size:1.3rem;text-align:center">🐍 <b>"I can make things with code."</b> 🐍</p>
            <p class="muted">Press the button to claim your final badge, hero.</p>`
        }
      ]
    }
  ]
});
