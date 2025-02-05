import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectGameCategories, projectCategories, projectGames } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"


// 获取游戏的分类列表
export async function GET(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    // 首先获取项目游戏的 ID
    const projectGame = await db.query.projectGames.findFirst({
      where: and(
        eq(projectGames.projectId, params.id),
        eq(projectGames.gameId, params.gameId)
      )
    });

    if (!projectGame) {
      return NextResponse.json(
        { error: 'Project game not found' },
        { status: 404 }
      )
    }

    // 获取游戏的分类列表
    const gameCats = await db.query.projectGameCategories.findMany({
      where: eq(projectGameCategories.projectGameId, projectGame.id),
      with: {
        projectCategory: {
          with: {
            category: true
          }
        }
      }
    });

    return NextResponse.json({
      data: gameCats.map(gc => ({
        id: gc.projectCategory.id,
        projectId: gc.projectCategory.projectId,
        categoryId: gc.projectCategory.categoryId,
        displayName: gc.projectCategory.displayName || gc.projectCategory.category.name,
        description: gc.projectCategory.description || gc.projectCategory.category.description,
        sortOrder: gc.projectCategory.sortOrder,
        isActive: Boolean(gc.projectCategory.isActive),
        category: gc.projectCategory.category,
        createdAt: gc.createdAt
      }))
    })
  } catch (error) {
    console.error('Failed to fetch game categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch game categories' },
      { status: 500 }
    )
  }
}

// 设置游戏的分类
export async function POST(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const body = await request.json()
    const { categoryIds } = body // 期望接收分类ID数组

    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { error: 'categoryIds must be an array' },
        { status: 400 }
      )
    }

    // 获取项目游戏
    const projectGame = await db.query.projectGames.findFirst({
      where: and(
        eq(projectGames.projectId, params.id),
        eq(projectGames.gameId, params.gameId)
      )
    });

    if (!projectGame) {
      return NextResponse.json(
        { error: 'Project game not found' },
        { status: 404 }
      )
    }

    // 验证所有分类ID都属于该项目
    const projectCats = await db.query.projectCategories.findMany({
      where: and(
        eq(projectCategories.projectId, params.id),
        eq(projectCategories.isActive, 1)
      )
    });

    const validCategoryIds = projectCats.map(pc => pc.id);
    const invalidCategoryIds = categoryIds.filter(id => !validCategoryIds.includes(id));

    if (invalidCategoryIds.length > 0) {
      return NextResponse.json(
        { error: 'Some category IDs are invalid', invalidCategoryIds },
        { status: 400 }
      )
    }

    // 删除现有的关联
    await db.delete(projectGameCategories)
      .where(eq(projectGameCategories.projectGameId, projectGame.id));

    // 创建新的关联
    if (categoryIds.length > 0) {
      await db.insert(projectGameCategories)
        .values(
          categoryIds.map(categoryId => ({
            projectGameId: projectGame.id,
            projectCategoryId: categoryId
          }))
        );
    }

    return NextResponse.json({ 
      message: 'Game categories updated successfully',
      categoryIds
    })
  } catch (error) {
    console.error('Failed to update game categories:', error)
    return NextResponse.json(
      { error: 'Failed to update game categories' },
      { status: 500 }
    )
  }
}

// 删除游戏的特定分类
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; gameId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    // 获取项目游戏
    const projectGame = await db.query.projectGames.findFirst({
      where: and(
        eq(projectGames.projectId, params.id),
        eq(projectGames.gameId, params.gameId)
      )
    });

    if (!projectGame) {
      return NextResponse.json(
        { error: 'Project game not found' },
        { status: 404 }
      )
    }

    // 删除关联
    const [deleted] = await db.delete(projectGameCategories)
      .where(
        and(
          eq(projectGameCategories.projectGameId, projectGame.id),
          eq(projectGameCategories.projectCategoryId, parseInt(categoryId))
        )
      )
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: 'Game category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: deleted })
  } catch (error) {
    console.error('Failed to delete game category:', error)
    return NextResponse.json(
      { error: 'Failed to delete game category' },
      { status: 500 }
    )
  }
} 