import { NextRequest, NextResponse } from 'next/server'
import {
  upsertGameRating,
  getProjectGameRatings,
  getTopRatedGames
} from '@/repositories/ratingRepository'
import type { UpsertRatingData } from '@/types/comment'

export const runtime = 'edge'

// 获取评分列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const projectId = searchParams.get('projectId')
    const locale = searchParams.get('locale') || undefined
    const type = searchParams.get('type') || 'project' // 'project' | 'top'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (type === 'top') {
      // 获取热门游戏
      const topRated = await getTopRatedGames(projectId || undefined, locale, limit)
      
      return NextResponse.json({ data: topRated })
    } else {
      // 获取项目游戏评分
      if (!projectId) {
        return NextResponse.json(
          { error: 'Project ID is required' },
          { status: 400 }
        )
      }

      const ratings = await getProjectGameRatings(projectId, locale)
      
      return NextResponse.json({ data: ratings })
    }
  } catch (error) {
    console.error('Failed to fetch ratings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}

// 创建或更新游戏评分
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gameId, projectId, locale, averageRating, totalRatings, ratingDistribution }: UpsertRatingData = body

    // 验证必需字段
    if (!gameId || !projectId || !locale) {
      return NextResponse.json(
        { error: 'Game ID, Project ID, and locale are required' },
        { status: 400 }
      )
    }

    // 验证评分范围
    if (averageRating < 0 || averageRating > 5) {
      return NextResponse.json(
        { error: 'Average rating must be between 0 and 5' },
        { status: 400 }
      )
    }

    // 验证评分分布
    if (!ratingDistribution || typeof ratingDistribution !== 'object') {
      return NextResponse.json(
        { error: 'Invalid rating distribution' },
        { status: 400 }
      )
    }

    const rating = await upsertGameRating({
      gameId,
      projectId,
      locale,
      averageRating,
      totalRatings: totalRatings || 0,
      ratingDistribution
    })

    return NextResponse.json({ data: rating })
  } catch (error) {
    console.error('Failed to update rating:', error)
    return NextResponse.json(
      { error: 'Failed to update rating' },
      { status: 500 }
    )
  }
}




