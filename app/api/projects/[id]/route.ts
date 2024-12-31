import { NextResponse } from 'next/server'
import { db } from '@/lib/db/tursoDb'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
export const runtime = 'edge';
// GET /api/projects/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, params.id),
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // 解析JSON字段
    const data = {
      ...project,
      locales: JSON.parse(project.locales),
      aiConfig: JSON.parse(project.aiConfig)
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 验证必需字段
    if (!body.name || !body.defaultLocale || !body.locales) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 准备更新数据
    const updateData = {
      name: body.name,
      description: body.description || null,
      defaultLocale: body.defaultLocale,
      locales: JSON.stringify(body.locales),
      aiConfig: JSON.stringify(body.aiConfig || {
        targetAudience: '',
        tone: '',
        defaultPrompts: {
          title: '',
          description: '',
          features: '',
          faqs: ''
        }
      }),
      updatedAt: new Date().toISOString()
    }

    // 更新项目
    await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, params.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 验证必需字段
    if (!body.name || !body.defaultLocale || !body.locales) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 创建新项目
    const project = await db.insert(projects).values({
      id: nanoid(),
      name: body.name,
      description: body.description || null,
      defaultLocale: body.defaultLocale,
      locales: JSON.stringify(body.locales),
      aiConfig: JSON.stringify(body.aiConfig || {
        targetAudience: '',
        tone: '',
        defaultPrompts: {
          title: '',
          description: '',
          features: '',
          faqs: ''
        }
      }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(projects)
      .where(eq(projects.id, params.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}



