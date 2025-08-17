"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { GameCategory, GameCategoryDisplayProps } from "@/types/category"

export function GameCategoryDisplay({ gameId, projectId }: GameCategoryDisplayProps) {
  const [categories, setCategories] = useState<GameCategory[]>([])
  const [loading, setLoading] = useState(true)

  // 获取游戏分类列表
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/games/${gameId}/categories`)
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
  }, [gameId, projectId])

  useEffect(() => {
    fetchCategories()
  }, [gameId, projectId, fetchCategories])

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