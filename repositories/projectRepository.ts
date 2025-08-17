import { db } from '@/lib/db/tursoDb'
import { projects, projectGames, projectCategories, projectGameCategories } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project'

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

  const record = await db.insert(projects).values({
    id: data.id,
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
  // 使用事务确保数据一致性
  await db.transaction(async (tx) => {
    // 1. 获取项目所有的游戏ID
    const projectGameIds = await tx
      .select({ id: projectGames.id })
      .from(projectGames)
      .where(eq(projectGames.projectId, id))

    // 2. 删除项目游戏的分类关联
    if (projectGameIds.length > 0) {
      const gameIds = projectGameIds.map(g => g.id)
      await tx
        .delete(projectGameCategories)
        .where(inArray(projectGameCategories.projectGameId, gameIds))
    }

    // 3. 删除项目的游戏
    await tx
      .delete(projectGames)
      .where(eq(projectGames.projectId, id))

    // 4. 删除项目的分类
    await tx
      .delete(projectCategories)
      .where(eq(projectCategories.projectId, id))

    // 5. 最后删除项目本身
    await tx
      .delete(projects)
      .where(eq(projects.id, id))
  })
}