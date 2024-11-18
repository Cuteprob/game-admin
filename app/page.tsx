import { Metadata } from "next"
import { GameContainer } from "@/components/game-container"
import { Rating } from "@/components/ui/rating"
import { Features } from "@/components/features"
import { HowToPlay } from "@/components/how-to-play"
import { FAQ } from "@/components/faq"
import Link from "next/link"
import { RelatedGames } from "@/components/related-games"
import { GamesSidebar } from "@/components/games-sidebar"
import { Game, GameCategory } from "@/config/sprunkigame"
import { GameVideo } from "@/components/game-video"
import { GameVersions } from "@/components/game-versions"

export const runtime = "edge";

// 添加 sprunkiphase 游戏数据
const SprunkiphaseGame: Game = {
  id: "sprunkiphase",
  title: "Sprunki phase: Music Games Online ",
  createdAt: "2024-11-12",
  description: "Welcome to Sprunki phase, where shadows become your greatest challenge! Master the art of shadow-dodging as you guide your cute bear through exciting levels, collecting acorns while avoiding your mischievous shadow clone. Sprunkiphase offers a unique multiplayer experience where two players can team up, making every session an thrilling adventure of strategy and quick reflexes. Grab some honey for bonus points, but watch out for those pesky bees!",
  iframeUrl: "https://games.sprunkiphase.xyz/sprunki-games/sprunki-phase1/index.html",
  image: "/logo.jpeg",
  rating: 5,
  categories: [
    GameCategory.MUSIC,
    GameCategory.SPRUNKIPHASE,
    GameCategory.INCREDIBOX,
    GameCategory.SPRUNKI,
    GameCategory.HALLOWEEN,
  ],
  metadata: {
    title: "Sprunki phase - Music Games Online",
    description: "Play Sprunki phase online and experience the thrill of music creation! Join the Sprunki phase community in this unique multiplayer adventure where music is your greatest challenge.",
    keywords: ["sprunki phase", "music game", "multiplayer adventure", "online game", "platformer game", "unblocked game"]
  },
  controls: {
      fullscreenTip: "Click the fullscreen button to expand Sprunki phase, press ESC to exit fullscreen",
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
   
  ],
  faqs: [],
  video: {
    youtubeId: "AK8mu3gcteg",
    title: "Sprunki phase - Music Game Online",
    thumbnail: "/sprunki-phase.webp"
  }
};
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-heading text-primary tracking-tight">
              Play Sprunki Phase - Incredibox Style Music Game Online
            </h1>
            <h2 className="text-lg md:text-xl italic font-heading text-text-secondary tracking-wide">
              Experience Sprunki Phase: The Evolution of Incredibox-Style Gaming
            </h2>
          </div>

          {/* Game Container */}
          <div className="space-y-4">
            <div className="flex flex-col px-2 md:flex-row gap-4 items-start">
              <div className="flex-1">
                <GameContainer game={SprunkiphaseGame} />
              </div>
              <div className="flex justify-center md:block w-full md:w-auto md:-mt-10">
                <GamesSidebar currentGameId={SprunkiphaseGame.id} gameCategories={SprunkiphaseGame.categories} />
              </div>
            </div>
          </div>
        </div>

        {/* Game Description Section */}
        <div className="space-y-12">
          <section className="flex flex-col md:flex-row items-start gap-8 max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-[#2A2C32]">
            <div className="w-[120px] h-[120px] flex-shrink-0 rounded-2xl overflow-hidden bg-primary p-0 shadow-lg">
              <img
                src="/logo.jpeg"
                alt="Sprunki Phase Music Game"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-heading text-primary">
                Discover Sprunki Phase Universe
              </h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-text-secondary">
                  Welcome to Sprunki Phase, where Incredibox-style music creation meets innovative gameplay! From Sprunki Retake to the latest Phase 7, experience an evolving musical journey that builds upon the beloved mechanics of Incredibox and Colorbox Mustard.
                </p>
                <p className="text-lg leading-relaxed text-text-secondary">
                  Each version of Sprunki Phase brings unique characters, sounds, and features. Transform characters into &quot;Mr. Fun&quot; computers, create mesmerizing beats, and discover the magic of musical collaboration in this revolutionary series.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-heading text-primary">
                  Why Players Love Sprunki Phase Series ?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                    <span className="text-xl md:text-2xl">🎵</span>
                    <span className="text-sm md:text-base text-text-secondary">Incredibox-Style Mixing</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                    <span className="text-xl md:text-2xl">🎨</span>
                    <span className="text-sm md:text-base text-text-secondary">Multiple Sprunki Phases</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                    <span className="text-xl md:text-2xl">🌟</span>
                    <span className="text-sm md:text-base text-text-secondary">Character Transformations</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                    <span className="text-xl md:text-2xl">💾</span>
                    <span className="text-sm md:text-base text-text-secondary">Community Creations</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-heading text-primary">
                  Latest Sprunki Phase Features
                </h3>
                <ul className="grid gap-2 text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Sprunki Phase 7: Enhanced graphics and dynamic soundtracks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    Sprunki Retake: Reimagined classic features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    New Incredibox-inspired sound combinations
                  </li>
                </ul>
              </div>

              {/* Game Video Section */}
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

              {/* Categories Section */}
              <div className="space-y-2">
                <h3 className="text-lg font-heading text-primary text-center md:text-left">
                  Explore Sprunki Phase Categories
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {SprunkiphaseGame.categories.map((category: GameCategory) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-slate-800/80 text-text-secondary hover:bg-slate-700 hover:text-secondary transition-all duration-300 border border-[#2A2C32] hover:shadow-md hover:scale-105"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <RelatedGames />
          <HowToPlay />
          <Features />
          <GameVersions />
          <FAQ />
          
          {/* Rating Section */}
          <section className="max-w-4xl mx-auto space-y-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-[#2A2C32]">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-heading text-primary">
                  Rate Your Sprunki Phase Experience
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
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
export const generateMetadata = (): Metadata => {
  return {
    title: "Sprunki Phase - Free Music Creation Game | Make Music Online",
    description: "Create and mix music in Sprunki Phase, a free Incredibox-style game. Transform characters, share your creations, and join our creative community.",
    keywords: [
      "sprunki phase",
      "music creation game",
      "online music maker",
      "incredibox style",
      "music game"
    ],
    alternates: {
      canonical: "https://www.sprunkiphase.xyz",
    },
    openGraph: {
      title: "Sprunki Phase - Create Music Like Never Before | Free Online Game",
      description: "Join millions playing Sprunki Phase! Mix beats, create music, and share your masterpieces in this free Incredibox-style game. Perfect for music lovers of all ages!",
      type: "website",
      url: "https://www.sprunkiphase.xyz",
      siteName: "Sprunki Phase",
      images: [
        {
          url: "/features/music-creation.webp",
          width: 1200,
          height: 630,
          alt: "Sprunki Phase Music Creation Game"
        }
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sprunki Phase - Best Free Online Music Creation Game",
      description: "Create amazing music with Sprunki Phase! Mix beats, transform characters, and share your creations in this free Incredibox-style game.",
      images: ["/features/music-creation.webp"],
      creator: "@sprunkiphase",
    },
    other: {
      "application-ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "VideoGame",
          "name": "Sprunki Phase",
          "alternateName": "Sprunki Phase Music Game",
          "url": "https://www.sprunkiphase.xyz",
          "description": "Create music in Sprunki Phase, the ultimate Incredibox-style game featuring multiple phases and character transformations. Mix beats, share creations, and explore the evolution of musical gaming.",
          "genre": ["Music", "Creativity", "Educational", "Rhythm"],
          "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
          "applicationCategory": "Game",
          "operatingSystem": ["Windows", "macOS", "Android", "iOS"],
          "numberOfPlayers": {
            "@type": "QuantitativeValue",
            "minValue": "1",
            "maxValue": "1"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "1000",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Organization",
            "name": "Mea Coda",
            "url": "https://www.sprunkiphase.xyz"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.sprunkiphase.xyz"
          },
          "image": {
            "@type": "ImageObject",
            "url": "https://www.sprunkiphase.xyz/features/music-creation.webp",
            "width": "1200",
            "height": "630"
          },
          "inLanguage": "en",
          "datePublished": "2024-01-01",
          "dateModified": "2024-03-19"
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What exactly is Sprunki Phase?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sprunki Phase is an innovative music creation game inspired by Incredibox. It allows players to create unique musical compositions by combining different character sounds and beats. Each character contributes distinct audio elements, and when transformed into 'Mr. Fun' computers, they unlock special sound combinations."
              }
            },
            {
              "@type": "Question",
              "name": "How do I create music in Sprunki Phase?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Creating music is intuitive and fun. Simply drag and drop characters onto the stage to add their unique sounds to your mix. Each character in Sprunki Phase contributes different elements like beats, melodies, or effects. You can activate or deactivate sounds by clicking characters, and use the spacebar to reset your Sprunki Phase composition."
              }
            },
            {
              "@type": "Question",
              "name": "What makes Sprunki Phase different from other music games?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sprunki Phase stands out with its unique character transformation system and Incredibox-inspired gameplay mechanics. Unlike traditional music games, Sprunki Phase combines visual character animations with sound creation, allowing players to see their music come to life."
              }
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Play Sprunki Phase",
          "description": "Learn how to create music and play Sprunki Phase",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Choose Characters",
              "text": "Select different characters to add unique sounds to your mix"
            },
            {
              "@type": "HowToStep",
              "name": "Combine Sounds",
              "text": "Drag and drop characters to combine their sounds and create music"
            },
            {
              "@type": "HowToStep",
              "name": "Transform Characters",
              "text": "Transform characters into 'Mr. Fun' computers to unlock special combinations"
            },
            {
              "@type": "HowToStep",
              "name": "Save and Share",
              "text": "Save your favorite compositions and share them with the community"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Web Browser"
            },
            {
              "@type": "HowToTool",
              "name": "Internet Connection"
            }
          ]
        }
      ])
    }
  }
}
