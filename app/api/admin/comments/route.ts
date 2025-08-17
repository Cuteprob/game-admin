import { NextRequest, NextResponse } from 'next/server'
import {
  getComments,
  getCommentStats,
  batchModerateComments
} from '@/repositories/commentRepository'
import type { CommentListParams } from '@/types/comment'

export const runtime = 'edge'

// 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const params: CommentListParams = {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10'),
      status: searchParams.get('status') as any || undefined,
      gameId: searchParams.get('gameId') || undefined,
      projectId: searchParams.get('projectId') || undefined,
      locale: searchParams.get('locale') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') as any || 'createdAt',
      sortOrder: searchParams.get('sortOrder') as any || 'desc'
    }

    const { data, total } = await getComments(params)
    const totalPages = Math.ceil(total / params.pageSize!)

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page: params.page,
        pageSize: params.pageSize,
        total,
        totalPages
      }
    })
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// 批量审核评论
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { ids, status } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid comment IDs' },
        { status: 400 }
      )
    }

    if (!['approved', 'rejected', 'spam'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      )
    }

    const moderatedAt = new Date().toISOString()
    const updatedCount = await batchModerateComments(ids, status, moderatedAt)

    return NextResponse.json({
      success: true,
      message: `Successfully moderated ${updatedCount} comments`,
      data: { updatedCount }
    })
  } catch (error) {
    console.error('Failed to batch moderate comments:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to moderate comments' },
      { status: 500 }
    )
  }
}




