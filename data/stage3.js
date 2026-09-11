/* STAGE 3 — 2D GAME DEVELOPER */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's3',
  title: '2D Game Developer',
  emoji: '🕹️',
  badge: '2D Game Developer',
  subtitle: 'Leave the text behind. Windows, sprites, movement, collisions and sound.',
  goal: 'Build real 2D games with a screen, a game loop and characters that move.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's3m1', emoji: '🖼️', xp: 150,
      title: 'Your First Game Window',
      goal: 'Open a real game screen and draw on it.',
      blocks: [
        { t: 'text', html: `<p>Everything you have made so far lived in <b>text</b>. Time for <b>pixels</b>. 🎨</p>
          <p>A 2D game needs a <b>window</b>: a rectangle of coloured dots that you can paint on.</p>` },

        { t: 'idea', html: `In this stage you use <b>Game Lab</b> — a mini game engine built into this website. It works exactly like the famous Python game library <b>Pygame</b>: a screen, a loop, sprites, keys and sound. Everything you learn here works there too.` },

        {
          t: 'lab', title: 'Your first window', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300, "#101a2b")

gamelab.text("MY FIRST GAME WINDOW", 70, 120, 26, "#4ade80")
gamelab.text("Made by a real game developer", 90, 160, 16, "#9fb2cd")`,
          tasks: [
            'Change the background colour: try "black", "#2a0044", "navy".',
            'Change the words to your own game title.',
            'Make the text bigger (change 26 to 40).',
            'Add a third line of text.'
          ]
        },

        { t: 'tip', title: 'Colours', html: `You can use names like <code>"red"</code>, <code>"lime"</code>, <code>"gold"</code>, or hex codes like <code>"#ff00ff"</code> (the internet's colour language). Try <code>"hotpink"</code>! 💗` },

        {
          t: 'lab', title: 'Shapes', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300, "#101a2b")

gamelab.rect(50, 50, 120, 80, "#4ade80")     # x, y, width, height
gamelab.circle(300, 100, 50, "#ffd54a")      # x, y, radius
gamelab.sprite("🐉", 240, 220, 64)           # emoji, x, y, size`,
          tasks: [
            'Move the dragon to the top-left corner.',
            'Draw a green floor across the bottom with a wide, short rect.',
            'Build a house out of rectangles!'
          ]
        },

        {
          t: 'real', title: 'The same thing in Pygame',
          html: `<p>On your real computer, install Pygame once by typing <code>pip install pygame</code> in the terminal. Then this opens a real window:</p>`,
          filename: 'window.py',
          code: `import pygame

pygame.init()
screen = pygame.display.set_mode((480, 300))
pygame.display.set_caption("My First Window")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((16, 26, 43))
    pygame.draw.rect(screen, (74, 222, 128), (50, 50, 120, 80))
    pygame.display.flip()

pygame.quit()`,
          commands: `pip install pygame
python window.py`
        },

        {
          t: 'quiz', q: 'What does gamelab.screen(480, 300) do?',
          options: ['Makes the text 480 big', 'Creates a game window 480 wide and 300 tall', 'Waits 480 seconds', 'Draws a rectangle'],
          correct: 1,
          why: 'Width first, then height — always in that order.'
        },

        {
          t: 'mission', emoji: '🖼️', title: 'MISSION: Title screen 2.0', xp: 100,
          html: `<p>Make a graphical title screen for your game with a background colour, your game title, at least 2 shapes and at least 1 emoji sprite.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m2', emoji: '📐', xp: 130,
      title: 'Coordinates — Where Things Live',
      goal: 'Learn the secret map every game uses.',
      blocks: [
        { t: 'text', html: `<p>How does the computer know <b>where</b> to draw your dragon? With two numbers: <b>x</b> and <b>y</b>.</p>` },

        {
          t: 'code', caption: 'The game screen map', code: `(0,0)  ------------------ x grows this way ->
  |
  |          🚀 (240, 150)
  |
  y grows DOWN
  |
  v
                              (480, 300)`
        },

        { t: 'warn', title: 'Plot twist!', html: `In maths class, <b>y</b> goes UP. In games, <b>y</b> goes <b>DOWN</b>. <code>y = 0</code> is the top of the screen. Bigger y = lower down. Every game programmer trips on this once!` },

        {
          t: 'lab', title: 'Find the treasure', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300, "#101a2b")

gamelab.sprite("🚩", 0, 0, 30)          # top-left corner
gamelab.sprite("⭐", 480, 0, 30)        # top-right
gamelab.sprite("🌙", 0, 300, 30)        # bottom-left
gamelab.sprite("🐉", 240, 150, 50)      # the middle!

gamelab.text("x=240  y=150", 190, 190, 16, "#9fb2cd")`,
          tasks: [
            'Put a 💎 exactly in the bottom-right corner.',
            'Put a 👑 halfway between the middle and the top.',
            'Can you draw 5 coins in a straight horizontal line? (same y, different x)'
          ]
        },

        { t: 'idea', html: `A <b>horizontal</b> line = same <code>y</code>, changing <code>x</code>. A <b>vertical</b> line = same <code>x</code>, changing <code>y</code>. Loops are perfect for this!` },

        {
          t: 'lab', title: 'A row of enemies (with a loop!)', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300, "#101a2b")

for i in range(6):
    x = 50 + i * 70
    gamelab.sprite("👾", x, 60, 40)

gamelab.sprite("🚀", 240, 260, 48)`,
          tasks: [
            'Add a second row of enemies lower down.',
            'Make 10 enemies instead of 6 (change the spacing so they fit!).'
          ]
        },

        {
          t: 'quiz', q: 'Which point is at the TOP of the screen?',
          options: ['y = 300', 'y = 150', 'y = 0', 'x = 0'],
          correct: 2,
          why: 'y = 0 is the top. y grows downwards in games.'
        },

        {
          t: 'mission', emoji: '📐', title: 'MISSION: Space invaders formation', xp: 90,
          html: `<p>Use two <code>for</code> loops (one inside the other!) to draw a grid of enemies — like the classic game Space Invaders.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m3', emoji: '🎮', xp: 160,
      title: 'The Game Loop + Keyboard',
      goal: 'MOVE! Take control of your character.',
      blocks: [
        { t: 'text', html: `<p>A game is not a picture. It is a picture that is <b>redrawn 60 times every second</b>.</p>` },

        {
          t: 'code', caption: 'What every game does, forever', code: `1. LOOK   -> which keys are pressed?
2. THINK  -> move things, check collisions
3. DRAW   -> paint the new picture
4. REPEAT -> 60 times per second!`
        },

        { t: 'idea', html: `In Game Lab you write a function with the 3 steps, then say <code>gamelab.on_frame(my_function)</code>. That means: <i>"run this 60 times a second, forever."</i>` },

        {
          t: 'lab', title: 'Move with the arrow keys!', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

player_x = 240
player_y = 150

def each_frame():
    global player_x, player_y

    # 1. LOOK at the keyboard
    if gamelab.key("left"):
        player_x = player_x - 5
    if gamelab.key("right"):
        player_x = player_x + 5
    if gamelab.key("up"):
        player_y = player_y - 5
    if gamelab.key("down"):
        player_y = player_y + 5

    # 2. DRAW everything again
    gamelab.clear("#101a2b")
    gamelab.text("Arrow keys!", 10, 10, 16, "#9fb2cd")
    gamelab.sprite("🚀", player_x, player_y, 48)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Make the rocket faster (change 5 to 12).',
            'Make it VERY slow (change 5 to 1).',
            'Change the rocket to another emoji: 🐉 🚗 🐢 🧙',
            'Delete the <code>gamelab.clear(...)</code> line and play. Wow — a painting program! Why does that happen?'
          ]
        },

        { t: 'brain', title: 'Why clear()?', html: `Without <code>clear</code>, every frame is drawn <b>on top</b> of the last one, so you leave a trail. Clearing first is like wiping a whiteboard before redrawing. (Sometimes the trail looks awesome — that is a special effect!)` },

        { t: 'warn', title: 'What is global?', html: `Normally a function cannot change a box that lives outside it. <code>global player_x</code> means: <i>"I really do want to change the OUTSIDE player_x."</i> Forget it and your player will not move!` },

        {
          t: 'lab', title: 'Stay on the screen!', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)
x = 240

def each_frame():
    global x

    if gamelab.key("left"):
        x = x - 6
    if gamelab.key("right"):
        x = x + 6

    # Walls! Do not let the hero escape
    if x < 20:
        x = 20
    if x > 460:
        x = 460

    gamelab.clear("#101a2b")
    gamelab.rect(0, 250, 480, 50, "#2a3a52")
    gamelab.sprite("🧙", x, 225, 48)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Turn the walls into a wrap-around: when x > 460, set x back to 20. Like Pac-Man!',
            'Add up/down movement with its own walls.'
          ]
        },

        {
          t: 'quiz', q: 'Why does a game redraw the screen 60 times per second?',
          options: ['To use more battery', 'So movement looks smooth', 'Because Python is slow', 'To make the computer hot'],
          correct: 1,
          why: 'Fast redrawing tricks your eyes into seeing smooth movement — the same trick cartoons use.'
        },

        {
          t: 'mission', emoji: '🎮', title: 'MISSION: My controllable hero', xp: 120,
          html: `<p>Make a character that moves in all four directions, cannot leave the screen, and stands in a world you drew (floor, sky, sun, trees…).</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m4', emoji: '🏃', xp: 150,
      title: 'Movement and Animation',
      goal: 'Make things move by themselves.',
      blocks: [
        { t: 'text', html: `<p>Not everything waits for the player. Clouds drift, enemies patrol, asteroids fall.</p>
          <p>The trick is simple: <b>a speed variable that is added every frame</b>.</p>` },

        {
          t: 'lab', title: 'A bouncing ball', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

x = 100
y = 100
speed_x = 4
speed_y = 3

def each_frame():
    global x, y, speed_x, speed_y

    x = x + speed_x
    y = y + speed_y

    # Bounce off the walls
    if x > 460 or x < 20:
        speed_x = -speed_x
        gamelab.sound("blip")
    if y > 280 or y < 20:
        speed_y = -speed_y
        gamelab.sound("blip")

    gamelab.clear("#101a2b")
    gamelab.sprite("⚽", x, y, 40)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Make it faster.',
            'Add a SECOND ball with its own x2, y2 and speeds.',
            'Change the ball to 🏀 and the background to a court colour.'
          ]
        },

        { t: 'idea', html: `<code>speed_x = -speed_x</code> flips the direction. If it was going +4 (right), now it goes -4 (left). One line = a perfect bounce! 🏓` },

        { t: 'text', html: `<p><b>Animation</b> is not magic either: it is just <b>swapping the picture</b> quickly, like a flipbook. 📖</p>` },

        {
          t: 'lab', title: 'A walking (wobbling) character', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

x = 60
frame_count = 0

def each_frame():
    global x, frame_count

    frame_count = frame_count + 1
    x = x + 2
    if x > 480:
        x = 0

    # Swap between two pictures every 15 frames
    if (frame_count // 15) % 2 == 0:
        picture = "🚶"
    else:
        picture = "🏃"

    gamelab.clear("#101a2b")
    gamelab.rect(0, 220, 480, 80, "#1e3a2f")
    gamelab.sprite(picture, x, 200, 56)
    gamelab.text("frame: " + str(frame_count), 10, 10, 14, "#9fb2cd")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change 15 to 3 — super speedy legs!',
            'Use three pictures instead of two.',
            'Make the character jump: add <code>y</code> that goes up and comes back down.'
          ]
        },

        {
          t: 'quiz', q: 'How do you make something move to the right every frame?',
          options: ['x = 5', 'x = x + 5', 'x = x * 0', 'print(x)'],
          correct: 1,
          why: 'Adding a little bit every frame is exactly what movement is.'
        },

        {
          t: 'mission', emoji: '🏃', title: 'MISSION: A world in motion', xp: 100,
          html: `<p>Create a scene with at least 3 things moving by themselves at different speeds (clouds, fish, cars, asteroids…). At least one must bounce.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m5', emoji: '💥', xp: 170,
      title: 'Collisions — When Things Touch',
      goal: 'Collect coins and get hurt by enemies.',
      blocks: [
        { t: 'text', html: `<p>This is the heart of nearly every game: <b>what happens when two things touch?</b></p>
          <ul><li>Player + coin = 💰 score up</li><li>Player + enemy = 💔 lose health</li><li>Bullet + alien = 💥 boom</li><li>Player + door = 🚪 next level</li></ul>` },

        { t: 'idea', html: `<code>gamelab.hit(x1, y1, size1, x2, y2, size2)</code> answers one question: <i>are these two sprites touching?</i> It gives back <code>True</code> or <code>False</code>.` },

        {
          t: 'lab', title: 'Collect the coin!', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

player_x = 240
player_y = 150
coin_x = 100
coin_y = 100
score = 0

def each_frame():
    global player_x, player_y, coin_x, coin_y, score

    if gamelab.key("left"):  player_x = player_x - 5
    if gamelab.key("right"): player_x = player_x + 5
    if gamelab.key("up"):    player_y = player_y - 5
    if gamelab.key("down"):  player_y = player_y + 5

    # Did we touch the coin?
    if gamelab.hit(player_x, player_y, 40, coin_x, coin_y, 32):
        score = score + 1
        gamelab.sound("coin")
        coin_x = random.randint(30, 450)
        coin_y = random.randint(30, 270)

    gamelab.clear("#101a2b")
    gamelab.sprite("🪙", coin_x, coin_y, 32)
    gamelab.sprite("🧑‍🚀", player_x, player_y, 44)
    gamelab.text("Score: " + str(score), 10, 10, 22, "#ffd54a")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Give 10 points per coin instead of 1.',
            'Add a second coin (💎) worth 50 points.',
            'Add a 👹 that takes points away when you touch it.',
            'Show "YOU WIN!" when the score reaches 100.'
          ]
        },

        { t: 'brain', html: `Real games do not really check if the <i>drawings</i> touch — that is far too slow. They check if two invisible <b>boxes</b> overlap. That is exactly what <code>hit()</code> does. Now you know a professional secret! 🕵️` },

        {
          t: 'quiz', q: 'gamelab.hit(...) gives you back...',
          options: ['A number', 'True or False', 'A picture', 'The score'],
          correct: 1,
          why: 'It answers a yes/no question, so you use it inside an if.'
        },

        {
          t: 'mission', emoji: '💥', title: 'MISSION: Collector game', xp: 130,
          html: `<p>Make a game where the player collects at least 2 different kinds of items, each worth different points, and one item that is BAD to touch.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m6', emoji: '👾', xp: 170,
      title: 'Enemies That Chase You',
      goal: 'Give your monsters a tiny brain.',
      blocks: [
        { t: 'text', html: `<p>An enemy that just sits there is boring. Let's make one that <b>hunts you</b>. 😈</p>` },

        { t: 'idea', html: `The simplest enemy brain in the world:<br><i>"If the player is to my left, walk left. If the player is to my right, walk right."</i> That is it. That is real game AI!` },

        {
          t: 'lab', title: 'The chaser', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

player_x = 100
player_y = 150
enemy_x = 400
enemy_y = 150
caught = False

def each_frame():
    global player_x, player_y, enemy_x, enemy_y, caught

    if caught:
        gamelab.clear("#3a0f14")
        gamelab.text("CAUGHT! 💀", 150, 130, 40, "#ff6b6b")
        return

    if gamelab.key("left"):  player_x = player_x - 6
    if gamelab.key("right"): player_x = player_x + 6
    if gamelab.key("up"):    player_y = player_y - 6
    if gamelab.key("down"):  player_y = player_y + 6

    # The enemy brain
    if enemy_x < player_x: enemy_x = enemy_x + 2
    if enemy_x > player_x: enemy_x = enemy_x - 2
    if enemy_y < player_y: enemy_y = enemy_y + 2
    if enemy_y > player_y: enemy_y = enemy_y - 2

    if gamelab.hit(player_x, player_y, 40, enemy_x, enemy_y, 40):
        caught = True
        gamelab.sound("lose")

    gamelab.clear("#101a2b")
    gamelab.text("RUN AWAY!", 10, 10, 18, "#9fb2cd")
    gamelab.sprite("🧙", player_x, player_y, 44)
    gamelab.sprite("👹", enemy_x, enemy_y, 44)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Make the enemy slower (2 → 1) or scarier (2 → 5).',
            'Add a SECOND enemy that starts in another corner.',
            'Add a safe zone: a green rect where the enemy cannot catch you.',
            'Add a timer that counts how long you survive.'
          ]
        },

        { t: 'tip', title: 'Game feel', html: `If the enemy is <b>faster</b> than the player, the game is impossible. If it is much slower, it is boring. Finding the fun number is called <b>balancing</b> — and it is a real job in game studios!` },

        {
          t: 'mission', emoji: '👾', title: 'MISSION: Survive the hunt', xp: 130,
          html: `<p>Build a chase game with at least 2 enemies, a score that grows the longer you survive, and a game-over screen.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m7', emoji: '❤️', xp: 150,
      title: 'Score, Health and Game Over',
      goal: 'Add the parts that make it feel like a REAL game.',
      blocks: [
        { t: 'text', html: `<p>The stuff drawn on top of the game — score, hearts, timer — is called the <b>HUD</b> (Heads-Up Display). It is what turns a toy into a game.</p>` },

        {
          t: 'lab', title: 'Full HUD + lives + game over', w: 480, h: 320,
          code: `import gamelab
import random

gamelab.screen(480, 320)

player_x = 240
score = 0
lives = 3
game_over = False

star_x = random.randint(30, 450)
star_y = -30
bomb_x = random.randint(30, 450)
bomb_y = -200

def each_frame():
    global player_x, score, lives, game_over
    global star_x, star_y, bomb_x, bomb_y

    gamelab.clear("#101a2b")

    if game_over:
        gamelab.text("GAME OVER", 120, 120, 44, "#ff6b6b")
        gamelab.text("Final score: " + str(score), 150, 180, 22, "white")
        return

    if gamelab.key("left"):  player_x = player_x - 7
    if gamelab.key("right"): player_x = player_x + 7
    if player_x < 20: player_x = 20
    if player_x > 460: player_x = 460

    # Falling star = points
    star_y = star_y + 4
    if star_y > 340:
        star_y = -30
        star_x = random.randint(30, 450)
    if gamelab.hit(player_x, 280, 40, star_x, star_y, 32):
        score = score + 10
        gamelab.sound("coin")
        star_y = -30
        star_x = random.randint(30, 450)

    # Falling bomb = danger
    bomb_y = bomb_y + 6
    if bomb_y > 340:
        bomb_y = -30
        bomb_x = random.randint(30, 450)
    if gamelab.hit(player_x, 280, 40, bomb_x, bomb_y, 32):
        lives = lives - 1
        gamelab.sound("hit")
        bomb_y = -30
        bomb_x = random.randint(30, 450)
        if lives <= 0:
            game_over = True
            gamelab.sound("lose")

    gamelab.sprite("⭐", star_x, star_y, 32)
    gamelab.sprite("💣", bomb_x, bomb_y, 32)
    gamelab.sprite("🧺", player_x, 280, 48)

    # The HUD
    gamelab.text("Score: " + str(score), 10, 10, 20, "#ffd54a")
    gamelab.text("❤️" * lives, 390, 8, 22, "white")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Start with 5 lives.',
            'Make the bombs speed up when the score gets high.',
            'Add a "high score" line to the HUD.',
            'Add a golden star worth 100 points that appears rarely.'
          ]
        },

        { t: 'idea', html: `<code>"❤️" * lives</code> — remember that trick from Stage 1? Multiplying a string is the easiest health bar in the world.` },

        {
          t: 'mission', emoji: '❤️', title: 'MISSION: Complete HUD', xp: 120,
          html: `<p>Add a score, a life system, and a proper GAME OVER screen to one of your games.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m8', emoji: '🔊', xp: 130,
      title: 'Sound Effects',
      goal: 'Games that go beep, boom and yay.',
      blocks: [
        { t: 'text', html: `<p>Turn the sound off in any game and it instantly feels dead. Sound is half the fun! 🔊</p>` },

        {
          t: 'lab', title: 'The sound board', w: 480, h: 260,
          code: `import gamelab

gamelab.screen(480, 260)

sounds = ["coin", "hit", "jump", "win", "lose"]
keys   = ["1", "2", "3", "4", "5"]
last = ""

def each_frame():
    global last

    for i in range(5):
        if gamelab.key(keys[i]):
            if last != sounds[i]:
                gamelab.sound(sounds[i])
                last = sounds[i]

    gamelab.clear("#101a2b")
    gamelab.text("PRESS 1 2 3 4 5", 120, 40, 26, "#4ade80")
    gamelab.text("1 coin   2 hit   3 jump", 110, 110, 18, "#9fb2cd")
    gamelab.text("4 win    5 lose", 150, 140, 18, "#9fb2cd")
    gamelab.text("Playing: " + last, 150, 190, 20, "#ffd54a")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Add sounds to your collector game: coin when you score, hit when you get hurt.',
            'Play the "win" sound when the score reaches 50.'
          ]
        },

        { t: 'tip', title: 'Rule of thumb', html: `Every important event deserves a sound: pick up, get hit, jump, win, lose, click. Silence should mean "nothing is happening".` },

        {
          t: 'real', title: 'Sound in Pygame',
          html: `<p>On a real computer you can use your own <code>.wav</code> or <code>.mp3</code> files:</p>`,
          filename: 'sound_demo.py',
          code: `import pygame

pygame.init()
pygame.mixer.init()

coin_sound = pygame.mixer.Sound("coin.wav")
coin_sound.play()

pygame.mixer.music.load("music.mp3")
pygame.mixer.music.play(-1)   # -1 means loop forever`,
          commands: `python sound_demo.py`
        },

        {
          t: 'mission', emoji: '🔊', title: 'MISSION: Make some noise', xp: 100,
          html: `<p>Add at least 4 different sound effects to one of your games — one for scoring, one for damage, one for winning and one for losing.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m9', emoji: '📝', xp: 140,
      title: 'Game Design — Think Before You Code',
      goal: 'Design a game on paper, like a real studio.',
      blocks: [
        { t: 'text', html: `<p>Professional game makers do <b>not</b> start by typing. They start by <b>deciding</b>.</p>
          <p>Every game, from Pong to Zelda, answers the same five questions:</p>` },

        {
          t: 'code', caption: 'The 5 questions', code: `1. WHO does the player control?
2. WHAT is the goal?
3. WHAT gets in the way?
4. WHAT are the rules?
5. WHY is it FUN?`
        },

        { t: 'idea', html: `<b>Fun usually comes from a fair struggle:</b> the player <i>almost</i> fails, then wins. Too easy = boring. Impossible = angry. Just right = "one more try!"` },

        { t: 'write', title: 'Design your next game', q: 'Answer the five questions for the game YOU want to build next.', placeholder: '1. The player controls...\n2. The goal is...\n3. In the way there is...\n4. The rules are...\n5. It is fun because...' },

        { t: 'write', title: 'Sketch it', q: 'Describe (or draw on real paper!) what the screen looks like. Where is the player? Where is the score? What colours?', placeholder: 'At the bottom there is... In the corner...' },

        { t: 'tip', title: 'Small is beautiful', html: `Your first design will be too big. Every developer does this. Cross out half of it. A tiny finished game beats a huge unfinished one — <b>every single time</b>.` },

        {
          t: 'mission', emoji: '📝', title: 'MISSION: Design document', xp: 120,
          html: `<p>Fill in both boxes above, and draw your game screen on real paper. Show it to somebody and explain the rules out loud — if they understand it, your design is good!</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's3m10', emoji: '🕹️', xp: 250,
      title: 'MINI GAME #3: Arcade Game',
      goal: 'A complete arcade game, made by you.',
      blocks: [
        { t: 'text', html: `<p>🔥 <b>BOSS LEVEL</b> 🔥</p>
          <p>Here is a complete arcade game: dodge the asteroids, catch the coins, three lives, score, sound and a game-over screen.</p>
          <p>Play it. Then <b>rip it apart and make it yours</b>.</p>` },

        {
          t: 'lab', title: 'SPACE DODGE', w: 480, h: 340,
          code: `import gamelab
import random

gamelab.screen(480, 340)

player_x = 240
score = 0
lives = 3
game_over = False
speed = 4

rocks = []
for i in range(4):
    rocks.append({"x": random.randint(30, 450), "y": random.randint(-400, -40)})

coin = {"x": random.randint(30, 450), "y": -100}

def reset_rock(rock):
    rock["y"] = -40
    rock["x"] = random.randint(30, 450)

def each_frame():
    global player_x, score, lives, game_over, speed

    gamelab.clear("#0a0f1e")

    if game_over:
        gamelab.text("GAME OVER", 110, 120, 44, "#ff6b6b")
        gamelab.text("Score: " + str(score), 175, 180, 24, "white")
        return

    # --- player ---
    if gamelab.key("left"):  player_x = player_x - 7
    if gamelab.key("right"): player_x = player_x + 7
    if player_x < 20:  player_x = 20
    if player_x > 460: player_x = 460

    # --- asteroids ---
    for rock in rocks:
        rock["y"] = rock["y"] + speed
        if rock["y"] > 360:
            reset_rock(rock)
        if gamelab.hit(player_x, 300, 40, rock["x"], rock["y"], 36):
            reset_rock(rock)
            lives = lives - 1
            gamelab.sound("hit")
            if lives <= 0:
                game_over = True
                gamelab.sound("lose")
        gamelab.sprite("☄️", rock["x"], rock["y"], 36)

    # --- coin ---
    coin["y"] = coin["y"] + 3
    if coin["y"] > 360:
        coin["y"] = -40
        coin["x"] = random.randint(30, 450)
    if gamelab.hit(player_x, 300, 40, coin["x"], coin["y"], 32):
        coin["y"] = -40
        coin["x"] = random.randint(30, 450)
        score = score + 10
        speed = speed + 0.2          # the game gets harder!
        gamelab.sound("coin")
    gamelab.sprite("🪙", coin["x"], coin["y"], 32)

    # --- ship + HUD ---
    gamelab.sprite("🚀", player_x, 300, 48)
    gamelab.text("Score: " + str(score), 10, 10, 20, "#ffd54a")
    gamelab.text("❤️" * lives, 390, 8, 22, "white")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change the theme completely: underwater? jungle? kitchen? (just change the emojis and colours!)',
            'Add a shield power-up 🛡️ that gives back a life.',
            'Add more asteroids by changing <code>range(4)</code>.',
            'Add a "LEVEL UP!" message every 100 points.',
            'Make the ship shoot 🔫 (add a bullet with its own x, y that goes up).'
          ]
        },

        { t: 'brain', html: `Look at the list of rocks: <code>[{...}, {...}, {...}]</code>. A <b>list of dictionaries</b>, from Stage 2, is how this game handles many enemies at once. Everything connects! 🔗` },

        {
          t: 'mission', emoji: '🕹️', title: 'BOSS MISSION: Your arcade game', xp: 200,
          html: `<p>Your game must have: a player you control, something to collect, something to avoid, a score, lives, sound effects, and a game-over screen — and it must look nothing like the example.</p>
            <p>Let somebody else play it and watch their face. That is what game developers live for! 🏅</p>`
        }
      ]
    }
  ]
});
