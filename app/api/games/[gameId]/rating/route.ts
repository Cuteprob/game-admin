import { NextRequest, NextResponse } from 'next/server'
import { getGameRating, upsertGameRating } from '@/repositories/ratingRepository'
import type { RatingDistribution } from '@/types/comment'

export const runtime = 'edge'

// 获取游戏评分（前端公开接口）
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
      // 如果没有评分数据，返回默认值
      return NextResponse.json({
        data: {
          averageRating: 0,
          totalRatings: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      })
    }

    // 转换为前端格式
    const distribution: RatingDistribution = {
      1: rating.rating1Count,
      2: rating.rating2Count,
      3: rating.rating3Count,
      4: rating.rating4Count,
      5: rating.rating5Count
    }

    return NextResponse.json({
      data: {
        averageRating: rating.averageRating,
        totalRatings: rating.totalRatings,
        distribution
      }
    })
  } catch (error) {
    console.error('Failed to fetch rating:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rating' },
      { status: 500 }
    )
  }
}

// 提交用户评分（前端公开接口）
export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const body = await request.json()
    const { projectId, locale, rating } = body

    // 验证必需字段
    if (!projectId || !locale || typeof rating !== 'number') {
      return NextResponse.json(
        { error: 'Project ID, locale, and rating are required' },
        { status: 400 }
      )
    }

    // 验证评分范围
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      )
    }

    // 获取当前评分数据
    const currentRating = await getGameRating(params.gameId, projectId, locale)
    
    let newDistribution: RatingDistribution
    let newTotalRatings: number
    
    if (currentRating) {
      // 更新现有评分
      newDistribution = {
        1: currentRating.rating1Count,
        2: currentRating.rating2Count,
        3: currentRating.rating3Count,
        4: currentRating.rating4Count,
        5: currentRating.rating5Count
      }
      newDistribution[rating as keyof RatingDistribution]++
      newTotalRatings = currentRating.totalRatings + 1
    } else {
      // 创建新评分
      newDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      newDistribution[rating as keyof RatingDistribution] = 1
      newTotalRatings = 1
    }

    // 计算新的平均评分
    const weightedSum = Object.entries(newDistribution)
      .reduce((sum, [star, count]) => sum + (parseInt(star) * count), 0)
    const newAverageRating = Math.round((weightedSum / newTotalRatings) * 10) / 10

    // 更新数据库
    const updatedRating = await upsertGameRating({
      gameId: params.gameId,
      projectId,
      locale,
      averageRating: newAverageRating,
      totalRatings: newTotalRatings,
      ratingDistribution: newDistribution
    })

    return NextResponse.json({
      data: {
        averageRating: updatedRating.averageRating,
        totalRatings: updatedRating.totalRatings,
        distribution: newDistribution
      }
    })
  } catch (error) {
    console.error('Failed to submit rating:', error)
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    )
  }
}
