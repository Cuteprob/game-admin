import { NextRequest, NextResponse } from 'next/server'
import {
  getComment,
  moderateComment,
  deleteComment,
  updateHelpfulVotes
} from '@/repositories/commentRepository'
import { recalculateGameRating } from '@/repositories/ratingRepository'

export const runtime = 'edge'

// 获取单个评论
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id)
    
    if (isNaN(commentId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    const comment = await getComment(commentId)
    
    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: comment
    })
  } catch (error) {
    console.error('Failed to fetch comment:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comment' },
      { status: 500 }
    )
  }
}

// 审核评论
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id)
    
    if (isNaN(commentId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status, action } = body

    // 处理不同的操作
    if (action === 'moderate') {
      if (!['approved', 'rejected', 'spam'].includes(status)) {
        return NextResponse.json(
          { success: false, message: 'Invalid status' },
          { status: 400 }
        )
      }

      const moderatedAt = new Date().toISOString()
      const comment = await moderateComment(commentId, { status, moderatedAt })
      
      if (!comment) {
        return NextResponse.json(
          { success: false, message: 'Comment not found' },
          { status: 404 }
        )
      }

      // 如果评论包含评分，重新计算游戏评分
      if (comment.ratingScore && comment.status === 'approved') {
        await recalculateGameRating(comment.gameId, comment.projectId, comment.locale)
      }

      return NextResponse.json({
        success: true,
        message: `Comment ${status} successfully`,
        data: comment
      })
    } else if (action === 'helpful') {
      const { votes } = body
      
      if (typeof votes !== 'number' || votes < 0) {
        return NextResponse.json(
          { success: false, message: 'Invalid votes count' },
          { status: 400 }
        )
      }

      const comment = await updateHelpfulVotes(commentId, votes)
      
      if (!comment) {
        return NextResponse.json(
          { success: false, message: 'Comment not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Helpful votes updated successfully',
        data: comment
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Failed to update comment:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// 删除评论
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id)
    
    if (isNaN(commentId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    // 获取评论信息用于重新计算评分
    const comment = await getComment(commentId)
    
    const deleted = await deleteComment(commentId)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Comment not found' },
        { status: 404 }
      )
    }

    // 重新计算游戏评分
    if (comment && comment.ratingScore) {
      await recalculateGameRating(comment.gameId, comment.projectId, comment.locale)
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}




