/**
 * 项目相关类型定义
 */

// AI配置接口
export interface AIConfig {
  targetAudience: string
  tone: string
  defaultPrompts: {
    title: string
    description: string
  }
}

// 项目接口
export interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
  aiConfig?: AIConfig
  createdAt: string
  updatedAt: string
}

// 创建项目数据接口
export interface CreateProjectData {
  id: string
  name: string
  description?: string | null
  defaultLocale: string
  locales: string[]
  aiConfig?: AIConfig
}

// 项目列表Props
export interface ProjectListProps {
  onDelete: (id: string) => void
}

// 项目编辑表单Props
export interface ProjectEditFormProps {
  project: Project
  onSuccess: () => void
}

// 添加游戏按钮Props
export interface AddGameButtonProps {
  project: Project
  onSuccess?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

// 添加游戏表单Props
export interface AddGameFormProps {
  project: Project
  onSuccess: () => void
}

// 更新项目数据接口
export interface UpdateProjectData {
  name?: string
  description?: string | null
  defaultLocale?: string
  locales?: string[]
  aiConfig?: Project['aiConfig']
}
