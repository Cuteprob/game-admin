"use client"

export const runtime = 'edge'

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { GameForm } from "@/components/admin/games/GameForm"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { GameWithCategories, GameFormDataWithCategories } from "@/types/game"

export default function EditGamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [game, setGame] = useState<GameWithCategories | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(`/api/gamesBase/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch game')
        const { data } = await response.json()
        
        // 转换分类数据为期望的格式
        const gameWithCategories = {
          ...data,
          categories: data.categories || []
        }
        
        setGame(gameWithCategories)
      } catch (error) {
        console.error('Error fetching game:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [params.id])

  const handleSubmit = async (data: GameFormDataWithCategories) => {
    try {
      const response = await fetch(`/api/gamesBase/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to update game')
      
      router.push('/gamesBase')
      router.refresh()
    } catch (error) {
      console.error('Error updating game:', error)
      throw error
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!game) {
    return <div>Game not found</div>
  }

  // 准备传递给表单的游戏数据，包括正确格式的分类ID列表
  const formGame: GameFormDataWithCategories = {
    ...game,
    categories: game.categories.map(c => c.categoryId)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Game"
        description={`Editing game: ${game.title}`}
      />
      
      <div className="container max-w-4xl mx-auto">
        <Card>
          <GameForm 
            game={formGame}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </div>
  )
} 