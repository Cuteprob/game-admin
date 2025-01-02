import { OpenAI } from 'openai'
import { DEFAULT_PROMPTS } from './config'

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
  defaultHeaders: {
    'HTTP-Referer': 'https://game-admin.com',
    'X-Title': 'Game Admin'
  },
  defaultQuery: {
    model: process.env.OPENAI_API_MODEL || "openai/gpt-4o-mini"
  }
})

// 重试配置
const MAX_RETRIES = 3
const BASE_DELAY = 1000 // 1 second

// 延迟函数
const delay = async (attempt: number): Promise<void> => {
  const ms = Math.min(BASE_DELAY * Math.pow(2, attempt), 10000) // Max 10 seconds
  await new Promise(resolve => setTimeout(resolve, ms))
}

// 重试函数
const retryOperation = async <T>(
  operation: () => Promise<T>,
  attempt: number = 0
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    console.error(`Attempt ${attempt + 1} failed:`, error)
    
    if (attempt < MAX_RETRIES - 1) {
      await delay(attempt)
      return retryOperation(operation, attempt + 1)
    }
    
    // 如果是连接错误，提供更具体的错误信息
    if (error instanceof Error && error.message.includes('ECONNRESET')) {
      throw new Error('Failed to connect to AI service. Please check your network connection and try again.')
    }
    
    throw error
  }
}

// 处理图片 URL 格式
const processImageUrl = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return `https://${url}`
}

// 生成内容
export const generateContent = async (
  input: string,
  taskType: 'GAME_IMPORT' | 'GAME_CONTENT',
  customPrompt?: string,
  temperature: number = 0.7
) => {
  const systemPrompt = customPrompt || DEFAULT_PROMPTS[taskType]
  if (!systemPrompt) {
    throw new Error(`Invalid task type: ${taskType}`)
  }

  return retryOperation(async () => {
    console.log('Sending request to OpenAI API...')
    console.log('Model:', process.env.OPENAI_API_MODEL)
    console.log('Base URL:', process.env.OPENAI_API_BASE_URL)

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_API_MODEL || "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ],
      response_format: { type: "json_object" },
      temperature
    })

    console.log('OpenAI API Response:', JSON.stringify(completion, null, 2))

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('Empty response from AI')
    }

    try {
      // 清理内容中的 Markdown 代码块标记
      const cleanContent = content
        .replace(/^```json\n/, '')
        .replace(/\n```$/, '')
        .trim()
      
      console.log('Cleaned content:', cleanContent)
      
      const parsedContent = JSON.parse(cleanContent)

      // 处理图片 URL
      if (parsedContent.imageUrl) {
        parsedContent.imageUrl = processImageUrl(parsedContent.imageUrl)
      }
      if (parsedContent.video?.thumbnail) {
        parsedContent.video.thumbnail = processImageUrl(parsedContent.video.thumbnail)
      }

      console.log('Processed content:', JSON.stringify(parsedContent, null, 2))
      return parsedContent
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      console.error('Raw content:', content)
      throw new Error('Invalid JSON response from AI')
    }
  })
}

// 游戏数据生成
export const generateGameData = async (
  rawData: string,
  customPrompt?: string
) => {
  return generateContent(rawData, 'GAME_IMPORT', customPrompt)
}

// 游戏内容生成
export const createGameContent = async (
  gameInfo: string,
  customPrompt?: string
) => {
  return generateContent(gameInfo, 'GAME_CONTENT', customPrompt)
} 