import { db } from '@/lib/db/tursoDb'
import { gameComments, gameRatings, gamesBase, projects } from '@/lib/db/schema'
import { eq, and, desc, asc, like, count, sql } from 'drizzle-orm'
import type { 
  GameComment, 
  CommentWithGame, 
  CommentListParams, 
  CommentStats,
  ModerateCommentData,
  CommentStatus,
  CreateCommentData
} from '@/types/comment'

// 创建评论
export async function createComment(data: CreateCommentData): Promise<GameComment> {
  const [comment] = await db.insert(gameComments).values(data).returning()
  return comment as GameComment
}

// 获取评论列表（支持分页和筛选）
export async function getComments(params: CommentListParams = {}): Promise<{
  data: CommentWithGame[]
  total: number
}> {
  const {
    page = 1,
    pageSize = 10
  } = params

  // 简化版本 - 获取所有评论
  const comments = await db.query.gameComments.findMany({
    with: {
      game: true,
      project: true
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
    orderBy: desc(gameComments.createdAt)
  })

  // 获取总数
  const total = await db.select({ count: count() }).from(gameComments)
  
  return {
    data: comments.map(comment => ({
      ...comment,
      game: {
        id: comment.game?.id || '',
        title: comment.game?.title || '',
        imageUrl: comment.game?.imageUrl || ''
      },
      project: {
        id: comment.project?.id || '',
        name: comment.project?.name || ''
      }
    })) as CommentWithGame[],
    total: total[0]?.count || 0
  }
}

// 获取单个评论
export async function getComment(id: number): Promise<CommentWithGame | null> {
  const comment = await db.query.gameComments.findFirst({
    where: eq(gameComments.id, id),
    with: {
      game: true,
      project: true
    }
  })

  if (!comment) return null

  return {
    ...comment,
    game: {
      id: comment.game?.id || '',
      title: comment.game?.title || '',
      imageUrl: comment.game?.imageUrl || ''
    },
    project: {
      id: comment.project?.id || '',
      name: comment.project?.name || ''
    }
  } as CommentWithGame
}

// 审核评论
export async function moderateComment(
  id: number,
  data: ModerateCommentData
): Promise<GameComment | null> {
  const [comment] = await db
    .update(gameComments)
    .set({
      status: data.status,
      moderatedAt: data.moderatedAt,
      updatedAt: sql`CURRENT_TIMESTAMP`
    })
    .where(eq(gameComments.id, id))
    .returning()

  return comment ? (comment as GameComment) : null
}

// 更新评论有用投票数
export async function updateHelpfulVotes(
  id: number,
  votes: number
): Promise<GameComment | null> {
  const [comment] = await db
    .update(gameComments)
    .set({
      helpfulVotes: votes,
      updatedAt: sql`CURRENT_TIMESTAMP`
    })
    .where(eq(gameComments.id, id))
    .returning()

  return comment ? (comment as GameComment) : null
}

// 删除评论
export async function deleteComment(id: number): Promise<boolean> {
  try {
    await db
      .delete(gameComments)
      .where(eq(gameComments.id, id))
    return true
  } catch {
    return false
  }
}

// 获取评论统计信息
export async function getCommentStats(): Promise<CommentStats> {
  const stats = await db
    .select({
      status: gameComments.status,
      count: count()
    })
    .from(gameComments)
    .groupBy(gameComments.status)

  const result: CommentStats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    spam: 0
  }

  stats.forEach(({ status, count }) => {
    result.total += count
    result[status as CommentStatus] = count
  })

  return result
}

// 批量审核评论
export async function batchModerateComments(
  ids: number[],
  status: CommentStatus,
  moderatedAt: string
): Promise<number> {
  if (ids.length === 0) return 0

  try {
    await db
      .update(gameComments)
      .set({
        status,
        moderatedAt,
        updatedAt: sql`CURRENT_TIMESTAMP`
      })
      .where(sql`${gameComments.id} IN (${ids.join(',')})`)

    return ids.length // 假设都更新成功
  } catch {
    return 0
  }
}

// 获取游戏的评论数量
export async function getGameCommentCount(
  gameId: string,
  projectId?: string,
  status?: CommentStatus
): Promise<number> {
  const conditions = [eq(gameComments.gameId, gameId)]

  if (projectId) {
    conditions.push(eq(gameComments.projectId, projectId))
  }

  if (status) {
    conditions.push(eq(gameComments.status, status))
  }

  const query = db
    .select({ count: count() })
    .from(gameComments)
    .where(and(...conditions))

  const [{ count: total }] = await query
  return total
}
