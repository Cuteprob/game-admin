import { Metadata } from "next"
import { GameCategory, games } from "@/config/sprunkigame"
import { GameContainer } from "@/components/game-container"
import { GamesSidebar } from "@/components/games-sidebar"
import { RelatedGames } from "@/components/related-games"
import { Rating } from "@/components/ui/rating"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { GameVideo } from "@/components/game-video"


interface GamePageProps {
  params: {
    id: string
  }
}

export const runtime = 'edge';

// 预生成所有游戏页面
export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }))
}

// 静态生成 metadata
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = games.find(game => game.id === params.id)
  
  if (!game) {
    return {
      title: 'Game Not Found'
    }
  }

  return {
    title: game.metadata.title,
    description: game.metadata.description,
    keywords: game.metadata.keywords,
    openGraph: {
      title: game.metadata.title,
      description: game.metadata.description,
      images: [game.image],
    },
    alternates: {
      canonical: `https://sprunkiphase4.app/${params.id}`,
    },
  }
}

export default function GamePage({ params }: GamePageProps) {
  const game = games.find(game => game.id === params.id)
  
  if (!game) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* 面包屑导航 */}
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: "Play Sprunki phase 4", href: "/" },
              { label: `${game.title}`, href: `/games/${game.id}` }
            ]} 
          />
        </div>

        {/* 标题部分 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="text-3xl font-heading text-primary tracking-tight">
              {game.title}
            </span>
            <span className="text-lg font-heading text-muted-foreground md:border-l border-border md:pl-2 tracking-wide">
              Play {game.title} Online for Free!
            </span>
          </h1>
        </div>

        <div className="space-y-12">
          {/* 游戏区域 + 侧边栏 */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full px-4 md:px-8 lg:px-12 flex justify-center">
                <div className="w-full max-w-4xl">
                  <GameContainer game={game} />
                </div>
              </div>
              <div className="w-full">
                <GamesSidebar currentGameId={game.id} gameCategories={game.categories} />
              </div>
            </div>
          </div>

          {/* 游戏介绍 */}
          <section className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <h2 className="text-2xl font-heading text-primary">About {game.title}</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {game.description}
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-heading text-primary mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </span>
                      <span>Advanced Music Creation</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      <span>Real-time Collaboration</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </span>
                      <span>HD Sound Quality</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span>Stunning Visuals</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                <h3 className="text-xl font-heading text-primary">
                  Watch Sprunki video in Action
                </h3>
                {game.video && (
                  <GameVideo 
                    youtubeId={game.video.youtubeId}
                    title={game.video.title}
                    clipId={game.video.clipId}
                    clipTime={game.video.clipTime}
                    thumbnail={game.video.thumbnail}
                  />
                )}
              </div>
                {/* 添加分类标签 */}
                <div className="flex flex-wrap gap-2 pt-6">
                  {game.categories.map((category: GameCategory) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground hover:bg-muted hover:text-primary transition-all duration-300 border border-border hover:shadow-game hover:scale-105"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 游戏特性部分 */}
          <section className="max-w-4xl mx-auto space-y-8">
            {/* 特性分类展示 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 核心音乐创作 */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-heading text-primary">Core Music Creation</h3>
                </div>
                <ul className="space-y-3">
                  {game.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 游戏界面和体验 */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-heading text-primary">Interface & Experience</h3>
                </div>
                <ul className="space-y-3">
                  {game.features.slice(3, 6).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 技术和兼容性 */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-heading text-primary">Technical Features</h3>
                </div>
                <ul className="space-y-3">
                  {game.features.slice(6, 9).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 社区和更新 */}
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-heading text-primary">Community & Updates</h3>
                </div>
                <ul className="space-y-3">
                  {game.features.slice(9).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ部分 */}
          <section className="max-w-4xl mx-auto mt-12">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-heading text-primary">Frequently Asked Questions</h2>
                <div className="flex-1 border-t border-border"></div>
              </div>
              
              <div className="grid gap-8">
                {game.faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="p-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                        {faq.category.charAt(0).toUpperCase()}
                      </span>
                      <h3 className="text-lg font-heading text-primary">{faq.question}</h3>
                    </div>
                    <div className="pl-10">
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 评分模块 */}
          <section className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading text-primary">
                  Rate {game.title}
                </h3>
                <p className="text-muted-foreground">
                  Share your experience and help other players
                </p>
              </div>
              
              <div className="flex justify-center">
                <Rating 
                  initialRating={game.rating}
                  isReadOnly={false}
                  size="md"
                  showReviewSystem={true}
                  className="w-full max-w-2xl" 
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 