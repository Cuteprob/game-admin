import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    console.log('AI test endpoint called')
    
    // 检查环境变量
    const apiKey = process.env.OPENAI_API_KEY
    const baseURL = process.env.OPENAI_API_BASE_URL
    const model = process.env.OPENAI_API_MODEL
    const nodeEnv = process.env.NODE_ENV
    
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      baseURL,
      model,
      nodeEnv,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'NOT_SET'
    })
    
    return NextResponse.json({
      status: 'ok',
      environment: {
        hasApiKey: !!apiKey,
        baseURL,
        model,
        nodeEnv,
        runtime: 'edge'
      },
      message: 'AI service configuration check completed'
    })
  } catch (error) {
    console.error('AI test error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error'
      },
      { status: 500 }
    )
  }
}
