import { NextResponse } from 'next/server';
import { gamesBaseRepository } from '@/repositories/gamesBaseRepository';
import { db } from '@/lib/db/tursoDb';
import { projectGames } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge'

import { RouteParams } from '@/types/common'

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const game = await gamesBaseRepository.getGameById(params.id);
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: game });
  } catch (error) {
    console.error('Failed to fetch game:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    
    // 检查游戏是否存在
    const exists = await gamesBaseRepository.gameExists(params.id);
    if (!exists) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    const game = await gamesBaseRepository.updateGame(params.id, body);
    
    return NextResponse.json({ data: game });
  } catch (error) {
    console.error('Failed to update game:', error);
    return NextResponse.json(
      { error: 'Failed to update game' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // 检查游戏是否存在
    const exists = await gamesBaseRepository.gameExists(params.id);
    if (!exists) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // 1. 首先删除所有相关的项目游戏记录
    await db.delete(projectGames)
      .where(eq(projectGames.gameId, params.id));

    // 2. 删除游戏基础数据（这会通过外键级联自动删除 game_categories 表中的关联）
    await gamesBaseRepository.deleteGame(params.id);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete game:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete game and its associations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 