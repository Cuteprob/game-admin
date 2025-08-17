import { NextResponse } from 'next/server';
import { 
  getCategories, 
  getCategory,
  createCategory
} from '@/repositories/categoryRepository'

export const runtime = 'edge'

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
    
    // 验证必需字段
    if (!body.id || !body.name) {
      return NextResponse.json(
        { error: 'Category ID and name are required' },
        { status: 400 }
      )
    }
    
    // 验证ID格式（只允许字母、数字、下划线、连字符）
    const idRegex = /^[a-zA-Z0-9_-]+$/
    if (!idRegex.test(body.id)) {
      return NextResponse.json(
        { error: 'Category ID can only contain letters, numbers, underscores, and hyphens' },
        { status: 400 }
      )
    }
    
    // 检查ID是否已存在
    const existingCategory = await getCategory(body.id)
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category ID already exists' },
        { status: 409 }
      )
    }
    
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