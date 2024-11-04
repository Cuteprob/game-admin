import { Game, games } from "@/config/games"
import Link from "next/link"
import { Rating } from "@/components/ui/rating"

interface GamesSidebarProps {
  currentGameId: string;
  gameType: string;
  limit?: number;
}

export function GamesSidebar({ currentGameId, gameType, limit = 4 }: GamesSidebarProps) {
  // 获取同类型游戏，排除当前游戏
  const similarGames = games
    .filter(game => game.type === gameType && game.id !== currentGameId)
    .slice(0, limit);

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading text-primary">Similar Games</h2>
        <Link 
          href={`/games?type=${gameType}#${gameType.toLowerCase()}`} 
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