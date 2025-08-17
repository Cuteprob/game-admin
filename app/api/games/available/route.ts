import { NextResponse } from 'next/server'
import { getAvailableGames } from '@/repositories/gameRepository'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const games = await getAvailableGames(projectId);
    
    // 过滤掉无效的游戏
    const validGames = games.filter(game => {
      const isValid = game && game.id && game.title
      if (!isValid) {
        console.warn('Invalid game found:', game);
      }
      return isValid;
    });

    return NextResponse.json(validGames);
  } catch (error) {
    console.error('Failed to fetch available games:', error);
    return NextResponse.json({ error: 'Failed to fetch available games' }, { status: 500 });
  }
} 