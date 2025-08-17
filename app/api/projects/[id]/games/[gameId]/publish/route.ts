import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGames } from "@/lib/db/schema"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { and, eq } from "drizzle-orm"

export const runtime = 'edge'

const JWT_SECRET = "VY+Qz3Qj5YFxT9Qq3Z8Ns4K2Jm6Rh8Pw7Dt5Xc9Gn1Bv4Lm2"

export async function POST(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
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

    const { id: projectId, gameId } = params

    // 更新游戏状态为已发布
    await db
      .update(projectGames)
      .set({ 
        isPublished: 1,
      })
      .where(
        and(
          eq(projectGames.projectId, projectId),
          eq(projectGames.gameId, gameId)
        )
      )

    return new NextResponse(JSON.stringify({
      message: "Game published successfully"
    }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error("[PUBLISH_GAME]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 