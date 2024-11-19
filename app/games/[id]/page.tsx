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
      canonical: `https://sprunkiphase4.app/games/${params.id}`,
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
            <div className="space-y-4">
              <h2 className="text-2xl font-heading text-primary">About {game.title}</h2>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Experience {game.title} - {game.description}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Master {game.title}&apos;s unique gameplay mechanics and challenge yourself to new achievements.
                </p>
                {/* 添加分类标签 */}
                <div className="flex flex-wrap gap-2 pt-4">
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

          {/* 游戏操作指南 */}
          <section className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <h2 className="text-2xl font-heading text-primary">{game.title} Controls Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-heading text-primary">Movement Controls</h3>
                  <ul className="space-y-2">
                    {game.controls.guide.movement.map((control, index) => (
                      <li key={index} className="text-muted-foreground">{control}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-heading text-primary">Game Actions</h3>
                  <ul className="space-y-2">
                    {game.controls.guide.actions.map((action, index) => (
                      <li key={index} className="text-muted-foreground">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 游戏特性 */}
          <section className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <h2 className="text-2xl font-heading text-primary">{game.title} Features</h2>
              <p className="text-lg text-muted-foreground">
                Discover what makes {game.title} unique and exciting:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {game.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          {game.faqs.length > 0 && (
            <section className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-heading text-primary mb-6">{game.title} - Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get answers to common questions about {game.title} and improve your gameplay experience:
              </p>
              <Accordion type="single" collapsible className="space-y-4">
                {game.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-heading text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

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