import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

import { db } from './db';
import { games } from '../config/sprunkigame';
import { projectGames } from '../db/schema';
import { eq } from 'drizzle-orm';

async function importProjectGames() {
  try {
    console.log('Preparing project game data...');
    
    const projectGameValues = games.map(game => {
      // 确保 controls 是有效的 JSON 字符串
      const controls = {
        fullscreenTip: game.controls.fullscreenTip,
        guide: {
          movement: game.controls.guide.movement,
          actions: game.controls.guide.actions,
          special: game.controls.guide.special
        }
      };

      return {
        projectId: 'sprunkiphase4-app',
        gameId: game.id,
        locale: 'en',
        title: game.title,
        description: game.description,
        metadata: JSON.stringify(game.metadata),
        controls: JSON.stringify(controls),  // 使用处理过的 controls
        features: JSON.stringify(game.features),
        faqs: JSON.stringify(game.faqs),
        baseVersion: 1,
        isPublished: 1,
      };
    });

    // 先删除现有数据
    console.log('Cleaning existing project data...');
    await db.delete(projectGames).where(
      eq(projectGames.projectId, 'sprunkiphase4-app') && 
      eq(projectGames.locale, 'en')
    );

    // 分批导入数据
    const BATCH_SIZE = 5;
    console.log('Importing project games...');
    for (let i = 0; i < projectGameValues.length; i += BATCH_SIZE) {
      const batch = projectGameValues.slice(i, i + BATCH_SIZE);
      await db.insert(projectGames).values(batch);
      console.log(`Imported batch ${i / BATCH_SIZE + 1}`);
    }

    console.log(`Imported ${projectGameValues.length} project games`);
    console.log('Project data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Project import failed:', error);
    process.exit(1);
  }
}

importProjectGames(); 