/**
 * 每个游戏都按照以下标准进行分类：
 * 至少一个主分类,主分类可以 1 个或者多个（RACING/ACTION等）
 * 至少一个玩法分类（SINGLE_PLAYER/TWO_PLAYER/MULTIPLAYER）
 * 相关的主题分类（如适用）
 * 至少一个目标人群分类（BOYS/GIRLS/KIDS）
 * 至少一个功能性分类（FEATURED/NEW/POPULAR/TRENDING）
 */
export enum GameCategory {
  // 游戏类型分类 (主分类)
  RACING = "Racing Games",      // 赛车
  ACTION = "Action Games",      // 动作
  SHOOTER = "Shooter Games",    // 射击
  PUZZLE = "Puzzle Games",      // 解谜
  STRATEGY = "Strategy Games",  // 策略
  SPORTS = "Sports Games",      // 体育
  ADVENTURE = "Adventure Games", // 冒险
  
  // 游戏玩法分类
  MULTIPLAYER = "Multiplayer Games",    // 多人游戏
  TWO_PLAYER = "2 Player Games",        // 双人游戏
  SINGLE_PLAYER = "Single Player Games", // 单人游戏

  
  // 主题分类
  CAR = "Car Games",           // 汽车游戏
  FIGHTING = "Fighting Games", // 格斗游戏
  STICKMAN = "Stickman Games", // 火柴人游戏
  RUNNING = "Running Games",   // 跑酷游戏
  BOXING = "Boxing Games",     // 拳击游戏
  ANIMAL = "Animal Games",     // 动物游戏（新增）
  
  // 目标人群分类
  BOYS = "Games for Boys",     // 男孩游戏
  GIRLS = "Games for Girls",   // 女孩游戏
  KIDS = "Kids Games",         // 儿童游戏
  
  // 功能性分类
  FEATURED = "Featured Games",  // 特色游戏
  NEW = "New Games",           // 新游戏
  POPULAR = "Popular Games",   // 热门游戏
  TRENDING = "Trending Games", // 趋势游戏
  IO_GAMES = "IO Games",        // IO 游戏
  FPS = "FPS Games",            // 第一人称射击
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  image: string;
  rating: number;
  categories: GameCategory[];  // 使用合并后的分类系统
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
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.CAR,          // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Formula Rush - High Speed Racing Game | Shady Bears",
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
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.CAR,          // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.POPULAR,      // 功能分类
      GameCategory.TRENDING      // 功能分类
    ],
    metadata: {
      title: "Insane Track Supercars - Extreme Racing Game | Shady Bears",
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
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.CAR,          // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "City Car Stunt 4 - Urban Racing Challenge | Shady Bears",
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
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.CAR,          // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "Rise of Speed - Space Racing Adventure | Shady Bears",
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
    categories: [
      GameCategory.SPORTS,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Basket Random - Fun Basketball Game | Shady Bears",
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
    categories: [
      GameCategory.SHOOTER,       // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED,     // 功能分类
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "Getaway Shootout - Strategic Battle Game | Shady Bears",
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
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.RUNNING,      // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "G Switch 3 - Multiplayer Running Game | Shady Bears",
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
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.RUNNING,      // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Subway Surfers - Winter Holiday Edition | Shady Bears",
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
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED,     // 功能分类
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "Moto X3M Pool Party - Ultimate Stunt Racing Game | Shady Bears",
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
    categories: [
      GameCategory.SPORTS,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Basketball Legends - Multiplayer Sports Game | Shady Bears",
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
    categories: [
      GameCategory.SPORTS,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Football Legends - Epic Soccer Action Game | Shady Bears",
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
    categories: [
      GameCategory.SHOOTER,       // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.FPS,          // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Rooftop Snipers - Physics Combat Game | Shady Bears",
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
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.FIGHTING,     // 主题分类
      GameCategory.STICKMAN,     // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED      // 功分类
    ],
    metadata: {
      title: "Stickman Fighter Epic Battle - Ultimate Combat Game | Shady Bears",
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
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.STICKMAN,     // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "The Spear Stickman - Strategic Combat Game | Shady Bears",
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
    categories: [
      GameCategory.SHOOTER,       // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.STICKMAN,     // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "Stick Merge - Weapon Merging Game | Shady Bears",
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
    categories: [
      GameCategory.SHOOTER,       // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.NEW           // 功能分类
    ],
    metadata: {
      title: "Getaway Shootout 2 - Strategic Jump & Shoot Game | Shady Bears",
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
  },
  {
    id: "big-shot-boxing",
    title: "Big Shot Boxing",
    description: "Big Shot Boxing is a boxing game where you have to fight your way up the rankings to end your career in the boxing Hall of Fame! Start out by choosing a fighter, hire a coach, and learn some moves. Win either by scoring the most points, or by a knockout!",
    iframeUrl: "https://htmlxm.github.io/h2/big-shot-boxing/",
    image: "/games/big-shot-boxing.webp",
    rating: 4.8,
    categories: [
      GameCategory.SPORTS,        // 主分类 - 体育游戏
      GameCategory.SINGLE_PLAYER, // 玩法分类 - 单人游戏
      GameCategory.BOXING,       // 主题分类 - 拳击游戏
      GameCategory.BOYS,         // 目标人群 - 男孩游戏
      GameCategory.NEW,          // 功能分类 - 新游戏
      GameCategory.FEATURED,      // 功能分类 - 特色游戏
      GameCategory.FIGHTING      // 功能分类 - 格斗游戏
    ],
    metadata: {
      title: "Big Shot Boxing - Career Boxing Game | Shady Bears",
      description: "Fight your way to the boxing Hall of Fame! Train your fighter, learn new moves, and compete in intense boxing matches. Experience the thrill of professional boxing in this career-focused sports game.",
      keywords: [
        "big shot boxing",
        "boxing game",
        "sports game",
        "career mode",
        "fighting game",
        "boxing career",
        "boxing simulation",
        "combat sports"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Big Shot Boxing, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Right Arrow - Throw a jab",
          "Left Arrow - Throw a cross",
          "X - Throw an uppercut",
          "Z - Block attacks"
        ],
        actions: [
          "Combine moves for combos",
          "Time your blocks carefully",
          "ESC - Pause Game"
        ],
        special: [
          "Train between fights to improve stats",
          "Manage your stamina wisely",
          "Watch for opponent patterns"
        ]
      }
    },
    features: [
      "Deep career mode progression",
      "Multiple fighting styles",
      "Character customization",
      "Skill training system",
      "Various opponents with unique styles",
      "Title fights and championships",
      "Equipment upgrades",
      "Achievement system",
      "Hall of Fame goals"
    ],
    faqs: [
      {
        question: "How do I improve my fighter's stats?",
        answer: "Between fights, you can train your fighter to improve various attributes like health, power, chin, and recovery. Use your earnings wisely to focus on the stats that match your fighting style.",
        category: "gameplay"
      },
      {
        question: "What's the best way to win fights?",
        answer: "Success comes from combining different punches into effective combinations while maintaining your defense. Watch your opponent's patterns, block their attacks, and counter when they're vulnerable.",
        category: "gameplay"
      },
      {
        question: "How does the career progression work?",
        answer: "Start at the bottom of the rankings and work your way up by winning fights. As you progress, you'll face tougher opponents, compete for titles, and aim for the Hall of Fame.",
        category: "features"
      },
      {
        question: "What customization options are available?",
        answer: "You can customize your boxer's appearance with different gloves, shorts, and boots. These can be purchased with earnings from your fights.",
        category: "features"
      },
      {
        question: "How do I perform effective combinations?",
        answer: "Mix up your jabs, crosses, and uppercuts to create unpredictable combinations. Different combinations work better against different opponents, so experiment to find effective patterns.",
        category: "gameplay"
      },
      {
        question: "What achievements can I unlock?",
        answer: "Achievements can be earned by winning matches, gaining titles, successfully defending your titles, and reaching various career milestones on your way to the Hall of Fame.",
        category: "features"
      },
      {
        question: "How important is blocking in the game?",
        answer: "Blocking is crucial for success. It helps you avoid damage, conserve health, and create opportunities for counter-attacks. Time your blocks carefully to maximize their effectiveness.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "idle-digging-tycoon",
    title: "Idle Digging Tycoon",
    description: "Idle Digging Tycoon is a casual idle game where you travel to a distant world inhabited by cavemen, and hire them to dig the ground for you in search of gold and valuables. Build new buildings, upgrade tools, and expand your lucrative business!",
    iframeUrl: "https://htmlxm.github.io/h5/idle-digging-tycoon/",
    image: "/games/idle-digging-tycoon.webp",
    rating: 4.7,
    categories: [
      GameCategory.STRATEGY,      // 主分类 - 策略游戏
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.KIDS,         // 目标人群
      GameCategory.BOYS,         // 目标人群
      GameCategory.GIRLS,        // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Idle Digging Tycoon - Business Management Game | Shady Bears",
      description: "Build and manage your own mining empire in Idle Digging Tycoon! Hire workers, upgrade tools, and discover valuable treasures in this engaging idle game.",
      keywords: ["idle game", "tycoon game", "management game", "mining game", "casual game"]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Idle Digging Tycoon, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Left mouse button - Click to dig",
          "Tap screen - Dig (mobile)"
        ],
        actions: [
          "Click on buildings to upgrade",
          "Hire workers to automate digging"
        ]
      }
    },
    features: [
      "Engaging idle gameplay mechanics",
      "Multiple upgrade options",
      "Worker management system",
      "Building construction",
      "Automated mining features",
      "Regular rewards and bonuses",
      "Progressive difficulty system"
    ],
    faqs: [
      {
        question: "How do I progress faster in the game?",
        answer: "Focus on upgrading your workers and tools efficiently. Balance between manual clicking and automated mining for optimal progress.",
        category: "gameplay"
      },
      {
        question: "What's the best way to spend resources?",
        answer: "Prioritize upgrades that increase your mining speed and worker efficiency. Don't forget to invest in new buildings when available.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "stick-defenders",
    title: "Stick Defenders",
    description: "Stick Defenders is an action and merging game where you combine stickman units into stronger ones to protect your base. Merge identical gunmen, enhance offensive abilities, and defend against waves of enemies in this strategic defense game.",
    iframeUrl: "https://htmlxm.github.io/h6/stick-defenders/",
    image: "/games/stick-defenders.webp",
    rating: 4.8,
    categories: [
      GameCategory.STRATEGY,      // 主分类 - 策略游戏
      GameCategory.ACTION,        // 主分类 - 动作游戏
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.STICKMAN,     // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.FEATURED      // 功能分类
    ],
    metadata: {
      title: "Stick Defenders - Strategic Defense Game | Shady Bears",
      description: "Defend your base by merging stickman units and upgrading defenses in this exciting strategy game. Combine units, use special abilities, and survive waves of enemies!",
      keywords: ["stick defenders", "merge game", "defense game", "strategy game", "stickman game"]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Stick Defenders, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Left mouse button - Select and drag units",
          "Drag and drop - Merge identical units"
        ],
        actions: [
          "Click special abilities when ready",
          "Upgrade units and defenses"
        ]
      }
    },
    features: [
      "Strategic merging mechanics",
      "Multiple unit types",
      "Special abilities system",
      "Base defense gameplay",
      "Progressive difficulty",
      "Upgrade system",
      "Bonus wheel rewards"
    ],
    faqs: [
      {
        question: "What's the best strategy for merging units?",
        answer: "Focus on creating balanced combinations of units. Don't merge too quickly - sometimes it's better to have multiple lower-level units than one higher-level unit.",
        category: "gameplay"
      },
      {
        question: "How do I use special abilities effectively?",
        answer: "Time your special abilities for when enemies are grouped together or when your defenses are overwhelmed. Don't save them too long - use them regularly but strategically.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "moto-x3m-winter",
    title: "Moto X3M Winter",
    description: "Speed with your motorbike across icy mountains in Moto X3M Winter! Race through snowy tracks with festive obstacles like candy canes and Christmas trees. Master the winter challenges, perform stunts, and unlock Santa's Sled in this seasonal edition of the popular motorcycle game.",
    iframeUrl: "https://htmlxm.github.io/h/moto-x3m-winter/",
    image: "/games/moto-x3m-winter.webp",
    rating: 4.8,
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.FEATURED,      // 功能分类
      GameCategory.ADVENTURE      // 功能分类
    ],
    metadata: {
      title: "Moto X3M Winter - Festive Motorcycle Game | Shady Bears",
      description: "Race through snowy tracks in this winter-themed motorcycle game. Master stunts, collect stars, and unlock special winter vehicles including Santa's Sled!",
      keywords: ["moto x3m winter", "motorcycle game", "winter racing", "bike stunts", "christmas game"]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Moto X3M Winter, press ESC to exit fullscreen",
      guide: {
        movement: [
          "W/Up Arrow - Accelerate",
          "S/Down Arrow - Brake",
          "A/D or Left/Right Arrows - Balance bike"
        ],
        actions: [
          "Use arrow keys for front/back flips",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Winter-themed tracks and obstacles",
      "Special festive vehicles",
      "Star collection system",
      "Stunt mechanics",
      "Progressive difficulty",
      "Time-based challenges",
      "Holiday-themed content"
    ],
    faqs: [
      {
        question: "How do I earn three stars on levels?",
        answer: "Complete levels quickly and perform multiple flips to reduce your time. Perfect landings are crucial for maintaining speed.",
        category: "gameplay"
      },
      {
        question: "How do I unlock Santa's Sled?",
        answer: "Collect stars in levels and complete challenges to unlock special vehicles including Santa's Sled.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "moto-x3m",
    title: "Moto X3M",
    description: "The original Moto X3M that started it all! Master challenging tracks, perform incredible stunts, and race against time in this classic motorcycle game. Perfect your flips and tricks while navigating through increasingly difficult obstacles.",
    iframeUrl: "https://htmlxm.github.io/h8/moto-x3m",
    image: "/games/moto-x3m.webp",
    rating: 4.9,
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.POPULAR,      // 功能分类
      GameCategory.FEATURED,      // 功能分类
      GameCategory.ADVENTURE      // 功能分类
    ],
    metadata: {
      title: "Moto X3M - Classic Motorcycle Stunt Game | Shady Bears",
      description: "Experience the original Moto X3M motorcycle game. Master stunts, beat time challenges, and conquer increasingly difficult tracks in this classic racing game.",
      keywords: ["moto x3m", "motorcycle game", "stunt game", "racing game", "bike game"]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Moto X3M, press ESC to exit fullscreen",
      guide: {
        movement: [
          "W/Up Arrow - Accelerate",
          "S/Down Arrow - Brake",
          "A/D or Left/Right Arrows - Balance bike"
        ],
        actions: [
          "Use arrow keys for front/back flips",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Classic Moto X3M gameplay",
      "Multiple challenging tracks",
      "Advanced stunt system",
      "Star rating system",
      "Time-based scoring",
      "Progressive difficulty",
      "Achievement system"
    ],
    faqs: [
      {
        question: "How do I perform better stunts?",
        answer: "Practice timing your flips and ensure clean landings. Multiple flips give better time bonuses but increase risk.",
        category: "gameplay"
      },
      {
        question: "What's the best way to improve times?",
        answer: "Maintain momentum through obstacles, perform multiple flips for time bonuses, and find the optimal path through each level.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "moto-x3m-spooky-land",
    title: "Moto X3M Spooky Land",
    description: "Moto X3M Spooky Land brings Halloween thrills to the popular motorcycle series. Race through haunted tracks, dodge spooky obstacles, and master challenging stunts in this themed edition. Complete levels while avoiding ghostly hazards in this exciting motorcycle adventure.",
    iframeUrl: "https://htmlxm.github.io/h/moto-x3m-spooky-land",
    image: "/games/moto-x3m-spooky-land.webp",
    rating: 4.8,
    categories: [
      GameCategory.RACING,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.BOYS,         // 目标人
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.TRENDING,      // 功能分类
      GameCategory.ADVENTURE      // 功能分类
    ],
    metadata: {
      title: "Moto X3M Spooky Land - Halloween Motorcycle Game | Shady Bears",
      description: "Race through haunted tracks in this Halloween-themed motorcycle game. Master spooky obstacles, perform stunts, and survive ghostly challenges!",
      keywords: ["moto x3m spooky land", "halloween game", "motorcycle game", "stunt game", "racing game"]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Moto X3M Spooky Land, press ESC to exit fullscreen",
      guide: {
        movement: [
          "W/Up Arrow - Accelerate",
          "S/Down Arrow - Brake",
          "A/D or Left/Right Arrows - Balance bike"
        ],
        actions: [
          "Use arrow keys for front/back flips",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Halloween-themed tracks",
      "Spooky obstacles and hazards",
      "Classic stunt mechanics",
      "Star collection system",
      "Time-based challenges",
      "Themed vehicles",
      "Progressive difficulty"
    ],
    faqs: [
      {
        question: "What's new in Spooky Land?",
        answer: "This version features Halloween-themed tracks, new spooky obstacles, and themed vehicles while maintaining the classic Moto X3M gameplay mechanics.",
        category: "features"
      },
      {
        question: "How do I unlock all levels?",
        answer: "Complete each level to unlock the next. Earning more stars helps unlock special content and achievements.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "monkey-mart",
    title: "Monkey Mart",
    description: "Welcome to Monkey Mart, a charming idle/management game where you control a cute monkey running a supermarket! Plant fruits, harvest produce, and manage your market with style. Fill stands with various food items, collect money from customers, and expand your business with new aisles and products.",
    iframeUrl: "https://ubggo.github.io/ub-games/monkeymart/",
    image: "/games/monkey-mart.webp",
    rating: 4.8,
    categories: [
      GameCategory.STRATEGY,      // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Monkey Mart - Supermarket Management Game | Play Free Online",
      description: "Run your own supermarket with a cute monkey manager! Plant, harvest, and sell various products while expanding your business in this engaging management game.",
      keywords: [
        "monkey mart",
        "management game",
        "supermarket game",
        "idle game",
        "animal game",
        "business simulation"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Monkey Mart, press ESC to exit fullscreen",
      guide: {
        movement: [
          "WASD - Move around",
          "Arrow Keys - Move around"
        ],
        actions: [
          "Stand next to items to interact",
          "Automatic actions when in position"
        ]
      }
    },
    features: [
      "Engaging supermarket management",
      "Cute monkey character",
      "Multiple products to sell",
      "Staff hiring system",
      "Business expansion options",
      "Various food items",
      "Automatic actions",
      "Regular updates"
    ],
    faqs: [
      {
        question: "How do I start my supermarket?",
        answer: "Begin by planting fruits and harvesting produce. Stand next to aisles to stock them with items, and serve customers at the cash register to earn money.",
        category: "gameplay"
      },
      {
        question: "Can I hire staff to help?",
        answer: "Yes! As you progress, you can hire assistants to help maintain aisles and serve customers, making your market more efficient.",
        category: "gameplay"
      },
      {
        question: "What can I sell in my market?",
        answer: "You can sell various items including bananas, corn, eggs, peanuts, coffee beans, chocolate, and more. Some items require special processing equipment.",
        category: "features"
      }
    ]
  },
  {
    id: "stick-hook",
    title: "Stick Hook",
    description: "Become a swinging man in this exciting skill game! Defy gravity with acrobatic flair as you navigate through challenging levels. Master the art of timing and precision to swing from hook to hook, making this simple yet addictive game perfect for players of all ages.",
    iframeUrl: "https://1games.io/game/stick-hook/",
    image: "/games/stick-hook.webp",
    rating: 4.8,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.STICKMAN,     // 主题分类
      GameCategory.KIDS,         // 目标人群
      GameCategory.BOYS,         // 目标人群
      GameCategory.GIRLS,        // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Stick Hook - Gravity Defying Adventure | Play Free Online",
      description: "Master the art of swinging in Stick Hook! Navigate through challenging levels with precise timing and acrobatic moves in this addictive physics-based game.",
      keywords: [
        "stick hook",
        "swinging game",
        "physics game",
        "skill game",
        "arcade game",
        "stickman game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Stick Hook, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Left mouse button - Hold to swing",
          "Release to let go"
        ],
        actions: [
          "Time your swings carefully",
          "Watch for usable hooks"
        ]
      }
    },
    features: [
      "Physics-based gameplay",
      "Multiple challenging levels",
      "Simple one-button controls",
      "Progressive difficulty",
      "Precise timing mechanics",
      "Addictive gameplay loop",
      "Regular content updates",
      "No downloads required"
    ],
    faqs: [
      {
        question: "How do I play Stick Hook?",
        answer: "Simply hold the left mouse button to throw a rope to a hook point, and release to let go. Time your swings carefully to maintain momentum and reach the next hook.",
        category: "gameplay"
      },
      {
        question: "What's the best strategy for completing levels?",
        answer: "Focus on timing your releases at the highest point of your swing for maximum distance. Watch for hooks with borders around them as these are the ones you can use.",
        category: "gameplay"
      },
      {
        question: "How do I improve my skills?",
        answer: "Practice timing your swings and releases. Understanding the physics of momentum and learning to chain swings together smoothly is key to mastering the game.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "poor-bunny",
    title: "Poor Bunny",
    description: "Poor Bunny is a skill game where you control a cute bunny character and eat all the delicious carrots in a dangerous obstacle course. Hop on and off platforms while avoiding rapidly increasing deadly traps that appear out of nowhere. Don't miss the golden carrot when it spawns as it's worth 5 normal carrots!",
    iframeUrl: "https://ext.minijuegosgratis.com/poor-bunny/index.html?key=y8&value=default",
    image: "/games/poor-bunny.webp",
    rating: 4.8,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR,      // 功能分类
      GameCategory.TRENDING      // 功能分类
    ],
    metadata: {
      title: "Poor Bunny - Carrot Collecting Adventure | Play Free Online",
      description: "Guide your cute bunny through dangerous obstacles while collecting carrots in Poor Bunny! Play solo or with friends in this exciting multiplayer platformer.",
      keywords: [
        "poor bunny",
        "bunny game",
        "carrot collecting",
        "multiplayer game",
        "obstacle course",
        "animal game",
        "platform game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Poor Bunny, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Player 1: WASD to move",
          "Player 2: Arrow keys to move"
        ],
        actions: [
          "Collect regular and golden carrots",
          "Avoid deadly traps",
          "ESC - Pause Game"
        ]
      }
    },
    features: [
      "Single and multiplayer modes",
      "Over 100 unlockable bunnies",
      "Golden carrot bonuses",
      "Increasing difficulty",
      "Local co-op gameplay",
      "Versus mode available",
      "High score system",
      "Regular updates"
    ],
    faqs: [
      {
        question: "How do I unlock new bunnies?",
        answer: "Collect carrots during gameplay to unlock new bunny characters. Each bunny has its own unique appearance!",
        category: "gameplay"
      },
      {
        question: "What's special about golden carrots?",
        answer: "Golden carrots are worth 5 regular carrots, making them valuable for quickly unlocking new characters and achieving high scores.",
        category: "gameplay"
      },
      {
        question: "Can I play with friends?",
        answer: "Yes! Poor Bunny supports local co-op and versus modes for multiplayer fun. Team up or compete with your friends!",
        category: "features"
      }
    ]
  },
  {
    id: "bearsus",
    title: "Bearsus",
    description: "Bearsus is an action game where you play as a brawler bear going against other bears in various fighting arenas. Fight with ease thanks to the classic, unbearably simple two-button control scheme! Choose from 8 playable wrestling bears with mix-and-matching moves.",
    iframeUrl: "https://gswitch3.github.io/g2/bearsus/",
    image: "/games/bearsus.webp",
    rating: 4.8,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Bearsus - Bear Wrestling Action Game | Play Free Online",
      description: "Choose your bear fighter and battle in various arenas! Master unique moves, unlock new fighters, and compete with friends in this exciting wrestling game.",
      keywords: [
        "bearsus",
        "bear fighting game",
        "wrestling game",
        "animal game",
        "multiplayer fighting",
        "arcade game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Bearsus, press ESC to exit fullscreen",
      guide: {
        movement: [
          "A/D or Left/Right - Move & Jump",
          "Double Jump 1 - A, D or Left, Right",
          "Double Jump 2 - D, A or Right, Left"
        ],
        actions: [
          "Attack 1 - A, A or Left, Left",
          "Attack 2 - D, D or Right, Right",
          "Attack 3 - (While double-jumping) A or Left",
          "Attack 3 - (While double-jumping) D or Right"
        ]
      }
    },
    features: [
      "8 unique playable bears",
      "Mix-and-match move sets",
      "Arcade Mode with 5 opponents",
      "2-Player competitive mode",
      "Unlockable fighters",
      "Color customization",
      "Simple controls",
      "Strategic gameplay"
    ],
    faqs: [
      {
        question: "How do I unlock new bears?",
        answer: "Play through Arcade Mode and defeat opponents to unlock new fighters. Each victory brings you closer to unlocking new bears and color options.",
        category: "gameplay"
      },
      {
        question: "What's the best way to win fights?",
        answer: "Master the double jump mechanics and timing of your attacks. Different combinations of moves work better in different situations.",
        category: "gameplay"
      },
      {
        question: "Can I play with friends?",
        answer: "Yes! Bearsus features a 2-Player mode where you can compete against a friend locally.",
        category: "features"
      }
    ]
  },
  {
    id: "iron-snout",
    title: "Iron Snout",
    description: "Iron Snout is a fighting game where you play as a pig defending against waves of wolves. Punch, kick, and flip your way through endless wolf attacks, using their own weapons against them in this fast-paced action game.",
    iframeUrl: "https://buckshotroulettee.github.io/game/iron-snout-2/",
    image: "/games/iron-snout.webp",
    rating: 4.8,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.TWO_PLAYER,    // 玩法分类
      GameCategory.MULTIPLAYER,   // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.BOYS,         // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Iron Snout - Pig vs Wolves Fighting Game | Play Free Online",
      description: "Fight endless waves of wolves as a skilled pig warrior! Master combos, dodge attacks, and use enemy weapons in this action-packed fighting game.",
      keywords: [
        "iron snout",
        "pig fighting game",
        "wolf fighting",
        "animal combat",
        "arcade fighting",
        "action game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Iron Snout, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Arrow keys for jumping and hitting wolves"
        ],
        actions: [
          "Up - Jump/Aerial attacks",
          "Left/Right - Dodge and attack",
          "Down - Duck and counter"
        ]
      }
    },
    features: [
      "Fast-paced combat system",
      "Multiple game modes",
      "Weapon stealing mechanics",
      "Endless wolf waves",
      "Combo system",
      "2-player Wolfieball mode",
      "Classic and Sudden Death modes",
      "Regular updates"
    ],
    faqs: [
      {
        question: "What are the different game modes?",
        answer: "Iron Snout features Classic mode, Sudden Death mode, and 2-player Wolfieball mode. Each offers a unique fighting experience.",
        category: "features"
      },
      {
        question: "How do I improve my combat skills?",
        answer: "Practice timing your attacks and dodges, learn to use enemy weapons, and master the combo system. Each enemy type has specific patterns to learn.",
        category: "gameplay"
      },
      {
        question: "Can I play with friends?",
        answer: "Yes! The Wolfieball mode supports 2-player local multiplayer for competitive fun.",
        category: "gameplay"
      }
    ]
  },
  {
    id: "chicken-merge",
    title: "Chicken Merge",
    description: "Chicken Merge is a merge game with tower defense elements. Deploy and combine chickens to create stronger units, defend your base from waves of enemies, and unlock powerful upgrades in this strategic defense game.",
    iframeUrl: "https://gswitch3.github.io/g4/chicken-merge",
    image: "/games/chicken-merge.webp",
    rating: 4.8,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.NEW,          // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Chicken Merge - Strategic Defense Game | Play Free Online",
      description: "Merge chickens to create powerful defenders! Protect your base from enemies in this unique combination of merge and tower defense gameplay.",
      keywords: [
        "chicken merge",
        "merge game",
        "tower defense",
        "strategy game",
        "chicken game",
        "defense game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Chicken Merge, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Drag and drop chickens to merge"
        ],
        actions: [
          "Click and drag to move units",
          "Drop identical units to merge",
          "Place units on defense lines"
        ]
      }
    },
    features: [
      "Unique merging mechanics",
      "Strategic unit placement",
      "Multiple chicken types",
      "Progressive difficulty",
      "Upgrade system",
      "Special abilities",
      "Regular content updates",
      "Achievement system"
    ],
    faqs: [
      {
        question: "How do I create stronger chickens?",
        answer: "Drag and drop identical chickens onto each other to merge them into a stronger unit. Keep merging to create even more powerful defenders.",
        category: "gameplay"
      },
      {
        question: "What's the best defense strategy?",
        answer: "Balance between different chicken types, position them strategically, and keep merging to maintain strong defense lines.",
        category: "gameplay"
      },
      {
        question: "How do I unlock new features?",
        answer: "Progress through waves of enemies and complete achievements to unlock new chicken types and upgrades.",
        category: "features"
      }
    ]
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "The classic Flappy Bird game that took the world by storm! Navigate your bird through pipes by timing your clicks perfectly. Simple to learn but challenging to master, this addictive game tests your reflexes and patience.",
    iframeUrl: "https://gswitch3.github.io/g2/flappy-bird",
    image: "/games/flappy-bird.webp",
    rating: 4.7,
    categories: [
      GameCategory.ACTION,        // 主分类
      GameCategory.SINGLE_PLAYER, // 玩法分类
      GameCategory.ANIMAL,       // 主题分类
      GameCategory.GIRLS,        // 目标人群
      GameCategory.KIDS,         // 目标人群
      GameCategory.FEATURED,     // 功能分类
      GameCategory.POPULAR       // 功能分类
    ],
    metadata: {
      title: "Flappy Bird - Classic Arcade Game | Play Free Online",
      description: "Play the legendary Flappy Bird game! Test your skills and reflexes as you guide your bird through challenging obstacles in this addictive arcade classic.",
      keywords: [
        "flappy bird",
        "arcade game",
        "classic game",
        "bird game",
        "skill game",
        "timing game"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button to expand Flappy Bird, press ESC to exit fullscreen",
      guide: {
        movement: [
          "Click or Spacebar to flap"
        ],
        actions: [
          "Time your clicks carefully",
          "Maintain steady rhythm",
          "Watch obstacle patterns"
        ]
      }
    },
    features: [
      "Classic gameplay mechanics",
      "Simple one-button control",
      "Progressive difficulty",
      "Score tracking system",
      "Addictive challenge",
      "Instant restart",
      "Browser-based gaming",
      "No downloads required"
    ],
    faqs: [
      {
        question: "How do I get a high score?",
        answer: "Focus on maintaining a steady rhythm with your clicks and anticipate the gaps between pipes. Practice timing is key to success.",
        category: "gameplay"
      },
      {
        question: "Why is the game so challenging?",
        answer: "Flappy Bird's difficulty comes from its precise timing requirements and unforgiving collision detection. Each successful pass requires perfect coordination.",
        category: "gameplay"
      },
      {
        question: "How does scoring work?",
        answer: "You earn one point for each set of pipes you successfully pass through. The game keeps track of your current score and best score.",
        category: "features"
      }
    ]
  }
];

// 辅助函数
// 1. 获取单个分类的游戏
export const getGamesByCategory = (category: GameCategory) => {
  return games.filter(game => game.categories.includes(category));
};

// 2. 获取多个分类的游戏（满足任意一个分类即可）
export const getGamesByCategories = (categories: GameCategory[]) => {
  return games.filter(game => 
    categories.some(category => game.categories.includes(category))
  );
};

// 3. 获取同时满足多个分类的游戏
export const getGamesByAllCategories = (categories: GameCategory[]) => {
  return games.filter(game => 
    categories.every(category => game.categories.includes(category))
  );
};

// 4. 按分类类型获取游戏
export const getGamesByCategoryType = (type: 'main' | 'gameplay' | 'theme' | 'target' | 'functional') => {
  const categoryGroups = {
    main: [
      GameCategory.RACING,
      GameCategory.ACTION,
      GameCategory.SHOOTER,
      GameCategory.PUZZLE,
      GameCategory.STRATEGY,
      GameCategory.SPORTS,
      GameCategory.ADVENTURE
    ],
    gameplay: [
      GameCategory.MULTIPLAYER,
      GameCategory.TWO_PLAYER,
      GameCategory.SINGLE_PLAYER,
      GameCategory.IO_GAMES,
      GameCategory.FPS
    ],
    theme: [
      GameCategory.CAR,
      GameCategory.FIGHTING,
      GameCategory.STICKMAN,
      GameCategory.RUNNING,
      GameCategory.BOXING
    ],
    target: [
      GameCategory.BOYS,
      GameCategory.GIRLS,
      GameCategory.KIDS
    ],
    functional: [
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.POPULAR,
      GameCategory.TRENDING
    ]
  };

  return games.filter(game => 
    game.categories.some(category => categoryGroups[type].includes(category))
  );
};

// 获取主分类游戏
export const getGamesByMainCategory = (category: GameCategory) => {
  const mainCategories = [
    GameCategory.RACING,
    GameCategory.ACTION,
    GameCategory.SHOOTER,
    GameCategory.PUZZLE,
    GameCategory.STRATEGY,
    GameCategory.SPORTS,
    GameCategory.ADVENTURE
  ];
  
  if (!mainCategories.includes(category)) {
    return [];
  }
  
  return games.filter(game => game.categories.includes(category));
}; 