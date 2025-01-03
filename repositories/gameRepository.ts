import { db } from '@/lib/db/tursoDb'
import { gamesBase, projectGames } from '@/lib/db/schema'
import { eq, notInArray, sql } from 'drizzle-orm'

export interface Game {
  id: string
  title: string
  description: string
  imageUrl: string
  iframeUrl: string
  metadata: any
  controls: any
  features: any
  faqs: any
  rating: number
  createdAt: string
  updatedAt: string
}

// 安全的JSON解析函数
function safeJsonParse(str: string, fallback: any = {}, fieldName: string = '') {
  if (!str) return fallback
  
  try {
    // 如果输入已经是对象，直接返回
    if (typeof str === 'object') {
      return str
    }

    // 尝试解析JSON字符串
    return JSON.parse(str)
  } catch (firstError) {
    try {
      // 如果JSON解析失败，尝试作为JavaScript对象计算
      // 注意：这是一个不安全的操作，仅用于开发环境
      // eslint-disable-next-line no-eval
      const result = eval('(' + str + ')')
      console.warn(`Using eval for ${fieldName}. Please fix the data format.`)
      return result
    } catch (error) {
      console.error(`Parse error for field ${fieldName}:`, error)
      console.error('Original value:', str)
      return fallback
    }
  }
}

// 处理数据库记录到Game对象的转换
function mapToGame(record: any): Game {
  if (!record) {
    console.error('Received null or undefined record')
    throw new Error('Invalid game record')
  }

  // 确保所有必需字段都存在
  const requiredFields = ['id', 'title', 'description', 'imageUrl', 'iframeUrl']
  for (const field of requiredFields) {
    if (!record[field]) {
      console.error(`Missing required field: ${field}`, record)
      throw new Error(`Missing required field: ${field}`)
    }
  }

  try {
    const game = {
      id: record.id,
      title: record.title,
      description: record.description,
      imageUrl: record.imageUrl,
      iframeUrl: record.iframeUrl,
      rating: record.rating || 0,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      metadata: safeJsonParse(record.metadata, {}, 'metadata'),
      controls: safeJsonParse(record.controls, {}, 'controls'),
      features: safeJsonParse(record.features, {}, 'features'),
      faqs: safeJsonParse(record.faqs, [], 'faqs'),
    }

    // 开发环境下，输出警告如果发现非JSON格式的数据
    if (process.env.NODE_ENV === 'development') {
      ['metadata', 'controls', 'features', 'faqs'].forEach(field => {
        if (typeof record[field] === 'string' && !record[field].startsWith('{') && !record[field].startsWith('[')) {
          console.warn(`Field ${field} is not in proper JSON format. Please update the database.`)
        }
      })
    }

    return game
  } catch (error) {
    console.error('Failed to map game record:', error)
    console.error('Record:', record)
    throw error
  }
}

// 获取可用的游戏列表（排除已添加到项目的游戏）
export async function getAvailableGames(projectId: string): Promise<Game[]> {
  // 获取项目已添加的游戏ID列表
  const addedGames = await db
    .select({ gameId: projectGames.gameId })
    .from(projectGames)
    .where(eq(projectGames.projectId, projectId))

  const addedGameIds = addedGames.map(g => g.gameId)

  // 查询未添加的游戏
  const records = await db
    .select()
    .from(gamesBase)
    .where(
      addedGameIds.length > 0 
        ? notInArray(gamesBase.id, addedGameIds)
        : sql`1=1`
    )
    .orderBy(gamesBase.createdAt)

  return records.map(mapToGame)
}

// 获取单个游戏详情
export async function getGame(id: string): Promise<Game | null> {
  const record = await db.query.gamesBase.findFirst({
    where: eq(gamesBase.id, id),
  })

  if (!record) {
    return null
  }

  return mapToGame(record)
}

// 搜索游戏
export async function searchGames(query: string): Promise<Game[]> {
  const records = await db
    .select()
    .from(gamesBase)
    .where(sql`${gamesBase.title} LIKE '%' || ${query} || '%'`)
    .orderBy(gamesBase.createdAt)

  return records.map(mapToGame)
} 