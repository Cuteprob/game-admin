'use client'

import { Game, GameCategory } from "@/config/sprunkigame"
import { Rating } from "@/components/ui/rating"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/config/icons"
import { GameVideo } from "@/components/game-video"
import ShareButtons from '@/components/ShareButtons'
import Link from "next/link"
import { useState, useEffect } from 'react'

interface GameDescriptionProps {
  game: Game
}

export function GameDescription({ game }: GameDescriptionProps) {
  const [randomReviews, setRandomReviews] = useState<number>(0);

  useEffect(() => {
    setRandomReviews(Math.floor(Math.random() * (2000 - 500 + 1) + 500));
  }, []);

  return (
    <section className="max-w-7xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex justify-between items-start">
          {/* Left side with logo */}
          <div className="flex gap-6">
            <div className="w-[120px] h-[120px] rounded-lg border border-border overflow-hidden bg-card">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.png'
                }}
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-heading text-primary">
                {game.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Rating 
                    initialRating={game.rating} 
                    isReadOnly 
                    size="md"
                    showReviewSystem={true}
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {randomReviews > 0 && `(${randomReviews.toLocaleString()} votes)`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side with platforms and share */}
          <div className="flex flex-col gap-4">
            <div className="text-base">
              <div className="text-muted-foreground">Platforms:</div>
              <div className="flex gap-2 mt-1">
                <span className="p-3 bg-card rounded-lg text-xl">🖥️</span>
                <span className="p-3 bg-card rounded-lg text-xl">📱</span>
              </div>
            </div>
            <div className="text-base">
              <div className="text-muted-foreground">Share on:</div>
              <div className="flex gap-2 mt-1">
                <ShareButtons 
                  title={`Play ${game.title}`}
                  description="Experience the evolution of music creation"
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation and Content */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="border-b border-border w-full justify-start rounded-none bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            className="pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-0 bg-transparent"
          >
            {Icons.home}
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="gameplays"
            className="pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-0 bg-transparent"
          >
            {Icons.gameplays}
            Gameplays
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Controls Section - Left Side */}
            <div className="md:w-[400px]">
              <h2 className="text-xl font-heading mb-4">Controls:</h2>
              <div className="flex items-start gap-4">
                <div className="w-[48px] h-[48px]">
                  <img
                    src="/mouse.png"
                    alt="Mouse Controls"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading mb-2">INTERACTION</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    {game.controls.guide.movement.map((control, index) => (
                      <li key={index}>{control}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Description - Right Side */}
            <div className="flex-1 space-y-4 text-muted-foreground">
              <p>{game.description}</p>
              
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
        </TabsContent>

        <TabsContent value="gameplays">
          <div className="space-y-4">
            <h2 className="text-l font-heading mb-4">Watch Gameplay</h2>
            {game.video && (
              <div className="max-w-md mx-auto">
                <GameVideo 
                  youtubeId={game.video.youtubeId}
                  title={game.video.title}
                  clipId={game.video.clipId}
                  clipTime={game.video.clipTime}
                  thumbnail={game?.video?.thumbnail}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
} 