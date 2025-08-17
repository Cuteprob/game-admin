import { db } from '../lib/db/tursoDb';
import { sql } from 'drizzle-orm';

async function addIsMainField() {
  try {
    console.log('Adding is_main field to project_games table...');
    
    // 检查字段是否已存在
    const result = await db.all(sql`PRAGMA table_info(project_games);`);
    const columns = result.map((row: any) => row.name);
    
    if (columns.includes('is_main')) {
      console.log('is_main field already exists!');
      return;
    }
    
    // 添加字段
    await db.run(sql`ALTER TABLE project_games ADD COLUMN is_main integer DEFAULT 0;`);
    
    console.log('Successfully added is_main field!');
    
    // 验证字段添加
    const newResult = await db.all(sql`PRAGMA table_info(project_games);`);
    const newColumns = newResult.map((row: any) => row.name);
    
    if (newColumns.includes('is_main')) {
      console.log('Verification successful: is_main field exists');
    } else {
      console.error('Verification failed: is_main field not found');
    }
    
  } catch (error) {
    console.error('Failed to add is_main field:', error);
  }
}

addIsMainField();
