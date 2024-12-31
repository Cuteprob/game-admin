import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGames } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
export const runtime = 'edge';
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
      features: projectGame.features ? JSON.parse(projectGame.features) : null,
      faqs: projectGame.faqs ? JSON.parse(projectGame.faqs) : null,
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
    const { title, description, metadata, features, faqs, isPublished } = body

    // 序列化JSON字段
    const updateData: typeof projectGames.$inferInsert = {
      title,
      description,
      metadata: metadata ? JSON.stringify(metadata) : '',
      features: features ? JSON.stringify(features) : '',
      faqs: faqs ? JSON.stringify(faqs) : '',
      isPublished: isPublished ? 1 : 0,
      projectId: params.id,
      gameId: params.gameId,
      locale: body.locale,
      controls: body.controls || '',
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
      features: updated.features ? JSON.parse(updated.features) : null,
      faqs: updated.faqs ? JSON.parse(updated.faqs) : null,
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