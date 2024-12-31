import { db } from '@/lib/db/tursoDb'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
  aiConfig: {
    targetAudience: string
    tone: string
    defaultPrompts: {
      title: string
      description: string
      features: string
      faqs: string
    }
  }
  createdAt: string
  updatedAt: string
}

export interface CreateProjectData {
  name: string
  description?: string | null
  defaultLocale: string
  locales: string[]
  aiConfig?: Project['aiConfig']
}

export interface UpdateProjectData {
  name?: string
  description?: string | null
  defaultLocale?: string
  locales?: string[]
  aiConfig?: Project['aiConfig']
}

// 处理数据库记录到Project对象的转换
function mapToProject(record: any): Project {
  return {
    ...record,
    locales: JSON.parse(record.locales),
    aiConfig: JSON.parse(record.aiConfig)
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const record = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  })

  if (!record) {
    return null
  }

  return mapToProject(record)
}

export async function getProjects(): Promise<Project[]> {
  const records = await db.query.projects.findMany()
  return records.map(mapToProject)
}

export async function createProject(data: CreateProjectData): Promise<Project> {
  const now = new Date().toISOString()
  const id = nanoid()

  const record = await db.insert(projects).values({
    id,
    name: data.name,
    description: data.description ?? null,
    defaultLocale: data.defaultLocale,
    locales: JSON.stringify(data.locales),
    aiConfig: JSON.stringify(data.aiConfig || {
      targetAudience: '',
      tone: '',
      defaultPrompts: {
        title: '',
        description: '',
        features: '',
        faqs: ''
      }
    }),
    createdAt: now,
    updatedAt: now
  })
  .returning()

  return mapToProject(record[0])
}

export async function updateProject(id: string, data: UpdateProjectData): Promise<Project> {
  const updateData: any = {
    ...data,
    updatedAt: new Date().toISOString()
  }

  if (data.locales) {
    updateData.locales = JSON.stringify(data.locales)
  }

  if (data.aiConfig) {
    updateData.aiConfig = JSON.stringify(data.aiConfig)
  }

  const record = await db
    .update(projects)
    .set(updateData)
    .where(eq(projects.id, id))
    .returning()

  return mapToProject(record[0])
}

export async function deleteProject(id: string): Promise<void> {
  await db.delete(projects).where(eq(projects.id, id))
}