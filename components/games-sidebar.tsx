import { Game, games, GameCategory } from "@/config/games"
import Link from "next/link"
import { Rating } from "@/components/ui/rating"

interface GamesSidebarProps {
  currentGameId: string;
  gameCategories: GameCategory[];
  limit?: number;
}

export function GamesSidebar({ currentGameId, gameCategories, limit = 15 }: GamesSidebarProps) {
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
    <div className="w-full md:max-w-xs space-y-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-heading text-text-primary mb-4">
          Similar Games
        </h2>
        <div className="grid grid-cols-4 gap-3 md:grid-cols-2 lg:grid-cols-3 md:px-0">
          {similarGames.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="relative group overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5E5] hover:shadow-md transition-all aspect-square"
            >
              {/* 图片容器 */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* 悬停时显示的标题 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                  <h3 className="font-heading text-white text-center text-xs md:text-sm line-clamp-2">
                    {game.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 