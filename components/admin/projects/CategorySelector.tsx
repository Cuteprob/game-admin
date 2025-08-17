"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, X } from "lucide-react"

import { Category, CategorySelectorProps } from '@/types/category'

export function CategorySelector({ 
  selectedCategories, 
  onCategoriesChange, 
  disabled = false 
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleDialogOpen = (open: boolean) => {
    setDialogOpen(open)
    if (open) {
      setTempSelectedCategories([...selectedCategories])
    }
  }

  const handleSave = () => {
    onCategoriesChange(tempSelectedCategories)
    setDialogOpen(false)
  }

  const handleCancel = () => {
    setTempSelectedCategories([...selectedCategories])
    setDialogOpen(false)
  }

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    if (checked) {
      setTempSelectedCategories([...tempSelectedCategories, categoryId])
    } else {
      setTempSelectedCategories(tempSelectedCategories.filter(id => id !== categoryId))
    }
  }

  const removeCategory = (categoryId: string) => {
    onCategoriesChange(selectedCategories.filter(id => id !== categoryId))
  }

  const selectedCategoryObjects = categories.filter(cat => selectedCategories.includes(cat.id))

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 显示已选择的种类 */}
      <div className="space-y-2">
        <Label>Selected Categories</Label>
        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
          {selectedCategoryObjects.length > 0 ? (
            selectedCategoryObjects.map((category) => (
              <Badge key={category.id} variant="secondary" className="flex items-center gap-1">
                {category.name}
                <button
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  disabled={disabled}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No categories selected</span>
          )}
        </div>
      </div>

      {/* 选择种类按钮 */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" disabled={disabled}>
            <Plus className="w-4 h-4 mr-2" />
            Select Categories
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={category.id}
                      checked={tempSelectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        handleCategoryToggle(category.id, checked as boolean)
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={category.id} className="font-medium">
                        {category.name}
                      </Label>
                      {category.description && (
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
