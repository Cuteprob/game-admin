import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectCategories, categories } from "@/lib/db/schema"
import { eq, asc, and } from "drizzle-orm"

export const runtime = 'edge'


// 获取项目分类列表
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 获取项目分类列表，包含原始分类信息，按 sortOrder 排序
    const projectCats = await db.query.projectCategories.findMany({
      where: eq(projectCategories.projectId, params.id),
      with: {
        category: true
      },
      orderBy: asc(projectCategories.sortOrder)
    });

    return NextResponse.json({
      data: projectCats.map(pc => ({
        id: pc.id,
        projectId: pc.projectId,
        categoryId: pc.categoryId,
        displayName: pc.displayName || pc.category.name,
        description: pc.description || pc.category.description,
        sortOrder: pc.sortOrder,
        isActive: Boolean(pc.isActive),
        category: pc.category,
        createdAt: pc.createdAt,
        updatedAt: pc.updatedAt
      }))
    })
  } catch (error) {
    console.error('Failed to fetch project categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project categories' },
      { status: 500 }
    )
  }
}

// 添加分类到项目
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { categoryId, displayName, description, sortOrder = 0, isActive = 1 } = body

    // 验证分类是否存在
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, categoryId)
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // 检查是否已经添加过
    const existing = await db.query.projectCategories.findFirst({
      where: and(
        eq(projectCategories.projectId, params.id),
        eq(projectCategories.categoryId, categoryId)
      )
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Category already added to project' },
        { status: 400 }
      )
    }

    // 添加到项目
    const [projectCategory] = await db.insert(projectCategories)
      .values({
        projectId: params.id,
        categoryId,
        displayName,
        description,
        sortOrder,
        isActive
      })
      .returning()

    return NextResponse.json({ data: projectCategory })
  } catch (error) {
    console.error('Failed to add category to project:', error)
    return NextResponse.json(
      { error: 'Failed to add category to project' },
      { status: 500 }
    )
  }
}

// 更新项目分类
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { categoryId, displayName, description, sortOrder, isActive } = body

    // 更新项目分类
    const [updated] = await db
      .update(projectCategories)
      .set({
        displayName,
        description,
        sortOrder,
        isActive,
        updatedAt: new Date().toISOString()
      })
      .where(
        and(
          eq(projectCategories.projectId, params.id),
          eq(projectCategories.categoryId, categoryId)
        )
      )
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Project category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Failed to update project category:', error)
    return NextResponse.json(
      { error: 'Failed to update project category' },
      { status: 500 }
    )
  }
}

// 删除项目分类
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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

    // 删除项目分类
    const [deleted] = await db
      .delete(projectCategories)
      .where(
        and(
          eq(projectCategories.projectId, params.id),
          eq(projectCategories.categoryId, categoryId)
        )
      )
      .returning()

    if (!deleted) {
      return NextResponse.json(
        { error: 'Project category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: deleted })
  } catch (error) {
    console.error('Failed to delete project category:', error)
    return NextResponse.json(
      { error: 'Failed to delete project category' },
      { status: 500 }
    )
  }
} 