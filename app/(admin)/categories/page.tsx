"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoryList } from "@/components/admin/categories/CategoryList"
import { toast } from "sonner"
import { CategoryDialog } from "@/components/admin/categories/CategoryDialog"
interface Category {
  id: string
  name: string
  description: string | null
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // 加载分类数据
  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const { data } = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // 处理创建/更新分类
  const handleSave = async (data: Partial<Category>) => {
    try {
      if (selectedCategory) {
        // 更新分类
        const response = await fetch(`/api/categories/${selectedCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('Failed to update category')
        toast.success('Category updated successfully')
      } else {
        // 创建分类
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('Failed to create category')
        toast.success('Category created successfully')
      }
      
      // 重新加载分类列表
      await loadCategories()
      setDialogOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      console.error('Failed to save category:', error)
      toast.error('Failed to save category')
    }
  }

  // 处理删除分类
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete category')
      
      toast.success('Category deleted successfully')
      await loadCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
      toast.error('Failed to delete category')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Categories"
          description="Manage game categories"
        />
        <Button onClick={() => {
          setSelectedCategory(null)
          setDialogOpen(true)
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        loading={loading}
        onEdit={(category) => {
          setSelectedCategory(category)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  )
} 