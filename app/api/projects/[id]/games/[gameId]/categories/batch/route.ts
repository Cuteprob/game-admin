import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGameCategories, projectCategories, projectGames } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export const runtime = 'edge'

export async function POST(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const { categoryIds } = await request.json()

    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    // 1. 获取项目游戏的 ID
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

    // 2. 获取项目分类的 ID
    const projectCats = await db.query.projectCategories.findMany({
      where: and(
        eq(projectCategories.projectId, params.id),
        eq(projectCategories.isActive, 1)
      )
    })

    const projectCategoryMap = new Map(
      projectCats.map(cat => [cat.categoryId, cat.id])
    )

    // 验证所有分类 ID 都是有效的项目分类
    const validCategoryIds = categoryIds.filter(id => projectCategoryMap.has(id))
    if (validCategoryIds.length !== categoryIds.length) {
      return NextResponse.json(
        { error: "Some category IDs are invalid" },
        { status: 400 }
      )
    }

    // 3. 删除现有的分类关联
    await db.delete(projectGameCategories)
      .where(eq(projectGameCategories.projectGameId, projectGame.id))

    // 4. 创建新的分类关联
    if (validCategoryIds.length > 0) {
      await db.insert(projectGameCategories)
        .values(
          validCategoryIds.map(categoryId => ({
            projectGameId: projectGame.id,
            projectCategoryId: projectCategoryMap.get(categoryId)!
          }))
        )
    }

    return NextResponse.json({ 
      success: true,
      message: "Categories updated successfully"
    })
  } catch (error) {
    console.error('Failed to update categories:', error)
    return NextResponse.json(
      { error: "Failed to update categories" },
      { status: 500 }
    )
  }
} 