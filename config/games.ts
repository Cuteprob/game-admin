export type GameType = 
  | "Racing"      // 赛车
  | "Action"      // 动作
  | "Shooter"     // 射击
  | "Puzzle"      // 解谜
  | "Strategy"    // 策略
  | "Sports"      // 体育
  | "Adventure";  // 冒险

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  image: string;
  rating: number;
  type: GameType;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  controls: {
    fullscreenTip: string;
    guide: {
      movement: string[];
      actions: string[];
      special?: string[];
    };
  };
  features: string[];  // 游戏特定的特性列表
  faqs: {
    question: string;
    answer: string;
    category: 'gameplay' | 'technical' | 'features' | 'general';
  }[];
}

export const games: Game[] = [
  {
    id: "formula-rush",
    title: "Formula Rush Online",
    description: "Experience intense Formula racing with realistic physics and challenging tracks!",
    iframeUrl: "https://html5.gamemonetize.games/a6oif7iluz0nwpj3s67g9z6i4przm1ga/",
    image: "/games/Formula-Rush.jpg",
    rating: 5,
    type: "Racing",
    metadata: {
      title: "Formula Rush - High Speed Racing Game | House of Hazards",
      description: "Experience intense Formula racing with realistic physics and challenging tracks. Master your driving skills and compete for the fastest lap times.",
      keywords: [
        "formula rush",
        "racing game",
        "time trial",
        "competitive racing"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Formula Rush, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Use Arrow Keys or WASD to control your car",
          "UP/W - Accelerate",
          "DOWN/S - Brake/Reverse",
          "LEFT/A - Steer Left",
          "RIGHT/D - Steer Right"
        ],
        actions: [
          "SPACE - Handbrake",
          "R - Quick Restart",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Authentic Formula Rush racing experience",
      "Formula Rush physics system",
      "Multiple Formula Rush racing tracks",
      "Formula Rush time trials",
      "Global Formula Rush leaderboards",
      "Instant Formula Rush gameplay",
      "Regular Formula Rush updates",
      "No download required"
    ],
    faqs: [
      {
        question: "How do I improve my lap times in Formula Rush?",
        answer: "Focus on mastering the racing line, brake before corners, and accelerate out of them. Use the handbrake for tight turns, and practice each track to learn its unique characteristics. Regular practice will help you find the optimal racing lines.",
        category: "gameplay"
      },
      {
        question: "What are the different racing modes available?",
        answer: "Formula Rush features time trial competitions where you can compete for the best lap times, practice mode for learning tracks, and global leaderboard challenges to compete with players worldwide.",
        category: "features"
      },
      {
        question: "How does the physics system work?",
        answer: "The game features realistic physics including momentum, grip, and weight transfer. Your car's handling changes based on speed, surface conditions, and racing line. Understanding these physics is key to achieving better times.",
        category: "technical"
      },
      {
        question: "Can I compete with other players?",
        answer: "Yes! You can compete through global leaderboards, comparing lap times with players worldwide. While there's no direct multiplayer, the leaderboard system creates competitive gameplay.",
        category: "gameplay"
      },
      {
        question: "What's the best way to handle difficult corners?",
        answer: "Approach corners at the right speed, brake in a straight line before the turn, hit the apex, and accelerate smoothly out of the corner. The handbrake can help with particularly tight corners.",
        category: "gameplay"
      },
      {
        question: "Are there any secret techniques for faster times?",
        answer: "Advanced techniques include trail braking, using momentum through corners, and finding the perfect racing line. Some tracks have shortcuts or optimal paths that can be discovered through exploration.",
        category: "gameplay"
      },
      {
        question: "How do the global leaderboards work?",
        answer: "Your best lap times are automatically submitted to the global leaderboards. You can view rankings, compare times with other players, and see what times you need to beat to climb the rankings.",
        category: "features"
      }
    ]
  },
  {
    id: "insane-track-supercars",
    title: "Insane Track Supercars",
    description: "Master extreme tracks with high-performance supercars in intense racing challenges!",
    iframeUrl: "https://html5.gamemonetize.games/efaz2lsw2m6obg8771kq3dkopxex8wym/",
    image: "/games/Insane-Track-Supercars.jpg",
    rating: 5,
    type: "Racing",
    metadata: {
      title: "Insane Track Supercars - Extreme Racing Game | House of Hazards",
      description: "Race through extreme tracks with high-performance supercars. Master challenging layouts, compete in time trials, and unlock powerful vehicles in this intense racing game.",
      keywords: [
        "insane track supercars",
        "extreme racing",
        "supercar game",
        "time trials"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Insane Track Supercars, press ESC to exit fullscreen",
      guide: {
        movement: [
          "UP/W - Accelerate",
          "DOWN/S - Brake/Reverse",
          "LEFT/A - Steer Left",
          "RIGHT/D - Steer Right"
        ],
        actions: [
          "SPACE - Handbrake",
          "R - Quick Restart",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Authentic Insane Track Supercars racing experience",
      "Multiple challenging Insane Track layouts",
      "High-performance Insane Track Supercars selection",
      "Advanced Insane Track physics system",
      "Competitive Insane Track time trials",
      "Progressive difficulty system",
      "Instant Insane Track Supercars action",
      "Regular content updates"
    ],
    faqs: [
      {
        question: "What makes Insane Track Supercars different from other racing games?",
        answer: "Insane Track Supercars combines extreme track designs with high-performance supercars, creating unique racing challenges. The Insane Track Supercars experience features intense elevation changes, tight corners, and spectacular jumps not found in traditional racing games.",
        category: "features"
      },
      {
        question: "How do I unlock new supercars?",
        answer: "New cars can be unlocked by completing time trials, achieving specific track objectives, and reaching certain performance milestones. Each supercar has unique handling characteristics and performance stats.",
        category: "gameplay"
      },
      {
        question: "What's the best way to handle the extreme track layouts?",
        answer: "Master the use of brakes and throttle control, especially on jumps and steep sections. Use the handbrake for tight hairpins, and learn each track's unique challenges. Different cars may perform better on different tracks.",
        category: "gameplay"
      },
      {
        question: "How does the time trial mode work?",
        answer: "Time trials challenge you to achieve the best possible lap time. Your times are recorded and can be compared with other players. Practice mode allows you to learn tracks without pressure.",
        category: "features"
      },
      {
        question: "Are there different difficulty levels?",
        answer: "The game progressively increases in difficulty as you advance through tracks. Each track presents unique challenges, and mastering the more extreme layouts requires significant skill and practice.",
        category: "gameplay"
      },
      {
        question: "What makes each supercar unique?",
        answer: "Each supercar has different acceleration, top speed, handling, and braking characteristics. Some cars excel at technical sections, while others are better suited for high-speed tracks.",
        category: "features"
      },
      {
        question: "How can I improve my racing technique?",
        answer: "Focus on smooth inputs, proper braking points, and maintaining momentum. Learn each car's limits and practice the more challenging sections of tracks. Use the restart feature to perfect difficult segments.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "city-car-stunt-4",
    title: "City Car Stunt 4",
    description: "Perform epic stunts and race through City Car Stunt 4!",
    iframeUrl: "https://www.twoplayergames.org/embed/city-car-stunt-4",
    image: "/games/city-car-stune4.jpg",
    rating: 4.8, // 初始评分
    type: "Racing" as GameType,
    metadata: {
      title: "City Car Stunt 4 - Urban Racing Challenge | House of Hazards",
      description: "Race through urban tracks, perform epic stunts, and collect diamonds in City Car Stunt 4. Master challenging routes and compete in both single and multiplayer modes.",
      keywords: [
        "city car stunt 4",
        "car stunts",
        "racing game",
        "multiplayer racing"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand City Car Stunt 4, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: Arrow Keys to Drive",
          "Player 2: WASD to Drive"
        ],
        actions: [
          "Player 1: N for Nitro",
          "Player 1: B to Look Back",
          "Player 2: T for Nitro",
          "Player 2: C to Look Back",
          "R to Restart Level"
        ]
      }
    },
    features: [
      "Exciting City Car Stunt 4 racing experience",
      "Multiple City Car Stunt racing routes",
      "Extensive car upgrade system",
      "Huge Free Driving map exploration",
      "Diamond and bonus collection system",
      "Strategic teleport points",
      "Competitive AI racing opponents",
      "Advanced car customization options",
      "Both single and multiplayer modes"
    ],
    faqs: [
      {
        question: "How do I unlock new cars in City Car Stunt 4?",
        answer: "You can unlock new cars by collecting diamonds during gameplay and winning races. Each car has different performance stats and costs. Visit the garage to see available cars and their requirements.",
        category: "gameplay"
      },
      {
        question: "What's special about the Free Driving map?",
        answer: "The Free Driving map is a huge open world where you can practice stunts, collect diamonds, and explore freely. It features teleport points for quick navigation and various bonus boxes with surprises.",
        category: "features"
      },
      {
        question: "How does the multiplayer mode work?",
        answer: "City Car Stunt 4 supports both 1 Player and 2 Player modes. In 2 Player mode, you can compete head-to-head using split controls, making it perfect for local multiplayer fun.",
        category: "gameplay"
      },
      {
        question: "What are the bonus boxes and how do I use them?",
        answer: "Bonus boxes are special items scattered throughout the maps that provide various power-ups and surprises. Drive through them to activate their effects and enhance your gameplay experience.",
        category: "features"
      },
      {
        question: "How do I complete race routes efficiently?",
        answer: "To complete race routes efficiently, learn the track layouts, use nitro strategically, and take advantage of shortcuts. Practice makes perfect, and each car handles differently on various tracks.",
        category: "gameplay"
      },
      {
        question: "Can I customize my cars?",
        answer: "Yes, you can customize and upgrade your cars after each race. Visit the garage to improve performance stats and customize the appearance of your vehicles.",
        category: "features"
      },
      {
        question: "How do I use the teleport points effectively?",
        answer: "Blue teleport points help you navigate quickly around the Free Driving map. Use them to reach higher areas, access hidden diamonds, or quickly move between different sections of the map.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "rise-of-speed",
    title: "Rise of Speed",
    description: "Race through unique tracks including a special space map!",
    iframeUrl: "https://www.twoplayergames.org/embed/rise-of-speed",
    image: "/games/Rise_of_Speed.jpg",
    rating: 4.9,
    type: "Racing",
    metadata: {
      title: "Rise of Speed - Space Racing Adventure | House of Hazards",
      description: "Experience high-speed racing across unique tracks including a special space map. Upgrade your cars, compete in tournaments, and master challenging courses.",
      keywords: [
        "rise of speed",
        "space racing",
        "racing game",
        "car upgrades"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Rise of Speed, press ESC to exit fullscreen mode",
      guide: {
        movement: [
          "Arrow Keys or WASD - Control your vehicle",
          "UP/W - Accelerate",
          "DOWN/S - Brake/Reverse",
          "LEFT/A - Turn Left",
          "RIGHT/D - Turn Right"
        ],
        actions: [
          "SPACE - Brake",
          "N - Activate Nitro Boost",
          "ESC - Pause Game/Settings"
        ]
      }
    },
    features: [
      "Rise of Speed's signature off-road tracks",
      "Unique Rise of Speed space environment",
      "Comprehensive Rise of Speed upgrade system",
      "Multiple super-sport cars to unlock",
      "Rise of Speed tournament mode",
      "Support for 11 different languages",
      "Advanced garage customization",
      "Progressive difficulty levels",
      "Regular content updates"
    ],
    faqs: [
      {
        question: "How do I unlock new routes in Rise of Speed?",
        answer: "New routes are unlocked by winning races and earning rewards. Continue winning tournaments to progress through the game and access new challenging tracks, including the special space map.",
        category: "gameplay"
      },
      {
        question: "What makes the space map different?",
        answer: "The space map is a unique bonus track that offers a completely different racing experience with zero gravity effects, special obstacles, and unique visual effects. It provides an extra challenge for skilled players.",
        category: "features"
      },
      {
        question: "How does the car upgrade system work?",
        answer: "Visit the GARAGE to upgrade your car's performance using rewards earned from races. You can improve various stats like speed, acceleration, and handling. Different routes may require different upgrade focuses.",
        category: "gameplay"
      },
      {
        question: "What languages are supported in the game?",
        answer: "Rise of Speed supports 11 different languages that can be selected from the in-game settings menu, making it accessible to a global audience. Choose your preferred language for the best experience.",
        category: "technical"
      },
      {
        question: "How do I master the off-road tracks?",
        answer: "Off-road tracks require careful handling and proper use of brakes. Learn each track's unique challenges, use nitro wisely, and upgrade your car's handling for better performance on rough terrain.",
        category: "gameplay"
      },
      {
        question: "What's the best way to win tournaments?",
        answer: "To win tournaments, focus on upgrading your car appropriately for each track, learn the optimal racing lines, and use nitro strategically. Practice each track to improve your performance.",
        category: "gameplay"
      },
      {
        question: "How do I earn rewards quickly?",
        answer: "Earn rewards faster by completing races with good performance, winning tournaments, and replaying challenging tracks. Better performance and higher difficulty tracks offer more rewards.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "basket-random",
    title: "Basket Random",
    description: "Master one-key basketball controls in this unpredictable sports game!",
    iframeUrl: "https://www.twoplayergames.org/embed/basket-random",
    image: "/games/Basket_Random.jpg",
    rating: 4.7,
    type: "Sports",
    metadata: {
      title: "Basket Random - Fun Basketball Game | House of Hazards",
      description: "Play Basket Random online! Experience unique one-key basketball gameplay with random variations. Challenge CPU or play with friends in 2-player mode. Free to play in your browser!",
      keywords: [
        "basket random",
        "basketball game",
        "2 player basketball",
        "sports game",
        "online basketball",
        "multiplayer sports",
        "casual sports game",
        "free sports game",
        "random basketball",
        "browser basketball",
        "arcade basketball",
        "fun sports game",
        "simple controls",
        "competitive game",
        "family friendly game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Basket Random, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: W key to shoot",
          "Player 2: UP ARROW key to shoot"
        ],
        actions: [
          "Time your shots carefully!",
          "Watch for random variations",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Simple one-key control system",
      "Single player vs CPU mode",
      "Two player competitive mode",
      "Random court variations",
      "Different player characters",
      "Various ball types",
      "First to 5 points wins",
      "Quick and fun matches"
    ],
    faqs: [
      {
        question: "How does the one-key control system work?",
        answer: "The game uses a unique single-key control system. Player 1 uses the W key, while Player 2 uses the UP ARROW key. Timing your button presses is crucial for making successful shots.",
        category: "gameplay"
      },
      {
        question: "What makes each round different?",
        answer: "Each round features random variations in the playing field, player characters, and ball types. These random elements keep the game fresh and challenging, requiring players to adapt their strategy.",
        category: "features"
      },
      {
        question: "How does scoring work?",
        answer: "The first player to score 5 points wins the game. Points are earned by successfully making baskets. The random elements add an extra layer of challenge to scoring.",
        category: "gameplay"
      },
      {
        question: "Can I play against the computer?",
        answer: "Yes! You can play against the CPU in single-player mode, or challenge a friend in 2-player mode. The CPU provides a good practice opportunity before competing with friends.",
        category: "features"
      },
      {
        question: "What are the different game modes?",
        answer: "Basket Random offers both single-player (vs CPU) and two-player modes. Each mode maintains the same random elements and scoring system to 5 points.",
        category: "gameplay"
      },
      {
        question: "How do I improve my shooting accuracy?",
        answer: "Practice timing your shots based on the current situation. Watch for the random variations and adjust your timing accordingly. Each new element requires slightly different timing.",
        category: "gameplay"
      },
      {
        question: "Are there any special techniques?",
        answer: "While the controls are simple, mastering the timing for different situations is key. Pay attention to the arc of your shots and how different random elements affect ball movement.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "getaway-shootout",
    title: "Getaway Shootout",
    description: "Race to the helicopter while battling opponents with unique mechanics!",
    iframeUrl: "https://www.twoplayergames.org/embed/getaway-shootout",
    image: "/games/Getaway_Shootout.jpg",
    rating: 4.8,
    type: "Shooter",
    metadata: {
      title: "Getaway Shootout - Strategic Battle Game | House of Hazards",
      description: "Play Getaway Shootout online! Master Getaway Shootout's unique mechanics, collect weapons, and compete in thrilling battles. Experience intense multiplayer action!",
      keywords: [
        "getaway shootout",
        "strategic battle",
        "multiplayer shooter",
        "online shooting game",
        "racing shooter",
        "action game",
        "competitive game",
        "free shooter game",
        "browser shooter",
        "arcade shooter",
        "escape game",
        "power-up game",
        "physics game",
        "battle game",
        "helicopter escape"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Getaway Shootout, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: W to jump left",
          "Player 1: E to jump right",
          "Player 2: I to jump left",
          "Player 2: O to jump right"
        ],
        actions: [
          "Player 1: R to use power-up",
          "Player 2: P to use power-up",
          "ESC - Pause Game"
        ],
        special: [
          "Time your jumps carefully",
          "Use power-ups strategically",
          "Watch for obstacles"
        ]
      }
    },
    features: [
      "Unique Getaway Shootout movement system",
      "Strategic Getaway Shootout combat",
      "Multiple weapon types",
      "Local multiplayer battles",
      "AI opponent challenges",
      "Power-up collection system",
      "Race to helicopter objective",
      "Physics-based gameplay",
      "Quick match system"
    ],
    faqs: [
      {
        question: "How does the jumping system work?",
        answer: "Players can jump left or right using their respective controls (W/E for Player 1, I/O for Player 2). The direction and timing of your jumps are crucial for reaching the extraction point first and avoiding obstacles.",
        category: "gameplay"
      },
      {
        question: "What types of power-ups are available?",
        answer: "The game features various weapons and power-ups that can help you gain an advantage. Collect them along the way and use them strategically with R (Player 1) or P (Player 2) to impede opponents or boost your progress.",
        category: "features"
      },
      {
        question: "Can I play against the computer?",
        answer: "Yes! You can play single-player mode against AI opponents or challenge a friend in two-player mode. The AI provides good practice before competing against other players.",
        category: "gameplay"
      },
      {
        question: "What's the main objective of the game?",
        answer: "Your goal is to reach the extraction point before other players. You'll need to use a combination of movement skills, combat abilities, and strategic power-up usage to succeed.",
        category: "gameplay"
      },
      {
        question: "How do I get better at the game?",
        answer: "Practice the jumping mechanics, learn to time your jumps, and use weapons strategically. Understanding the physics of movement and mastering the shooting mechanics will improve your performance.",
        category: "gameplay"
      },
      {
        question: "What makes each round different?",
        answer: "Each round features different weapon and power-up placements, creating unique strategic opportunities. The competition between players also makes each game session unique and exciting.",
        category: "features"
      },
      {
        question: "Are there different game modes?",
        answer: "The game offers both single-player and two-player local multiplayer modes. Each mode maintains the same core mechanics while offering different competitive experiences.",
        category: "features"
      }
    ]
  },
  {
    id: "g-switch-3",
    title: "G Switch 3",
    description: "Control multiple runners in gravity-defying multiplayer challenges!",
    iframeUrl: "https://www.twoplayergames.org/embed/g-switch-3",
    image: "/games/G_Switch_3.jpg",
    rating: 4.8,
    type: "Sports",
    metadata: {
      title: "G Switch 3 - Multiplayer Running Game | House of Hazards",
      description: "Play G Switch 3 online! Master gravity-defying runs, compete with up to 8 players, and challenge yourself with new mechanics. Features multiple characters, boosters, and intense multiplayer action.",
      keywords: [
        "g switch 3",
        "multiplayer running",
        "gravity switch game",
        "online sports game",
        "8 player game",
        "runner game",
        "physics game",
        "arcade sports",
        "competitive running",
        "free running game",
        "gravity control",
        "multiplayer sports",
        "browser game",
        "reaction game",
        "platformer game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand G Switch 3, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: LEFT-CLICK to switch gravity",
          "Players 2-8: Configure controls in game menu"
        ],
        actions: [
          "Switch gravity to avoid obstacles",
          "Time your switches carefully",
          "ESC - Pause Game"
        ],
        special: [
          "Use boosters to gain advantage",
          "Utilize cloning mechanics",
          "Customize controls for each player"
        ]
      }
    },
    features: [
      "Up to 8-player multiplayer support",
      "Single-player dual runner control",
      "Five unique playable characters",
      "Advanced booster mechanics",
      "Cloning system for strategic gameplay",
      "Customizable player controls",
      "Challenging sawblade obstacles",
      "Progressive difficulty system",
      "Instant multiplayer action"
    ],
    faqs: [
      {
        question: "What's new in G Switch 3 compared to previous versions?",
        answer: "G Switch 3 introduces several new features including dual runner control in single-player mode, up to 8-player multiplayer support, two different types of boosters, cloning mechanics, and five new playable characters.",
        category: "features"
      },
      {
        question: "How does the multiplayer mode work?",
        answer: "Up to 8 players can compete simultaneously. Each player can set their own controls through the game menu. Players race against each other while avoiding obstacles and managing gravity switches.",
        category: "gameplay"
      },
      {
        question: "What are boosters and how do I use them?",
        answer: "Boosters provide temporary advantages during gameplay. There are two types available, and they can be activated during runs. Use them strategically to overcome challenging sections or gain an edge in multiplayer.",
        category: "gameplay"
      },
      {
        question: "How does the cloning mechanic work?",
        answer: "The cloning feature allows you to create temporary copies of your character. These clones can help you navigate difficult sections and provide backup in case of mistakes.",
        category: "features"
      },
      {
        question: "What's the best strategy for avoiding sawblades?",
        answer: "Time your gravity switches carefully and watch the pattern of sawblades. Sometimes it's better to switch early rather than wait until the last moment. Practice makes perfect!",
        category: "gameplay"
      },
      {
        question: "How do I set up custom controls?",
        answer: "Access the game menu to configure controls for each player. This is especially useful in multiplayer mode where multiple players need different control schemes.",
        category: "technical"
      },
      {
        question: "What makes each character different?",
        answer: "The five playable characters have unique visual styles and slightly different handling characteristics. Experiment with each to find your favorite for different challenges.",
        category: "features"
      }
    ]
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    description: "Run, dodge trains and collect coins in Subway Surfers Winter Holiday edition!",
    iframeUrl: "https://ubg77.github.io/updatefaqs/subway-surfers-winter-holiday/",
    image: "/games/Subway-surfers.jpg",
    rating: 4.9,
    type: "Action",
    metadata: {
      title: "Subway Surfers - Winter Holiday Edition | House of Hazards",
      description: "Play Subway Surfers online! Run through snowy tracks, dodge trains and collect coins in this winter-themed endless runner.",
      keywords: [
        "subway surfers",
        "endless runner",
        "winter game",
        "arcade game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Subway Surfers, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Left Arrow - Move Left",
          "Right Arrow - Move Right",
          "Up Arrow - Jump",
          "Down Arrow - Roll"
        ],
        actions: [
          "SPACE - Activate Hoverboard",
          "ESC - Pause Game"
        ],
        special: [
          "Collect coins for upgrades",
          "Complete daily Word Hunts",
          "Use power-ups strategically"
        ]
      }
    },
    features: [
      "Classic Subway Surfers endless runner gameplay",
      "Exclusive Subway Surfers winter holiday theme",
      "Multiple Subway Surfers characters to unlock",
      "Special Subway Surfers winter outfits",
      "Daily Subway Surfers missions and rewards",
      "Subway Surfers character customization",
      "Power-up collection system",
      "Progressive difficulty system",
      "Regular content updates"
    ],
    faqs: [
      {
        question: "What's new in this Subway Surfers winter update?",
        answer: "This special winter edition of Subway Surfers features snow-covered tracks, festive decorations, exclusive Subway Surfers winter outfits, and seasonal challenges. Enjoy the classic Subway Surfers gameplay with a beautiful winter theme.",
        category: "features"
      },
      {
        question: "How do I get more coins in Subway Surfers?",
        answer: "You can collect coins while running, complete daily challenges, use coin magnets, and activate score multipliers. Daily Word Hunts and missions in 'MyTour' also provide additional coins.",
        category: "gameplay"
      },
      {
        question: "What are the different power-ups available?",
        answer: "Subway Surfers features several power-ups including Jetpack, Super Sneakers, Coin Magnet, and Score Multiplier. The Hoverboard is a special item that saves you from crashes.",
        category: "features"
      },
      {
        question: "Can I play Subway Surfers offline?",
        answer: "Yes, you can play the game offline in your browser once it's loaded. However, some features like leaderboards and daily challenges require an internet connection.",
        category: "technical"
      },
      {
        question: "How do I unlock new characters?",
        answer: "Characters can be unlocked by collecting coins and keys. Keys are earned through gameplay, completing missions, and daily challenges. Some special characters are available during seasonal events.",
        category: "gameplay"
      },
      {
        question: "What's new in the Winter Holiday edition?",
        answer: "The Winter Holiday edition features snow-covered tracks, festive decorations, special winter outfits for characters, holiday-themed obstacles, and seasonal collectibles.",
        category: "features"
      },
      {
        question: "How does the scoring system work?",
        answer: "Your score increases as you run further and collect coins. Multipliers, power-ups, and completing missions boost your score. Performing tricks like jumping and rolling also adds bonus points.",
        category: "gameplay"
      },
      {
        question: "Is there a way to save my progress?",
        answer: "The game automatically saves your progress in your browser's local storage. This includes your coin collection, character unlocks, and high scores.",
        category: "technical"
      }
    ]
  },
  {
    id: "moto-x3m-pool-party",
    title: "Moto X3M Pool Party",
    description: "Master pool-themed stunt tracks in this exciting motorcycle adventure!",
    iframeUrl: "https://webglmath.github.io/moto-x3m-5-pool-party/",
    image: "/games/Moto-X3M-Pool-Party.jpg",
    rating: 4.8,
    type: "Racing",
    metadata: {
      title: "Moto X3M Pool Party - Ultimate Stunt Racing Game | House of Hazards",
      description: "Play Moto X3M Pool Party online! Race through underwater tubes in Moto X3M Pool Party, perform stunts, and master challenging obstacles. Experience the ultimate Moto X3M Pool Party summer racing action!",
      keywords: [
        "moto x3m pool party",
        "moto x3m game",
        "pool party racing",
        "stunt bike game",
        "underwater racing",
        "summer racing game",
        "motorcycle stunts",
        "time trial racing",
        "3 star challenges",
        "bike tricks game",
        "physics racing",
        "pool racing",
        "stunt challenges",
        "motorcycle game",
        "summer sports"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Moto X3M Pool Party, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Arrow Keys - Control your bike",
          "UP - Accelerate",
          "DOWN - Brake/Reverse",
          "LEFT/RIGHT - Balance bike"
        ],
        actions: [
          "SPACE - Jump/Perform tricks",
          "R - Quick restart",
          "ESC - Pause game"
        ],
        special: [
          "Use arrow keys mid-air to perform flips",
          "Time your landings carefully",
          "Balance is key for perfect runs"
        ]
      }
    },
    features: [
      "Exciting Moto X3M Pool Party racing experience",
      "Unique underwater Moto X3M tracks",
      "Advanced stunt system",
      "Time-based scoring mechanics",
      "Multiple challenging levels",
      "3-star rating system",
      "Quick restart option",
      "Physics-based gameplay",
      "Summer-themed obstacles"
    ],
    faqs: [
      {
        question: "How do I earn 3 stars on a level?",
        answer: "To earn 3 stars, you need to complete levels as quickly as possible. Perform front and back flips for time bonuses, and find the optimal route through each level. Perfect landings also help reduce your time.",
        category: "gameplay"
      },
      {
        question: "What's the best way to perform stunts?",
        answer: "Use the arrow keys while in the air to perform front or back flips. The more flips you complete before landing, the bigger your time bonus. Just make sure to land properly on your wheels!",
        category: "gameplay"
      },
      {
        question: "How do the underwater sections work?",
        answer: "Underwater tubes affect your bike's physics slightly, making control more challenging. Maintain momentum and use the tube curves to your advantage. The water theme adds a unique twist to the classic Moto X3M gameplay.",
        category: "features"
      },
      {
        question: "What's different in Pool Party compared to other Moto X3M games?",
        answer: "Pool Party features summer and water-themed levels, unique obstacles like water slides and pool toys, and special underwater sections. The environment adds new challenges while maintaining the series' signature stunt mechanics.",
        category: "features"
      },
      {
        question: "How do I improve my times?",
        answer: "Practice level layouts, perform multiple flips for time bonuses, find shortcuts, and maintain momentum through obstacles. Quick restarts (R key) help you perfect difficult sections.",
        category: "gameplay"
      },
      {
        question: "Are there any secret shortcuts?",
        answer: "Many levels have hidden shortcuts or alternative routes that can save time. Explore each level thoroughly and experiment with different paths to find the fastest route to the finish.",
        category: "gameplay"
      },
      {
        question: "How does the scoring system work?",
        answer: "Your score is based on completion time, with bonuses for performing stunts. Time penalties are added for crashes. The faster you complete a level and the more stunts you perform, the higher your star rating.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "basketball-legends",
    title: "Basketball Legends",
    description: "Play basketball with legendary players in thrilling tournament matches!",
    iframeUrl: "https://webglmath.github.io/basketball-legends/",
    image: "/games/basketball-legends.jpg",
    rating: 4.8,
    type: "Sports",
    metadata: {
      title: "Basketball Legends - Multiplayer Sports Game | House of Hazards",
      description: "Choose from legendary basketball players and compete in intense matches. Master special moves, unlock characters, and dominate the court in multiple game modes.",
      keywords: [
        "basketball legends",
        "sports game",
        "multiplayer game",
        "basketball action"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Basketball Legends, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: Arrow Keys to Move",
          "Player 2: WASD to Move"
        ],
        actions: [
          "Player 1: Z for Supershot, X for Action",
          "Player 2: K for Supershot, L for Action"
        ],
        special: [
          "Time your shots carefully",
          "Use special moves strategically",
          "Coordinate with teammates in 2v2"
        ]
      }
    },
    features: [
      "Authentic Basketball Legends gameplay",
      "Multiple Basketball Legends game modes",
      "Extensive roster of legendary players",
      "Basketball Legends story progression",
      "Advanced character abilities",
      "Tournament challenges",
      "Multiplayer competition",
      "Strategic team mechanics",
      "Progressive difficulty system"
    ],
    faqs: [
      {
        question: "What game modes are available in Basketball Legends?",
        answer: "The game offers multiple modes including Story Mode, Tournament Mode, and Multiplayer Mode. Story Mode lets you progress through challenges to unlock new players and courts, while Tournament Mode offers competitive matches against AI opponents.",
        category: "features"
      },
      {
        question: "How do I perform special moves and abilities?",
        answer: "Each character has unique special moves. Player 1 uses Z for Supershot and X for Action, while Player 2 uses K for Supershot and L for Action. Master these moves to gain an advantage in matches.",
        category: "gameplay"
      },
      {
        question: "Can I play Basketball Legends with friends?",
        answer: "Yes! The game supports both single-player and multiplayer modes. You can play 1v1 or 2v2 matches locally with friends, each player using their designated controls.",
        category: "gameplay"
      },
      {
        question: "How do I unlock new characters?",
        answer: "New characters can be unlocked by progressing through Story Mode and completing specific challenges. Each legendary player has unique abilities and playing styles.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for winning matches?",
        answer: "Focus on mastering the basic controls, learn your character's special abilities, and practice defensive play. In multiplayer, communication and teamwork are crucial for success.",
        category: "gameplay"
      },
      {
        question: "Are there different courts to play on?",
        answer: "Yes, the game features various iconic basketball courts. Different courts become available as you progress through the game modes and complete challenges.",
        category: "features"
      },
      {
        question: "How does the scoring system work?",
        answer: "Scoring follows traditional basketball rules. Regular shots are worth 2 points, while shots from distance earn 3 points. Special moves and abilities can help create scoring opportunities.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "football-legends",
    title: "Football Legends",
    description: "Experience football with special abilities and intense multiplayer action!",
    iframeUrl: "https://webglmath.github.io/football-legends/",
    image: "/games/football-legends.jpg",
    rating: 4.8,
    type: "Sports",
    metadata: {
      title: "Football Legends - Epic Soccer Action Game | House of Hazards",
      description: "Play Football Legends online! Master Football Legends' special abilities, compete in tournaments, and score amazing goals. Experience the ultimate football action with legendary players!",
      keywords: [
        "football legends",
        "soccer game",
        "sports game",
        "2 player football",
        "multiplayer sports",
        "special abilities",
        "tournament mode",
        "arcade soccer",
        "free sports game",
        "football game",
        "local multiplayer",
        "soccer legends",
        "action sports",
        "competitive game",
        "arcade sports"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Football Legends, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: A/D to run",
          "Player 1: W to jump",
          "Player 1: S to slide",
          "Player 2: Arrow Keys for movement",
          "Player 2: UP to jump",
          "Player 2: DOWN to slide"
        ],
        actions: [
          "Player 1: B to kick",
          "Player 1: V for special ability",
          "Player 2: L to kick",
          "Player 2: K for special ability"
        ],
        special: [
          "Time your kicks carefully",
          "Use special abilities strategically",
          "Master sliding tackles"
        ]
      }
    },
    features: [
      "Classic Football Legends gameplay",
      "Unique Football Legends abilities",
      "Multiple game modes",
      "Local multiplayer matches",
      "Tournament progression",
      "Special move system",
      "Strategic team play",
      "Character customization",
      "Competitive matches"
    ],
    faqs: [
      {
        question: "What game modes are available in Football Legends?",
        answer: "The game offers multiple modes including Quick Match, Tournament Mode, and Local Multiplayer. Quick Match lets you practice against AI, Tournament Mode offers competitive matches against AI opponents, and Local Multiplayer allows you to play with friends locally.",
        category: "features"
      },
      {
        question: "How do special abilities work?",
        answer: "Each legendary player has unique special abilities, such as teleportation or fireball kicks. Player 1 uses V and Player 2 uses K to activate these abilities. Use them strategically to gain an advantage during matches.",
        category: "gameplay"
      },
      {
        question: "Can I play Football Legends alone?",
        answer: "Yes! The game features a single-player mode where you can play against AI opponents. You can practice your skills, compete in tournaments, and master different characters' abilities.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for scoring goals?",
        answer: "Combine regular kicks with special abilities, use well-timed jumps and slides, and position yourself strategically. Learn each character's unique abilities and use them at the right moment to create scoring opportunities.",
        category: "gameplay"
      },
      {
        question: "How does the tournament mode work?",
        answer: "Tournament mode lets you compete in a series of matches against increasingly challenging opponents. Progress through the tournament to unlock achievements and prove your skills against tougher competition.",
        category: "features"
      },
      {
        question: "What makes each character different?",
        answer: "Each legendary player has unique special abilities and playing styles. Some can teleport across the field, while others have powerful fireball kicks. Experiment with different characters to find your favorite.",
        category: "features"
      },
      {
        question: "How do I defend effectively?",
        answer: "Use sliding tackles (S or DOWN arrow) to defend, time your jumps to intercept high balls, and position yourself strategically. Remember that good defense can lead to quick counterattack opportunities.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "rooftop-snipers",
    title: "Rooftop Snipers",
    description: "Challenge friends in intense rooftop duels with physics-based combat!",
    iframeUrl: "https://webglmath.github.io/rooftop-snipers/",
    image: "/games/Rooftop-Snipers.jpg",
    rating: 4.8,
    type: "Shooter",
    metadata: {
      title: "Rooftop Snipers - Physics Combat Game | House of Hazards",
      description: "Challenge friends in intense rooftop duels with unique physics-based combat. Master strategic positioning and precise shooting to knock opponents off the edge.",
      keywords: [
        "rooftop snipers",
        "physics game",
        "multiplayer combat",
        "shooting game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Rooftop Snipers, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: W to jump",
          "Player 2: I to jump"
        ],
        actions: [
          "Player 1: E to shoot",
          "Player 2: O to shoot",
          "ESC - Pause Game"
        ],
        special: [
          "Time your shots carefully",
          "Use jumps to dodge shots",
          "Aim for knockback effects"
        ]
      }
    },
    features: [
      "Classic Rooftop Snipers gameplay",
      "Intense local multiplayer duels",
      "Physics-based combat system",
      "Strategic positioning mechanics",
      "Multiple rooftop environments",
      "Quick-match format",
      "First to five victories",
      "Simple but deep gameplay",
      "Instant action battles"
    ],
    faqs: [
      {
        question: "How do I win a match in Rooftop Snipers?",
        answer: "To win, you need to knock your opponent off the roof five times. This can be done by shooting them in a way that pushes them over the edge. Strategic positioning and timing your shots are key to victory.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for winning duels?",
        answer: "Combine jumping and shooting effectively. Time your shots when your opponent is near the edge, and use jumps to dodge incoming shots. Remember that positioning is just as important as accuracy.",
        category: "gameplay"
      },
      {
        question: "Can I play Rooftop Snipers alone?",
        answer: "The game is primarily designed for two players, offering exciting local multiplayer action. Grab a friend and compete in intense rooftop duels for the best experience.",
        category: "features"
      },
      {
        question: "How does the knockback system work?",
        answer: "When you hit an opponent with your shots, they experience a physics-based knockback effect. The force and direction of the knockback depend on where you hit them and their current position.",
        category: "gameplay"
      },
      {
        question: "Are there different rooftop environments?",
        answer: "Yes, the game features various rooftop settings that provide different tactical opportunities and challenges. Each environment might require slightly different strategies.",
        category: "features"
      },
      {
        question: "What makes Rooftop Snipers unique?",
        answer: "The game combines shooting mechanics with physics-based knockback, creating a unique blend of precision and positioning. The simple controls but deep gameplay make it easy to learn but challenging to master.",
        category: "features"
      },
      {
        question: "How do I improve my aim and timing?",
        answer: "Practice predicting opponent movements, learn the shot trajectory, and experiment with different timing for jumps and shots. The key is finding the right rhythm between movement and shooting.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "stickman-fighter-epic-battle",
    title: "Stickman Fighter Epic Battle",
    description: "Battle endless waves of enemies in this intense fighting game!",
    iframeUrl: "https://webglmath.github.io/stickman-fighter-epic-battle/",
    image: "/games/stickman-fighter-epic-battle.jpg",
    rating: 4.8,
    type: "Action",
    metadata: {
      title: "Stickman Fighter Epic Battle - Ultimate Combat Game | House of Hazards",
      description: "Play Stickman Fighter Epic Battle online! Master timing-based combat in Stickman Fighter, battle endless enemies, and utilize various weapons in this epic fighting game.",
      keywords: [
        "stickman fighter",
        "epic battle",
        "action game",
        "fighting game",
        "stickman game",
        "combat game",
        "browser fighting",
        "timing game",
        "endless waves",
        "weapon combat",
        "mobile friendly",
        "free fighting game",
        "arcade action",
        "battle game",
        "html5 game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Stickman Fighter Epic Battle, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Left Arrow / A - Hit Left",
          "Right Arrow / D - Hit Right"
        ],
        actions: [
          "Time your hits carefully",
          "ESC - Pause Game"
        ],
        special: [
          "Watch for weapon pickups",
          "Chain attacks for combos",
          "Observe enemy patterns"
        ]
      }
    },
    features: [
      "Classic Stickman Fighter combat mechanics",
      "Endless wave battle system",
      "Strategic Stickman Fighter weapon pickups",
      "Progressive difficulty scaling",
      "Cross-platform compatibility",
      "Precision timing mechanics",
      "Multiple enemy variations",
      "Advanced combo system",
      "Achievement progression"
    ],
    faqs: [
      {
        question: "What's the best strategy for surviving longer?",
        answer: "Focus on timing your attacks perfectly and watch enemy patterns. Use weapons when available, and try to manage multiple enemies by positioning yourself strategically. Practice your timing to chain successful hits.",
        category: "gameplay"
      },
      {
        question: "How does the weapon system work?",
        answer: "Weapons appear periodically during battle. When available, you can use them to gain an advantage against enemies. Each weapon has different properties and can help you clear waves more effectively.",
        category: "features"
      },
      {
        question: "Does the game get progressively harder?",
        answer: "Yes, as you survive longer, the game becomes more challenging with enemies appearing more frequently and in different positions. Upgrading your equipment becomes crucial for survival.",
        category: "gameplay"
      },
      {
        question: "Can I play on mobile devices?",
        answer: "Yes! The game is built with HTML5 and works well on both desktop and mobile browsers. The simple control scheme makes it particularly suitable for touch screen devices.",
        category: "technical"
      },
      {
        question: "How do I improve my combat timing?",
        answer: "Practice is key. Start by focusing on single enemies to perfect your timing, then gradually take on multiple opponents. Watch for visual cues that indicate when to attack or defend.",
        category: "gameplay"
      },
      {
        question: "Are there different types of enemies?",
        answer: "Yes, you'll encounter various enemy types as you progress. Each may have different attack patterns or speeds, requiring you to adapt your strategy and timing accordingly.",
        category: "features"
      },
      {
        question: "What's the key to beating higher levels?",
        answer: "Success in higher levels requires mastering the timing mechanics, efficient weapon use, and understanding enemy patterns. Stay calm and focused, and don't get overwhelmed by multiple enemies.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "the-spear-stickman",
    title: "The Spear Stickman",
    description: "Master precision combat with unique projectile mechanics and upgrades!",
    iframeUrl: "https://webglmath.github.io/the-spear-stickman/",
    image: "/games/the-spear-stickman.jpg",
    rating: 4.8,
    type: "Action",
    metadata: {
      title: "The Spear Stickman - Strategic Combat Game | House of Hazards",
      description: "Play The Spear Stickman online! Master precise aiming in The Spear Stickman, earn upgrades, and survive against waves of enemies in this tactical combat game.",
      keywords: [
        "spear stickman",
        "stick figure game",
        "projectile combat",
        "action game",
        "archery game",
        "survival game",
        "upgrade system",
        "precision shooting",
        "browser game",
        "free action game",
        "stickman combat",
        "arcade action",
        "skill-based game",
        "shooting game",
        "strategy game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand The Spear Stickman, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Hold left mouse button to aim",
          "Release to shoot spear"
        ],
        actions: [
          "Aim carefully for headshots",
          "ESC - Pause Game"
        ],
        special: [
          "Different body parts require different number of hits",
          "Collect apple coins for upgrades",
          "Watch enemy positions carefully"
        ]
      }
    },
    features: [
      "Unique Spear Stickman combat system",
      "Strategic targeting mechanics",
      "Extensive upgrade shop",
      "The Spear Stickman's apple coin economy",
      "Multiple enemy types",
      "One-shot headshot mechanics",
      "Progressive difficulty system",
      "Tactical combat choices",
      "Score-based progression"
    ],
    faqs: [
      {
        question: "What's the best strategy for getting high scores?",
        answer: "Focus on headshots as they provide instant kills. Position yourself strategically, aim carefully, and try to anticipate enemy movements. Collecting apple coins efficiently will help you unlock useful upgrades.",
        category: "gameplay"
      },
      {
        question: "How does the targeting system work?",
        answer: "Hold the left mouse button to aim your spear, adjusting the angle for the perfect shot. Different body parts require different numbers of hits - headshots are instant kills, while limb shots require multiple hits.",
        category: "gameplay"
      },
      {
        question: "What upgrades are available in the shop?",
        answer: "The shop offers various protective helmets including metal helmets and the special Mario-style mushroom helmet. Each upgrade provides different benefits to help you survive longer.",
        category: "features"
      },
      {
        question: "How do I earn apple coins?",
        answer: "Apple coins are earned by successfully eliminating enemy stickmen. The more efficient your kills (like headshots), the more coins you can earn. These can then be spent in the shop for upgrades.",
        category: "gameplay"
      },
      {
        question: "Does the game get progressively harder?",
        answer: "Yes, as you survive longer, the game becomes more challenging with enemies appearing more frequently and in different positions. Upgrading your equipment becomes crucial for survival.",
        category: "gameplay"
      },
      {
        question: "What makes each helmet upgrade different?",
        answer: "Each helmet type offers unique protection benefits. Some might offer better defense against certain types of attacks, while others might provide special abilities or bonuses.",
        category: "features"
      },
      {
        question: "How can I improve my aim?",
        answer: "Practice timing your shots and learn to predict enemy movements. Pay attention to the arc of your spear and adjust your aim accordingly. Start with closer targets before attempting long-range shots.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "stick-merge",
    title: "Stick Merge",
    description: "Combine weapons strategically to create powerful combinations and dominate!",
    iframeUrl: "https://webglmath.github.io/stickmerge/",
    image: "/games/stick-merge.jpg",
    rating: 4.8,
    type: "Shooter",
    metadata: {
      title: "Stick Merge - Weapon Merging Game | House of Hazards",
      description: "Play Stick Merge online! Experience Stick Merge's unique weapon combining system, create powerful guns, and test your arsenal. Master the art of merging in this innovative game!",
      keywords: [
        "stick merge",
        "weapon merge game",
        "shooting game",
        "merge mechanics",
        "upgrade game",
        "casual shooter",
        "gun combination",
        "weapon upgrade",
        "stick figure game",
        "browser shooter",
        "free shooting game",
        "merge strategy",
        "action game",
        "casual game",
        "weapon collector"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Stick Merge, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Click and drag weapons to move them",
          "Drag mouse cursor to aim and shoot"
        ],
        actions: [
          "Left mouse button - Select and merge weapons",
          "ESC - Pause Game"
        ],
        special: [
          "Combine similar weapons to upgrade",
          "Experiment with different combinations",
          "Use power-ups strategically"
        ]
      }
    },
    features: [
      "Unique Stick Merge weapon system",
      "Strategic merging mechanics",
      "Progressive weapon upgrades",
      "Multiple target challenges",
      "Endless combination possibilities",
      "Tactical shooting gameplay",
      "Achievement system",
      "Regular content updates",
      "Intuitive controls"
    ],
    faqs: [
      {
        question: "How does the weapon merging system work?",
        answer: "Combine identical weapons by dragging one onto another to create a more powerful version. The higher the weapon tier, the more damage it can deal. Experiment with different combinations to discover all possible upgrades.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for upgrading weapons?",
        answer: "Focus on merging similar weapons first to create higher-tier weapons. Try to maintain a balance between different weapon types, and don't merge too quickly - sometimes it's better to wait for better combination opportunities.",
        category: "gameplay"
      },
      {
        question: "Are there different types of power-ups?",
        answer: "Yes! The game features various power-ups that can enhance your weapons or provide special abilities. Explore different power-ups and learn when to best utilize them for maximum effectiveness.",
        category: "features"
      },
      {
        question: "How do I maximize my shooting efficiency?",
        answer: "Position your weapons strategically, aim carefully at moving targets, and use your most powerful weapons against tougher enemies. Timing your shots and managing your weapon merges effectively is key to success.",
        category: "gameplay"
      },
      {
        question: "What makes each weapon unique?",
        answer: "Each weapon type has different damage output, firing rate, and special effects. Higher-tier weapons generally deal more damage and might have unique properties that make them especially effective in certain situations.",
        category: "features"
      },
      {
        question: "How do I unlock new weapons?",
        answer: "New weapons can be unlocked through regular gameplay, merging existing weapons, and achieving certain milestones. Keep playing and experimenting with different combinations to discover all available weapons.",
        category: "gameplay"
      },
      {
        question: "Are there any special achievements?",
        answer: "Yes, the game includes various achievements for creating specific weapon combinations, reaching high scores, and completing special challenges. Try to unlock all achievements to master the game.",
        category: "features"
      }
    ]
  },
  {
    id: "getaway-shootout-2",
    title: "Getaway Shootout 2",
    description: "Race against three opponents in this unique jumping battle! Master the art of strategic jumping, collect weapons and power-ups, and be the first to reach the extraction point. With its distinctive movement mechanics and competitive gameplay, this game offers both single-player challenges against AI and exciting two-player local multiplayer action.",
    iframeUrl: "https://webglmath.github.io/getaway-shootout/",
    image: "/games/getaway-shootout.jpg",
    rating: 4.8,
    type: "Shooter",
    metadata: {
      title: "Getaway Shootout 2 - Strategic Jump & Shoot Game | House of Hazards",
      description: "Play Getaway Shootout 2 online! Race to the extraction point using unique jumping mechanics, collect weapons, and outmaneuver your opponents. Features both single and multiplayer modes.",
      keywords: [
        "getaway shootout 2",
        "jumping shooter",
        "race battle",
        "extraction game",
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Getaway Shootout, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: W to jump left",
          "Player 1: E to jump right",
          "Player 2: I to jump left",
          "Player 2: O to jump right"
        ],
        actions: [
          "Player 1: R to use power-up",
          "Player 2: P to use power-up",
          "ESC - Pause Game"
        ],
        special: [
          "Time your jumps carefully",
          "Use power-ups strategically",
          "Watch for obstacles"
        ]
      }
    },
    features: [
      "Unique jumping movement system",
      "Single-player and two-player modes",
      "Various weapons and power-ups",
      "Obstacle-filled courses",
      "Race to extraction gameplay",
      "Strategic power-up usage",
      "Multiple opponents",
      "Competitive multiplayer",
      "Quick-paced matches"
    ],
    faqs: [
      {
        question: "How does the jumping system work?",
        answer: "Players can jump left or right using their respective controls (W/E for Player 1, I/O for Player 2). The direction and timing of your jumps are crucial for reaching the extraction point first and avoiding obstacles.",
        category: "gameplay"
      },
      {
        question: "What types of power-ups are available?",
        answer: "The game features various weapons and power-ups that can help you gain an advantage. Collect them along the way and use them strategically with R (Player 1) or P (Player 2) to impede opponents or boost your progress.",
        category: "features"
      },
      {
        question: "Can I play against the computer?",
        answer: "Yes! You can play single-player mode against AI opponents or challenge a friend in two-player mode. The AI provides good practice before competing against other players.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for winning?",
        answer: "Focus on efficient jumping, timing your power-up usage, and finding the optimal path through obstacles. Sometimes taking a slightly longer route to collect a powerful item can be worth it.",
        category: "gameplay"
      },
      {
        question: "How do obstacles affect gameplay?",
        answer: "Obstacles can block your path, slow you down, or force you to take alternative routes. Learning to navigate them efficiently while maintaining momentum is key to victory.",
        category: "features"
      },
      {
        question: "What makes each match different?",
        answer: "The combination of power-up placements, opponent behavior, and the challenge of timing perfect jumps makes each race unique. Different strategies might be needed depending on the situation.",
        category: "gameplay"
      },
      {
        question: "How do I improve my performance?",
        answer: "Practice your jumping timing, learn power-up locations, and experiment with different routes. Understanding when to be aggressive with power-ups versus focusing on movement is crucial.",
        category: "gameplay"
      }
    ]
  }
];

// 辅助函数
export const getGamesByType = (type: GameType) => {
  return games.filter(game => game.type === type);
};

export const getSimilarGames = (currentGame: Game, limit: number = 4) => {
  return games
    .filter(game => game.type === currentGame.type && game.id !== currentGame.id)
    .slice(0, limit);
}; 