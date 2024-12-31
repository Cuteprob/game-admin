"use client"

import { Loader2, Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  description: string | null
  createdAt: string
}

interface CategoryListProps {
  categories: Category[]
  loading: boolean
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export function CategoryList({
  categories,
  loading,
  onEdit,
  onDelete
}: CategoryListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(category)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {categories.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No categories found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
} 