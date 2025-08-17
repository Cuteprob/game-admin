/**
 * 分类相关类型定义
 */

// 基础分类接口
export interface Category {
  id: string
  name: string
  description: string | null
  createdAt?: string
}

// 项目分类接口
export interface ProjectCategory {
  id: number
  projectId: string
  categoryId: string
  displayName: string
  description: string | null
  sortOrder: number
  isActive: number | boolean
  category: Category
  createdAt?: string
  updatedAt?: string
}

// 游戏分类接口
export interface GameCategory {
  id: number
  gameId: string
  categoryId: string
  displayName: string
  description: string | null
  sortOrder: number
  isActive: number
  category: Category
}

// 分类对话框Props
export interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onSave: (data: Partial<Category>) => Promise<void>
}

// 分类列表Props
export interface CategoryListProps {
  categories: Category[]
  loading: boolean
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

// 分类选择器Props
export interface CategorySelectorProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  disabled?: boolean
}

// 项目分类选择Props
export interface ProjectCategorySelectProps {
  projectId: string
  onSave?: () => void
}

// 项目分类显示Props
export interface ProjectCategoryDisplayProps {
  projectId: string
}

// 项目分类列表Props
export interface ProjectCategoryListProps {
  projectId: string
}

// 游戏分类显示Props
export interface GameCategoryDisplayProps {
  gameId: string
  projectId: string
}

// 游戏分类列表Props
export interface GameCategoryListProps {
  gameId: string
  projectId: string
}

// 分类响应接口
export interface CategoryResponse {
  data: ProjectCategory[];
}
