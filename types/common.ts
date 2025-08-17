/**
 * 通用类型定义
 */

// 分页响应接口
export interface PaginatedResponse<T> {
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  code: number;
  message: string;
}

// 通用API响应接口
export interface ApiResponse<T = any> {
  data: T;
  code: number;
  message: string;
}

// 通用列表响应接口
export interface ListResponse<T> {
  data: T[];
  total?: number;
  message?: string;
}

// 路由参数接口
export interface RouteParams {
  params: { id: string }
}

// 游戏响应接口
export interface GamesResponse {
  data: any[]
  total: number
  message?: string
}
