import { NextResponse } from 'next/server'
import { db } from '@/lib/db/tursoDb'
import { gamesBase, gameCategories, categories } from '@/lib/db/schema'
import { nanoid } from 'nanoid'
import { eq, and } from 'drizzle-orm'


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
      
      // 验证所有游戏的分类是否都存在
      const invalidCategories = new Set<string>()
      for (const gameData of body) {
        for (const categoryName of gameData.categories) {
          if (!categoryMap.has(categoryName.toLowerCase())) {
            invalidCategories.add(categoryName)
          }
        }
      }
      
      // 如果有无效分类，立即返回错误
      if (invalidCategories.size > 0) {
        throw new Error(`Invalid categories found: ${Array.from(invalidCategories).join(', ')}`)
      }
      
      for (const gameData of body) {
        // 根据分类名称获取分类ID
        const categoryIds = gameData.categories.map(categoryName => {
          return categoryMap.get(categoryName.toLowerCase())!
        })
        
        // 生成游戏ID或使用提供的ID
        const id = gameData.id || nanoid()
        
        // 处理图片URL
        const imageUrl = gameData.imageUrl || gameData.image || ''
        
        // 检查游戏是否已存在
        const existingGame = await tx
          .select()
          .from(gamesBase)
          .where(eq(gamesBase.id, id))
          .limit(1)

        let game
        if (existingGame.length > 0) {
          // 更新现有游戏
          [game] = await tx
            .update(gamesBase)
            .set({
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
              updatedAt: new Date().toISOString(),
            })
            .where(eq(gamesBase.id, id))
            .returning()

          // 删除现有分类关联
          await tx
            .delete(gameCategories)
            .where(eq(gameCategories.gameId, id))
        } else {
          // 插入新游戏
          [game] = await tx
            .insert(gamesBase)
            .values({
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
            })
            .returning()
        }

        // 插入新的分类关联
        if (categoryIds.length) {
          const timestamp = new Date().toISOString()
          await tx.insert(gameCategories).values(
            categoryIds.map(categoryId => ({
              gameId: id,
              categoryId,
              createdAt: timestamp
            }))
          ).onConflictDoNothing()
        }

        // 获取游戏的完整信息，包括分类
        const gameWithCategories = await tx.query.gamesBase.findFirst({
          where: eq(gamesBase.id, id),
          with: {
            categories: {
              with: {
                category: true
              }
            }
          }
        })

        games.push(gameWithCategories)
      }

      return games
    })

    return NextResponse.json({ 
      data: result,
      message: `Successfully imported ${result.length} games`
    })
  } catch (error) {
    console.error('Failed to import games:', error)
    
    // 根据错误类型返回不同的错误信息
    if (error instanceof Error && error.message.includes('Invalid categories')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to import games' },
      { status: 500 }
    )
  }
} 