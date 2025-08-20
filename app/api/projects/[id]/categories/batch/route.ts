import { NextResponse } from "next/server"
import { db } from "@/lib/db/tursoDb"
import { projectCategories } from "@/lib/db/schema"
import { eq, inArray, and } from "drizzle-orm"

export const runtime = 'edge'



export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { categoryIds } = await request.json()
    const projectId = params.id

    // 参数验证
    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { error: 'categoryIds must be an array' },
        { status: 400 }
      )
    }

    // 开始事务 - 使用差异化更新策略
    await db.transaction(async (tx) => {
      // 1. 获取项目当前的所有分类
      const currentCategories = await tx
        .select({ categoryId: projectCategories.categoryId })
        .from(projectCategories)
        .where(eq(projectCategories.projectId, projectId))

      const currentCategoryIds = currentCategories.map(c => c.categoryId)
      const newCategoryIds = categoryIds as string[]

      // 2. 计算需要删除的分类（在当前分类中但不在新分类中）
      const categoriesToDelete = currentCategoryIds.filter(
        id => !newCategoryIds.includes(id)
      )

      // 3. 计算需要添加的分类（在新分类中但不在当前分类中）
      const categoriesToAdd = newCategoryIds.filter(
        id => !currentCategoryIds.includes(id)
      )

      // 4. 删除不需要的分类（这会触发级联删除对应的游戏分类关联）
      if (categoriesToDelete.length > 0) {
        await tx
          .delete(projectCategories)
          .where(
            and(
              eq(projectCategories.projectId, projectId),
              inArray(projectCategories.categoryId, categoriesToDelete)
            )
          )
        
        console.log(`删除了 ${categoriesToDelete.length} 个分类:`, categoriesToDelete)
      }

      // 5. 添加新的分类（不影响现有的游戏分类关联）
      if (categoriesToAdd.length > 0) {
        await tx.insert(projectCategories).values(
          categoriesToAdd.map((categoryId: string) => ({
            projectId,
            categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }))
        )
        
        console.log(`添加了 ${categoriesToAdd.length} 个分类:`, categoriesToAdd)
      }

      // 6. 记录保持不变的分类
      const unchangedCategories = currentCategoryIds.filter(
        id => newCategoryIds.includes(id)
      )
      
      if (unchangedCategories.length > 0) {
        console.log(`保持不变的分类 ${unchangedCategories.length} 个:`, unchangedCategories)
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Project categories updated successfully with minimal impact'
    })
  } catch (error) {
    console.error('Error updating project categories:', error)
    return NextResponse.json(
      { error: 'Failed to update project categories' },
      { status: 500 }
    )
  }
} 