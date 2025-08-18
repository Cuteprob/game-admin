/**
 * 评论相关类型定义
 */

// 评论状态枚举
export type CommentStatus = 'pending' | 'approved' | 'rejected' | 'spam'

// 评分分布接口
export interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
}

// 游戏评论接口
export interface GameComment {
  id: number
  content: string
  nickname: string
  email?: string | null
  gameId: string
  projectId: string
  locale: string
  ratingScore?: number | null
  status: CommentStatus
  helpfulVotes: number
  createdAt: string
  updatedAt?: string | null
  moderatedAt?: string | null
}

// 创建评论数据接口
export interface CreateCommentData {
  content: string
  nickname: string
  email?: string
  gameId: string
  projectId: string
  locale: string
  ratingScore?: number
}

// 更新评论数据接口
export interface UpdateCommentData {
  content?: string
  nickname?: string
  email?: string
  status?: CommentStatus
  helpfulVotes?: number
  moderatedAt?: string
}

// 游戏评分汇总接口
export interface GameRating {
  id: number
  gameId: string
  projectId: string
  locale: string
  averageRating: number
  totalRatings: number
  rating1Count: number
  rating2Count: number
  rating3Count: number
  rating4Count: number
  rating5Count: number
  updatedAt?: string | null
}

// 创建/更新评分数据接口
export interface UpsertRatingData {
  gameId: string
  projectId: string
  locale: string
  averageRating: number
  totalRatings: number
  ratingDistribution: RatingDistribution
}

// 带有游戏信息的评论接口
export interface CommentWithGame extends GameComment {
  game: {
    id: string
    title: string
    imageUrl: string
  }
  project: {
    id: string
    name: string
  }
}

// 评论列表查询参数
export interface CommentListParams {
  page?: number
  pageSize?: number
  status?: CommentStatus
  gameId?: string
  projectId?: string
  locale?: string
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'helpfulVotes'
  sortOrder?: 'asc' | 'desc'
}

// 评论统计信息
export interface CommentStats {
  total: number
  pending: number
  approved: number
  rejected: number
  spam: number
}

// 评论审核操作参数
export interface ModerateCommentData {
  status: CommentStatus
  moderatedAt: string
}

// 评论管理组件Props
export interface CommentListProps {
  onDataChange?: (stats: CommentStats) => void
}

export interface CommentModerationCardProps {
  comment: CommentWithGame
  onModerate: (id: number, data: ModerateCommentData) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export interface CommentStatsProps {
  stats: CommentStats
}

// 评分管理组件Props
export interface RatingManagementProps {
  gameId: string
  projectId: string
  locale: string
  currentRating?: GameRating
  onUpdate: (data: UpsertRatingData) => Promise<void>
}

export interface RatingDisplayProps {
  rating: number
  totalRatings: number
  distribution?: RatingDistribution
  showDetails?: boolean
}

// API响应接口
export interface CommentListResponse {
  data: CommentWithGame[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CommentActionResponse {
  success: boolean
  message: string
  data?: GameComment
}

export interface RatingActionResponse {
  success: boolean
  message: string
  data?: GameRating
}




