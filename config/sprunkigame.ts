export enum GameCategory {
  // 游戏类型分类 (主分类)
  SPRUNKIPHASE = "Sprunki Phase Games",      
  SPRUNKI = "Sprunki Games",     
  INCREDIBOX = "Incredibox Games",  
  MUSIC = "Music Games",     
  MOD = "Mod Games", 
  HALLOWEEN = "Halloween Games",     
  NEW = "New Games",
  HOT = "Hot Games",
  FEATURED = "Featured Games",
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  image: string;
  rating: number;
  categories: GameCategory[];  // 使用合并后的分类系统
  createdAt: string;
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
  video?: {
    youtubeId: string;    // YouTube 视频 ID
    clipId?: string;    // 可选的片段ID
    clipTime?: string;  // 可选的片段时间
    title: string;        // 视频标题
    thumbnail: string;   // 添加封面图字段
  };
}

export const games: Game[] = [
  {
    id: "sprunki-phase-0",
    title: "Sprunki Phase 0",
    createdAt: "2024-01-01",
    description: "Sprunki Phase 0 is a fun and engaging music creation game that allows players to mix and match adorable Sprunki characters to create their own unique tunes. It combines simplicity with creativity, making music accessible to everyone.",
    iframeUrl: "https://iframegame.com/embed/sprunki-babies/index.html",
    image: "/games/sprunki-phase-0.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 0 - Create Music with Baby Sprunkis | Free Online Game",
      description: "Play Sprunki Phase 0 and create unique tunes with adorable baby Sprunki characters! Mix sounds, make music, and unleash your creativity in this fun music creation game.",
      keywords: [
        "sprunki phase 0",
        "baby sprunki",
        "music creation game",
        "sprunki music",
        "kids music game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 0 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Intuitive drag-and-drop interface",
      "Unique baby Sprunki characters",
      "Multiple sound combinations",
      "Real-time music creation",
      "Easy-to-follow tutorials",
      "Mobile-optimized gameplay",
      "High-quality sound output",
      "Creative sandbox environment"
    ],
    faqs: [
      {
        question: "What is Sprunki Phase 0?",
        answer: "Sprunki Phase 0 is a music creation game featuring baby Sprunki characters. It's designed as an entry point to the Sprunki Phase series, perfect for beginners and young players.",
        category: 'general'
      },
      {
        question: "How do I create music in Sprunki Phase 0?",
        answer: "Simply drag and drop baby Sprunki characters onto the canvas. Each character adds unique sounds to your mix, creating a fun and interactive music-making experience.",
        category: 'gameplay'
      },
      {
        question: "Is Sprunki Phase 0 suitable for children?",
        answer: "Yes! Sprunki Phase 0 is specifically designed for players of all ages, with a kid-friendly interface and intuitive controls that make music creation accessible and fun.",
        category: 'general'
      },
      {
        question: "Can I save my Sprunki Phase 0 creations?",
        answer: "Yes, you can save your musical creations and share them with friends. The game includes features for storing and sharing your favorite mixes.",
        category: 'technical'
      },
      {
        question: "What makes Sprunki Phase 0 unique?",
        answer: "Sprunki Phase 0 features adorable baby Sprunki characters, each with unique sounds. The game combines cute visuals with engaging sound mixing options in a creative sandbox environment.",
        category: 'features'
      },
      {
        question: "Are there tutorials available?",
        answer: "Yes, Sprunki Phase 0 includes easy-to-follow tutorials that help new players understand how to create music, choose characters, and use all available features.",
        category: 'gameplay'
      },
      {
        question: "What devices can I play Sprunki Phase 0 on?",
        answer: "Sprunki Phase 0 is optimized for both desktop and mobile devices. You can play it on any device with a modern web browser and internet connection.",
        category: 'technical'
      },
      {
        question: "How does Sprunki Phase 0 differ from other versions?",
        answer: "Sprunki Phase 0 is designed as an introduction to the series, featuring simpler mechanics and baby versions of the characters, making it perfect for newcomers.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "NSRrrdJHAMc",
      title: "Sprunki Phase 0 Gameplay Tutorial",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-phase-1",
    title: "Sprunki Phase 1",
    createdAt: "2024-01-02",
    description: "The original Sprunki Phase that introduced players to the core mechanics of music creation through character arrangement. This groundbreaking release established the foundation for all future Sprunki Phase games, featuring intuitive sound mixing and character transformations.",
    iframeUrl: "https://iframegame.com/embed/sprunki/index.html",
    image: "/games/sprunki-phase-1.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 1 - Original Music Creation Game | Free Online",
      description: "Play the original Sprunki Phase 1! Experience the groundbreaking music creation game that started it all. Mix sounds, transform characters, and create unique beats.",
      keywords: [
        "sprunki phase 1",
        "original sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 1 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Original character arrangement system",
      "Core music creation mechanics",
      "Basic sound mixing features",
      "Character transformations",
      "Real-time audio feedback",
      "Intuitive controls",
      "Multiple sound categories",
      "Special animations"
    ],
    faqs: [
      {
        question: "What is Sprunki Phase 1?",
        answer: "Sprunki Phase 1 is the original version that introduced the core mechanics of character-based music creation. It features intuitive sound mixing and character transformations that became iconic to the series.",
        category: 'general'
      },
      {
        question: "How do I create music in Sprunki Phase 1?",
        answer: "Use the drag-and-drop interface to place characters on stage. Each character adds unique sounds to your mix. Click characters to activate or deactivate their sounds, creating your own musical combinations.",
        category: 'gameplay'
      },
      {
        question: "What makes Sprunki Phase 1 special?",
        answer: "As the first release, Sprunki Phase 1 established the foundation for the series' unique blend of visual character animation and music creation, inspired by Incredibox-style gameplay.",
        category: 'features'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, Sprunki Phase 1 includes a save feature that lets you store and share your musical compositions with the community.",
        category: 'technical'
      },
      {
        question: "What are character transformations?",
        answer: "Characters can transform into 'Mr. Fun' computers, unlocking special sounds and animations that add depth to your musical creations.",
        category: 'gameplay'
      },
      {
        question: "Is Sprunki Phase 1 suitable for beginners?",
        answer: "Absolutely! The game features an intuitive interface and helpful tutorials that make it easy for newcomers to start creating music.",
        category: 'general'
      },
      {
        question: "What devices support Sprunki Phase 1?",
        answer: "Sprunki Phase 1 runs on any device with a modern web browser. No downloads required - just visit our website and start creating!",
        category: 'technical'
      },
      {
        question: "How does it compare to Incredibox?",
        answer: "While inspired by Incredibox, Sprunki Phase 1 introduces unique features like character transformations and special animations that set it apart.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "WNEaYjH5wbI",
      title: "Sprunki Phase 1 - Original Music Creation Game",
      thumbnail: "/games/sprunki-phase-1-thumb.webp"
    }
  },
  {
    id: "sprunki-phase-2",
    title: "Sprunki Phase 2",
    createdAt: "2024-01-03",
    description: "Sprunki Phase 2 expands the original with new levels, characters, and enhanced graphics. This sequel introduces additional gameplay mechanics that encourage creativity and strategic thinking in music creation.",
    iframeUrl: "https://html-classic.itch.zone/html/11700918/index.html",
    image: "/games/sprunki-phase-2.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Phase 2 - Enhanced Music Creation Game | Free Online",
      description: "Play Sprunki Phase 2 and experience enhanced music creation! New characters, improved graphics, and expanded sound library await in this creative musical adventure.",
      keywords: [
        "sprunki phase 2",
        "enhanced sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 2 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Enhanced character roster",
      "Improved graphics engine",
      "Expanded sound library",
      "Advanced mixing features",
      "New special animations",
      "Strategic sound combinations",
      "Refined user interface",
      "Community sharing features"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 2?",
        answer: "Sprunki Phase 2 introduces new characters, enhanced graphics, and an expanded sound library. The game features improved mixing capabilities and new special animations.",
        category: 'general'
      },
      {
        question: "How does Phase 2 differ from Phase 1?",
        answer: "Phase 2 builds upon the original with enhanced graphics, new characters, and additional sound combinations. It introduces more strategic elements to music creation.",
        category: 'features'
      },
      {
        question: "Are the controls different in Phase 2?",
        answer: "The core controls remain intuitive while adding new features. The drag-and-drop interface is enhanced with additional options for sound manipulation.",
        category: 'gameplay'
      },
      {
        question: "Can I import Phase 1 creations?",
        answer: "While direct imports aren't supported, Phase 2's expanded features allow you to recreate and enhance your favorite Phase 1 compositions.",
        category: 'technical'
      },
      {
        question: "What new sound categories are available?",
        answer: "Phase 2 introduces new sound categories including enhanced beats, melodic elements, and special effects, offering more creative possibilities.",
        category: 'features'
      },
      {
        question: "Is Phase 2 more challenging?",
        answer: "While maintaining accessibility, Phase 2 offers more depth and complexity for those who want to create more sophisticated musical arrangements.",
        category: 'gameplay'
      },
      {
        question: "How does sharing work in Phase 2?",
        answer: "Phase 2 features enhanced sharing capabilities, allowing you to save, share, and collaborate on musical creations with the community.",
        category: 'technical'
      },
      {
        question: "What are the new special animations?",
        answer: "Phase 2 includes new character transformations and visual effects that trigger with specific sound combinations, adding visual flair to your music.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "wwe35EyXgmo",
      title: "Sprunki Phase 2 Gameplay Showcase",
      thumbnail: "/games/sprunki-phase-2-thumb.webp"
    }
  },
  {
    id: "sprunki-phase-3",
    title: "Sprunki Phase 3",
    createdAt: "2024-01-04",
    description: "Sprunki Phase 3 continues the evolution with more complex challenges and a broader range of sound elements. This version deepens the music creation experience with advanced features and enhanced character interactions.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-3/index.html",
    image: "/games/sprunki-phase-3.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 3 - Advanced Music Creation Game | Free Online",
      description: "Experience Sprunki Phase 3's advanced music creation system! Discover new sound elements, complex combinations, and enhanced character interactions.",
      keywords: [
        "sprunki phase 3",
        "advanced sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 3 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Advanced character roster",
      "Improved graphics engine",
      "Expanded sound library",
      "Advanced mixing features",
      "New special animations",
      "Strategic sound combinations",
      "Refined user interface",
      "Community sharing features"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 3?",
        answer: "Sprunki Phase 3 introduces new characters, enhanced graphics, and an expanded sound library. The game features improved mixing capabilities and new special animations.",
        category: 'general'
      },
      {
        question: "How does Phase 3 differ from Phase 2?",
        answer: "Phase 3 builds upon the original with enhanced graphics, new characters, and additional sound combinations. It introduces more strategic elements to music creation.",
        category: 'features'
      },
      {
        question: "Are the controls different in Phase 3?",
        answer: "The core controls remain intuitive while adding new features. The drag-and-drop interface is enhanced with additional options for sound manipulation.",
        category: 'gameplay'
      },
      {
        question: "Can I import Phase 2 creations?",
        answer: "While direct imports aren't supported, Phase 3's expanded features allow you to recreate and enhance your favorite Phase 2 compositions.",
        category: 'technical'
      },
      {
        question: "What new sound categories are available?",
        answer: "Phase 3 introduces new sound categories including enhanced beats, melodic elements, and special effects, offering more creative possibilities.",
        category: 'features'
      },
      {
        question: "Is Phase 3 more challenging?",
        answer: "While maintaining accessibility, Phase 3 offers more depth and complexity for those who want to create more sophisticated musical arrangements.",
        category: 'gameplay'
      },
      {
        question: "How does sharing work in Phase 3?",
        answer: "Phase 3 features enhanced sharing capabilities, allowing you to save, share, and collaborate on musical creations with the community.",
        category: 'technical'
      },
      {
        question: "What are the new special animations?",
        answer: "Phase 3 includes new character transformations and visual effects that trigger with specific sound combinations, adding visual flair to your music.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "wwe35EyXgmo",
      title: "Sprunki Phase 3 Gameplay Showcase",
      thumbnail: "/games/sprunki-phase-3-thumb.webp"
    }
  },
  {
    id: "sprunki-phase-4",
    title: "Sprunki Phase 4",
    createdAt: "2024-01-05",
    description: "Sprunki Phase 4 introduces new characters and sound loops while maintaining the core gameplay style. This version enhances the musical variety available to players with an expanded sound library and improved character interactions.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-4/index.html",
    image: "/logo.jpeg",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 4 - Enhanced Music Creation Game | Free Online",
      description: "Play Sprunki Phase 4 and discover new musical possibilities! Experience enhanced character interactions, expanded sound library, and improved mixing capabilities.",
      keywords: [
        "sprunki phase 4",
        "enhanced sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 4 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "New character additions",
      "Expanded sound library",
      "Enhanced mixing capabilities",
      "Improved character interactions",
      "Advanced sound combinations",
      "Refined visual effects",
      "Community sharing features",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 4?",
        answer: "Sprunki Phase 4 introduces new characters and an expanded sound library, offering more musical possibilities while maintaining the intuitive gameplay style.",
        category: 'general'
      },
      {
        question: "How does Phase 4 improve on previous versions?",
        answer: "Phase 4 enhances character interactions and mixing capabilities, providing more refined control over your musical creations.",
        category: 'features'
      },
      {
        question: "What are the new sound features?",
        answer: "The expanded sound library includes new beats, melodies, and effects, along with improved character-specific sounds.",
        category: 'gameplay'
      },
      {
        question: "Is Phase 4 compatible with older versions?",
        answer: "While direct compatibility isn't available, Phase 4's enhanced features allow you to recreate and improve upon previous compositions.",
        category: 'technical'
      },
      {
        question: "What visual improvements are included?",
        answer: "Phase 4 features refined visual effects and improved character animations that enhance the music creation experience.",
        category: 'features'
      },
      {
        question: "How has the interface been improved?",
        answer: "The user interface has been optimized for better performance and easier navigation while maintaining familiar controls.",
        category: 'technical'
      },
      {
        question: "Are there new sharing features?",
        answer: "Yes, Phase 4 includes enhanced community features for sharing and discovering musical creations.",
        category: 'technical'
      },
      {
        question: "What makes Phase 4 unique?",
        answer: "Phase 4 strikes a perfect balance between new features and familiar gameplay, making it accessible yet innovative.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Sprunki Phase 4 Gameplay Showcase",
      thumbnail: "/games/sprunki-phase-4-thumb.webp"
    }
  },
  {
    id: "sprunki-phase-5",
    title: "Sprunki Phase 5",
    createdAt: "2024-01-06",
    description: "Sprunki Phase 5 adds more characters and levels, along with improved graphics and sound quality. This version enriches the gameplay experience with enhanced visual designs and a more sophisticated audio engine.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-5/index.html",
    image: "/games/sprunki-phase-5.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 5 - Advanced Music Creation Game | Free Online",
      description: "Experience Sprunki Phase 5's enhanced audiovisual features! Create music with improved graphics, new characters, and superior sound quality.",
      keywords: [
        "sprunki phase 5",
        "advanced sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 5 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "New character additions",
      "Improved graphics engine",
      "Superior sound quality",
      "Enhanced visual designs",
      "Advanced sound combinations",
      "Refined user interface",
      "Community sharing features",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 5?",
        answer: "Sprunki Phase 5 introduces new characters, improved graphics, and superior sound quality. The game features enhanced visual designs and advanced sound combinations.",
        category: 'general'
      },
      {
        question: "How does Phase 5 differ from Phase 4?",
        answer: "Phase 5 builds upon the original with improved graphics, new characters, and superior sound quality. It introduces more advanced sound combinations and visual designs.",
        category: 'features'
      },
      {
        question: "Are the controls different in Phase 5?",
        answer: "The core controls remain intuitive while adding new features. The drag-and-drop interface is enhanced with additional options for sound manipulation.",
        category: 'gameplay'
      },
      {
        question: "Can I import Phase 4 creations?",
        answer: "While direct imports aren't supported, Phase 5's expanded features allow you to recreate and enhance your favorite Phase 4 compositions.",
        category: 'technical'
      },
      {
        question: "What new sound categories are available?",
        answer: "Phase 5 introduces new sound categories including enhanced beats, melodies, and effects, offering more creative possibilities.",
        category: 'features'
      },
      {
        question: "Is Phase 5 more challenging?",
        answer: "While maintaining accessibility, Phase 5 offers more depth and complexity for those who want to create more sophisticated musical arrangements.",
        category: 'gameplay'
      },
      {
        question: "How does sharing work in Phase 5?",
        answer: "Phase 5 features enhanced sharing capabilities, allowing you to save, share, and collaborate on musical creations with the community.",
        category: 'technical'
      },
      {
        question: "What are the new special animations?",
        answer: "Phase 5 includes new character transformations and visual effects that trigger with specific sound combinations, adding visual flair to your music.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "dQw4w9WgXcQ",
      title: "Sprunki Phase 5 Gameplay Showcase",
      thumbnail: "/games/sprunki-phase-5-thumb.webp"
    }
  },
  {
    id: "sprunki-phase-6",
    title: "Sprunki Phase 6",
    createdAt: "2024-01-07",
    description: "Sprunki Phase 6 focuses on refining gameplay mechanics and introducing new challenges. This version requires players to think critically about their sound combinations while maintaining the fun and creativity of music creation.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-6/index.html",
    image: "/games/sprunki-phase-6.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Phase 6 - Strategic Music Creation Game | Free Online",
      description: "Play Sprunki Phase 6 and master strategic sound combinations! Experience refined gameplay mechanics and challenging musical puzzles.",
      keywords: [
        "sprunki phase 6",
        "strategic sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 6 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Refined gameplay mechanics",
      "Challenging musical puzzles",
      "Strategic sound combinations",
      "Improved character interactions",
      "Advanced sound manipulation",
      "Refined user interface",
      "Community sharing features",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 6?",
        answer: "Sprunki Phase 6 introduces refined gameplay mechanics and challenging musical puzzles. The game features improved character interactions and advanced sound manipulation.",
        category: 'general'
      },
      {
        question: "How does Phase 6 differ from Phase 5?",
        answer: "Phase 6 builds upon the original with refined gameplay mechanics and challenging musical puzzles. It introduces more strategic elements to music creation.",
        category: 'features'
      },
      {
        question: "Are the controls different in Phase 6?",
        answer: "The core controls remain intuitive while adding new features. The drag-and-drop interface is enhanced with additional options for sound manipulation.",
        category: 'gameplay'
      },
      {
        question: "Can I import Phase 5 creations?",
        answer: "While direct imports aren't supported, Phase 6's expanded features allow you to recreate and enhance your favorite Phase 5 compositions.",
        category: 'technical'
      },
      {
        question: "What new sound categories are available?",
        answer: "Phase 6 introduces new sound categories including enhanced beats, melodies, and effects, offering more creative possibilities.",
        category: 'features'
      },
      {
        question: "Is Phase 6 more challenging?",
        answer: "While maintaining accessibility, Phase 6 offers more depth and complexity for those who want to create more sophisticated musical arrangements.",
        category: 'gameplay'
      },
      {
        question: "How does sharing work in Phase 6?",
        answer: "Phase 6 features enhanced sharing capabilities, allowing you to save, share, and collaborate on musical creations with the community.",
        category: 'technical'
      },
      {
        question: "What are the new special animations?",
        answer: "Phase 6 includes new character transformations and visual effects that trigger with specific sound combinations, adding visual flair to your music.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Phase 6 Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-phase-7",
    title: "Sprunki Phase 7",
    createdAt: "2024-01-08",
    description: "Sprunki Phase 7 represents the latest evolution in the series, featuring enhanced visuals, dynamic soundtracks, and unique characters with special abilities. This version emphasizes creativity and experimentation in music creation.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-7/index.html",
    image: "/games/sprunki-phase-7.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.HOT,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 7 - Latest Music Creation Game | Free Online",
      description: "Experience the latest Sprunki Phase 7! Discover enhanced visuals, dynamic soundtracks, and innovative music creation features in this cutting-edge release.",
      keywords: [
        "sprunki phase 7",
        "latest sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 7 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Latest visual enhancements",
      "Dynamic soundtrack system",
      "Advanced character abilities",
      "Innovative sound combinations",
      "Enhanced user interface",
      "Real-time audio processing",
      "Expanded sound library",
      "Community integration"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 7?",
        answer: "Sprunki Phase 7 introduces enhanced visuals, dynamic soundtracks, and new character abilities. It represents the most advanced version of the game to date.",
        category: 'general'
      },
      {
        question: "How does Phase 7 improve the music creation?",
        answer: "Phase 7 features a dynamic soundtrack system that responds to your actions in real-time, along with an expanded sound library and innovative combination possibilities.",
        category: 'features'
      },
      {
        question: "What are the new character abilities?",
        answer: "Characters in Phase 7 have enhanced abilities that affect both sound creation and visual feedback, creating a more immersive experience.",
        category: 'gameplay'
      },
      {
        question: "Is Phase 7 compatible with older versions?",
        answer: "While maintaining core mechanics, Phase 7 introduces new features that enhance the overall experience without requiring familiarity with previous versions.",
        category: 'technical'
      },
      {
        question: "What visual improvements are included?",
        answer: "Phase 7 features enhanced graphics, improved animations, and dynamic visual effects that respond to your musical creations.",
        category: 'features'
      },
      {
        question: "How has the interface been enhanced?",
        answer: "The user interface has been refined for better usability while maintaining familiar controls and adding new creative tools.",
        category: 'technical'
      },
      {
        question: "What new sound features are available?",
        answer: "Phase 7 includes an expanded sound library, dynamic audio processing, and new ways to combine and layer sounds.",
        category: 'features'
      },
      {
        question: "How does the community feature work?",
        answer: "Phase 7 integrates enhanced community features for sharing creations, discovering new compositions, and collaborating with other creators.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Phase 7 Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-phase-8",
    title: "Sprunki Phase 8",
    createdAt: "2024-01-09",
    description: "Sprunki Phase 8 builds upon the success of previous versions, introducing innovative sound manipulation features and enhanced visual effects. This version focuses on providing new creative tools while maintaining the intuitive gameplay that fans love.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-8/index.html",
    image: "/games/sprunki-phase-8.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI
    ],
    metadata: {
      title: "Sprunki Phase 8 - Advanced Music Creation Game | Free Online",
      description: "Play Sprunki Phase 8 and explore new sound manipulation features! Experience enhanced visual effects and innovative creative tools in this latest release.",
      keywords: [
        "sprunki phase 8",
        "advanced sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 8 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "New sound manipulation features",
      "Enhanced visual effects",
      "Innovative creative tools",
      "Intuitive gameplay",
      "Familiar controls",
      "Community sharing features",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 8?",
        answer: "Sprunki Phase 8 introduces new sound manipulation features and enhanced visual effects. The game features improved character interactions and advanced sound manipulation.",
        category: 'general'
      },
      {
        question: "How does Phase 8 improve on previous versions?",
        answer: "Phase 8 enhances character interactions and mixing capabilities, providing more refined control over your musical creations.",
        category: 'features'
      },
      {
        question: "What are the new sound features?",
        answer: "The expanded sound library includes new beats, melodies, and effects, along with improved character-specific sounds.",
        category: 'gameplay'
      },
      {
        question: "Is Phase 8 compatible with older versions?",
        answer: "While maintaining core mechanics, Phase 8 introduces new features that enhance the overall experience without requiring familiarity with previous versions.",
        category: 'technical'
      },
      {
        question: "What visual improvements are included?",
        answer: "Phase 8 features enhanced graphics, improved animations, and dynamic visual effects that respond to your musical creations.",
        category: 'features'
      },
      {
        question: "How has the interface been enhanced?",
        answer: "The user interface has been refined for better usability while maintaining familiar controls and adding new creative tools.",
        category: 'technical'
      },
      {
        question: "What new sound features are available?",
        answer: "Phase 8 includes an expanded sound library, dynamic audio processing, and new ways to combine and layer sounds.",
        category: 'features'
      },
      {
        question: "How does the community feature work?",
        answer: "Phase 8 integrates enhanced community features for sharing creations, discovering new compositions, and collaborating with other creators.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Phase 8 Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-phase-9",
    title: "Sprunki Phase 9",
    createdAt: "2024-01-10",
    description: "Sprunki Phase 9 introduces groundbreaking features that push the boundaries of music creation. With advanced sound processing capabilities and innovative character interactions, this version offers unprecedented creative possibilities.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-9/index.html",
    image: "/games/sprunki-phase-9.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Phase 9 - Innovative Music Creation Game | Free Online",
      description: "Experience Sprunki Phase 9's groundbreaking features! Discover advanced sound processing and innovative character interactions in this revolutionary release.",
      keywords: [
        "sprunki phase 9",
        "innovative sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 9 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Advanced sound processing",
      "Innovative character interactions",
      "Unprecedented creative possibilities",
      "Intuitive gameplay",
      "Familiar controls",
      "Community sharing features",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 9?",
        answer: "Sprunki Phase 9 introduces advanced sound processing and innovative character interactions. The game features improved character interactions and advanced sound manipulation.",
        category: 'general'
      },
      {
        question: "How does Phase 9 improve on previous versions?",
        answer: "Phase 9 enhances character interactions and mixing capabilities, providing more refined control over your musical creations.",
        category: 'features'
      },
      {
        question: "What are the new sound features?",
        answer: "The expanded sound library includes new beats, melodies, and effects, along with improved character-specific sounds.",
        category: 'gameplay'
      },
      {
        question: "Is Phase 9 compatible with older versions?",
        answer: "While maintaining core mechanics, Phase 9 introduces new features that enhance the overall experience without requiring familiarity with previous versions.",
        category: 'technical'
      },
      {
        question: "What visual improvements are included?",
        answer: "Phase 9 features enhanced graphics, improved animations, and dynamic visual effects that respond to your musical creations.",
        category: 'features'
      },
      {
        question: "How has the interface been enhanced?",
        answer: "The user interface has been refined for better usability while maintaining familiar controls and adding new creative tools.",
        category: 'technical'
      },
      {
        question: "What new sound features are available?",
        answer: "Phase 9 includes an expanded sound library, dynamic audio processing, and new ways to combine and layer sounds.",
        category: 'features'
      },
      {
        question: "How does the community feature work?",
        answer: "Phase 9 integrates enhanced community features for sharing creations, discovering new compositions, and collaborating with other creators.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Phase 9 Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-phase-10",
    title: "Sprunki Phase 10",
    createdAt: "2024-01-11",
    description: "Sprunki Phase 10 is a fun and engaging music creation game that allows players to mix and match adorable Sprunki characters to create their own unique tunes. It combines simplicity with creativity, making music accessible to everyone.",
    iframeUrl: "https://iframegame.com/embed/sprunki-phase-10/index.html",
    image: "/games/sprunki-phase-10.webp",
    rating: 4.9,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN
    ],
    metadata: {
      title: "Sprunki Phase 10 - Latest Music Creation Game | Free Online",
      description: "Play Sprunki Phase 10 and create unique tunes! Mix sounds, make music, and unleash your creativity in this latest release of the popular music creation game.",
      keywords: [
        "sprunki phase 10",
        "latest sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Phase 10 experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Latest character designs",
      "Advanced sound mixing",
      "Enhanced visual effects",
      "Intuitive controls",
      "Mobile optimization",
      "High-quality audio",
      "Creative sandbox",
      "Community features"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Phase 10?",
        answer: "Sprunki Phase 10 brings the latest innovations in music creation, featuring new characters, enhanced sound mixing capabilities, and improved visual effects.",
        category: 'general'
      },
      {
        question: "How do I create music in Phase 10?",
        answer: "Simply choose your favorite Sprunki characters and drag them onto the canvas. Each character adds unique sounds to your mix, creating an interactive music-making experience.",
        category: 'gameplay'
      },
      {
        question: "Is Phase 10 suitable for beginners?",
        answer: "Yes! Sprunki Phase 10 is designed for all skill levels, with intuitive controls and helpful tutorials to get you started.",
        category: 'general'
      },
      {
        question: "What devices support Phase 10?",
        answer: "Sprunki Phase 10 runs on any modern web browser, both desktop and mobile. No downloads required - just visit and start creating!",
        category: 'technical'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, you can save and share your musical creations with the Sprunki Phase community.",
        category: 'technical'
      },
      {
        question: "What makes Phase 10 unique?",
        answer: "Phase 10 features the latest character designs, enhanced sound mixing capabilities, and improved visual effects that set it apart from previous versions.",
        category: 'features'
      },
      {
        question: "How does multiplayer work?",
        answer: "Sprunki Phase 10 includes collaborative features that let you create and share music with other players in the community.",
        category: 'gameplay'
      },
      {
        question: "Are there tutorials available?",
        answer: "Yes, comprehensive tutorials help you learn all aspects of music creation in Sprunki Phase 10.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Phase 10 Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-retake",
    title: "Sprunki Retake",
    createdAt: "2024-01-12",
    description: "Sprunki Retake is a fun and engaging music creation game that allows players to mix and match adorable Sprunki characters to create their own unique tunes. It combines simplicity with creativity, making music accessible to everyone.",
    iframeUrl: "https://iframegame.com/embed/sprunki-retake/index.html",
    image: "/games/sprunki-retake.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.HOT,
      GameCategory.NEW,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Retake - Reimagined Music Creation Game | Free Online",
      description: "Experience Sprunki Retake, a reimagined version of the classic music creation game! Create unique tunes with enhanced features and nostalgic elements.",
      keywords: [
        "sprunki retake",
        "sprunki remake",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Retake experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Reimagined character designs",
      "Enhanced sound mixing",
      "Improved visual effects",
      "Intuitive controls",
      "Mobile optimization",
      "High-quality audio",
      "Creative sandbox",
      "Community features"
    ],
    faqs: [
      {
        question: "What's new in Sprunki Retake?",
        answer: "Sprunki Retake brings the latest innovations in music creation, featuring new characters, enhanced sound mixing capabilities, and improved visual effects.",
        category: 'general'
      },
      {
        question: "How do I create music in Retake?",
        answer: "Simply choose your favorite Sprunki characters and drag them onto the canvas. Each character adds unique sounds to your mix, creating an interactive music-making experience.",
        category: 'gameplay'
      },
      {
        question: "Is Retake suitable for beginners?",
        answer: "Yes! Sprunki Retake is designed for all skill levels, with intuitive controls and helpful tutorials to get you started.",
        category: 'general'
      },
      {
        question: "What devices support Retake?",
        answer: "Sprunki Retake runs on any modern web browser, both desktop and mobile. No downloads required - just visit and start creating!",
        category: 'technical'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, you can save and share your musical creations with the Sprunki Retake community.",
        category: 'technical'
      },
      {
        question: "What makes Retake unique?",
        answer: "Retake features the latest character designs, enhanced sound mixing capabilities, and improved visual effects that set it apart from previous versions.",
        category: 'features'
      },
      {
        question: "How does multiplayer work?",
        answer: "Sprunki Retake includes collaborative features that let you create and share music with other players in the community.",
        category: 'gameplay'
      },
      {
        question: "Are there tutorials available?",
        answer: "Yes, comprehensive tutorials help you learn all aspects of music creation in Sprunki Retake.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Retake Gameplay Showcase",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-swapped-version",
    title: "Sprunki Swapped Version",
    createdAt: "2024-01-13",
    description: "Sprunki Swapped Version is a creative remix of the Sprunki game series, where characters swap their usual roles and sounds, resulting in a fun and unexpected twist on the original gameplay. In this version, familiar characters take on entirely new musical tones and styles, encouraging players to explore and experiment in fresh ways.",
    iframeUrl: "https://sprunki.org/sprunki-swapped-version.embed",
    image: "/games/sprunki-swapped-version.webp",
    rating: 4.7,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.HOT,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Swapped Version - Remixed Music Creation Game | Free Online",
      description: "Play Sprunki Swapped Version and experience familiar characters in new roles! Create unique music with swapped sounds and unexpected combinations.",
      keywords: [
        "sprunki swapped version",
        "sprunki remix",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Swapped Version experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Swapped character roles",
      "Unexpected sound combinations",
      "Fresh gameplay mechanics",
      "Familiar characters",
      "New musical possibilities",
      "Creative experimentation",
      "Unique animations",
      "Community sharing"
    ],
    faqs: [
      {
        question: "What is Sprunki Swapped Version?",
        answer: "Sprunki Swapped Version is a creative remix where familiar characters take on new roles and sounds, offering fresh ways to create music and experiment with unexpected combinations.",
        category: 'general'
      },
      {
        question: "How does the character swapping work?",
        answer: "In Sprunki Swapped Version, each character produces different sounds than in the original game, creating new and surprising musical possibilities.",
        category: 'gameplay'
      },
      {
        question: "Is prior Sprunki Phase experience needed?",
        answer: "While familiarity with Sprunki Phase can add to the fun of discovering swapped roles, the game is still accessible to new players.",
        category: 'general'
      },
      {
        question: "What makes this version unique?",
        answer: "Sprunki Swapped Version offers a fresh take on familiar characters by giving them completely different musical roles and sound effects.",
        category: 'features'
      },
      {
        question: "Can I save my swapped creations?",
        answer: "Yes, Sprunki Swapped Version includes the ability to save and share your unique musical creations with the community.",
        category: 'technical'
      },
      {
        question: "Are there new sound combinations?",
        answer: "Yes, the swapped character roles create entirely new sound combination possibilities not found in other Sprunki Phase versions.",
        category: 'features'
      },
      {
        question: "How do I discover new combinations?",
        answer: "Experiment with different character arrangements and listen for unexpected harmonies created by their swapped sounds.",
        category: 'gameplay'
      },
      {
        question: "Is this version regularly updated?",
        answer: "Yes, Sprunki Swapped Version receives updates with new swapped combinations and features based on community feedback.",
        category: 'technical'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Swapped Version Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-dandys-world",
    title: "Sprunki Dandy's World",
    createdAt: "2024-01-14",
    description: "Sprunki Dandy's World is a fun and addictive rhythm game with a unique blend of music, art, and storytelling. In this mod, you'll be transported to the whimsical world of Sprunki Dandy.",
    iframeUrl: "https://sprunki.org/sprunki-dandys-world.embed",
    image: "/games/sprunki-dandys-world.webp",
    rating: 4.7,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki Dandy's World - Themed Music Creation Game | Free Online",
      description: "Experience Sprunki Dandy's World, a whimsical music creation adventure! Create beats and music videos in this unique themed version of Sprunki Phase.",
      keywords: [
        "sprunki dandys world",
        "sprunki themed",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Dandy's World experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Unique themed environments",
      "Special sound effects",
      "Custom character designs",
      "Themed challenges",
      "Whimsical art style",
      "Story-driven gameplay",
      "Creative music tools",
      "Community sharing"
    ],
    faqs: [
      {
        question: "What is Sprunki Dandy's World?",
        answer: "Sprunki Dandy's World is a themed version of Sprunki Phase that combines music creation with whimsical storytelling and unique art style.",
        category: 'general'
      },
      {
        question: "How do I create music in Sprunki Dandy's World?",
        answer: "Choose from a variety of quirky characters and instruments, then combine them to create your own unique beats and music videos.",
        category: 'gameplay'
      },
      {
        question: "What makes this version special?",
        answer: "Sprunki Dandy's World features unique themed environments, special sound effects, and custom character designs that create a distinctive atmosphere.",
        category: 'features'
      },
      {
        question: "Can I share my creations?",
        answer: "Yes, you can share your musical creations and music videos with the Sprunki Phase community.",
        category: 'technical'
      },
      {
        question: "Are there story elements?",
        answer: "Yes, Sprunki Dandy's World includes narrative elements that add context and meaning to your musical creations.",
        category: 'features'
      },
      {
        question: "Is it suitable for beginners?",
        answer: "Yes, while offering unique features, Sprunki Dandy's World maintains the intuitive controls and helpful tutorials that make it accessible to all players.",
        category: 'gameplay'
      },
      {
        question: "What devices support this version?",
        answer: "Sprunki Dandy's World runs on any modern web browser, both desktop and mobile devices.",
        category: 'technical'
      },
      {
        question: "How often is new content added?",
        answer: "The game receives regular updates with new themed content, characters, and sound effects.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Dandy's World Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-but-everyone-is-alive",
    title: "Sprunki But Everyone Is Alive",
    createdAt: "2024-01-15",
    description: "Sprunki But Everyone Is Alive is a fun and engaging twist on the original Sprunki game series, designed to introduce a vibrant and dynamic world where all characters are alive and interactive. This installment emphasizes exploration, teamwork, and creative problem-solving, providing players with a unique gaming experience filled with humor and adventure.",
    iframeUrl: "https://sprunki.org/sprunki-but-everyone-is-alive.embed",
    image: "/games/sprunki-but-everyone-is-alive.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW
    ],
    metadata: {
      title: "Sprunki But Everyone Is Alive - Interactive Music Game | Free Online",
      description: "Play Sprunki But Everyone Is Alive and experience a vibrant world of interactive characters! Create music in this unique version where every character comes to life.",
      keywords: [
        "sprunki but everyone is alive",
        "interactive sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki But Everyone Is Alive experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Unique gameplay mechanics",
      "Interactive character interactions",
      "Vibrant world exploration",
      "Team-based gameplay",
      "Creative problem-solving",
      "Humorous narrative",
      "Community sharing",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What is Sprunki But Everyone Is Alive?",
        answer: "Sprunki But Everyone Is Alive is a unique version of the Sprunki game series that introduces a vibrant and dynamic world where all characters are alive and interactive.",
        category: 'general'
      },
      {
        question: "How does the game work?",
        answer: "Sprunki But Everyone Is Alive features a vibrant world where players can explore and interact with characters. The game emphasizes teamwork and creative problem-solving to create unique musical experiences.",
        category: 'gameplay'
      },
      {
        question: "What makes this version special?",
        answer: "Sprunki But Everyone Is Alive introduces a vibrant world with alive characters, interactive gameplay, and humorous narrative elements that create a unique gaming experience.",
        category: 'features'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, you can save and share your musical creations with the Sprunki But Everyone Is Alive community.",
        category: 'technical'
      },
      {
        question: "What devices support this version?",
        answer: "Sprunki But Everyone Is Alive runs on any modern web browser, both desktop and mobile devices.",
        category: 'technical'
      },
      {
        question: "How often is new content added?",
        answer: "The game receives regular updates with new content, characters, and gameplay mechanics.",
        category: 'features'
      },
      {
        question: "How does multiplayer work?",
        answer: "Sprunki But Everyone Is Alive includes multiplayer features that let you create and share music with other players in the community.",
        category: 'gameplay'
      },
      {
        question: "Are there tutorials available?",
        answer: "Yes, comprehensive tutorials help you learn all aspects of music creation in Sprunki But Everyone Is Alive.",
        category: 'features'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki But Everyone Is Alive Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-but-alpha",
    title: "Sprunki But Alpha",
    createdAt: "2024-01-16",
    description: "Sprunki But Alpha is a fun and addictive rhythm game where you can create your own beats and music videos using a variety of colorful characters and instruments. In this mod, you'll be transported to the whimsical world of Sprunki But Alpha, where you'll have the chance to create your own beats and music videos using a variety of colorful characters and instruments.",
    iframeUrl: "https://sprunki.org/sprunki-but-alpha.embed",
    image: "/games/sprunki-but-alpha.webp",
    rating: 4.7,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW
    ],
    metadata: {
      title: "Sprunki But Alpha - Experimental Music Creation Game | Free Online",
      description: "Experience Sprunki But Alpha's experimental features! Create unique music with innovative mechanics in this special version of Sprunki Phase.",
      keywords: [
        "sprunki but alpha",
        "experimental sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki But Alpha experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Experimental gameplay mechanics",
      "Innovative sound combinations",
      "Unique character interactions",
      "Creative music tools",
      "Testing ground features",
      "Community feedback system",
      "Regular updates",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What is Sprunki But Alpha?",
        answer: "Sprunki But Alpha is an experimental version of Sprunki Phase that tests new features and gameplay mechanics before they are implemented in the main series.",
        category: 'general'
      },
      {
        question: "How does music creation work?",
        answer: "Choose from a variety of quirky characters and instruments, then combine them to create your own unique beats and music videos.",
        category: 'gameplay'
      },
      {
        question: "What makes this version unique?",
        answer: "Sprunki But Alpha features experimental gameplay mechanics and innovative sound combinations not found in other versions.",
        category: 'features'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, you can save and share your musical creations with the Sprunki Phase community.",
        category: 'technical'
      },
      {
        question: "Is it suitable for beginners?",
        answer: "While Sprunki But Alpha includes experimental features, it maintains intuitive controls that make it accessible to all players.",
        category: 'gameplay'
      },
      {
        question: "How often are new features added?",
        answer: "Sprunki But Alpha receives regular updates with new experimental features based on community feedback.",
        category: 'technical'
      },
      {
        question: "Can I provide feedback?",
        answer: "Yes! The development team actively encourages community feedback to help shape future features.",
        category: 'features'
      },
      {
        question: "What devices support this version?",
        answer: "Sprunki But Alpha runs on any modern web browser, both desktop and mobile devices.",
        category: 'technical'
      }
    ],
    video: {
      youtubeId: "tJKMcu-Ut-Q",
      title: "Sprunki But Alpha Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-incredibox",
    title: "Sprunki Incredibox",
    createdAt: "2024-01-17",
    description: "Sprunki Incredibox is a fun and addictive rhythm game where you can create your own beats and music videos using a variety of colorful characters and instruments. In this mod, you'll be transported to the whimsical world of Sprunki Incredibox, where you'll have the chance to create your own beats and music videos using a variety of colorful characters and instruments.",
    iframeUrl: "https://sprunki.org/sprunki-incredibox.embed",
    image: "/games/sprunki-incredibox.webp",
    rating: 4.8,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW
    ],
    metadata: {
      title: "Sprunki Incredibox - Crossover Music Creation Game | Free Online",
      description: "Play Sprunki Incredibox and experience the best of both worlds! Create music with elements from Sprunki Phase and Incredibox in this unique crossover.",
      keywords: [
        "sprunki incredibox",
        "sprunki crossover",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki Incredibox experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Crossover gameplay mechanics",
      "Innovative sound combinations",
      "Unique character interactions",
      "Creative music tools",
      "Testing ground features",
      "Community feedback system",
      "Regular updates",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What is Sprunki Incredibox?",
        answer: "Sprunki Incredibox is a crossover version of Sprunki Phase and Incredibox that combines the best elements of both games.",
        category: 'general'
      },
      {
        question: "How does music creation work?",
        answer: "Choose from a variety of quirky characters and instruments, then combine them to create your own unique beats and music videos.",
        category: 'gameplay'
      },
      {
        question: "What makes this version unique?",
        answer: "Sprunki Incredibox features innovative sound combinations and unique character interactions not found in other versions.",
        category: 'features'
      },
      {
        question: "Can I save my creations?",
        answer: "Yes, you can save and share your musical creations with the Sprunki Phase community.",
        category: 'technical'
      },
      {
        question: "Is it suitable for beginners?",
        answer: "While Sprunki Incredibox includes experimental features, it maintains intuitive controls that make it accessible to all players.",
        category: 'gameplay'
      },
      {
        question: "How often are new features added?",
        answer: "Sprunki Incredibox receives regular updates with new experimental features based on community feedback.",
        category: 'technical'
      },
      {
        question: "Can I provide feedback?",
        answer: "Yes! The development team actively encourages community feedback to help shape future features.",
        category: 'features'
      },
      {
        question: "What devices support this version?",
        answer: "Sprunki Incredibox runs on any modern web browser, both desktop and mobile devices.",
        category: 'technical'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki Incredibox Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
  },
  {
    id: "sprunki-with-fan-character",
    title: "Sprunki With Fan Character",
    createdAt: "2024-01-18",
    description: "Sprunki With Fan Character is a fan-made game based on the popular Sprunki character from the Incredibox series. This game introduces a new fan-made character alongside Sprunki, embarking on a unique adventure together.",
    iframeUrl: "https://sprunki.org/sprunki-with-fan-character.embed",
    image: "/games/sprunki-with-fan-character.webp",
    rating: 4.6,
    categories: [
      GameCategory.MUSIC,
      GameCategory.FEATURED,
      GameCategory.NEW,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN,
      GameCategory.MOD
    ],
    metadata: {
      title: "Sprunki With Fan Character - Community Created Game | Free Online",
      description: "Play Sprunki With Fan Character and experience community creativity! Create music with fan-made characters in this unique version of Sprunki Phase.",
      keywords: [
        "sprunki with fan character",
        "fan made sprunki",
        "music creation game",
        "sprunki music",
        "incredibox style game",
        "online music maker"
      ]
    },
    controls: {
      fullscreenTip: "Click the fullscreen button for the best Sprunki With Fan Character experience",
      guide: {
        movement: [
          "Drag & Drop: Move characters",
          "Click: Activate/Deactivate sounds",
          "Spacebar: Reset all sounds"
        ],
        actions: [
          "Right Click: Remove sound",
          "Double Click: Special animation",
          "Scroll: Browse characters"
        ]
      }
    },
    features: [
      "Fan-made characters",
      "Community created content",
      "Unique sound combinations",
      "Creative music tools",
      "Original storyline",
      "Custom animations",
      "Regular updates",
      "Performance optimizations"
    ],
    faqs: [
      {
        question: "What is Sprunki With Fan Character?",
        answer: "Sprunki With Fan Character is a community-created version featuring fan-made characters alongside the original Sprunki cast.",
        category: 'general'
      },
      {
        question: "How does music creation work?",
        answer: "Combine original and fan-made characters to create unique musical compositions with new sound combinations.",
        category: 'gameplay'
      },
      {
        question: "What makes this version unique?",
        answer: "This version features community-created characters with their own unique sounds and animations.",
        category: 'features'
      },
      {
        question: "Can I create my own character?",
        answer: "The development team accepts character submissions from the community through their official channels.",
        category: 'technical'
      },
      {
        question: "Is it compatible with other versions?",
        answer: "While maintaining core mechanics, this version introduces unique elements specific to fan-made content.",
        category: 'technical'
      },
      {
        question: "How often is new content added?",
        answer: "New fan-made characters and features are added regularly after community review and testing.",
        category: 'features'
      },
      {
        question: "Can I share my creations?",
        answer: "Yes, share your musical creations featuring fan-made characters with the community.",
        category: 'gameplay'
      },
      {
        question: "What devices support this version?",
        answer: "Play on any modern web browser, both desktop and mobile devices.",
        category: 'technical'
      }
    ],
    video: {
      youtubeId: "5H2YIR7WXAI",
      title: "Sprunki With Fan Character Gameplay",
      thumbnail: "/sprunki-phase.webp"
    }
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
export const getGamesByCategoryType = (type: 'main') => {
  const categoryGroups = {
    main: [
      GameCategory.SPRUNKIPHASE,
      GameCategory.INCREDIBOX,
      GameCategory.SPRUNKI,
      GameCategory.HALLOWEEN,
      GameCategory.MOD, 
      GameCategory.NEW,
      GameCategory.HOT,
      GameCategory.FEATURED,
      GameCategory.MUSIC,
    ],
  };

  return categoryGroups[type];
};

// 获取主分类游戏
export const getGamesByMainCategory = (category: GameCategory) => {
  const mainCategories = [
    GameCategory.SPRUNKIPHASE,
    GameCategory.INCREDIBOX,
    GameCategory.SPRUNKI,
    GameCategory.HALLOWEEN,
    GameCategory.MOD, 
    GameCategory.NEW,
    GameCategory.HOT,
    GameCategory.FEATURED,
    GameCategory.MUSIC,
  ];
  
  if (!mainCategories.includes(category)) {
    return [];
  }
  
  return games.filter(game => game.categories.includes(category));
}; 