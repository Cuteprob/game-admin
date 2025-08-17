import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGames } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export const runtime = 'edge'

// 获取单个项目游戏
export async function GET(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const projectGame = await db.query.projectGames.findFirst({
      where: and(
        eq(projectGames.projectId, params.id),
        eq(projectGames.gameId, params.gameId)
      )
    })

    if (!projectGame) {
      return NextResponse.json(
        { error: "Project game not found" },
        { status: 404 }
      )
    }

    // 解析JSON字段
    const data = {
      ...projectGame,
      metadata: projectGame.metadata ? JSON.parse(projectGame.metadata) : null,
      content: projectGame.content,
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Failed to get project game:", error)
    return NextResponse.json(
      { error: "Failed to get project game" },
      { status: 500 }
    )
  }
}

// 更新项目游戏
export async function PUT(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const body = await request.json()
    const { title, metadata, content, isPublished, isMain } = body

    // 序列化JSON字段
    const updateData: typeof projectGames.$inferInsert = {
      title,
      metadata: metadata ? JSON.stringify(metadata) : '',
      content: content || null,
      isPublished: isPublished ? 1 : 0,
      isMain: isMain ? 1 : 0,
      projectId: params.id,
      gameId: params.gameId,
      locale: body.locale,
      baseVersion: body.baseVersion || 1
    }

    const [updated] = await db
      .update(projectGames)
      .set(updateData)
      .where(
        and(
          eq(projectGames.projectId, params.id),
          eq(projectGames.gameId, params.gameId)
        )
      )
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: "Project game not found" },
        { status: 404 }
      )
    }

    // 解析JSON字段用于返回
    const data = {
      ...updated,
      metadata: updated.metadata ? JSON.parse(updated.metadata) : null,
      content: updated.content,
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Failed to update project game:", error)
    return NextResponse.json(
      { error: "Failed to update project game" },
      { status: 500 }
    )
  }
}

// 删除项目游戏
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const [deleted] = await db
      .delete(projectGames)
      .where(
        and(
          eq(projectGames.projectId, params.id),
          eq(projectGames.gameId, params.gameId)
        )
      )
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: "Project game not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: deleted })
  } catch (error) {
    console.error("Failed to delete project game:", error)
    return NextResponse.json(
      { error: "Failed to delete project game" },
      { status: 500 }
    )
  }
} 