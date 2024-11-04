import Link from "next/link"
import { Game, games } from "@/config/games"
import { Rating } from "@/components/ui/rating"

export function RelatedGames({ currentGameId }: { currentGameId?: string }) {
  // 获取推荐游戏，排除当前游戏
  const relatedGames = games
    .filter(game => game.id !== currentGameId)
    .slice(0, 10);

  return (
    <section className="space-y-8">
      {/* 标题部分 */}
      <div className="text-center space-y-4">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FFE5E5]">
          <h2 className="text-2xl font-heading text-primary">
            More Games You Might Like
          </h2>
        </div>
      </div>

      {/* 游戏网格 - 更新响应式布局 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {relatedGames.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="group block"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FFE5E5] overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-primary text-lg mb-2 line-clamp-1">
                  {game.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Rating initialRating={game.rating} isReadOnly size="sm" />
                </div>
                <p className="text-text-secondary text-sm line-clamp-2">
                  {game.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 查看更多按钮 */}
      <div className="text-center mt-8">
        <Link
          href="/games"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-heading text-[#FFF5E4] bg-[#ff6b6bd8] hover:bg-[#ff5252fa] rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-[#FFE5E5]"
        >
          Explore More Games
        </Link>
      </div>
    </section>
  )
} 