import { NextResponse } from 'next/server'
import { searchGames } from '@/repositories/gameRepository'

export const runtime = 'edge'

export async function GET(
  request: Request,
) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const games = await searchGames(query)
    return NextResponse.json({ data: games })
  } catch (error) {
    console.error('Failed to search games:', error)
    return NextResponse.json(
      { error: 'Failed to search games' },
      { status: 500 }
    )
  }
} 