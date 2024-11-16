import { Metadata } from "next"
import { games, GameCategory } from "@/config/sprunkigame"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Play Unblocked Games Online for Free - Sprunki phase",
  description: "Browse our collection of free unblocked online games. Find racing, action, sports, shooting and more games to play instantly in your browser.",
  keywords: ["online games", "free games", "browser games", "racing games", "shooting games"],
  alternates: {
    canonical: "https://www.sprunkiphase.xyz/games",
  },
}

export default function GamesPage() {
  // 获取所有游戏类型
  const gameCategories = Array.from(new Set(games.map(game => game.categories)));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: "Play Sprunki phase", href: "/" },
              { label: "Games", href: "/games" }
            ]} 
          />
        </div>

        <div className="space-y-16">
          {/* All Games Section */}
          <section>
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl font-heading text-[#4A90E2]">
                All Games
              </h1>
              <p className="text-[#9BA1B0] max-w-2xl mx-auto">
                Browse our collection of free online games. No downloads required, play instantly in your browser.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="group bg-slate-800/80 rounded-xl border border-[#2A2C32] overflow-hidden hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={game.image}
                      alt={`${game.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="font-heading text-[#E8E9F3] line-clamp-1 mb-1">
                      {game.title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9BA1B0]">{game.categories.join(', ')}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-accent text-xs">★</span>
                        <span className="text-xs text-[#9BA1B0]">{game.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>    
        </div>
      </main>
    </div>
  );
} 