/* STAGE 2 — GAME PROGRAMMER */
(window.QUEST_STAGES = window.QUEST_STAGES || []).push({
  id: 's2',
  title: 'Game Programmer',
  emoji: '⚔️',
  badge: 'Game Programmer',
  subtitle: 'Loops, randomness, functions, inventories — the machinery of real games.',
  goal: 'Learn the tools that make a game repeat, surprise and remember.',
  lessons: [

    /* ---------------------------------------------------------------- */
    {
      id: 's2m1', emoji: '🔁', xp: 130,
      title: 'while — The Loop That Keeps Playing',
      goal: 'Make a game that keeps going until the hero falls.',
      blocks: [
        { t: 'text', html: `<p>Every real game repeats something over and over: <i>draw, check keys, move, repeat</i>. That repeating is called a <b>loop</b>.</p>
          <p>The first loop is <code>while</code>. It means: <i>"keep doing this <b>while</b> something is true."</i></p>` },

        {
          t: 'code', caption: 'The shape of a while loop', code: `while something_is_true:
    do this again
    and this
    (4 spaces = inside the loop)`
        },

        {
          t: 'run', code: `health = 100

while health > 0:
    print("You are still standing! HP:", health)
    health = health - 20

print("💀 You have fallen...")`,
          tasks: [
            'Change the damage from 20 to 35. How many rounds now?',
            'Start with 200 health.',
            'Add a line inside the loop that prints a battle cry.'
          ]
        },

        { t: 'brain', html: `Look carefully: <b>something inside the loop must change</b>, or the loop never ends. Here, <code>health</code> gets smaller every round until it is no longer above 0.` },

        { t: 'warn', title: 'The infinite loop 🌀', html: `If nothing changes, the loop runs forever and the page freezes. If that happens, just reload the page — nothing is broken. Every programmer does this at least once!` },

        {
          t: 'run', code: `# A countdown to launch
count = 5

while count > 0:
    print(count, "...")
    count = count - 1

print("🚀 LIFT OFF!")`,
          tasks: ['Count down from 10.', 'Count UP to 5 instead (start at 1, use <code>count &lt; 6</code> and <code>+ 1</code>).']
        },

        { t: 'idea', html: `Games often use <code>while True:</code> — a loop that runs forever — and stop it with <code>break</code> when the player quits. That is exactly how the main loop of Minecraft works!` },

        {
          t: 'run', code: `coins = 0

while True:
    answer = input("Dig for gold? (yes/no) ").lower()
    if answer == "no":
        break
    coins = coins + 10
    print("⛏️ You dig... +10 coins! Total:", coins)

print("You go home with", coins, "coins. 💰")`,
          tasks: ['Make each dig give a different amount.', 'Stop the game automatically when coins reach 50.']
        },

        {
          t: 'quiz', q: 'while health > 0:  — when does this loop stop?',
          options: ['After 10 times', 'When health is 0 or less', 'Never', 'When you press a key'],
          correct: 1,
          why: 'The loop checks the question before every round. As soon as it is False, the loop ends.'
        },

        {
          t: 'mission', emoji: '🔁', title: 'MISSION: Last stand', xp: 90,
          html: `<p>Make a battle where the hero loses HP every round and the loop keeps going until HP reaches 0. Print the round number each time (round 1, round 2…).</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m2', emoji: '🔂', xp: 120,
      title: 'for — Repeat an Exact Number of Times',
      goal: 'Fire five arrows with three lines of code.',
      blocks: [
        { t: 'text', html: `<p><code>while</code> repeats until something changes. <code>for</code> repeats an <b>exact number of times</b>. Perfect for attacks, waves of enemies, or drawing rows.</p>` },

        {
          t: 'run', code: `for i in range(5):
    print("🏹 Attack!")`,
          tasks: ['Change 5 to 10.', 'Add a second line inside the loop.']
        },

        { t: 'idea', html: `<code>range(5)</code> counts <b>0, 1, 2, 3, 4</b> — that is five numbers, but it starts at <b>zero</b>. Computers love starting at zero!` },

        {
          t: 'run', code: `for i in range(5):
    print("Round", i)

print("---")

for i in range(1, 6):
    print("Round", i)`,
          tasks: ['Which version looks better for a player? Use that one from now on.']
        },

        {
          t: 'predict', q: `How many enemies will appear, and what damage will the last one do?`,
          code: `for i in range(1, 4):
    damage = i * 10
    print(f"👹 Enemy {i} attacks for {damage} damage!")`,
          tasks: ['Make 6 enemies.', 'Make the damage grow faster with <code>i * 25</code>.']
        },

        {
          t: 'run', code: `# Drawing with loops
for i in range(1, 8):
    print("🔥" * i)`,
          tasks: ['Turn it upside down.', 'Draw a rectangle 5 rows tall and 10 wide.']
        },

        {
          t: 'quiz', q: 'How many times does  for i in range(3):  repeat?',
          options: ['2 times', '3 times', '4 times', 'Forever'],
          correct: 1,
          why: 'range(3) gives 0, 1, 2 — three turns.'
        },

        {
          t: 'mission', emoji: '🏹', title: 'MISSION: Attack combo', xp: 80,
          html: `<p>Use a <code>for</code> loop to make a 5-hit combo where each hit does more damage than the last, and print the enemy's health going down after every hit.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m3', emoji: '🎲', xp: 140,
      title: 'random — Surprises!',
      goal: 'Make every game different from the last.',
      blocks: [
        { t: 'text', html: `<p>What makes a game exciting? <b>You don't know what will happen.</b></p>
          <p>Python can roll dice for you with a tool called <code>random</code>.</p>` },

        { t: 'idea', html: `<code>import random</code> means <i>"Python, go and fetch the dice-rolling toolbox."</i> You only need to write it once, at the top of your program.` },

        {
          t: 'run', code: `import random

health = random.randint(10, 100)

print("👹 A monster appears!")
print("It has", health, "health!")`,
          tasks: [
            'Press RUN five times. Different every time!',
            'Make the monster have between 50 and 200 health.',
            'Add a random amount of coins it drops.'
          ]
        },

        { t: 'tip', html: `<code>random.randint(1, 6)</code> is exactly a six-sided dice 🎲. Both numbers are included.` },

        {
          t: 'run', code: `import random

monsters = ["🐉 Dragon", "👹 Goblin", "🕷️ Spider", "👻 Ghost", "🧟 Zombie"]

enemy = random.choice(monsters)
damage = random.randint(5, 25)

print("A wild", enemy, "attacks!")
print("It hits you for", damage, "damage!")`,
          tasks: [
            'Add three of your own monsters to the list.',
            'Add a random treasure using another <code>random.choice</code>.'
          ]
        },

        { t: 'idea', html: `<code>random.choice(...)</code> picks one item out of a list — like pulling a card from a deck. 🃏` },

        {
          t: 'run', code: `import random

print("🎯 GUESS THE NUMBER (1 to 10)")
secret = random.randint(1, 10)

guess = int(input("Your guess: "))

if guess == secret:
    print("🎉 AMAZING! You read my mind!")
elif abs(guess - secret) <= 2:
    print("🔥 So close! It was", secret)
else:
    print("❄️ Cold. It was", secret)`,
          tasks: [
            'Give the player 3 guesses using a <code>for</code> loop.',
            'Say "too high" or "too low" after each guess.'
          ]
        },

        {
          t: 'quiz', q: 'random.randint(1, 6) can give you...',
          options: ['Only 1 or 6', 'Any whole number from 1 to 6', 'Any number from 0 to 6', 'A random word'],
          correct: 1,
          why: 'randint means "random integer" — a whole number between the two values, including both.'
        },

        {
          t: 'mission', emoji: '🎲', title: 'MISSION: Random monster generator', xp: 100,
          html: `<p>Make a program that creates a monster with a random name, random health, random attack damage and random treasure. Run it 5 times and show your favourite monster to someone.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m4', emoji: '🛠️', xp: 150,
      title: 'Functions — Your Own Commands',
      goal: 'Invent attack(), heal() and run_away().',
      blocks: [
        { t: 'text', html: `<p>So far you have used commands Python gave you: <code>print</code>, <code>input</code>, <code>randint</code>.</p>
          <p>Now you will <b>invent your own</b>. A command you build yourself is called a <b>function</b>.</p>` },

        { t: 'idea', html: `<code>def</code> means <i>"define"</i> — <b>"Python, learn this new move."</b> The code inside only runs when you <b>call</b> it by name.` },

        {
          t: 'run', code: `def attack():
    print("⚔️ You swing your sword!")
    print("💥 The enemy takes damage!")

# Nothing happens until we CALL it:
attack()
attack()
attack()`,
          tasks: [
            'Add a <code>heal()</code> function and call it.',
            'Add a <code>run_away()</code> function.',
            'Delete one <code>attack()</code> call — see how you control everything.'
          ]
        },

        { t: 'brain', html: `Why bother? Because you write the move <b>once</b> and use it a hundred times. If you want to change how attacking works, you change <b>one</b> place. That is the secret superpower of programmers: never write the same thing twice.` },

        { t: 'idea', html: `Functions get much more powerful when you give them <b>ingredients</b> (called <b>parameters</b>) inside the brackets.` },

        {
          t: 'run', code: `def attack(weapon, damage):
    print(f"⚔️ You attack with the {weapon}!")
    print(f"💥 It does {damage} damage!")

attack("sword", 20)
attack("fire staff", 45)
attack("rubber chicken", 1)`,
          tasks: [
            'Invent three more weapons.',
            'Add a third ingredient: the name of the enemy.'
          ]
        },

        { t: 'text', html: `<p>A function can also <b>give something back</b> with <code>return</code> — like a machine that takes ingredients and hands you a result.</p>` },

        {
          t: 'run', code: `import random

def roll_damage(minimum, maximum):
    return random.randint(minimum, maximum)

hit1 = roll_damage(5, 15)
hit2 = roll_damage(20, 40)

print("First hit:", hit1)
print("Big hit:", hit2)
print("Total damage:", hit1 + hit2)`,
          tasks: ['Make a <code>critical_hit()</code> function that returns double damage.']
        },

        {
          t: 'fix', goal: 'This function is never used. Can you spot why nothing happens? (Hint: you must CALL it.)',
          code: `def victory():
    print("🏆 YOU WIN!")

print("The battle is over...")`
        },

        {
          t: 'quiz', q: 'What does  def heal():  do?',
          options: ['It heals the player immediately', 'It teaches Python a new command called heal', 'It deletes the heal command', 'It prints the word heal'],
          correct: 1,
          why: 'def only DEFINES the function. It runs when you call it: heal()',
        },

        {
          t: 'mission', emoji: '🛠️', title: 'MISSION: Battle moves', xp: 100,
          html: `<p>Create four functions — <code>attack()</code>, <code>heal()</code>, <code>run_away()</code> and <code>find_treasure()</code> — and call them in a story order that makes sense.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m5', emoji: '🎒', xp: 140,
      title: 'Lists — Your Inventory',
      goal: 'Build a backpack that can hold anything.',
      blocks: [
        { t: 'text', html: `<p>One box holds one thing. But a hero needs a <b>backpack</b> that holds many things.</p>
          <p>That is a <b>list</b>. You write it with square brackets <code>[ ]</code>.</p>` },

        {
          t: 'run', code: `inventory = ["🗡️ sword", "🛡️ shield", "🧪 potion"]

print("Your backpack:", inventory)
print("You have", len(inventory), "items")
print("Your first item is:", inventory[0])`,
          tasks: ['Print item number 2.', 'Try <code>inventory[9]</code> — read the bug!']
        },

        { t: 'warn', title: 'Counting starts at ZERO', html: `<code>inventory[0]</code> is the <b>first</b> item, <code>inventory[1]</code> is the second… This confuses everybody at first. Blame computers. 🤷` },

        {
          t: 'run', code: `inventory = ["🗡️ sword"]

print("Start:", inventory)

inventory.append("🧪 potion")      # pick something up
print("Found a potion!", inventory)

inventory.append("🔑 golden key")
print("Found a key!", inventory)

inventory.remove("🧪 potion")      # drink it
print("You drink the potion:", inventory)`,
          tasks: ['Pick up 3 more items.', 'Remove the sword — what if you remove something that is not there?']
        },

        { t: 'idea', html: `<code>.append(x)</code> = put something in the backpack.<br><code>.remove(x)</code> = take something out.<br><code>len(list)</code> = how many things are inside.` },

        { t: 'text', html: `<p>The magic trick: a <code>for</code> loop can walk through a whole list, one item at a time.</p>` },

        {
          t: 'run', code: `inventory = ["🗡️ sword", "🛡️ shield", "🧪 potion", "🔑 key"]

print("=== YOUR BACKPACK ===")
for item in inventory:
    print("-", item)
print("=====================")`,
          tasks: ['Number the items 1, 2, 3 using a counter variable.']
        },

        {
          t: 'run', code: `inventory = ["🗡️ sword", "🔑 key"]

if "🔑 key" in inventory:
    print("🚪 You unlock the secret door!")
else:
    print("🔒 The door is locked. You need a key.")`,
          tasks: ['Remove the key from the list and run again.', 'Add a check for a potion before healing.']
        },

        {
          t: 'quiz', q: 'inventory = ["a", "b", "c"] — what is inventory[1] ?',
          options: ['"a"', '"b"', '"c"', 'An error'],
          correct: 1,
          why: 'Position 0 is "a", so position 1 is "b".'
        },

        {
          t: 'mission', emoji: '🎒', title: 'MISSION: Inventory system', xp: 100,
          html: `<p>Make a program where the player finds 3 items (added with <code>.append</code>), uses one (removed with <code>.remove</code>), and prints the backpack nicely with a <code>for</code> loop each time.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m6', emoji: '📖', xp: 140,
      title: 'Dictionaries — Character Sheets',
      goal: 'Keep all the stats of a hero in one place.',
      blocks: [
        { t: 'text', html: `<p>A list is great, but you have to remember that position 3 is the health… messy!</p>
          <p>A <b>dictionary</b> stores things with a <b>label</b>, exactly like a real character sheet.</p>` },

        {
          t: 'run', code: `player = {
    "name": "Alex",
    "health": 100,
    "coins": 20,
    "level": 3
}

print("Hero:", player["name"])
print("Health:", player["health"])
print("Coins:", player["coins"])`,
          tasks: ['Add "weapon" and print it.', 'Try <code>player["magic"]</code> — read the bug carefully!']
        },

        { t: 'idea', html: `Curly brackets <code>{ }</code> = dictionary. Inside, each item is <code>"label": value</code>. You get things out by their label, not by a number. Much easier to read!` },

        {
          t: 'run', code: `player = {"name": "Alex", "health": 100, "coins": 20}

# The dragon bites!
player["health"] = player["health"] - 35
print("💔 Ouch! Health is now", player["health"])

# You find gold
player["coins"] = player["coins"] + 50
print("💰 Coins:", player["coins"])

# You gain a new power
player["magic"] = "🔥 fireball"
print("✨ New power:", player["magic"])`,
          tasks: ['Heal the player by 20.', 'Add a "lives" stat and take one away.']
        },

        {
          t: 'run', code: `dragon = {"name": "Smaug", "health": 200, "attack": 35}
goblin = {"name": "Snik", "health": 40, "attack": 8}

for monster in [dragon, goblin]:
    print(f"{monster['name']}: {monster['health']} HP, {monster['attack']} attack")`,
          tasks: ['Add a third monster.', 'Make the goblin much stronger.']
        },

        { t: 'brain', html: `See what happened there? A <b>list of dictionaries</b> = a whole army of monsters, each with its own stats. That is how real games store enemies!` },

        {
          t: 'quiz', q: 'How do you get the health out of  player = {"name": "Ana", "health": 80} ?',
          options: ['player[1]', 'player.health()', 'player["health"]', 'health(player)'],
          correct: 2,
          why: 'You ask for the label in square brackets.'
        },

        {
          t: 'mission', emoji: '📖', title: 'MISSION: Monster codex', xp: 100,
          html: `<p>Create 3 monsters as dictionaries (name, health, attack, treasure) and print a beautiful "Monster Codex" page using a <code>for</code> loop.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m7', emoji: '⚔️', xp: 160,
      title: 'Build a Battle System',
      goal: 'Combine everything into a real fight.',
      blocks: [
        { t: 'text', html: `<p>Now we put <b>all</b> your tools in one machine: variables, if, while, random, functions and dictionaries.</p>
          <p>This is a real battle engine. Read it slowly — you understand every single line.</p>` },

        {
          t: 'run', code: `import random

player = {"name": "Hero", "health": 100, "attack": 20, "potions": 2}
enemy  = {"name": "Goblin", "health": 60, "attack": 12}

def show_status():
    print(f"\\n❤️ {player['name']}: {player['health']} HP   |   👹 {enemy['name']}: {enemy['health']} HP")

def player_attack():
    damage = random.randint(5, player["attack"])
    enemy["health"] = enemy["health"] - damage
    print(f"⚔️ You hit the {enemy['name']} for {damage}!")

def enemy_attack():
    damage = random.randint(3, enemy["attack"])
    player["health"] = player["health"] - damage
    print(f"👹 The {enemy['name']} hits you for {damage}!")

def drink_potion():
    if player["potions"] > 0:
        player["potions"] = player["potions"] - 1
        player["health"] = player["health"] + 30
        print(f"🧪 You drink a potion! +30 HP ({player['potions']} left)")
    else:
        print("😱 No potions left!")

print("⚔️ === BATTLE START === ⚔️")

while player["health"] > 0 and enemy["health"] > 0:
    show_status()
    move = input("ATTACK, HEAL or RUN? ").upper()

    if move == "ATTACK":
        player_attack()
    elif move == "HEAL":
        drink_potion()
    elif move == "RUN":
        print("🏃 You escape! The battle ends.")
        break
    else:
        print("🤔 You hesitate and do nothing!")

    if enemy["health"] > 0:
        enemy_attack()

if player["health"] <= 0:
    print("\\n💀 GAME OVER")
elif enemy["health"] <= 0:
    print("\\n🏆 VICTORY! The goblin is defeated!")`,
          tasks: [
            'Change the enemy into a dragon with 200 HP.',
            'Give the player 5 potions.',
            'Add a new move: DEFEND (halves the enemy damage this turn).',
            'Give the enemy a rare super-attack using <code>random.randint(1, 10) == 1</code>.'
          ]
        },

        { t: 'tip', title: 'Reading big code', html: `Never read a big program from top to bottom like a book. Find the <b>while</b> loop — that is the heart. Everything else is just moves the loop can use.` },

        {
          t: 'mission', emoji: '⚔️', title: 'MISSION: Your battle engine', xp: 120,
          html: `<p>Change at least <b>four</b> things in the battle system so it becomes <i>your</i> game: new hero, new enemy, new move, new numbers, new messages.</p>`
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's2m8', emoji: '🐲', xp: 220,
      title: 'MINI GAME #2: Dragon Battle',
      goal: 'A complete game with a random dragon, inventory and endings.',
      blocks: [
        { t: 'text', html: `<p>🔥 <b>BOSS LEVEL</b> 🔥 — a full game with a <b>randomly generated dragon</b>. Every fight is different.</p>` },

        {
          t: 'run', code: `import random

names = ["Smaug", "Blazefang", "Nightwing", "Emberclaw", "Frostbite"]
colors = ["🔴 red", "🟢 green", "🔵 blue", "⚫ black", "⚪ white"]

dragon = {
    "name": random.choice(names),
    "color": random.choice(colors),
    "health": random.randint(80, 160),
    "attack": random.randint(10, 25)
}

player = {"name": "Hero", "health": 120, "attack": 25, "inventory": ["🧪 potion", "🧪 potion", "🗡️ sword"]}

print("=" * 40)
print(f"  🐉 A {dragon['color']} dragon called {dragon['name']}!")
print(f"  Health: {dragon['health']}   Attack: {dragon['attack']}")
print("=" * 40)

turn = 0
while player["health"] > 0 and dragon["health"] > 0:
    turn = turn + 1
    print(f"\\n--- TURN {turn} ---")
    print(f"❤️ You: {player['health']} HP   🐉 {dragon['name']}: {dragon['health']} HP")
    print("Backpack:", player["inventory"])

    move = input("ATTACK / HEAL / RUN? ").upper()

    if move == "ATTACK":
        damage = random.randint(10, player["attack"])
        if random.randint(1, 6) == 6:
            damage = damage * 3
            print("💥 CRITICAL HIT!")
        dragon["health"] = dragon["health"] - damage
        print(f"⚔️ You hit {dragon['name']} for {damage}!")

    elif move == "HEAL":
        if "🧪 potion" in player["inventory"]:
            player["inventory"].remove("🧪 potion")
            player["health"] = player["health"] + 40
            print("🧪 +40 HP!")
        else:
            print("😱 No potions left!")

    elif move == "RUN":
        print("🏃 You flee the cave. The dragon roars behind you...")
        break

    else:
        print("🤔 You freeze in fear and lose your turn!")

    if dragon["health"] > 0:
        damage = random.randint(5, dragon["attack"])
        player["health"] = player["health"] - damage
        print(f"🔥 {dragon['name']} breathes fire for {damage}!")

print("\\n" + "=" * 40)
if player["health"] <= 0:
    print("💀 The dragon wins. GAME OVER.")
elif dragon["health"] <= 0:
    print(f"🏆 VICTORY! You defeated {dragon['name']} in {turn} turns!")
    print("💎 You find a mountain of treasure!")
print("=" * 40)`,
          tasks: [
            'Add a new item to the backpack that does something special.',
            'Add a second enemy that appears if you win.',
            'Give the dragon a special move that only happens sometimes.',
            'Add a difficulty question at the start (easy / hard) that changes the dragon\'s health.'
          ]
        },

        {
          t: 'real', title: 'Real game file', filename: 'dragon_battle.py',
          html: `<p>Save <b>your</b> version to your real computer and play it in the terminal.</p>`,
          code: `# Paste your Dragon Battle here
print("🐉 DRAGON BATTLE")`,
          commands: `cd PythonQuest\\Games
python dragon_battle.py`
        },

        {
          t: 'mission', emoji: '🐲', title: 'BOSS MISSION: Dragon Battle', xp: 180,
          html: `<p>Your Dragon Battle must include: a random dragon, a battle loop, an inventory, at least 3 moves, a victory ending and a game-over ending.</p>
            <p>Beat it once yourself — then you have earned <b>Game Programmer</b>! 🏅</p>`
        }
      ]
    }
  ]
});
