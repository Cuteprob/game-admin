import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectCategories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const runtime = 'edge'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { categoryIds } = await request.json()
    const projectId = params.id

    // 开始事务
    await db.transaction(async (tx) => {
      // 1. 删除项目的所有现有分类
      await tx
        .delete(projectCategories)
        .where(eq(projectCategories.projectId, projectId))

      // 2. 如果提供了新的分类ID，则插入新的分类关联
      if (categoryIds && categoryIds.length > 0) {
        await tx.insert(projectCategories).values(
          categoryIds.map((categoryId: string) => ({
            projectId,
            categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }))
        )
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating project categories:', error)
    return NextResponse.json(
      { error: 'Failed to update project categories' },
      { status: 500 }
    )
  }
} 