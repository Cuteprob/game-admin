import { db } from '@/lib/db/tursoDb'
import { gamesBase, projectGames } from '@/lib/db/schema'
import { eq, notInArray, sql } from 'drizzle-orm'
import type { Game } from '@/config/sprunkigame';

// 安全的JSON解析函数
function safeJsonParse(value: string | null, defaultValue: any, fieldName: string): any {
  if (!value) {
    return defaultValue;
  }
  
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn(`Failed to parse JSON for field ${fieldName}:`, value);
    return defaultValue;
  }
}

// 处理数据库记录到Game对象的转换
function mapToGame(record: any): Game {
  if (!record) {
    console.error('Received null or undefined record')
    throw new Error('Invalid game record')
  }

  // 确保所有必需字段都存在
  const requiredFields = ['id', 'title', 'imageUrl', 'iframeUrl']
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
      description: '', // 默认空字符串，因为description字段已被移除
      imageUrl: record.imageUrl,
      image: record.imageUrl, // 添加image字段以匹配Game接口
      iframeUrl: record.iframeUrl,
      rating: record.rating || 0,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      categories: [], // 默认空数组，因为categories需要单独查询
      metadata: safeJsonParse(record.metadata, {}, 'metadata'),
      controls: {
        fullscreenTip: '',
        guide: {
          movement: [],
          actions: []
        }
      }, // 默认controls对象，因为controls字段已被移除
      features: [], // 默认空数组，因为features字段已被移除
      faqs: [], // 默认空数组，因为faqs字段已被移除
    }

    // 开发环境下，输出警告如果发现非JSON格式的数据
    if (process.env.NODE_ENV === 'development') {
      ['metadata'].forEach(field => {
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