import { db } from '@/lib/db/tursoDb';
import { eq, and, or, like, desc, sql, inArray } from 'drizzle-orm';
import { 
  gamesBase, 
  gameCategories,
  type GameBase,
  type NewGameBase
} from '@/lib/db/schema';

interface GetGamesOptions {
  page?: number;
  limit?: number;
  categoryId?: string;
}

interface CreateGameInput extends NewGameBase {
  categories?: string[];  // 分类ID数组
}

export const gamesBaseRepository = {
  // 获取游戏列表
  getGames: async ({ page = 1, limit = 10, categoryId }: GetGamesOptions = {}) => {
    return await db.query.gamesBase.findMany({
      limit,
      offset: (page - 1) * limit,
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  },

  // 获取单个游戏
  getGameById: async (id: string) => {
    return await db.query.gamesBase.findFirst({
      where: eq(gamesBase.id, id),
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  },

  // 创建游戏
  createGame: async (data: CreateGameInput) => {
    const { categories: categoryIds, ...gameData } = data;
    
    return await db.transaction(async (tx) => {
      // 1. 创建游戏基础数据
      const game = await tx.insert(gamesBase).values(gameData);

      // 2. 如果有分类，创建分类关联
      if (categoryIds?.length) {
        await tx.insert(gameCategories).values(
          categoryIds.map(categoryId => ({
            gameId: gameData.id,
            categoryId
          }))
        );
      }

      return game;
    });
  },

  // 更新游戏
  updateGame: async (id: string, data: Partial<CreateGameInput>) => {
    const { categories: categoryIds, ...gameData } = data;
    
    return await db.transaction(async (tx) => {
      // 1. 更新游戏基础数据
      await tx.update(gamesBase)
        .set(gameData)
        .where(eq(gamesBase.id, id));

      // 2. 如果提供了分类，更新分类关联
      if (categoryIds) {
        // 删除旧的分类关联
        await tx.delete(gameCategories)
          .where(eq(gameCategories.gameId, id));

        // 创建新的分类关联
        if (categoryIds.length > 0) {
          await tx.insert(gameCategories).values(
            categoryIds.map(categoryId => ({
              gameId: id,
              categoryId
            }))
          );
        }
      }
    });
  },

  // 删除游戏
  deleteGame: async (id: string) => {
    // 由于设置了级联删除，只需要删除游戏基础数据
    // 相关的分类关联会自动删除
    return await db.delete(gamesBase)
      .where(eq(gamesBase.id, id));
  },

  // 按分类获取游戏
  getGamesByCategory: async (categoryId: string, { page = 1, limit = 10 } = {}) => {
    return await db.query.gamesBase.findMany({
      limit,
      offset: (page - 1) * limit,
      where: (gamesBase) => {
        const gameIds = db.select({ id: gamesBase.id })
          .from(gameCategories)
          .where(eq(gameCategories.categoryId, categoryId));
        return inArray(gamesBase.id, gameIds);
      },
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  },

  // 获取游戏总数
  getGamesCount: async (categoryId?: string) => {
    if (categoryId) {
      return await db
        .select({ count: sql<number>`count(*)` })
        .from(gameCategories)
        .where(eq(gameCategories.categoryId, categoryId))
        .then(result => result[0].count);
    }
    return await db
      .select({ count: sql<number>`count(*)` })
      .from(gamesBase)
      .then(result => result[0].count);
  },

  // 批量更新游戏
  bulkUpdateGames: async (updates: { id: string; data: Partial<CreateGameInput> }[]) => {
    return await db.transaction(async (tx) => {
      const results = [];
      for (const { id, data } of updates) {
        const result = await gamesBaseRepository.updateGame(id, data);
        results.push(result);
      }
      return results;
    });
  },

  // 搜索游戏
  searchGames: async (query: string, { page = 1, limit = 10 } = {}) => {
    return await db.query.gamesBase.findMany({
      limit,
      offset: (page - 1) * limit,
      where: or(
        like(gamesBase.title, `%${query}%`),
        like(gamesBase.description, `%${query}%`)
      ),
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  },

  // 获取最近更新的游戏
  getRecentlyUpdatedGames: async (limit = 10) => {
    return await db.query.gamesBase.findMany({
      limit,
      orderBy: desc(gamesBase.updatedAt),
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  },

  // 检查游戏是否存在
  gameExists: async (id: string) => {
    const result = await db.select({ id: gamesBase.id })
      .from(gamesBase)
      .where(eq(gamesBase.id, id))
      .limit(1);
    return result.length > 0;
  }
};
