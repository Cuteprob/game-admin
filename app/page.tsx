import { Metadata } from "next"
import { GameContainer } from "@/components/game-container"
import { Rating } from "@/components/ui/rating"
import { Features } from "@/components/features"
import { HowToPlay } from "@/components/how-to-play"
import { FAQ } from "@/components/faq"
import Link from "next/link"
import { RelatedGames } from "@/components/related-games"
import { GamesSidebar } from "@/components/games-sidebar"
import { Game, GameType } from "@/config/games"

export const runtime = "edge";

// 添加 houseofhazards 游戏数据
const HouseofhazardsGame: Game = {
  id: "houseofhazards",
  title: "House of Hazards",
  description: "House of Hazards is an exciting multiplayer platformer where players navigate through a hazard-filled house, completing tasks while avoiding unexpected obstacles. Experience thrilling challenges in this browser-based game that combines quick reflexes with strategic gameplay.",
  iframeUrl: "https://htmlxm.github.io/h/house-of-hazards",
  image: "/logo.jpeg",
  rating: 5,
  type: "Action" as GameType,
  metadata: {
    title: "House of Hazards - Free Online Multiplayer Game",
    description: "Play House of Hazards, an exciting multiplayer platformer with unique challenges and obstacles. Navigate through hazard-filled rooms, compete with friends, and enjoy browser-based gaming without downloads!",
    keywords: ["house of hazards", "multiplayer game", "online game", "platformer game", "unblocked game"]
  },
  controls: {
    fullscreenTip: "Click the fullscreen button to expand House of Hazards, press ESC to exit fullscreen",
    guide: {
      movement: [
        "A or Left Arrow - Turn Left",
        "D or Right Arrow - Turn Right",
        "W or Up Arrow - Jump",
        "S or Down Arrow - Fire/Crouch"
      ],
      actions: [
        "I - Player 2 Jump",
        "J - Player 2 Turn Left",
        "K - Player 2 Fire/Crouch",
        "L - Player 2 Turn Right"
      ]
    }
  },
  features: [
    "Best Graphics with HD Sounds",
    "Easy Controls for Multiple Players",
    "Unique Punishment System",
    "No Downloads Required",
    "1-3 Player Modes Available",
    "Thrilling House Obstacles"
  ],
  faqs: []
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="flex items-center gap-2">
            <span className="text-3xl font-heading text-primary tracking-tight">
              HOUSE OF HAZARDS
            </span>
            <span className="text-lg font-heading text-text-secondary border-l border-[#FFE5E5] pl-2 tracking-wide">
              Free Online Multiplayer Game
            </span>
          </h1>
        </div>

        {/* Game Container */}
        <div className="space-y-4 mb-6">
          {/* Game Section with Sidebar */}
          <div className="flex gap-4">
            <div className="flex-1">
              <GameContainer game={HouseofhazardsGame} />
            </div>
            <GamesSidebar currentGameId={HouseofhazardsGame.id} gameType={HouseofhazardsGame.type} />
          </div>
        </div>

        {/* Game Description Section */}
        <div className="space-y-12">
          <section className="flex items-start gap-8 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFE5E5]">
            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-2xl overflow-hidden bg-primary p-0 shadow-lg">
              <img
                src="/logo.jpeg"
                alt="House of Hazards Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-heading text-text-primary">
                House of Hazards: Unblocked Game
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                House of Hazards is an exciting multiplayer platformer where players navigate through a hazard-filled house, completing tasks while avoiding unexpected obstacles. Experience thrilling challenges in this browser-based game that combines quick reflexes with strategic gameplay. Perfect for playing with friends, House of Hazards offers endless entertainment right in your browser.
              </p>
              <div className="flex gap-4 text-sm">
                <Link
                  href="/how-to-play"
                  className="font-heading text-primary hover:text-[#ff5252fa] transition-colors"
                >
                  How to play
                </Link>
                <span className="text-[#FFE5E5]">|</span>
                <Link
                  href="/faq"
                  className="font-heading text-primary hover:text-[#ff5252fa] transition-colors"
                >
                  FAQ
                </Link>
                <span className="text-[#FFE5E5]">|</span>
                <Link
                  href="/features"
                  className="font-heading text-primary hover:text-[#ff5252fa] transition-colors"
                >
                  Key Features
                </Link>
              </div>
            </div>
          </section>

          <RelatedGames />
          <HowToPlay />
          <Features />
          <FAQ />
          <section className="max-w-3xl mx-auto space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFE5E5]">
            <h3 className="text-xl font-heading text-primary text-center">
              Play House of Hazards Now
            </h3>
            <p className="leading-relaxed text-text-secondary text-center">
              Start your adventure in House of Hazards today - no downloads required! Navigate through hazardous rooms, compete with friends in multiplayer mode, and enjoy unique punishment mechanics that add extra excitement. Whether you&apos;re playing solo or challenging others, House of Hazards offers non-stop action and entertainment right in your browser.
            </p>
            <Rating className="mt-6" />
          </section>
        </div>
      </main>
    </div>
  );
}
export const metadata: Metadata = {
  title: "House of Hazards - Free Online Multiplayer Game Platform",
  description: "Play House of Hazards, a thrilling multiplayer game with unique challenges. Navigate hazard-filled rooms, compete with friends and enjoy browser gaming!",
  keywords: [
    "house of hazards",
    "multiplayer game",
    "online game",
    "browser game",
    "free game"
  ],
  alternates: {
    canonical: "https://www.houseofhazards.online",
  },
};

