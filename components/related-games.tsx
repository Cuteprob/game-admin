import Link from "next/link"
import { Game, games, GameCategory } from "@/config/sprunkigame"
import { Rating } from "@/components/ui/rating"

interface RelatedGamesProps {
  currentGameId?: string;
}

// 添加日期排序函数
const sortGamesByDate = (games: Game[]) => {
  return [...games].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export function RelatedGames({ currentGameId }: RelatedGamesProps) {
  // 获取相关游戏列表
  const newGames = games
    .filter(game => (!currentGameId || game.id !== currentGameId) && game.categories.includes(GameCategory.NEW))
    .slice(0, 5);

  const popularGames = games
    .filter(game => 
      (!currentGameId || game.id !== currentGameId) && 
      game.categories.includes(GameCategory.HOT) && 
      !game.categories.includes(GameCategory.NEW)
    )
    .slice(0, 10);

  // 合并游戏列表，优先显示新游戏，然后是热门游戏
  const relatedGames = [...newGames, ...popularGames].slice(0, 15);

  return (
    <section className="space-y-8">
      {/* 标题部分 */}
      <div className="text-center space-y-4">
        <div className="inline-block bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-border">
          <h2 className="text-2xl font-heading text-primary">
            More Games You Might Like
          </h2>
        </div>
      </div>

      {/* 游戏网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {relatedGames.map((game) => (
          <Link
            key={game.id}
            href={`/${game.id}`}
            className="group block"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden transition-all hover:shadow-game">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 更新标签样式 */}
                {game.categories.includes(GameCategory.NEW) && (
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-primary text-background rounded-full">
                    New
                  </div>
                )}
                {game.categories.includes(GameCategory.HOT) && !game.categories.includes(GameCategory.NEW) && (
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-accent text-background rounded-full">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-heading text-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {game.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Rating 
                    initialRating={game.rating} 
                    isReadOnly 
                    size="sm"
                    showReviewSystem={false}
                  />
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {game.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}