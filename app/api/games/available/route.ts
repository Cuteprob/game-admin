import { NextResponse } from 'next/server'
import { getAvailableGames } from '@/repositories/gameRepository'

export async function GET(
  request: Request,
) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const games = await getAvailableGames(projectId)
    
    // 验证返回的数据
    const validGames = games.filter(game => {
      const isValid = game && game.id && game.title && game.description
      if (!isValid) {
        console.error('Invalid game data:', game)
      }
      return isValid
    })

    return NextResponse.json({ 
      data: validGames,
      total: validGames.length
    })
  } catch (error) {
    console.error('Failed to fetch available games:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch available games',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 