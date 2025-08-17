/**
 * 游戏相关类型定义
 */

import { ProjectCategory } from './category'

// 游戏元数据接口
export interface GameMetadata {
  title: string
  description: string
  keywords: string[]
}

// 游戏控制接口
export interface GameControls {
  fullscreenTip: string
  guide: {
    movement: string[]
    actions: string[]
    special?: string[]
  }
}

// 项目游戏接口
export interface ProjectGame {
  id: string
  gameId: string
  title: string
  description: string
  metadata: any
  features: any | null
  faqs: any | null
  content: string | null
  locale: string
  isPublished: boolean
  isMain: boolean
  baseVersion: number
  createdAt: string
  updatedAt: string
  effectiveCategories?: ProjectCategory[]
}

// 游戏导入数据接口
export interface ImportGameData {
  id?: string
  title: string
  description: string
  iframeUrl: string
  imageUrl: string
  image?: string
  rating?: number
  categories: string[]
  metadata: GameMetadata
  content?: string
  controls?: GameControls
  features: string[]
  faqs: {
    question: string
    answer: string
    category: 'gameplay' | 'technical' | 'features' | 'general' | 'tips' | 'audio'
  }[]
  video?: {
    youtubeId: string
    clipId?: string
    clipTime?: string
    title: string
    thumbnail: string
  }
}

// 游戏表单数据接口
export interface GameFormData {
  id: string
  title: string
  iframeUrl: string
  imageUrl: string
  rating: number
  description: string
  categories: string[]
  metadata: GameMetadata
  content?: string
  features: string[]
}

// 游戏表单完整数据接口（包含JSON字符串字段）
export interface GameFormDataComplete {
  id: string
  title: string
  iframeUrl: string
  imageUrl: string
  rating: number
  categories: string[]
  metadata: string | undefined
  video: string | undefined
  content: string
  createdAt: string
}

// 游戏表单Props
export interface GameFormProps {
  game?: Partial<any> & {
    categories?: string[]
  }
  onSubmit?: (data: Partial<any> & {
    categories: string[]
  }) => Promise<void>
  isEdit?: boolean
}

// 游戏列表Props
export interface GameListProps {
  onDataChange?: (total: number) => void
}

// 游戏选择Props
export interface GameSelectProps {
  projectId: string
  onSelect: (games: any[]) => void
  selectedGames?: any[]
  trigger?: React.ReactNode
}

// 项目游戏列表Props
export interface ProjectGameListProps {
  projectId: string
  onDataChange?: () => void
}

// 页面特定的interface
export interface GameWithCategories {
  id: string
  title: string
  description: string
  iframeUrl: string
  imageUrl: string
  rating: number
  metadata: any
  features: any
  faqs: any
  content?: string
  createdAt: string
  updatedAt: string
  categories: Array<{
    categoryId: string
    category: {
      id: string
      name: string
    }
  }>
}

export interface GameFormDataWithCategories extends Partial<any> {
  categories: string[]
}

// 组件特定的Props接口
export interface GameSelectComponentProps {
  projectId: string
  onSelect: (games: any[]) => void
  selectedGames?: any[]
  trigger?: React.ReactNode
}

export interface GameListComponentProps {
  onDataChange?: (total: number) => void
}

export interface GameFormComponentProps {
  game?: Partial<any> & {
    categories?: string[]
  }
  onSubmit?: (data: Partial<any> & {
    categories: string[]
  }) => Promise<void>
}
