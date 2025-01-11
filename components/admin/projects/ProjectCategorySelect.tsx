"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  description: string | null
}

interface ProjectCategory {
  id: number
  projectId: string
  categoryId: string
  displayName: string
  description: string | null
  sortOrder: number
  isActive: boolean
  category: Category
  createdAt: string
  updatedAt: string
}

interface ProjectCategorySelectProps {
  projectId: string
  onSave?: () => void
}

export function ProjectCategorySelect({ projectId, onSave }: ProjectCategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 获取所有分类和项目已选分类
  const fetchData = async () => {
    try {
      // 获取所有分类
      const categoriesResponse = await fetch('/api/categories')
      const categoriesData = await categoriesResponse.json()
      setCategories(categoriesData.data)

      // 获取项目已选分类
      const projectCategoriesResponse = await fetch(`/api/projects/${projectId}/categories`)
      const projectCategoriesData = await projectCategoriesResponse.json()
      setSelectedCategories(projectCategoriesData.data.map((pc: ProjectCategory) => pc.categoryId))
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [projectId])

  // 保存选择的分类
  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/projects/${projectId}/categories/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryIds: selectedCategories
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update categories')
      }

      toast.success('Categories updated successfully')
      onSave?.()
    } catch (error) {
      console.error('Failed to update categories:', error)
      toast.error('Failed to update categories')
    } finally {
      setSaving(false)
    }
  }

  // 处理分类选择变化
  const handleCategoryChange = (categoryId: string, checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setSelectedCategories(prev => {
        if (checked) {
          return [...prev, categoryId]
        } else {
          return prev.filter(id => id !== categoryId)
        }
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex items-start space-x-3 p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
              disabled={saving}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor={category.id} className="font-medium">{category.name}</Label>
              {category.description && (
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Categories'
        )}
      </Button>
    </div>
  )
} 