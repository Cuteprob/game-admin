import { NextResponse } from "next/server"
import { OpenAI } from "openai"
export const runtime = 'edge';
// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
  defaultHeaders: {
    'HTTP-Referer': 'https://admin.shadybears.org',
    'X-Title': 'Game Admin'
  },
  defaultQuery: {
    // OpenRouter 需要在查询参数中指定模型
    model: process.env.OPENAI_API_MODEL || "meta-llama/llama-3.3-70b-instruct"
  }
})

interface GenerateRequest {
  gameId: string
  mode: 'ai'
  locale: string
  originalContent: {
    description: string
    metadata: any
    features: any
    faqs: any
  }
  aiConfig?: {
    tone?: string
    targetAudience?: string
    prompts?: {
      title: string
      description: string
      features: string
      faqs: string
    }
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json() as GenerateRequest

    // 构建 prompt
    const prompt = `
You are a game content writer. Your task is to generate localized content for a game in ${body.locale} language.
The content should maintain the game's core information while adapting to the target audience and tone.

Target Audience: ${body.aiConfig?.targetAudience || 'general'}
Tone: ${body.aiConfig?.tone || 'professional'}

Original Content:
Description: ${body.originalContent.description}
Metadata: ${JSON.stringify(body.originalContent.metadata)}
Features: ${JSON.stringify(body.originalContent.features)}
FAQs: ${JSON.stringify(body.originalContent.faqs)}

Please generate the following content in ${body.locale} language following these guidelines:

For Metadata:
Generate metadata that follows these rules:
   - Title should be around 30 characters and include SEO keywords
   - Description should be around 130 characters and include SEO keywords
   - Use game title as the only keyword
For Description:
${body.aiConfig?.prompts?.description || ''}

For Features:
${body.aiConfig?.prompts?.features || ''}

For FAQs:
${body.aiConfig?.prompts?.faqs || ''}

Important:
- Maintain similarity with original content below 80% to avoid duplication while preserving core meanings.
- Adapt the tone and style to the target audience
- Ensure cultural appropriateness for the target language
- Maintain professional quality in translations
- Return response in valid JSON format
- Optimize keywords for SEO
- Keep the content concise and engaging, and avoid using too many technical terms


The response should be in JSON format with the following structure:
{
  "description": "...",
  "metadata": { "title": "...", "description": "...", "keywords": [...] },
  "features": [...],
  "faqs": [{ "question": "...", "answer": "..." }]
}
`

    console.log('Sending request to OpenAI API...')
    console.log('Model:', process.env.OPENAI_API_MODEL)
    console.log('Base URL:', process.env.OPENAI_API_BASE_URL)

    // 最大重试次数
    const maxRetries = 3
    let lastError: any = null

    // 重试逻辑
    for (let i = 0; i < maxRetries; i++) {
      try {
        // 调用 OpenAI API
        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_API_MODEL || "meta-llama/llama-3.3-70b-instruct",
          messages: [
            {
              role: "system",
              content: `You are a professional game content writer skilled in localization and cultural adaptation.
Your task is to generate game content in JSON format with the following structure:
{
  "description": "Game description in target language",
  "metadata": {
    "title": "Game title in target language",
    "description": "Short description in target language",
    "keywords": ["keyword1", "keyword2", ...]
  },
  "features": ["feature1", "feature2", ...],
  "faqs": [
    {
      "question": "Question in target language",
      "answer": "Answer in target language"
    },
    ...
  ]
}`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7
        })

        console.log('OpenAI API Response:', JSON.stringify(completion, null, 2))

        // 检查响应
        if (!completion.choices || completion.choices.length === 0) {
          throw new Error('No response from AI')
        }

        const message = completion.choices[0].message
        if (!message || !message.content) {
          throw new Error('Empty response from AI')
        }

        // 解析生成的内容
        try {
          // 清理内容中的 Markdown 代码块标记
          const cleanContent = message.content
            .replace(/^```json\n/, '') // 移除开头的 ```json
            .replace(/\n```$/, '')     // 移除结尾的 ```
            .trim()                    // 移除多余的空白字符
          
          console.log('Cleaned content:', cleanContent)
          
          const generatedContent = JSON.parse(cleanContent)
          console.log('Generated content:', JSON.stringify(generatedContent, null, 2))
          return NextResponse.json({ data: generatedContent })
        } catch (error) {
          console.error('Failed to parse generated content:', error)
          console.error('Raw content:', message.content)
          throw new Error('Invalid JSON response from AI')
        }
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error)
        lastError = error
        
        // 如果不是最后一次尝试，等待后重试
        if (i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000 // 指数退避
          console.log(`Retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    // 所有重试都失败
    console.error('All attempts failed:', lastError)
    return NextResponse.json(
      { 
        error: 'Failed to generate game content',
        details: lastError instanceof Error ? lastError.message : 'Unknown error'
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Failed to generate game content:', error)
    return NextResponse.json(
      { error: 'Failed to generate game content' },
      { status: 500 }
    )
  }
} 