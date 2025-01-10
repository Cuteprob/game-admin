import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1秒

async function fetchWithRetry(url: string, options: any, retryCount = 0): Promise<Response> {
  try {
    return await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(5000), // 降低单次超时时间到5秒
    });
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount); // 指数退避
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
}

// 本地开发环境使用 HTTP 客户端
const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN as string,
  // 添加同步 URL
  syncUrl: process.env.TURSO_DATABASE_URL as string,
  fetch: fetchWithRetry,
})

// 添加 schema 类型
export const db = drizzle(client, { schema })

// 导出一个检查连接的函数
export async function checkConnection() {
  try {
    await client.execute('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}
