import { RetryOptions, RetryError } from '@/types/utils'

export { RetryError }
  
  export async function retry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      maxDelay = 10000,
      backoff = 'exponential',
      onRetry
    } = options
  
    let lastError: any
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error
        
        if (attempt === maxRetries - 1) {
          throw new RetryError(
            `Operation failed after ${maxRetries} attempts`,
            attempt + 1,
            lastError
          )
        }
  
        // 计算延迟时间
        const delay = backoff === 'exponential'
          ? Math.min(initialDelay * Math.pow(2, attempt), maxDelay)
          : Math.min(initialDelay * (attempt + 1), maxDelay)
  
        // 调用重试回调
        if (onRetry) {
          await onRetry(error, attempt + 1)
        }
  
        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  
    // 这里永远不会执行到,但 TypeScript 需要它
    throw new Error('Unreachable')
  }