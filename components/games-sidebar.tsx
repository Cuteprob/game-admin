import { Game, games, GameCategory } from "@/config/games"
import Link from "next/link"
import { Rating } from "@/components/ui/rating"

interface GamesSidebarProps {
  currentGameId: string;
  gameCategories: GameCategory[];
  limit?: number;
}

export function GamesSidebar({ currentGameId, gameCategories, limit = 4 }: GamesSidebarProps) {
  // 定义分类组
  const mainCategories = [
    GameCategory.RACING,
    GameCategory.ACTION,
    GameCategory.SHOOTER,
    GameCategory.PUZZLE,
    GameCategory.STRATEGY,
    GameCategory.SPORTS,
    GameCategory.ADVENTURE
  ];

  const themeCategories = [
    GameCategory.CAR,
    GameCategory.FIGHTING,
    GameCategory.STICKMAN,
    GameCategory.RUNNING,
    GameCategory.BOXING,
    GameCategory.ANIMAL
  ];
  
  // 获取当前游戏的各类分类
  const currentGameMainCategories = gameCategories.filter(cat => mainCategories.includes(cat));
  const currentGameThemeCategories = gameCategories.filter(cat => themeCategories.includes(cat));

  // 计算每个游戏的相关性得分
  const similarGames = games
    .filter(game => game.id !== currentGameId)
    .map(game => {
      // 计算主分类匹配数
      const mainCategoryMatches = game.categories.filter(cat => 
        currentGameMainCategories.includes(cat)
      ).length;

      // 计算主题分类匹配数
      const themeCategoryMatches = game.categories.filter(cat => 
        currentGameThemeCategories.includes(cat)
      ).length;

      // 计算其他分类匹配数
      const otherCategoryMatches = game.categories.filter(cat => 
        gameCategories.includes(cat) && 
        !mainCategories.includes(cat) && 
        !themeCategories.includes(cat)
      ).length;

      return {
        ...game,
        mainCategoryMatches,
        themeCategoryMatches,
        otherCategoryMatches,
        totalMatches: mainCategoryMatches + themeCategoryMatches + otherCategoryMatches
      };
    })
    .filter(game => game.totalMatches > 0)
    .sort((a, b) => {
      // 首先按主分类匹配数排序
      if (b.mainCategoryMatches !== a.mainCategoryMatches) {
        return b.mainCategoryMatches - a.mainCategoryMatches;
      }
      // 其次按主题分类匹配数排序
      if (b.themeCategoryMatches !== a.themeCategoryMatches) {
        return b.themeCategoryMatches - a.themeCategoryMatches;
      }
      // 最后按其他分类匹配数排序
      if (b.otherCategoryMatches !== a.otherCategoryMatches) {
        return b.otherCategoryMatches - a.otherCategoryMatches;
      }
      // 如果所有匹配数都相同，按评分排序
      return b.rating - a.rating;
    })
    .slice(0, limit);

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading text-primary">Similar Games</h2>
        <Link 
          href="/games"
          className="text-text-secondary hover:text-[#ff5252fa] transition-colors"
        >
          More »
        </Link>
      </div>
      
      <div className="space-y-4">
        {similarGames.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="flex gap-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-[#FFE5E5] hover:shadow-md transition-all"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-text-primary truncate">{game.title}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Rating initialRating={game.rating} isReadOnly size="sm" />
              </div>
              <p className="text-text-secondary text-sm truncate mt-1">
                {game.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 