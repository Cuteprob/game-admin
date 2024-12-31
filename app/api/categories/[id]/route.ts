import { NextResponse } from 'next/server'
import { 
  getCategory,
  updateCategory,
  deleteCategory
} from '@/repositories/categoryRepository'

// 获取单个分类
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategory(params.id)
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: category })
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// 更新分类
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const category = await updateCategory(params.id, body)
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: category })
  } catch (error) {
    console.error('Failed to update category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// 删除分类
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteCategory(params.id)
    if (!success) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    console.error('Failed to delete category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
} 