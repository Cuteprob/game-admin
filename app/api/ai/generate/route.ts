import { NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai/service'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    console.log('AI generate API called')
    
    const { rawData, customPrompt, taskType } = await request.json()
    
    console.log('Request parameters:', { 
      hasRawData: !!rawData, 
      hasCustomPrompt: !!customPrompt, 
      taskType 
    })
    
    if (!rawData) {
      return NextResponse.json(
        { error: 'Raw data is required' },
        { status: 400 }
      )
    }
    
    if (!taskType) {
      return NextResponse.json(
        { error: 'Task type is required' },
        { status: 400 }
      )
    }
    
    // Use AI service to generate game data
    console.log('Calling generateContent...')
    const data = await generateContent(rawData, taskType, customPrompt)
    console.log('generateContent completed successfully')

    return NextResponse.json({
      data,
      message: 'Successfully generated game data'
    })
  } catch (error) {
    console.error('AI generation error:', error)
    
    // 提供更详细的错误信息
    let errorMessage = 'Failed to generate game data'
    let statusCode = 500
    
    if (error instanceof Error) {
      errorMessage = error.message
      
      // 根据错误类型设置状态码
      if (error.message.includes('rate limit') || error.message.includes('quota')) {
        statusCode = 429 // Too Many Requests
      } else if (error.message.includes('timeout') || error.message.includes('connect')) {
        statusCode = 408 // Request Timeout
      } else if (error.message.includes('Invalid task type')) {
        statusCode = 400 // Bad Request
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
} 