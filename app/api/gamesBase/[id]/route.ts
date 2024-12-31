import { NextResponse } from 'next/server';
import { gamesBaseRepository } from '@/repositories/gamesBaseRepository';

interface RouteParams {
  params: { id: string }
}

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

    await gamesBaseRepository.deleteGame(params.id);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete game:', error);
    return NextResponse.json(
      { error: 'Failed to delete game' },
      { status: 500 }
    );
  }
} 