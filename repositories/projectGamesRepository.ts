import { db } from '@/lib/db/tursoDb';
import { eq, and } from 'drizzle-orm';
import { projectGames } from '@/lib/db/schema';
import type { Game, GameCategory } from '@/config/sprunkigame';

// 安全的JSON解析函数
const safeJsonParse = (str: string | null): any => {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
};

// 获取项目中特定分类的游戏
export const getProjectGamesByCategory = async (
  categoryName: GameCategory
): Promise<Game[]> => {
  const results = await db.query.projectGames.findMany({
    where: and(
      eq(projectGames.projectId, 'sprunkiphase4-app'),
      eq(projectGames.locale, 'en')
    ),
    with: {
      game: {
        columns: {
          id: true,
          iframeUrl: true,
          imageUrl: true,
          rating: true,
          createdAt: true,
          video: true,
        },
        with: {
          categories: {
            with: {
              category: true
            }
          }
        }
      }
    }
  });

  return results
    .filter(result => 
      result.game?.categories.some(c => c.category.name === categoryName)
    )
    .map(result => ({
      id: result.gameId,
      title: result.title,
      description: '', // 默认空字符串，因为description字段已被移除
      iframeUrl: result.game!.iframeUrl,
      image: result.game!.imageUrl,
      rating: result.game!.rating ?? 0,
      createdAt: result.game!.createdAt,
      categories: result.game!.categories.map(c => c.category.name as GameCategory),
      metadata: safeJsonParse(result.metadata),
      features: [], // 默认空数组，因为features字段已被移除
      faqs: [], // 默认空数组，因为faqs字段已被移除
      controls: {
        fullscreenTip: '',
        guide: {
          movement: [],
          actions: []
        }
      }, // 默认controls对象，因为controls字段已被移除
      video: result.game!.video ? safeJsonParse(result.game!.video) : undefined
    }));
};

  // 获取单个游戏详情
  export const getGameById = async (id: string): Promise<Game | null> => {
    const result = await db.query.projectGames.findFirst({
      where: and(
        eq(projectGames.gameId, id), 
        eq(projectGames.projectId, 'sprunkiphase4-app'), 
        eq(projectGames.locale, 'en')
      ),
      columns: {
        gameId: true,
        title: true,
        metadata: true,
        content: true,
      },
      with: {
        game: {
          columns: {
            iframeUrl: true,
            imageUrl: true,
            rating: true,
            video: true,
            createdAt: true,
          },
          with: {
            categories: {
              with: {
                category: true
              }
            }
          }
        }
      }
    });
  
    if (!result || !result.game) return null;

    return {
      id: result.gameId,
      title: result.title,
      description: '', // 默认空字符串，因为description字段已被移除
      iframeUrl: result.game.iframeUrl,
      image: result.game.imageUrl,
      rating: result.game.rating ?? 0,
      createdAt: result.game.createdAt,
      categories: result.game.categories.map(c => c.category.name as GameCategory),
      metadata: safeJsonParse(result.metadata),
      features: [], // 默认空数组，因为features字段已被移除
      faqs: [], // 默认空数组，因为faqs字段已被移除
      content: result.content || '',
      controls: {
        fullscreenTip: '',
        guide: {
          movement: [],
          actions: []
        }
      }, // 默认controls对象，因为controls字段已被移除
      video: result.game.video ? safeJsonParse(result.game.video) : undefined
    };
  };

  // 获取项目所有游戏
  export const getAllGames = async (): Promise<Game[]> => {
    const results = await db.query.projectGames.findMany({
      where: and(
        eq(projectGames.projectId, 'sprunkiphase4-app'), 
        eq(projectGames.locale, 'en')
      ),
      with: {
        game: {
          columns: {
            id: true,
            iframeUrl: true,
            imageUrl: true,
            rating: true,
            createdAt: true,
            video: true,
          },
          with: {
            categories: {
              with: {
                category: true
              }
            }
          }
        }
      }
    });
  
    return results.map(result => ({
      id: result.gameId,
      title: result.title,
      description: '', // 默认空字符串，因为description字段已被移除
      iframeUrl: result.game!.iframeUrl,
      image: result.game!.imageUrl,
      rating: result.game!.rating ?? 0,
      createdAt: result.game!.createdAt,
      categories: result.game!.categories.map(c => c.category.name as GameCategory),
      metadata: safeJsonParse(result.metadata),
      features: [], // 默认空数组，因为features字段已被移除
      faqs: [], // 默认空数组，因为faqs字段已被移除
      controls: {
        fullscreenTip: '',
        guide: {
          movement: [],
          actions: []
        }
      }, // 默认controls对象，因为controls字段已被移除
      video: result.game!.video ? safeJsonParse(result.game!.video) : undefined
    }));
  };