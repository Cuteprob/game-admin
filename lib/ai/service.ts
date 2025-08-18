import { OpenAI } from 'openai'
import { DEFAULT_PROMPTS, PromptOptimizer, VERIFIED_MODEL_LIST } from './config'

// 创建 OpenAI 客户端的函数
const createOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  const baseURL = process.env.OPENAI_API_BASE_URL
  const model = process.env.OPENAI_API_MODEL || "openai/gpt-4.1-nano"
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }
  
  console.log('Creating OpenAI client with config:', {
    baseURL,
    model,
    hasApiKey: !!apiKey
  })
  
  return new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
      'HTTP-Referer': 'https://game-admin.com',
      'X-Title': 'Game Admin'
    },
    defaultQuery: {
      model
    }
  })
}

// 使用验证过的4个模型作为备用列表
const FALLBACK_MODELS = VERIFIED_MODEL_LIST

// 获取可用的模型 - 优化 Edge Runtime 兼容性
async function getAvailableModel(openai: OpenAI, preferredModel: string): Promise<string> {
  console.log(`Testing preferred model: ${preferredModel}`)
  
  // 在生产环境中，跳过模型测试直接使用首选模型
  // 因为 Edge Runtime 中的测试请求可能会失败，但实际使用时可能正常
  if (process.env.NODE_ENV === 'production') {
    console.log(`🚀 Production mode: Using preferred model ${preferredModel} without testing`)
    return preferredModel
  }
  
  // 首先测试首选模型
  try {
    const testResponse = await openai.chat.completions.create({
      model: preferredModel,
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5,
      temperature: 0
    })
    
    if (testResponse.choices[0]?.message?.content) {
      console.log(`✅ Preferred model ${preferredModel} is working`)
      return preferredModel
    }
  } catch (error) {
    console.log(`❌ Preferred model ${preferredModel} failed:`, error instanceof Error ? error.message : 'Unknown error')
  }
  
  // 获取环境变量配置的备用模型
  const envFallbacks = [
    process.env.OPENAI_API_FALLBACK_MODEL_1,
    process.env.OPENAI_API_FALLBACK_MODEL_2,
    process.env.OPENAI_API_FALLBACK_MODEL_3
  ].filter(Boolean) as string[]
  
  // 合并环境变量备用模型和默认备用模型
  const allFallbacks = [
    ...envFallbacks,
    ...FALLBACK_MODELS.filter(m => 
      m !== preferredModel && 
      !envFallbacks.includes(m)
    )
  ]
  
  console.log('Fallback models:', { envFallbacks, totalFallbacks: allFallbacks.length })
  
  // 在开发环境中测试备用模型
  for (const fallbackModel of allFallbacks) {
    if (fallbackModel === preferredModel) continue // 跳过已测试的首选模型
    
    try {
      console.log(`Testing fallback model: ${fallbackModel}`)
      const testResponse = await openai.chat.completions.create({
        model: fallbackModel,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 5,
        temperature: 0
      })
      
      if (testResponse.choices[0]?.message?.content) {
        console.log(`✅ Fallback model ${fallbackModel} is working`)
        return fallbackModel
      }
    } catch (error) {
      console.log(`❌ Fallback model ${fallbackModel} failed:`, error instanceof Error ? error.message : 'Unknown error')
    }
  }
  
  // 如果所有测试都失败，但我们在生产环境中，使用首选模型作为最后尝试
  if (process.env.NODE_ENV === 'production') {
    console.log(`⚠️ All model tests failed, but using preferred model ${preferredModel} in production`)
    return preferredModel
  }
  
  throw new Error('No available models found. Please check your API configuration and model availability.')
}

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

// 验证URL是否被修改
const validateUrlPreservation = (originalUrl: string, processedUrl: string): string => {
  if (!originalUrl || !processedUrl) return processedUrl
  
  // 如果原始URL包含连字符，但处理后变成了下划线，恢复原始格式
  if (originalUrl.includes('-') && processedUrl.includes('_')) {
    console.warn('URL format was modified, restoring original format')
    return originalUrl
  }
  
  return processedUrl
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

// 清理和解析 AI 响应
const parseAIResponse = (content: string): any => {
  if (!content) {
    throw new Error('Empty response from AI')
  }

  console.log('Raw AI response:', content)

  try {
    // 首先尝试直接解析 JSON
    return JSON.parse(content)
  } catch (error) {
    console.log('Direct JSON parsing failed, trying to clean content...')
    
    // 清理内容中的 Markdown 代码块标记
    let cleanContent = content
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
    
    console.log('Cleaned content:', cleanContent)
    
    try {
      return JSON.parse(cleanContent)
    } catch (secondError) {
      console.error('Failed to parse cleaned content:', secondError)
      console.error('Content that failed to parse:', cleanContent)
      
      // 尝试提取 JSON 部分
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0])
        } catch (thirdError) {
          console.error('Failed to parse extracted JSON:', thirdError)
        }
      }
      
      throw new Error(`Invalid JSON response from AI. Raw content: ${content.substring(0, 200)}...`)
    }
  }
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
    console.log('Task type:', taskType)

    try {
      const openai = createOpenAIClient()
      
      // 获取可用的模型
      const availableModel = await getAvailableModel(openai, process.env.OPENAI_API_MODEL || "openai/gpt-4.1-nano")
      console.log('Using model:', availableModel)
      
      // 使用提示词优化器
      const optimizedPrompt = PromptOptimizer.optimizePrompt(taskType, { model: availableModel })
      const modelConfig = PromptOptimizer.getModelConfig(availableModel)
      
      const completion = await openai.chat.completions.create({
        model: availableModel,
        messages: [
          { role: "system", content: optimizedPrompt },
          { role: "user", content: input }
        ],
        response_format: { type: "json_object" },
        temperature: modelConfig.temperature,
        max_tokens: modelConfig.maxTokens,
        top_p: modelConfig.topP,
        frequency_penalty: modelConfig.frequencyPenalty
      })

      console.log('OpenAI API Response received')
      console.log('Response usage:', completion.usage)
      console.log('Response choices:', completion.choices.length)
      console.log('First choice:', completion.choices[0])
      console.log('Message:', completion.choices[0]?.message)

      const content = completion.choices[0]?.message?.content
      console.log('Content:', content)
      console.log('Content length:', content?.length || 0)
      console.log('Finish reason:', completion.choices[0]?.finish_reason)
      
      if (!content) {
        console.error('Empty response details:', {
          choices: completion.choices.length,
          firstChoice: completion.choices[0],
          message: completion.choices[0]?.message,
          usage: completion.usage
        })
        throw new Error('Empty response from AI service - model may be unavailable or overloaded')
      }

      const parsedContent = parseAIResponse(content)

      // 处理图片 URL 并验证格式
      if (parsedContent.imageUrl) {
        const processedUrl = processImageUrl(parsedContent.imageUrl)
        // 尝试从输入中提取原始imageUrl进行验证
        try {
          const inputData = JSON.parse(input)
          if (inputData.imageUrl) {
            parsedContent.imageUrl = validateUrlPreservation(inputData.imageUrl, processedUrl)
          } else {
            parsedContent.imageUrl = processedUrl
          }
        } catch {
          parsedContent.imageUrl = processedUrl
        }
      }
      // video字段已被移除

      console.log('Successfully processed content')
      return parsedContent
    } catch (error) {
      console.error('Error in generateContent:', error)
      
      // 提供更详细的错误信息
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          throw new Error('AI service rate limit exceeded. Please try again in a few minutes.')
        } else if (error.message.includes('quota')) {
          throw new Error('AI service quota exceeded. Please check your API limits.')
        } else if (error.message.includes('timeout')) {
          throw new Error('AI service request timed out. Please try again.')
        } else if (error.message.includes('No available models found')) {
          throw new Error('AI service temporarily unavailable. Please try again in a moment.')
        } else if (error.message.includes('Invalid request')) {
          throw new Error('Invalid AI request. Please check your input data.')
        } else if (error.message.includes('Unauthorized')) {
          throw new Error('AI service authentication failed. Please check API configuration.')
        }
      }
      
      throw error
    }
  })
}

// 游戏数据生成
export const generateGameData = async (
  rawData: string,
  customPrompt?: string
) => {
  // 添加额外的URL保护提示
  const enhancedPrompt = customPrompt || DEFAULT_PROMPTS['GAME_IMPORT']
  const finalPrompt = enhancedPrompt + `

⚠️ **FINAL REMINDER** ⚠️
The imageUrl and iframeUrl in your response MUST be copied EXACTLY from the input data.
Do not change any characters, especially hyphens (-) to underscores (_).
If input has "bunny-farm", output must have "bunny-farm", not "bunny_farm".`

  return generateContent(rawData, 'GAME_IMPORT', finalPrompt)
}

// 游戏内容生成
export const createGameContent = async (
  gameInfo: string,
  customPrompt?: string
) => {
  return generateContent(gameInfo, 'GAME_CONTENT', customPrompt)
} 