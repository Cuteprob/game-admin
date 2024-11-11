import { Metadata } from "next"
import { GameContainer } from "@/components/game-container"
import { Rating } from "@/components/ui/rating"
import { Features } from "@/components/features"
import { HowToPlay } from "@/components/how-to-play"
import { FAQ } from "@/components/faq"
import Link from "next/link"
import { RelatedGames } from "@/components/related-games"
import { GamesSidebar } from "@/components/games-sidebar"
import { Game, GameCategory } from "@/config/games"

export const runtime = "edge";

// 添加 shadybears 游戏数据
const ShadybearsGame: Game = {
  id: "shadybears",
  title: "Shady Bears: Shadow Adventure",
  description: "Welcome to Shady Bears, where shadows become your greatest challenge! Master the art of shadow-dodging as you guide your cute bear through exciting levels, collecting acorns while avoiding your mischievous shadow clone. Shady Bears offers a unique multiplayer experience where two players can team up, making every session an thrilling adventure of strategy and quick reflexes. Grab some honey for bonus points, but watch out for those pesky bees!",
  iframeUrl: "https://freetoplayz.github.io/shady-bears/",
  image: "/logo.jpeg",
  rating: 5,
  categories: [GameCategory.ACTION, GameCategory.MULTIPLAYER, GameCategory.FEATURED, GameCategory.ANIMAL],
  metadata: {
    title: "Shady Bears - Shadow Adventure Game Online",
    description: "Play Shady Bears online and experience the thrill of shadow-dodging gameplay! Join the Shady Bears community in this unique multiplayer adventure where shadows are your greatest challenge.",
    keywords: ["shady bears", "shadow game", "multiplayer adventure", "online game", "platformer game", "unblocked game"]
  },
  controls: {
      fullscreenTip: "Click the fullscreen button to expand Shady Bears, press ESC to exit fullscreen",
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
    "Unique Shadow-Chasing Mechanics in Shady Bears",
    "Exciting Two-Player Multiplayer Mode",
    "Strategic Acorn Collection System",
    "Interactive Shadow Dodging Gameplay",
    "Instant Browser-Based Shady Bears Experience",
    "Special Power-ups including Honey and Fireflies",
    "HD Graphics with Immersive Sound Effects",
    "Easy-to-Learn Controls for All Ages"
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
          <h1 className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-heading text-primary tracking-tight">
                SHADY BEARS ADVENTURE
              </span>
              <span className="text-lg font-heading text-text-secondary border-l border-[#FFE5E5] pl-2 tracking-wide">
                Shadow-Chasing Multiplayer Game
              </span>
            </div>
            <span className="text-sm text-text-secondary italic">
              Where Your Shadow Becomes Your Greatest Challenge!
            </span>
          </h1>
        </div>

        {/* Game Container */}
        <div className="space-y-4 mb-6">
          {/* Game Section with Sidebar */}
          <div className="flex gap-4">
            <div className="flex-1">
              <GameContainer game={ShadybearsGame} />
            </div>
            <GamesSidebar currentGameId={ShadybearsGame.id} gameCategories={ShadybearsGame.categories} />
          </div>
        </div>

        {/* Game Description Section */}
        <div className="space-y-12">
          <section className="flex items-start gap-8 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFE5E5]">
            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-2xl overflow-hidden bg-primary p-0 shadow-lg">
              <img
                src="/logo.jpeg"
                alt="Shady Bears - Shadow Adventure Game"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-heading text-text-primary">
                Shady Bears: Master the Shadow Challenge
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary">
                {ShadybearsGame.description}
              </p>
              
              {/* 添加游戏亮点 */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                  <span className="text-2xl">🎮</span>
                  <span className="text-text-primary">2-Player Shady Bears Action</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                  <span className="text-2xl">🌟</span>
                  <span className="text-text-primary">Unique Shadow Mechanics</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                  <span className="text-2xl">🌰</span>
                  <span className="text-text-primary">Strategic Acorn Collection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <span className="text-text-primary">Instant Browser Gaming</span>
                </div>
              </div>
              
              {/* 分类标签部分 */}
              <div className="space-y-2">
                <h3 className="text-lg font-heading text-primary">Explore More Shady Bears Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {/* 显示固定的分类标签 */}
                  {[
                    GameCategory.ACTION,
                    GameCategory.STRATEGY,
                    GameCategory.ADVENTURE,
                    GameCategory.TWO_PLAYER,
                    GameCategory.GIRLS,
                    GameCategory.KIDS,
                    GameCategory.ANIMAL,
                    GameCategory.FEATURED,
                    GameCategory.TRENDING
                  ].map((category: GameCategory) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 border border-[#FFE5E5] hover:shadow-md hover:scale-105"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

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
          <section className="max-w-4xl mx-auto space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFE5E5]">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading text-primary">
                  Rate Your Shady Bears Adventure
                </h3>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Love dodging shadows in Shady Bears? Rate your experience and help other players discover this unique shadow-chasing adventure! Your feedback helps us improve the game.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Rating 
                  initialRating={ShadybearsGame.rating} 
                  isReadOnly={false}
                  size="md"
                  showReviewSystem={true}
                  className="w-full max-w-2xl" 
                />
                <div className="flex gap-2 items-center text-sm text-text-secondary">
                  <span>🎮 Current Rating:</span>
                  <span className="font-bold text-primary">{ShadybearsGame.rating}/5</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
}
export const generateMetadata = (): Metadata => {
  return {
    title: "Shady Bears - Unblocked & Free Game Online",
    description: "Play Shady Bears, an unblocked & free game where shadows are your greatest challenge! Join Shady Bears to collect acorns, dodge shadows, and more.",
    keywords: [
      "shady bears",
      "shady bears game",
      "shady bears online",
      "shadow adventure game",
      "multiplayer shadow game",
    ],
    alternates: {
      canonical: "https://www.shadybears.org",
    },
    openGraph: {
      title: "Shady Bears - Unblocked & Free Game Online",
      description: "Play Shady Bears, an unblocked & free game where shadows are your greatest challenge! Join Shady Bears to collect acorns, dodge shadows, and more.",
      type: "website",
      images: ["/featues/shadow-mechanics.webp"],
    },
    other: {
      "application-ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": "Shady Bears",
        "description": "Play Shady Bears, an unblocked & free game where shadows are your greatest challenge! Join Shady Bears to collect acorns, dodge shadows, and more.",
        "genre": ["Action", "Multiplayer", "Platform"],
        "gamePlatform": ["Web Browser"],
        "applicationCategory": "Game",
        "numberOfPlayers": {
          "@type": "QuantitativeValue",
          "minValue": "1",
          "maxValue": "2"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "1",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Mea Coda"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      })
    }
  }
}

