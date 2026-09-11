/* STAGE 4 — GAME ENGINEER */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's4',
  title: 'Game Engineer',
  emoji: '🏗️',
  badge: 'Game Engineer',
  subtitle: 'Classes, objects, maps, AI, levels and saving. Build BIG games without getting lost.',
  goal: 'Learn the professional tools that keep a big game organised.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's4m1', emoji: '🧬', xp: 160,
      title: 'Classes — Blueprints',
      goal: 'Design one monster, then make a hundred of them.',
      blocks: [
        { t: 'text', html: `<p>Imagine you need 50 goblins. Writing 50 dictionaries by hand? 😵</p>
          <p>Instead you make a <b>blueprint</b> — a class — and stamp out as many goblins as you like.</p>` },

        { t: 'idea', html: `A <b>class</b> is the cookie cutter 🍪. An <b>object</b> is the cookie. One cutter, unlimited cookies — each one its own.` },

        {
          t: 'run', code: `class Goblin:
    def __init__(self, name, health):
        self.name = name
        self.health = health

# Stamp out three goblins from the same blueprint
g1 = Goblin("Snik", 40)
g2 = Goblin("Grog", 65)
g3 = Goblin("Zub", 25)

print(g1.name, "has", g1.health, "HP")
print(g2.name, "has", g2.health, "HP")
print(g3.name, "has", g3.health, "HP")`,
          tasks: [
            'Create two more goblins.',
            'Add an <code>attack</code> value to the blueprint and print it.',
            'Hurt one goblin: <code>g1.health = g1.health - 10</code>'
          ]
        },

        { t: 'tip', title: 'The scary words explained', html: `<ul>
          <li><code>class Goblin:</code> — "here comes a blueprint called Goblin"</li>
          <li><code>__init__</code> — "what to do when a new goblin is BORN" (init = initialise)</li>
          <li><code>self</code> — "this particular goblin, not the others"</li>
        </ul>
        They look strange. You will get used to them in about three programs. 😉` },

        {
          t: 'run', code: `class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.coins = 0
        self.inventory = []

hero = Player("Alex")
hero.coins = hero.coins + 50
hero.inventory.append("🗡️ sword")

print(f"{hero.name}: {hero.health} HP, {hero.coins} coins")
print("Backpack:", hero.inventory)`,
          tasks: ['Create a second player and give them different items.', 'Add a <code>level</code> to the blueprint.']
        },

        {
          t: 'quiz', q: 'What is the difference between a class and an object?',
          options: [
            'They are the same thing',
            'A class is the blueprint, an object is a real thing made from it',
            'An object is the blueprint',
            'Classes are only for school'
          ],
          correct: 1,
          why: 'One Goblin class → as many goblin objects as your game needs.'
        },

        {
          t: 'mission', emoji: '🧬', title: 'MISSION: Monster factory', xp: 110,
          html: `<p>Make a <code>Monster</code> class with name, health, attack and emoji. Create 4 different monsters and print a codex page using a <code>for</code> loop over a list of them.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m2', emoji: '⚙️', xp: 170,
      title: 'Methods — Objects That DO Things',
      goal: 'Teach your objects their own moves.',
      blocks: [
        { t: 'text', html: `<p>Right now your objects only <b>hold</b> information. Let's give them <b>abilities</b>.</p>
          <p>A function that lives inside a class is called a <b>method</b>. It is a move the object knows.</p>` },

        {
          t: 'run', code: `class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100

    def take_damage(self, amount):
        self.health = self.health - amount
        print(f"💔 {self.name} takes {amount} damage! ({self.health} HP left)")
        if self.health <= 0:
            print(f"💀 {self.name} has fallen!")

    def heal(self, amount):
        self.health = self.health + amount
        print(f"🧪 {self.name} heals {amount}! ({self.health} HP)")

hero = Player("Alex")
hero.take_damage(30)
hero.heal(15)
hero.take_damage(90)`,
          tasks: [
            'Add an <code>attack(other)</code> method that damages another player.',
            'Stop health from going above 100 inside <code>heal</code>.',
            'Add a <code>shout()</code> method that prints a battle cry.'
          ]
        },

        { t: 'idea', html: `<code>hero.heal(15)</code> reads almost like English: <i>"hero, heal 15"</i>. That is why professionals love classes — the code tells the story.` },

        {
          t: 'run', code: `import random

class Monster:
    def __init__(self, name, emoji, health, attack):
        self.name = name
        self.emoji = emoji
        self.health = health
        self.attack = attack

    def is_alive(self):
        return self.health > 0

    def hit(self, target):
        damage = random.randint(1, self.attack)
        target.health = target.health - damage
        print(f"{self.emoji} {self.name} hits {target.name} for {damage}!")

dragon = Monster("Smaug", "🐉", 200, 30)
knight = Monster("Sir Alex", "🛡️", 150, 25)

while dragon.is_alive() and knight.is_alive():
    knight.hit(dragon)
    if dragon.is_alive():
        dragon.hit(knight)

if knight.is_alive():
    print("🏆 The knight wins!")
else:
    print("🐉 The dragon wins!")`,
          tasks: [
            'Run it several times — who wins more often?',
            'Make the knight stronger until they win most fights.',
            'Add a third fighter!'
          ]
        },

        {
          t: 'mission', emoji: '⚙️', title: 'MISSION: Auto-battler', xp: 120,
          html: `<p>Build a battle between two objects that fight all by themselves, with at least 3 methods (attack, heal, is_alive) and a winner announcement.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m3', emoji: '🎛️', xp: 170,
      title: 'Game States — Menu, Playing, Game Over',
      goal: 'Add a real start menu to your game.',
      blocks: [
        { t: 'text', html: `<p>Real games are never just "the game". They have <b>screens</b>:</p>
          <p>🏠 MENU → 🎮 PLAYING → ⏸️ PAUSED → 💀 GAME OVER → back to MENU</p>
          <p>The trick is beautifully simple: one variable that remembers which screen you are on.</p>` },

        {
          t: 'lab', title: 'A game with a real menu', w: 480, h: 320,
          code: `import gamelab

gamelab.screen(480, 320)

state = "MENU"
x = 240
score = 0

def each_frame():
    global state, x, score

    gamelab.clear("#101a2b")

    if state == "MENU":
        gamelab.text("⭐ STAR RUNNER ⭐", 90, 100, 34, "#ffd54a")
        gamelab.text("Press SPACE to play", 130, 170, 20, "#9fb2cd")
        if gamelab.key("space"):
            state = "PLAYING"
            score = 0

    elif state == "PLAYING":
        if gamelab.key("left"):  x = x - 6
        if gamelab.key("right"): x = x + 6
        score = score + 1

        gamelab.text("Score: " + str(score), 10, 10, 20, "#ffd54a")
        gamelab.text("Press G to lose on purpose", 10, 290, 14, "#9fb2cd")
        gamelab.sprite("🏃", x, 200, 48)

        if gamelab.key("g"):
            state = "GAME_OVER"
            gamelab.sound("lose")

    elif state == "GAME_OVER":
        gamelab.text("GAME OVER", 120, 110, 40, "#ff6b6b")
        gamelab.text("Score: " + str(score), 175, 170, 22, "white")
        gamelab.text("Press R to restart", 145, 220, 18, "#9fb2cd")
        if gamelab.key("r"):
            state = "MENU"

gamelab.on_frame(each_frame)`,
          tasks: [
            'Add a PAUSED state (press P to pause, P again to continue).',
            'Add a WIN state when the score passes 500.',
            'Make the menu prettier with emojis and colours.'
          ]
        },

        { t: 'brain', html: `This one idea — a <code>state</code> variable — is how <b>every</b> game you have played handles menus, cutscenes, shops and pause screens. You just learned an industry technique. 🏭` },

        {
          t: 'quiz', q: 'How does a game know whether to show the menu or the game?',
          options: ['It guesses', 'It keeps a variable that remembers the current state', 'It restarts the computer', 'It asks the player every frame'],
          correct: 1,
          why: 'One variable + if/elif = as many screens as you want.'
        },

        {
          t: 'mission', emoji: '🎛️', title: 'MISSION: Add a menu', xp: 130,
          html: `<p>Take your arcade game from Stage 3 and add MENU, PLAYING and GAME OVER states, with a key to restart.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m4', emoji: '🗺️', xp: 190,
      title: 'Game Maps — Build a World',
      goal: 'Draw a maze out of text and walk through it.',
      blocks: [
        { t: 'text', html: `<p>How do games store a whole world? Surprise: often as <b>text</b>! 🤯</p>
          <p><code>#</code> is a wall, <code>.</code> is floor. You can literally draw your level with your keyboard.</p>` },

        {
          t: 'lab', title: 'The maze', w: 480, h: 288,
          code: `import gamelab

TILE = 24

level = [
    "####################",
    "#........#.........#",
    "#.####...#....####.#",
    "#....#...#.......#.#",
    "#....#########...#.#",
    "#................#.#",
    "#.####..#####....#.#",
    "#....#......#......#",
    "#....#..###.#.####.#",
    "#.......#...#....#.#",
    "#...####....#....#.#",
    "####################"
]

gamelab.screen(480, 288)

x = 36.0
y = 36.0

def is_wall(px, py):
    col = int(px // TILE)
    row = int(py // TILE)
    if row < 0 or row >= len(level):
        return True
    if col < 0 or col >= len(level[row]):
        return True
    return level[row][col] == "#"

def each_frame():
    global x, y

    new_x = x
    new_y = y
    if gamelab.key("left"):  new_x = x - 3
    if gamelab.key("right"): new_x = x + 3
    if gamelab.key("up"):    new_y = y - 3
    if gamelab.key("down"):  new_y = y + 3

    # only move if the new spot is not a wall
    if not is_wall(new_x, y):
        x = new_x
    if not is_wall(x, new_y):
        y = new_y

    gamelab.clear("#0a0f1e")
    for row in range(len(level)):
        for col in range(len(level[row])):
            if level[row][col] == "#":
                gamelab.rect(col * TILE, row * TILE, TILE, TILE, "#2a3a52")

    gamelab.sprite("🧙", x, y, 22)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Redraw the maze! Change the # and . to build your own rooms.',
            'Add a 🚪 door at a spot and print "YOU ESCAPED!" when you reach it.',
            'Use a new letter in the map, like <code>C</code> for a coin, and draw it differently.'
          ]
        },

        { t: 'idea', html: `<code>col * TILE</code> turns a map square into screen pixels. Square 3 × 24 pixels = pixel 72. That is how every tile game in history works — Pokémon, Zelda, Mario. 🍄` },

        {
          t: 'mission', emoji: '🗺️', title: 'MISSION: Your own dungeon', xp: 150,
          html: `<p>Design your own maze (at least 12 rows) with a start, a treasure and a goal door. Make it hard enough that a grown-up gets lost. 😈</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m5', emoji: '🧠', xp: 170,
      title: 'Enemy AI — Giving Monsters Brains',
      goal: 'Enemies that patrol, notice you, and chase.',
      blocks: [
        { t: 'text', html: `<p><b>AI</b> sounds like science fiction. In games it usually means: <i>a few if statements that decide what the monster does next</i>.</p>` },

        { t: 'idea', html: `A classic enemy brain has <b>two moods</b>:<br>😴 <b>Patrol</b> — walk back and forth, nothing to see here.<br>😡 <b>Chase</b> — the player came too close!` },

        {
          t: 'lab', title: 'The guard', w: 480, h: 300,
          code: `import gamelab

gamelab.screen(480, 300)

player_x = 60.0
player_y = 150.0
guard_x = 350.0
guard_y = 150.0
guard_dir = 2
mood = "patrol"

def distance(ax, ay, bx, by):
    return ((ax - bx) ** 2 + (ay - by) ** 2) ** 0.5

def each_frame():
    global player_x, player_y, guard_x, guard_y, guard_dir, mood

    if gamelab.key("left"):  player_x = player_x - 5
    if gamelab.key("right"): player_x = player_x + 5
    if gamelab.key("up"):    player_y = player_y - 5
    if gamelab.key("down"):  player_y = player_y + 5

    # --- the brain ---
    how_far = distance(player_x, player_y, guard_x, guard_y)

    if how_far < 120:
        mood = "chase"
    else:
        mood = "patrol"

    if mood == "patrol":
        guard_x = guard_x + guard_dir
        if guard_x > 440 or guard_x < 260:
            guard_dir = -guard_dir
    else:
        if guard_x < player_x: guard_x = guard_x + 3
        if guard_x > player_x: guard_x = guard_x - 3
        if guard_y < player_y: guard_y = guard_y + 3
        if guard_y > player_y: guard_y = guard_y - 3

    gamelab.clear("#101a2b")
    if mood == "chase":
        gamelab.circle(guard_x, guard_y, 70, "#3a1420")
        gamelab.text("!", guard_x - 4, guard_y - 55, 26, "#ff6b6b")
    gamelab.sprite("💂", guard_x, guard_y, 44)
    gamelab.sprite("🥷", player_x, player_y, 40)
    gamelab.text("Mood: " + mood, 10, 10, 18, "#9fb2cd")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Change the alert distance from 120 to 60 — a short-sighted guard!',
            'Make the guard give up and go home after chasing.',
            'Add a second guard with a different patrol area.',
            'Add a bush 🌳 where the player is invisible.'
          ]
        },

        { t: 'brain', html: `Notice the enemy does not "think". It just measures a distance and picks a mood. Almost all game AI is this: <b>simple rules that look clever</b>.` },

        {
          t: 'mission', emoji: '🧠', title: 'MISSION: Smart enemy', xp: 130,
          html: `<p>Create an enemy with at least 3 moods (for example: patrol, chase, run away when hurt) and show the current mood on the screen.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m6', emoji: '🗝️', xp: 160,
      title: 'Items, Power-Ups and Inventory',
      goal: 'Coins, keys, potions and armour that actually do something.',
      blocks: [
        { t: 'text', html: `<p>Items make a game feel like an adventure. Each item is just a dictionary with a job. 🎒</p>` },

        {
          t: 'run', code: `items = [
    {"name": "🧪 Potion", "effect": "heal", "power": 30},
    {"name": "🗡️ Sword", "effect": "attack", "power": 15},
    {"name": "🛡️ Armour", "effect": "defence", "power": 10},
    {"name": "🔑 Key", "effect": "unlock", "power": 0}
]

player = {"health": 60, "attack": 10, "defence": 0, "bag": []}

def pick_up(item):
    player["bag"].append(item)
    print(f"You found a {item['name']}!")

def use(item):
    if item["effect"] == "heal":
        player["health"] = player["health"] + item["power"]
        print(f"🧪 +{item['power']} HP -> {player['health']}")
    elif item["effect"] == "attack":
        player["attack"] = player["attack"] + item["power"]
        print(f"⚔️ Attack is now {player['attack']}")
    elif item["effect"] == "defence":
        player["defence"] = player["defence"] + item["power"]
        print(f"🛡️ Defence is now {player['defence']}")
    else:
        print("🔑 You keep it for later.")

for item in items:
    pick_up(item)

print("\\n--- USING EVERYTHING ---")
for item in player["bag"]:
    use(item)

print("\\nFinal hero:", player["health"], "HP,", player["attack"], "attack,", player["defence"], "defence")`,
          tasks: [
            'Invent 3 new items with new effects (speed? luck? double coins?).',
            'Make the potion disappear from the bag after using it.',
            'Add a <code>show_bag()</code> function that prints the inventory nicely.'
          ]
        },

        {
          t: 'lab', title: 'Power-up in a real game', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

x = 240.0
speed = 5
power_x = random.randint(30, 450)
power_y = random.randint(30, 270)
message = ""
timer = 0

def each_frame():
    global x, speed, power_x, power_y, message, timer

    if gamelab.key("left"):  x = x - speed
    if gamelab.key("right"): x = x + speed

    if gamelab.hit(x, 220, 40, power_x, power_y, 32):
        speed = speed + 3
        message = "⚡ SPEED UP! Speed = " + str(speed)
        timer = 90
        gamelab.sound("coin")
        power_x = random.randint(30, 450)
        power_y = random.randint(30, 200)

    if timer > 0:
        timer = timer - 1
    else:
        message = ""

    gamelab.clear("#101a2b")
    gamelab.sprite("⚡", power_x, power_y, 32)
    gamelab.sprite("🏎️", x, 220, 48)
    gamelab.text(message, 120, 30, 20, "#ffd54a")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Add a 🐌 slow-down trap.',
            'Make the power-up wear off after 5 seconds (300 frames).'
          ]
        },

        {
          t: 'mission', emoji: '🗝️', title: 'MISSION: Loot system', xp: 120,
          html: `<p>Add at least 4 different items to one of your games. Each must change the player in a different way, and the player must see a message when picking one up.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m7', emoji: '🪜', xp: 170,
      title: 'Levels — Making It Harder',
      goal: 'Level 1, level 2, level 3… each one tougher.',
      blocks: [
        { t: 'text', html: `<p>Why do games have levels? Because getting better feels <b>amazing</b> — but only if the game grows with you. 📈</p>` },

        { t: 'idea', html: `A level is usually just a <b>set of numbers</b>: how many enemies, how fast, how much health. Change the numbers, and you have a new level.` },

        {
          t: 'run', code: `levels = [
    {"number": 1, "enemies": 3,  "speed": 2, "boss": False},
    {"number": 2, "enemies": 6,  "speed": 3, "boss": False},
    {"number": 3, "enemies": 10, "speed": 5, "boss": True}
]

for level in levels:
    print(f"\\n=== LEVEL {level['number']} ===")
    print(f"Enemies: {level['enemies']}   Speed: {level['speed']}")
    if level["boss"]:
        print("🐉 BOSS FIGHT! Good luck...")
    else:
        print("Clear all enemies to continue.")`,
          tasks: [
            'Add levels 4 and 5.',
            'Add a "treasure" number to each level.',
            'Make level 5 completely wild.'
          ]
        },

        {
          t: 'lab', title: 'A game that levels up', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

x = 240.0
score = 0
level = 1
speed = 3.0
star_x = random.randint(30, 450)
star_y = -30.0

def each_frame():
    global x, score, level, speed, star_x, star_y

    if gamelab.key("left"):  x = x - 7
    if gamelab.key("right"): x = x + 7
    if x < 20: x = 20
    if x > 460: x = 460

    star_y = star_y + speed
    if star_y > 320:
        star_y = -30
        star_x = random.randint(30, 450)

    if gamelab.hit(x, 250, 40, star_x, star_y, 32):
        score = score + 1
        gamelab.sound("coin")
        star_y = -30
        star_x = random.randint(30, 450)

        if score % 5 == 0:          # every 5 stars = new level!
            level = level + 1
            speed = speed + 1.5
            gamelab.sound("win")

    gamelab.clear("#101a2b")
    gamelab.sprite("⭐", star_x, star_y, 32)
    gamelab.sprite("🧺", x, 250, 48)
    gamelab.text("Level " + str(level), 10, 10, 22, "#4ade80")
    gamelab.text("Stars: " + str(score), 350, 10, 22, "#ffd54a")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Add a big "LEVEL UP!" message that shows for a moment.',
            'Add a second star at level 3.',
            'Make the basket smaller as the level grows. Evil! 😈'
          ]
        },

        { t: 'tip', title: 'The golden rule of difficulty', html: `Level 1 should be so easy it feels like a warm hug. If a new player dies in level 1, they stop playing forever.` },

        {
          t: 'mission', emoji: '🪜', title: 'MISSION: Three levels', xp: 130,
          html: `<p>Add at least 3 levels to one of your games. Each level must change at least 2 things, and the player must be told when they level up.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m8', emoji: '💾', xp: 150,
      title: 'Saving the Game',
      goal: 'Remember the player, even after the computer is off.',
      blocks: [
        { t: 'text', html: `<p>When you close a game, the computer's memory is wiped. Everything in your variables — gone. 😱</p>
          <p>Unless you <b>write it to a file</b> first. That is all a save game is: a little file with your numbers in it.</p>` },

        { t: 'idea', html: `Python has a format made exactly for this: <b>JSON</b>. It looks almost the same as a Python dictionary, which makes it very easy to use.` },

        {
          t: 'run', code: `import json

save_data = {
    "name": "Alex",
    "level": 7,
    "health": 85,
    "coins": 340,
    "inventory": ["🗡️ sword", "🔑 key", "🧪 potion"]
}

# Turn it into text that can be stored
text = json.dumps(save_data)
print("This is what gets written to the file:")
print(text)

# Turn the text back into a real dictionary
loaded = json.loads(text)
print("\\nWelcome back,", loaded["name"])
print("You were on level", loaded["level"], "with", loaded["coins"], "coins")
print("Your bag:", loaded["inventory"])`,
          tasks: [
            'Add more things to the save: lives, high score, current map.',
            'Change a value in <code>loaded</code> and print it again.'
          ]
        },

        {
          t: 'real', title: 'Real saving (needs a real computer)', filename: 'save_demo.py',
          html: `<p>In a browser we cannot write files, but on <b>your</b> computer you can. Run this twice and watch it remember you!</p>`,
          code: `import json
import os

SAVE_FILE = "savegame.json"

# --- Load, if a save exists ---
if os.path.exists(SAVE_FILE):
    with open(SAVE_FILE) as f:
        player = json.load(f)
    print("💾 Save found! Welcome back,", player["name"])
    print("You have played", player["times_played"], "times")
else:
    player = {"name": input("New hero name: "), "level": 1, "times_played": 0}
    print("✨ New game started!")

# --- Play ---
player["times_played"] = player["times_played"] + 1
player["level"] = player["level"] + 1
print(f"{player['name']} is now level {player['level']}!")

# --- Save ---
with open(SAVE_FILE, "w") as f:
    json.dump(player, f)
print("💾 Game saved!")`,
          commands: `python save_demo.py
python save_demo.py`
        },

        { t: 'fun', html: `Open <code>savegame.json</code> in a text editor after playing. You can <b>read your own save file</b>… and even cheat by editing it. Now you know how game cheaters do it! 😏` },

        {
          t: 'mission', emoji: '💾', title: 'MISSION: Save file', xp: 130,
          html: `<p>On your real computer, make a program that remembers your name, your level and your high score between runs. Run it three times to prove it works.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m9', emoji: '✨', xp: 150,
      title: 'Polish — The Last 10%',
      goal: 'Turn "it works" into "it feels great".',
      blocks: [
        { t: 'text', html: `<p>Two games can have exactly the same rules, and one feels magical while the other feels flat. The difference is <b>polish</b>: tiny details that take very little code.</p>` },

        {
          t: 'code', caption: 'The polish checklist', code: `[ ] A title screen
[ ] Instructions ("Arrow keys to move")
[ ] A sound for every important event
[ ] Something that flashes or shakes when you get hit
[ ] A score that is easy to read
[ ] A satisfying game over screen
[ ] A restart key (never make them reload!)
[ ] Colours that fit the theme`
        },

        {
          t: 'lab', title: 'Juice it up: flash, shake and particles', w: 480, h: 300,
          code: `import gamelab
import random

gamelab.screen(480, 300)

x = 240.0
hurt_timer = 0
sparks = []

def each_frame():
    global x, hurt_timer

    if gamelab.key("left"):  x = x - 6
    if gamelab.key("right"): x = x + 6

    if gamelab.key("space") and hurt_timer == 0:
        hurt_timer = 20
        gamelab.sound("hit")
        for i in range(12):
            sparks.append({"x": x, "y": 200,
                           "dx": random.randint(-6, 6),
                           "dy": random.randint(-8, -2),
                           "life": 25})

    shake_x = 0
    background = "#101a2b"
    if hurt_timer > 0:
        hurt_timer = hurt_timer - 1
        shake_x = random.randint(-6, 6)
        background = "#3a1420"

    gamelab.clear(background)

    for spark in sparks:
        spark["x"] = spark["x"] + spark["dx"]
        spark["y"] = spark["y"] + spark["dy"]
        spark["dy"] = spark["dy"] + 0.5
        spark["life"] = spark["life"] - 1
        if spark["life"] > 0:
            gamelab.circle(spark["x"], spark["y"], 4, "#ffd54a")

    gamelab.text("Press SPACE to get hit!", 120, 30, 18, "#9fb2cd")
    gamelab.sprite("🤖", x + shake_x, 200, 52)

gamelab.on_frame(each_frame)`,
          tasks: [
            'Make the shake stronger and longer.',
            'Change the spark colour and number.',
            'Add sparks when you collect a coin in another game.'
          ]
        },

        { t: 'brain', html: `Game developers call this "<b>juice</b>" 🧃 — the flashes, shakes, sounds and particles that make an action feel powerful. Same rules, ten times more fun.` },

        {
          t: 'mission', emoji: '✨', title: 'MISSION: Polish pass', xp: 130,
          html: `<p>Take your best game and tick at least <b>6</b> items from the polish checklist. Then let somebody play it and watch for smiles.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's4m10', emoji: '👑', xp: 300,
      title: 'GAME #4: The Lost Kingdom',
      goal: 'A big adventure: map, enemies, items, levels and a boss.',
      blocks: [
        { t: 'text', html: `<p>👑 <b>THE BIG ONE</b> 👑</p>
          <p>This game uses almost everything you have learned: a map, collision, items, an enemy with a brain, a HUD, states and a boss.</p>
          <p>Play it. Understand it. Then make it yours — new map, new story, new monsters.</p>` },

        {
          t: 'lab', title: 'THE LOST KINGDOM', w: 480, h: 336,
          code: `import gamelab
import random

TILE = 24

level = [
    "####################",
    "#....#........#....#",
    "#.##.#.######.#.##.#",
    "#.#..............#.#",
    "#.#.####.##.####.#.#",
    "#......#....#......#",
    "####.#.#.##.#.#.####",
    "#......#....#......#",
    "#.####.######.####.#",
    "#..................#",
    "#.####.######.####.#",
    "#..................#",
    "####################"
]

gamelab.screen(480, 336)

state = "MENU"
x = 36.0
y = 36.0
coins = 0
health = 100
boss_x = 430.0
boss_y = 290.0
gems = []

def new_gems():
    gems.clear()
    for i in range(6):
        while True:
            gx = random.randint(1, 18) * TILE + 12
            gy = random.randint(1, 11) * TILE + 12
            if not is_wall(gx, gy):
                gems.append({"x": gx, "y": gy, "taken": False})
                break

def is_wall(px, py):
    col = int(px // TILE)
    row = int(py // TILE)
    if row < 0 or row >= len(level): return True
    if col < 0 or col >= len(level[row]): return True
    return level[row][col] == "#"

def draw_map():
    for row in range(len(level)):
        for col in range(len(level[row])):
            if level[row][col] == "#":
                gamelab.rect(col * TILE, row * TILE, TILE, TILE, "#2a3a52")

def each_frame():
    global state, x, y, coins, health, boss_x, boss_y

    gamelab.clear("#0a0f1e")

    if state == "MENU":
        gamelab.text("👑 THE LOST KINGDOM", 70, 110, 30, "#ffd54a")
        gamelab.text("Collect 6 gems. Avoid the dragon.", 90, 165, 16, "#9fb2cd")
        gamelab.text("Press SPACE to begin", 135, 200, 18, "#4ade80")
        if gamelab.key("space"):
            new_gems()
            x = 36.0
            y = 36.0
            coins = 0
            health = 100
            boss_x = 430.0
            boss_y = 290.0
            state = "PLAYING"
        return

    if state == "WIN":
        gamelab.text("🏆 YOU SAVED THE KINGDOM!", 60, 140, 26, "#4ade80")
        gamelab.text("Press R to play again", 140, 190, 16, "#9fb2cd")
        if gamelab.key("r"): state = "MENU"
        return

    if state == "LOSE":
        gamelab.text("💀 THE DRAGON WINS", 90, 140, 28, "#ff6b6b")
        gamelab.text("Press R to try again", 145, 190, 16, "#9fb2cd")
        if gamelab.key("r"): state = "MENU"
        return

    # ---- playing ----
    new_x = x
    new_y = y
    if gamelab.key("left"):  new_x = x - 3
    if gamelab.key("right"): new_x = x + 3
    if gamelab.key("up"):    new_y = y - 3
    if gamelab.key("down"):  new_y = y + 3
    if not is_wall(new_x, y): x = new_x
    if not is_wall(x, new_y): y = new_y

    # the dragon hunts you (slowly, and it can fly over walls!)
    if boss_x < x: boss_x = boss_x + 1.1
    if boss_x > x: boss_x = boss_x - 1.1
    if boss_y < y: boss_y = boss_y + 1.1
    if boss_y > y: boss_y = boss_y - 1.1

    if gamelab.hit(x, y, 20, boss_x, boss_y, 26):
        health = health - 20
        gamelab.sound("hit")
        x = 36.0                 # the dragon throws you back to the start!
        y = 36.0
        boss_x = 430.0
        boss_y = 290.0
        if health <= 0:
            state = "LOSE"
            gamelab.sound("lose")

    for gem in gems:
        if not gem["taken"] and gamelab.hit(x, y, 20, gem["x"], gem["y"], 20):
            gem["taken"] = True
            coins = coins + 1
            gamelab.sound("coin")
            if coins >= 6:
                state = "WIN"
                gamelab.sound("win")

    draw_map()
    for gem in gems:
        if not gem["taken"]:
            gamelab.sprite("💎", gem["x"], gem["y"], 18)
    gamelab.sprite("🐉", boss_x, boss_y, 26)
    gamelab.sprite("🤴", x, y, 20)

    gamelab.text("💎 " + str(coins) + "/6", 8, 310, 18, "#ffd54a")
    gamelab.text("❤️ " + str(health), 200, 310, 18, "#ff6b6b")
    gamelab.text("Arrows to move", 340, 312, 14, "#9fb2cd")

gamelab.on_frame(each_frame)`,
          tasks: [
            'Redesign the whole map.',
            'Add a 🗝️ key that must be collected before the gems count.',
            'Add potions 🧪 that give health back.',
            'Add a second dragon in hard mode.',
            'Change the story completely — space station? haunted school? candy world?'
          ]
        },

        {
          t: 'mission', emoji: '👑', title: 'BOSS MISSION: The Lost Kingdom', xp: 250,
          html: `<p>Make your own version with: your own map, at least 2 kinds of collectable, at least 1 enemy with a brain, a HUD, and MENU / WIN / LOSE screens.</p>
            <p>Finish it and the <b>Game Engineer</b> badge is yours. 🏅</p>`
        }
      ]
    }
  ]
});
