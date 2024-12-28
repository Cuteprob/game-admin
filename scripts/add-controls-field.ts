import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

import { db } from '../db/tursoDb';
import { sql } from 'drizzle-orm';

async function addControlsField() {
  try {
    console.log('Adding controls field to project_games table...');
    
    // 添加 controls 字段
    await db.run(sql`
      ALTER TABLE project_games 
      ADD COLUMN controls TEXT NOT NULL DEFAULT '{}'    
    `);
    
    console.log('Successfully added controls field');
    process.exit(0);
  } catch (error) {
    console.error('Failed to add controls field:', error);
    process.exit(1);
  }
}

addControlsField(); 