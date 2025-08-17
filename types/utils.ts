/**
 * 工具函数相关的类型定义
 */

// Fetch工具类型
export interface FetchOptions extends RequestInit {
  timeout?: number
}

// 重试工具类型
export interface RetryOptions {
  maxRetries?: number
  initialDelay?: number
  maxDelay?: number
  backoff?: 'exponential' | 'linear'
  onRetry?: (error: any, attempt: number) => void | Promise<void>
}

// 重试错误类
export class RetryError extends Error {
  constructor(
    message: string,
    public readonly attempts: number,
    public readonly lastError: Error
  ) {
    super(message)
    this.name = 'RetryError'
  }
}

// Cloudflare环境变量类型
export interface CloudflareEnv {
  // Database
  TURSO_DATABASE_URL: string
  TURSO_DATABASE_AUTH_TOKEN: string
  
  // OpenAI
  OPENAI_API_KEY: string
  OPENAI_API_BASE_URL: string
  OPENAI_API_MODEL: string
  
  // Admin
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
  NEXTAUTH_SECRET: string
  
  // Fallback models
  OPENAI_API_FALLBACK_MODEL_1: string
  OPENAI_API_FALLBACK_MODEL_2: string
  OPENAI_API_FALLBACK_MODEL_3: string
}
