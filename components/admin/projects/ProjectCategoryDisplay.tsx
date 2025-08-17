"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { ProjectCategory, ProjectCategoryDisplayProps } from "@/types/category"

export function ProjectCategoryDisplay({ projectId }: ProjectCategoryDisplayProps) {
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)

  // 获取项目分类列表
  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/categories`)
      const data = await response.json()
      if (data.data) {
        // 按 sortOrder 排序
        const sortedCategories = [...data.data].sort((a, b) => a.sortOrder - b.sortOrder)
        setCategories(sortedCategories)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [projectId])

  if (loading) {
    return <div className="flex items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  }

  if (categories.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No categories available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.filter(category => category.isActive).map((category) => (
        <div
          key={category.id}
          className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{category.displayName}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description || category.category.description}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {category.category.name}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 