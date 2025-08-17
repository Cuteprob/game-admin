import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

import { db } from './db';
import { games, GameCategory } from '../config/sprunkigame';
import { gamesBase, categories, gameCategories } from '../lib/db/schema';

async function importGames() {
  try {
    console.log('Preparing data...');
    
    // 准备所有数据
    const categoryValues = Object.entries(GameCategory).map(([id, name]) => ({
      id,
      name,
      description: `${name} collection`,
    }));

    const gameValues = games.map(game => {
      const gameData = {
        id: game.id,
        title: game.title,
        iframeUrl: game.iframeUrl,
        imageUrl: game.image, // 使用image字段而不是imageUrl
        rating: game.rating || 0,
        createdAt: game.createdAt || new Date().toISOString(),
        metadata: JSON.stringify(game.metadata),
        video: game.video ? JSON.stringify(game.video) : null,
        content: game.content || '',
        version: 1, // 使用默认版本号
        updatedAt: new Date().toISOString()
      };
      return gameData;
    });

    const categoryRelations = games.flatMap(game => 
      game.categories.map(category => ({
        gameId: game.id,
        categoryId: Object.keys(GameCategory)
          .find(key => GameCategory[key as keyof typeof GameCategory] === category)!,
      }))
    );

    // 使用事务批量导入
    await db.transaction(async (tx) => {
      // 清理现有数据
      console.log('Cleaning existing data...');
      await tx.delete(gameCategories);
      await tx.delete(categories);
      await tx.delete(gamesBase);

      // 批量导入分类
      console.log('Importing categories...');
      await tx.insert(categories).values(categoryValues);
      console.log(`Imported ${categoryValues.length} categories`);

      // 批量导入游戏
      console.log('Importing games...');
      await tx.insert(gamesBase).values(gameValues);
      console.log(`Imported ${gameValues.length} games`);

      // 批量导入分类关联
      console.log('Importing game categories...');
      await tx.insert(gameCategories).values(categoryRelations);
      console.log(`Imported ${categoryRelations.length} category relations`);
    });

    console.log('Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importGames(); 