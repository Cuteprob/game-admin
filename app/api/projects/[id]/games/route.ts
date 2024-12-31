import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { eq, desc } from "drizzle-orm"
import { 
  projectGames as projectGamesTable, 
  type ProjectGame, 
  type GameBase, 
  type NewProjectGame,
  gamesBase 
} from "@/lib/db/schema"
export const runtime = 'edge';
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const games = await db.query.projectGames.findMany({
      where: eq(projectGamesTable.projectId, params.id),
      orderBy: [desc(projectGamesTable.createdAt)]
    }) as ProjectGame[]

    return NextResponse.json({
      data: games.map(game => ({
        id: game.id,
        gameId: game.gameId,
        title: game.title,
        description: game.description,
        locale: game.locale,
        isPublished: Boolean(game.isPublished),
        baseVersion: game.baseVersion,
        createdAt: game.createdAt,
        updatedAt: game.createdAt // 使用createdAt，因为schema中没有updatedAt
      }))
    })
  } catch (error) {
    console.error('Failed to fetch project games:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project games' },
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
    const { gameId, locale, title, description } = body

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
      description,
      metadata: baseGame.metadata,
      controls: baseGame.controls,
      features: baseGame.features,
      faqs: baseGame.faqs,
      baseVersion: baseGame.version ?? 1,
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