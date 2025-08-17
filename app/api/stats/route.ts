import { NextResponse } from 'next/server'
import { db } from '@/lib/db/tursoDb'
import { gamesBase, categories, projectGames } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET() {
  try {
    // Project Stats
    const projects = await db
      .select({
        projectId: projectGames.projectId,
        count: sql<number>`count(*)`,
      })
      .from(projectGames)
      .groupBy(projectGames.projectId)

    const projectDetails = await Promise.all(
      projects.map(async (project) => {
        const languages = await db
          .select({ locale: projectGames.locale })
          .from(projectGames)
          .where(sql`project_id = ${project.projectId}`)
          .groupBy(projectGames.locale)

        const publishedCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(projectGames)
          .where(sql`project_id = ${project.projectId} AND is_published = true`)

        const unpublishedCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(projectGames)
          .where(sql`project_id = ${project.projectId} AND is_published = false`)

        return {
          projectId: project.projectId,
          count: project.count,
          languages: languages.map(l => l.locale),
          published: publishedCount[0].count,
          unpublished: unpublishedCount[0].count
        }
      })
    )

    // Base Game Stats
    const totalGames = await db
      .select({ count: sql<number>`count(*)` })
      .from(gamesBase)

    const totalCategories = await db
      .select({ count: sql<number>`count(*)` })
      .from(categories)

    const recentGames = await db
      .select({
        id: gamesBase.id,
        title: gamesBase.title,
        createdAt: gamesBase.createdAt
      })
      .from(gamesBase)
      .orderBy(sql`created_at desc`)
      .limit(5)

    // AI Task Stats (模拟数据，实际需要创建任务表)
    const aiTaskStats = {
      pendingTasks: 2,
      completedTasks: 15,
      failedTasks: 1,
      recentTasks: [
        {
          id: '1',
          projectId: 'project-1',
          status: 'completed',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          projectId: 'project-2',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ]
    }

    return NextResponse.json({
      totalProjects: projects.length,
      projectGamesCount: projectDetails,
      totalGames: totalGames[0].count,
      totalCategories: totalCategories[0].count,
      recentGames,
      ...aiTaskStats
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 