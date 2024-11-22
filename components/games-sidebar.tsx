import { Game, games, GameCategory } from "@/config/sprunkigame"
import Link from "next/link"
import { Rating } from "@/components/ui/rating"

interface GamesSidebarProps {
  currentGameId: string;
  gameCategories: GameCategory[];
  limit?: number;
}

export function GamesSidebar({ currentGameId, gameCategories, limit = 15 }: GamesSidebarProps) {
  // 获取当前游戏
  const currentGame = games.find(g => g.id === currentGameId);

  // 定义分类组
  const mainCategories = [
    GameCategory.SPRUNKIPHASE,
  ];

  const themeCategories = [
    GameCategory.SPRUNKI,
    GameCategory.HALLOWEEN,
  ];
  
  // 获取当前游戏的各类分类
  const currentGameMainCategories = gameCategories.filter(cat => mainCategories.includes(cat));
  const currentGameThemeCategories = gameCategories.filter(cat => themeCategories.includes(cat));

  // 获取 Sprunki Phase 游戏并排序
  const sprunkiGames = games
    .filter(game => game.id !== currentGameId)
    .filter(game => game.id.startsWith('sprunki-phase-'))
    .sort((a, b) => {
      const versionA = parseInt(a.id.replace('sprunki-phase-', '')) || 0;
      const versionB = parseInt(b.id.replace('sprunki-phase-', '')) || 0;
      return versionA - versionB;
    });

  // 获取其他相关游戏
  const otherGames = games
    .filter(game => game.id !== currentGameId)
    .filter(game => !game.id.startsWith('sprunki-phase-'))
    .filter(game => {
      // 计算主分类匹配数
      const mainCategoryMatches = game.categories.filter(cat => 
        currentGameMainCategories.includes(cat)
      ).length;

      // 计算主题分类匹配数
      const themeCategoryMatches = game.categories.filter(cat => 
        currentGameThemeCategories.includes(cat)
      ).length;

      return mainCategoryMatches > 0 || themeCategoryMatches > 0;
    })
    .sort((a, b) => b.rating - a.rating);

  // 合并并限制数量
  const similarGames = [...sprunkiGames, ...otherGames].slice(0, limit);

  return (
    <aside className="w-full space-y-6 md:px-20">
      {/* 标题部分 */}
      <div className="text-center">
        <div className="inline-block bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-border">
          <h2 className="text-xl font-heading text-primary">
            Similar Games to {currentGame?.title}
          </h2>
        </div>
      </div>

      {/* 游戏列表 - 5列3行网格布局 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {similarGames.map((game) => (
          <Link
            key={game.id}
            href={game.id === 'sprunki-phase-4' ? '/' : `/${game.id}`}
            className="group block"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden transition-all hover:shadow-game">
              <div className="relative">
                {/* 游戏图片 */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Popular 标签 */}
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    Popular
                  </div>
                </div>

                {/* 标题和按钮容器 */}
                <div className="relative h-[60px] bg-card/95 overflow-hidden">
                  {/* 标题 - 悬停时向上移动 */}
                  <div className="absolute inset-x-0 p-3 transition-transform duration-300 ease-out group-hover:-translate-y-full bg-card/95">
                    <h3 className="font-heading text-foreground text-sm text-center line-clamp-1">
                      {game.title}
                    </h3>
                  </div>

                  {/* Play Now 按钮 - 悬停时显示 */}
                  <div className="absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 bg-card/95">
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm font-medium shadow-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Play Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
} 