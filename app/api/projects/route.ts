import { NextResponse } from 'next/server'
import { createProject, getProjects } from '@/repositories/projectRepository'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await createProject(data)
    return NextResponse.json({ data: result })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ data: projects })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}