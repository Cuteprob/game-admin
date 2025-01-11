"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

interface ProjectCategoryListProps {
  projectId: string
}

export function ProjectCategoryList({ projectId }: ProjectCategoryListProps) {
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")
  const [updating, setUpdating] = useState<number | null>(null)

  // 获取项目分类列表
  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/categories`)
      const data = await response.json()
      if (data.data) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  // 获取可用分类列表
  const fetchAvailableCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.data) {
        // 过滤掉已添加的分类
        const existingCategoryIds = categories.map(pc => pc.categoryId)
        setAvailableCategories(
          data.data.filter((c: Category) => !existingCategoryIds.includes(c.id))
        )
      }
    } catch (error) {
      console.error('Failed to fetch available categories:', error)
      toast.error('Failed to fetch available categories')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [projectId])

  useEffect(() => {
    if (dialogOpen) {
      fetchAvailableCategories()
    }
  }, [dialogOpen, categories])

  // 添加分类
  const handleAdd = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category')
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: selectedCategory,
          displayName,
          description,
          sortOrder: categories.length
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add category')
      }

      await fetchCategories()
      setDialogOpen(false)
      setSelectedCategory("")
      setDisplayName("")
      setDescription("")
      toast.success('Category added successfully')
    } catch (error) {
      console.error('Failed to add category:', error)
      toast.error('Failed to add category')
    }
  }

  // 更新分类状态
  const handleToggleActive = async (category: ProjectCategory) => {
    try {
      setUpdating(category.id)
      const response = await fetch(`/api/projects/${projectId}/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: category.categoryId,
          isActive: !category.isActive
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      await fetchCategories()
      toast.success('Category updated successfully')
    } catch (error) {
      console.error('Failed to update category:', error)
      toast.error('Failed to update category')
    } finally {
      setUpdating(null)
    }
  }

  // 删除分类
  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const response = await fetch(
        `/api/projects/${projectId}/categories?categoryId=${categoryId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      await fetchCategories()
      toast.success('Category deleted successfully')
    } catch (error) {
      console.error('Failed to delete category:', error)
      toast.error('Failed to delete category')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    const category = availableCategories.find(c => c.id === e.target.value)
                    if (category) {
                      setDisplayName(category.name)
                      setDescription(category.description || '')
                    }
                  }}
                >
                  <option value="">Select a category</option>
                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Custom display name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Custom description"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="font-medium">{category.displayName}</div>
                  <div className="text-sm text-muted-foreground">
                    Original: {category.category.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px] truncate">
                    {category.description || category.category.description}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={category.isActive}
                      onCheckedChange={() => handleToggleActive(category)}
                      disabled={updating === category.id}
                    />
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {updating === category.id && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No categories added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 