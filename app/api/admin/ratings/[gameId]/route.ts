import { NextRequest, NextResponse } from 'next/server'
import {
  getGameRating,
  deleteGameRating,
  recalculateGameRating
} from '@/repositories/ratingRepository'

export const runtime = 'edge'

// 获取单个游戏评分
export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const locale = searchParams.get('locale')

    if (!projectId || !locale) {
      return NextResponse.json(
        { error: 'Project ID and locale are required' },
        { status: 400 }
      )
    }

    const rating = await getGameRating(params.gameId, projectId, locale)
    
    if (!rating) {
      return NextResponse.json(
        { error: 'Rating not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: rating })
  } catch (error) {
    console.error('Failed to fetch rating:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rating' },
      { status: 500 }
    )
  }
}

// 删除游戏评分
export async function DELETE(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const locale = searchParams.get('locale')

    if (!projectId || !locale) {
      return NextResponse.json(
        { error: 'Project ID and locale are required' },
        { status: 400 }
      )
    }

    const deleted = await deleteGameRating(params.gameId, projectId, locale)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Rating not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete rating:', error)
    return NextResponse.json(
      { error: 'Failed to delete rating' },
      { status: 500 }
    )
  }
}

// 重新计算游戏评分
export async function PUT(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const body = await request.json()
    const { projectId, locale, action } = body

    if (!projectId || !locale) {
      return NextResponse.json(
        { error: 'Project ID and locale are required' },
        { status: 400 }
      )
    }

    if (action === 'recalculate') {
      // 基于评论重新计算评分
      const rating = await recalculateGameRating(params.gameId, projectId, locale)
      
      return NextResponse.json({ data: rating })
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Failed to update rating:', error)
    return NextResponse.json(
      { error: 'Failed to update rating' },
      { status: 500 }
    )
  }
}




