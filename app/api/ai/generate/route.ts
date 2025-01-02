import { NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai/service'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const { rawData, customPrompt, taskType } = await request.json()
    
    // Use AI service to generate game data
    const data = await generateContent(rawData, taskType, customPrompt)

    return NextResponse.json({
      data,
      message: 'Successfully generated game data'
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate game data' },
      { status: 500 }
    )
  }
} 