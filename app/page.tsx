import { Metadata } from "next"
import { GameContainer } from "@/components/game-container"
import { Rating } from "@/components/ui/rating"
import { GamesSidebar } from "@/components/games-sidebar"
import { Game, GameCategory, getGamesByCategory } from "@/config/sprunkigame"
import { GameVideo } from "@/components/game-video"
import { HowToPlay } from '@/components/how-to-play'
import { Features } from '@/components/features'
import { FAQ } from '@/components/faq'
import Link from "next/link"

export const runtime = "edge";

// Sprunki Phase 4 game data
const SprunkiphaseGame: Game = {
  id: "sprunki-phase-4",
  title: "Sprunki Phase 4 - Free Online Music Creation Game",
  createdAt: "2024-11-18",
  description: "Experience Sprunki Phase 4, the latest evolution in online music creation! Featuring new characters like Sky, Clukr, and Gray, this version brings enhanced sound design, dynamic gameplay mechanics, and innovative musical composition tools. Create, mix, and share your unique musical creations with our vibrant community. Join millions of players worldwide in this immersive musical journey!",
  iframeUrl: "https://iframegame.com/embed/sprunki-phase-4/index.html",
  image: "/sprunki-phase-4.webp",
  rating: 5,
  categories: [
    GameCategory.SPRUNKIPHASE
  ],
  metadata: {
    title: "Sprunki Phase 4 - Best Free Online Music Creation Game | Make Music Online",
    description: "Play Sprunki Phase 4, the ultimate online music creation game! Create unique beats with new characters Sky, Clukr & Gray. Enhanced sound design, real-time mixing & sharing. Join now!",
    keywords: ["sprunki phase 4", "online music game", "music creation", "sound design", "rhythm game", "free music maker"]
  },
  controls: {
    fullscreenTip: "Click the fullscreen button to expand Sprunki Phase 4, press ESC to exit fullscreen",
    guide: {
      movement: [
        "Drag & Drop - Add sounds",
        "Click - Toggle sounds",
        "Space - Play/Pause",
        "R - Reset composition"
      ],
      actions: [
        "S - Save creation",
        "M - Toggle mute",
        "F - Toggle fullscreen",
        "H - Show/Hide controls"
      ]
    }
  },
  features: [
   
  ],
  faqs: [],
  video: {
    youtubeId: "AK8mu3gcteg",
    title: "Sprunki phase 4 - Music Game Online",
    thumbnail: "/sprunki-phase-4.webp"
  }
};

export default function Home() {
  // 获取 NEW 和 HOT 分类的游戏
  const newGames = getGamesByCategory(GameCategory.NEW);
  const hotGames = getGamesByCategory(GameCategory.HOT);
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-heading text-primary tracking-tight">
              Play Sprunki Phase 4 - Incredibox Style Music Game Online
            </h1>
            <h2 className="text-lg md:text-xl italic font-heading text-muted-foreground tracking-wide">
              Experience Sprunki Phase 4: The Evolution of Incredibox-Style Gaming
            </h2>
          </div>

          {/* Game Container */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full flex gap-4">
                {/* Game Container Section */}
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex gap-4">
                    {/* 左侧游戏列表 - 桌面端显示 */}
                    <div className="hidden lg:flex lg:w-[200px] flex-col gap-4 aspect-video">
                      {newGames.slice(0, 3).map((game, i) => (
                        <a 
                          key={`left-${i}`} 
                          href={`/${game.id}`}
                          className="flex-1 bg-card rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group relative"
                        >
                          <div className="w-full h-full relative">
                            <img 
                              src={game.image} 
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm text-white font-medium truncate px-2">
                                {game.title}
                              </span>
                            </div>
                            {/* NEW 标签 */}
                            <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full">
                              <span className="text-xs font-medium text-primary-foreground">
                                NEW
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* 中间游戏区域 */}
                    <div className="flex-1">
                      <GameContainer game={SprunkiphaseGame} />
                    </div>

                    {/* 右侧游戏列表 - 桌面端显示 */}
                    <div className="hidden lg:flex lg:w-[200px] flex-col gap-4 aspect-video">
                      {newGames.slice(3, 6).map((game, i) => (
                        <a 
                          key={`right-${i}`} 
                          href={`/${game.id}`}
                          className="flex-1 bg-card rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group relative"
                        >
                          <div className="w-full h-full relative">
                            <img 
                              src={game.image} 
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm text-white font-medium truncate px-2">
                                {game.title}
                              </span>
                            </div>
                            {/* NEW 标签 */}
                            <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full">
                              <span className="text-xs font-medium text-primary-foreground">
                                NEW
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 移动端游戏列表 - 水平滚动 */}
                  <div className="lg:hidden flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {newGames.slice(0, 6).map((game, i) => (
                      <a 
                        key={`mobile-${i}`}
                        href={`/${game.id}`}
                        className="w-[150px] aspect-square flex-shrink-0 bg-card rounded-lg border border-border overflow-hidden group relative"
                      >
                        <div className="w-full h-full relative">
                          <img 
                            src={game.image} 
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm text-white font-medium truncate px-2">
                              {game.title}
                            </span>
                          </div>
                          {/* NEW 标签 */}
                          <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full">
                            <span className="text-xs font-medium text-primary-foreground">
                              NEW
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* 底部游戏列表 */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {hotGames.slice(0, 7).map((game, i) => (
                      <a 
                        key={`bottom-${i}`}
                        href={`/${game.id}`}
                        className="aspect-square bg-card rounded-lg border border-border overflow-hidden group relative"
                      >
                        <div className="w-full h-full relative">
                          <img 
                            src={game.image} 
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm text-white font-medium truncate px-2">
                              {game.title}
                            </span>
                          </div>
                          {/* HOT 标签 */}
                          <div className="absolute top-2 right-2 bg-destructive px-2 py-0.5 rounded-full">
                            <span className="text-xs font-medium text-destructive-foreground">
                              HOT
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <GamesSidebar currentGameId={SprunkiphaseGame.id} gameCategories={SprunkiphaseGame.categories} />
              </div>
            </div>
          </div>
        </div>

        {/* Game Description Section */}
        <div className="space-y-12">
          <section className="flex flex-col md:flex-row items-start gap-8 max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-2xl overflow-hidden bg-primary/10 p-0 shadow-game">
              <img
                src="/logo.jpeg"
                alt="Sprunki Phase 4 Music Game"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-heading text-primary">
                  Sprunki Phase 4: Evolution of Musical Innovation
                </h2>
                <div className="flex items-center gap-2">
                  <Rating 
                    initialRating={4.8} 
                    isReadOnly 
                    size="md"
                    showReviewSystem={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground">
                  Welcome to Sprunki Phase 4, a groundbreaking iteration that revolutionizes musical gameplay. Building upon the beloved mechanics of previous versions, this release introduces dynamic transformations and enhanced interactive elements that elevate your musical journey.
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  As a significant evolution in the series, Sprunki Phase 4 introduces the innovative Passive Item system, allowing your musical companion to not only follow your rhythm but also provide defensive capabilities through bullet blocking and transformative abilities.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-heading text-primary">
                  Watch Sprunki video in Action
                </h3>
                {SprunkiphaseGame.video && (
                  <GameVideo 
                    youtubeId={SprunkiphaseGame.video.youtubeId}
                    title={SprunkiphaseGame.video.title}
                    clipId={SprunkiphaseGame.video.clipId}
                    clipTime={SprunkiphaseGame.video.clipTime}
                    thumbnail={SprunkiphaseGame.video.thumbnail}
                  />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-heading text-primary text-center md:text-left">
                  Explore Sprunki Phase 4 related Categories
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {SprunkiphaseGame.categories.map((category: GameCategory) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-background hover:bg-muted text-foreground hover:text-primary transition-all duration-300 border border-border hover:shadow-game hover:scale-105"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <HowToPlay />
          <Features />
          <FAQ />
          
          {/* Rating Section */}
          <section className="max-w-4xl mx-auto space-y-4 bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-heading text-primary">
                  Rate Your Sprunki Phase Experience
                </h2>
                <p className="text-foreground max-w-2xl mx-auto">
                  Love creating music? Share your experience and help others discover this amazing Incredibox-style game!
                </p>
              </div>
              
              <Rating 
                initialRating={SprunkiphaseGame.rating} 
                isReadOnly={false}
                size="md"
                showReviewSystem={true}
                className="w-full max-w-2xl" 
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Metadata optimization
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Play Sprunki Phase 4 - Incredibox Style Music Game Online",
    description: "Sprunki Phase 4 is a free  incredibox style game that allows you to create amazing music with new characters, enhanced sound design and real-time mixing.",
    keywords: ["sprunki phase 4", "music creation game"],
    openGraph: {
      title: "Sprunki Phase 4 -  Incredibox Style Music Game Online",
      description: "Join millions playing Sprunki Phase 4! Create unique music with new characters, enhanced sound design & real-time mixing.",
      images: ["/sprunki-phase-4.webp"],
      type: "website",
      url: "https://sprunkiphase4.app"
    },
    twitter: {
      card: "summary_large_image",
      title: "Sprunki Phase 4 -  Incredibox Style Music Game Online",
      description: "Create amazing music with Sprunki Phase 4! New characters, enhanced sound design & real-time mixing. Start   your musical journey today!",
      images: ["/twitter-image.jpg"],
    },
    alternates: {
      canonical: "https://sprunkiphase4.app"
    }
  };
}
