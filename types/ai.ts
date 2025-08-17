/**
 * AI相关类型定义
 */

// AI生成请求接口
export interface GenerateRequest {
  gameId: string
  mode: 'ai'
  locale: string
  originalContent: {
    metadata: any
  }
  aiConfig?: {
    tone?: string
    targetAudience?: string
    prompts?: {
      title: string
      description: string
    }
  }
}
