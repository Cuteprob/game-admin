import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGames, gamesBase } from "@/lib/db/schema"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { and, eq, inArray } from "drizzle-orm"

const JWT_SECRET = "VY+Qz3Qj5YFxT9Qq3Z8Ns4K2Jm6Rh8Pw7Dt5Xc9Gn1Bv4Lm2"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户权限
    const token = cookies().get("token")?.value
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      )
    } catch (error) {
      return new NextResponse("Invalid token", { status: 401 })
    }

    const projectId = params.id
    const body = await request.json()

    // 验证请求体是否为数组
    if (!Array.isArray(body)) {
      return new NextResponse("Invalid request body", { status: 400 })
    }

    // 验证每个游戏对象的必要字段
    for (const game of body) {
      if (!game.gameId || !game.locale) {
        return new NextResponse("Missing required fields", { status: 400 })
      }
    }

    // 检查是否有重复的游戏
    const existingGames = await db
      .select({ gameId: projectGames.gameId })
      .from(projectGames)
      .where(
        and(
          eq(projectGames.projectId, projectId),
          eq(projectGames.locale, body[0].locale)
        )
      )

    const existingGameIds = new Set(existingGames.map(g => g.gameId))
    const duplicateGames = body.filter(game => existingGameIds.has(game.gameId))

    if (duplicateGames.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Some games already exist in the project",
          duplicates: duplicateGames.map(g => g.gameId)
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // 获取原始游戏的版本号
    const gameVersions = await db
      .select({
        id: gamesBase.id,
        version: gamesBase.version
      })
      .from(gamesBase)
      .where(
        inArray(
          gamesBase.id,
          body.map(game => game.gameId)
        )
      )

    const versionMap = new Map(gameVersions.map(g => [g.id, g.version]))

    // 批量插入游戏
    const insertData = body.map(game => ({
      projectId,
      gameId: game.gameId,
      locale: game.locale,
      title: game.title,
      description: game.description,
      metadata: JSON.stringify(game.metadata),
      features: JSON.stringify(game.features),
      faqs: JSON.stringify(game.faqs),
      controls: JSON.stringify(game.controls),
      iframeUrl: game.iframeUrl,
      imageUrl: game.imageUrl,
      rating: game.rating,
      baseVersion: versionMap.get(game.gameId) || 1,
      isPublished: 0,
      createdAt: game.createdAt
    }))

    await db.insert(projectGames).values(insertData)

    return new NextResponse(JSON.stringify({
      message: "Games added successfully",
      count: insertData.length
    }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error("[PROJECTS_GAMES_BATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 