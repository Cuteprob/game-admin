import { NextRequest, NextResponse } from 'next/server'
import { getCommentStats } from '@/repositories/commentRepository'
import { getAllRatingsStats } from '@/repositories/ratingRepository'

export const runtime = 'edge'

// 获取评论和评分统计信息
export async function GET(request: NextRequest) {
  try {
    // 获取评论统计
    const commentStats = await getCommentStats()
    
    // 获取评分统计
    const ratingStats = await getAllRatingsStats()

    return NextResponse.json({
      success: true,
      data: {
        comments: commentStats,
        ratings: ratingStats
      }
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}




