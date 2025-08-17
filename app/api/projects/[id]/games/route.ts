import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { eq, desc, sql } from "drizzle-orm"
import { 
  projectGames as projectGamesTable, 
  type GameBase, 
  type NewProjectGame,
  gamesBase,
  projectCategories
} from "@/lib/db/schema"

export const runtime = 'edge'



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '50')
    
    // 获取总数 - 保持不变
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projectGamesTable)
      .where(eq(projectGamesTable.projectId, params.id))

    // 修改查询，使用复杂的关联查询
    const items = await db.query.projectGames.findMany({
      where: eq(projectGamesTable.projectId, params.id),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      with: {
        // 获取游戏基础信息和分类
        game: {
          with: {
            categories: {
              with: {
                category: true
              }
            }
          }
        },
        // 获取项目游戏分类
        categories: {
          with: {
            projectCategory: {
              with: {
                category: true
              }
            }
          }
        }
      },
      orderBy: [desc(projectGamesTable.createdAt)]
    })

    // 处理每个游戏的分类
    const processedItems = await Promise.all(items.map(async (item) => {
      // 如果项目中已设置了游戏分类，直接使用项目中的分类
      if (item.categories && item.categories.length > 0) {
        return {
          ...item,
          effectiveCategories: item.categories.map(cat => cat.projectCategory)
        }
      }

      // 如果项目未设置分类，则获取项目支持的分类列表
      const projectCats = await db.query.projectCategories.findMany({
        where: eq(projectCategories.projectId, params.id),
        with: {
          category: true
        }
      })

      // 从游戏基础分类中筛选出同时存在于项目分类中的分类
      const validCategories = item.game.categories
        .filter(gameCat => 
          projectCats.some(projCat => 
            projCat.categoryId === gameCat.category.id
          )
        )
        .map(gameCat => ({
          id: 0, // 临时 ID
          projectId: params.id,
          categoryId: gameCat.category.id,
          displayName: gameCat.category.name,
          description: gameCat.category.description,
          isActive: 1,
          sortOrder: 0,
          category: gameCat.category
        }))

      return {
        ...item,
        effectiveCategories: validCategories
      }
    }))

    return NextResponse.json({
      data: {
        items: processedItems,
        total: countResult.count,
        page,
        pageSize
      }
    })
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { gameId, locale, title } = body

    // 检查游戏是否已经在项目中
    const existingGame = await db.query.projectGames.findFirst({
      where: (games, { and, eq }) => and(
        eq(games.projectId, params.id),
        eq(games.gameId, gameId),
        eq(games.locale, locale)
      )
    })

    if (existingGame) {
      return NextResponse.json(
        { error: 'Game already exists in project with this language' },
        { status: 400 }
      )
    }

    // 获取原始游戏数据
    const baseGame = await db.query.gamesBase.findFirst({
      where: eq(gamesBase.id, gameId)
    }) as GameBase

    if (!baseGame) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      )
    }

    // 创建项目游戏
    const newGame: NewProjectGame = {
      projectId: params.id,
      gameId,
      locale,
      title,
      metadata: baseGame.metadata,
      content: baseGame.content,
      baseVersion: 1,
      isPublished: 0
    }

    const [projectGame] = await db.insert(projectGamesTable)
      .values(newGame)
      .returning()

    return NextResponse.json({ data: projectGame })
  } catch (error) {
    console.error('Failed to add game to project:', error)
    return NextResponse.json(
      { error: 'Failed to add game to project' },
      { status: 500 }
    )
  }
} 