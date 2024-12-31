import { NextResponse } from 'next/server';
import { 
  getCategories, 
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '@/repositories/categoryRepository'
export const runtime = 'edge';
// 获取所有分类
export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// 创建新分类
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const category = await createCategory(body)
    return NextResponse.json({ data: category })
  } catch (error) {
    console.error('Failed to create category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
} 