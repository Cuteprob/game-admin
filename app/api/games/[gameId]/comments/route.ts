import { NextRequest, NextResponse } from 'next/server'
import { createComment } from '@/repositories/commentRepository'
import { syncCommentRatingToGameRatings } from '@/repositories/ratingRepository'
import type { CreateCommentData } from '@/types/comment'

export const runtime = 'edge'

// 创建评论（前端公开接口）
export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const body = await request.json()
    const { content, nickname, email, projectId, locale, ratingScore }: Omit<CreateCommentData, 'gameId'> & { ratingScore?: number } = body

    // 验证必需字段
    if (!content || !nickname || !projectId || !locale) {
      return NextResponse.json(
        { error: 'Content, nickname, project ID, and locale are required' },
        { status: 400 }
      )
    }

    // 验证评分范围（如果提供）
    if (ratingScore !== undefined) {
      if (typeof ratingScore !== 'number' || ratingScore < 1 || ratingScore > 5 || !Number.isInteger(ratingScore)) {
        return NextResponse.json(
          { error: 'Rating must be an integer between 1 and 5' },
          { status: 400 }
        )
      }
    }

    // 创建评论数据
    const commentData: CreateCommentData = {
      content: content.trim(),
      nickname: nickname.trim(),
      email: email?.trim() || undefined,
      gameId: params.gameId,
      projectId,
      locale,
      ratingScore
    }

    // 创建评论
    const comment = await createComment(commentData)

    // 如果评论包含评分且评论状态为已批准，同步到评分表
    // 注意：默认情况下评论是 pending 状态，需要管理员审核后才会同步评分
    if (comment.ratingScore && comment.status === 'approved') {
      await syncCommentRatingToGameRatings(comment.gameId, comment.projectId, comment.locale)
    }

    return NextResponse.json({
      data: {
        id: comment.id,
        content: comment.content,
        nickname: comment.nickname,
        createdAt: comment.createdAt,
        status: comment.status,
        ratingScore: comment.ratingScore
      }
    })
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
