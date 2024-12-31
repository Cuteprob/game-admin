import { NextResponse } from 'next/server'
import { db } from '@/lib/db/tursoDb'
import { gamesBase, gameCategories, categories } from '@/lib/db/schema'
import { nanoid } from 'nanoid'
import { eq } from 'drizzle-orm'

interface ImportGameData {
  id?: string
  title: string
  description: string
  iframeUrl: string
  imageUrl: string
  image?: string
  rating?: number
  categories: string[]
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  controls: {
    fullscreenTip: string
    guide: {
      movement: string[]
      actions: string[]
      special?: string[]
    }
  }
  features: string[]
  faqs: {
    question: string
    answer: string
    category: 'gameplay' | 'technical' | 'features' | 'general' | 'tips' | 'audio'
  }[]
  video?: {
    youtubeId: string
    clipId?: string
    clipTime?: string
    title: string
    thumbnail: string
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ImportGameData[]
    
    // 开始事务
    const result = await db.transaction(async (tx) => {
      const games = []
      
      // 获取所有分类的映射关系
      const allCategories = await tx.select().from(categories)
      const categoryMap = new Map(allCategories.map(c => [c.name.toLowerCase(), c.id]))
      
      for (const gameData of body) {
        // 根据分类名称获取分类ID
        const categoryIds = gameData.categories.map(categoryName => {
          // 统一转换为小写进行比较
          const id = categoryMap.get(categoryName.toLowerCase())
          if (!id) {
            throw new Error(`Category not found: ${categoryName}`)
          }
          return id
        })
        
        // 生成游戏ID或使用提供的ID
        const id = gameData.id || nanoid()
        
        // 处理图片URL
        const imageUrl = gameData.imageUrl || gameData.image || ''
        
        // 插入游戏基础数据
        const [game] = await tx.insert(gamesBase).values({
          id,
          title: gameData.title,
          description: gameData.description,
          iframeUrl: gameData.iframeUrl,
          imageUrl,
          rating: gameData.rating || 0,
          metadata: JSON.stringify(gameData.metadata),
          controls: JSON.stringify(gameData.controls),
          features: JSON.stringify(gameData.features),
          faqs: JSON.stringify(gameData.faqs),
          video: gameData.video ? JSON.stringify(gameData.video) : null,
          createdAt: new Date().toISOString(),
        }).returning()

        // 插入分类关联
        if (categoryIds.length) {
          await tx.insert(gameCategories).values(
            categoryIds.map(categoryId => ({
              gameId: id,
              categoryId,
              createdAt: new Date().toISOString()
            }))
          )
        }

        games.push(game)
      }

      return games
    })

    return NextResponse.json({ 
      data: result,
      message: `Successfully imported ${result.length} games`
    })
  } catch (error) {
    console.error('Failed to import games:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to import games' },
      { status: 500 }
    )
  }
} 