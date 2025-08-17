import { db } from '@/lib/db/tursoDb'
import { categories, type Category, type NewCategory } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// 获取所有分类
export async function getCategories(): Promise<Category[]> {
  return await db.select().from(categories)
}

// 获取单个分类
export async function getCategory(id: string): Promise<Category | null> {
  const result = await db.select().from(categories).where(eq(categories.id, id))
  return result[0] || null
}

// 创建分类 - 用户需要提供ID
export async function createCategory(data: Omit<NewCategory, 'createdAt'>): Promise<Category> {
  const [category] = await db.insert(categories).values({
    id: data.id,
    name: data.name,
    description: data.description,
  }).returning()
  return category
}

// 更新分类
export async function updateCategory(id: string, data: Partial<Omit<NewCategory, 'id' | 'createdAt'>>): Promise<Category | null> {
  const [category] = await db.update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning()
  return category || null
}

// 删除分类
export async function deleteCategory(id: string): Promise<boolean> {
  const [category] = await db.delete(categories)
    .where(eq(categories.id, id))
    .returning()
  return !!category
} 