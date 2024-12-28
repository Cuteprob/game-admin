import { db } from '@/db/tursoDb';
import { eq, and } from 'drizzle-orm';
import { projectGames } from '@/db/schema';
import type { Game, GameCategory } from '@/config/sprunkigame';

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
      description: result.description,
      iframeUrl: result.game!.iframeUrl,
      image: result.game!.imageUrl,
      rating: result.game!.rating ?? 0,
      createdAt: result.game!.createdAt,
      categories: result.game!.categories.map(c => c.category.name as GameCategory),
      metadata: JSON.parse(result.metadata),
      features: JSON.parse(result.features),
      faqs: JSON.parse(result.faqs),
      controls: JSON.parse(result.metadata).controls,
      video: result.game!.video ? JSON.parse(result.game!.video) : undefined
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
        description: true,
        metadata: true,
        controls: true,
        features: true,
        faqs: true,
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
      description: result.description,
      iframeUrl: result.game.iframeUrl,
      image: result.game.imageUrl,
      rating: result.game.rating ?? 0,
      createdAt: result.game.createdAt,
      categories: result.game.categories.map(c => c.category.name as GameCategory),
      metadata: JSON.parse(result.metadata),
      features: JSON.parse(result.features),
      faqs: JSON.parse(result.faqs),
      controls: JSON.parse(result.controls),
      video: result.game.video ? JSON.parse(result.game.video) : undefined
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
      description: result.description,
      iframeUrl: result.game!.iframeUrl,
      image: result.game!.imageUrl,
      rating: result.game!.rating ?? 0,
      createdAt: result.game!.createdAt,
      categories: result.game!.categories.map(c => c.category.name as GameCategory),
      metadata: JSON.parse(result.metadata),
      features: JSON.parse(result.features),
      faqs: JSON.parse(result.faqs),
      controls: JSON.parse(result.metadata).controls,
      video: result.game!.video ? JSON.parse(result.game!.video) : undefined
    }));
  };
  