/**
 * Repository层相关的类型定义
 */

import { NewGameBase } from "@/lib/db/schema"

// 游戏查询选项
export interface GetGamesOptions {
  page?: number;
  limit?: number;
  categoryId?: string;
}

// 创建游戏输入
export interface CreateGameInput extends NewGameBase {
  categories?: string[];  // 分类ID数组
}

// 页面相关的接口
export interface RouteParamsWithId {
  params: { id: string }
}

export interface RouteParamsWithProjectAndGame {
  params: { 
    id: string
    gameId: string 
  }
}

// Dashboard统计接口
export interface DashboardStats {
  // Project Stats
  totalProjects: number
  totalGames: number
  totalCategories: number
  
  // Recent Activity
  recentProjects: Array<{
    id: string
    name: string
    createdAt: string
  }>
  
  recentGames: Array<{
    id: string
    title: string
    createdAt: string
  }>
}

// 扩展的Dashboard统计接口
export interface ExtendedDashboardStats extends DashboardStats {
  projectGamesCount: Array<{
    projectId: string
    count: number
    languages: string[]
    published: number
    unpublished: number
  }>
  pendingTasks: number
  completedTasks: number
  failedTasks: number
  recentTasks: Array<{
    id: string
    title: string
    projectId: string
    status: string
    createdAt: string
  }>
}

// 表格相关接口
export interface DataTableProps<TData, TValue> {
  columns: any[]
  data: TData[]
  pagination?: {
    page: number
    limit: number
    total: number
    onPageChange: (page: number) => void
  }
}
