import { retry } from './retry'
import { toast } from 'sonner'
import { FetchOptions } from '@/types/utils'

export async function fetchWithRetry(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options

  return retry(
    async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.clone()
      } finally {
        clearTimeout(timeoutId)
      }
    },
    {
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 5000,
      onRetry: (error, attempt) => {
        console.error(`Attempt ${attempt} failed:`, error)
        toast.error(`connection failed, retrying... (${attempt}/3)`)
      }
    }
  )
}

// JSON数据专用的重试函数
export async function fetchJsonWithRetry<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options)
  try {
    return await response.json()
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    throw error
  }
}

