import { NextResponse } from 'next/server';
import { db } from '@/lib/db/tursoDb';
import { gamesBase, gameCategories, categories } from '@/lib/db/schema';
import { desc, eq, sql } from 'drizzle-orm';

export interface GamesResponse {
  data: any[]
  total: number
  message?: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const search = searchParams.get('search') || '';

    // 获取总数
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(gamesBase)
      .where(search ? sql`${gamesBase.title} LIKE ${'%' + search + '%'}` : undefined)

    // 获取游戏列表
    const games = await db.query.gamesBase.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: search ? sql`${gamesBase.title} LIKE ${'%' + search + '%'}` : undefined,
      with: {
        categories: {
          with: {
            category: true
          }
        }
      },
      orderBy: [desc(gamesBase.createdAt)]
    })

    return NextResponse.json<GamesResponse>({
      data: games,
      total: countResult.count,
      message: 'Successfully retrieved games'
    })
  } catch (error) {
    console.error('Failed to fetch games:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
} 