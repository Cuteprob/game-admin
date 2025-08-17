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
  description?: string;
  iframeUrl: string;
  image: string;
  rating?: number;
  categories: GameCategory[];  
  createdAt?: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  controls?: {
    fullscreenTip: string;
    guide: {
      movement: string[];
      actions: string[];
      special?: string[];
    };
  };
  features?: string[];  
  faqs?: {
    question: string;
    answer: string;
    category: 'gameplay' | 'technical' | 'features' | 'general' | 'tips' | 'audio';
  }[];
  content?: string;  // Markdown content
  video?: {
    youtubeId: string;    
    clipId?: string;    
    clipTime?: string;  
    title: string;        
    thumbnail: string;   
  };
}

export const games: Game[] = [
  
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