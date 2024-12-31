import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client/web'
import * as schema from './schema'

// 确保在 Edge 运行时使用 web 客户端
const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN as string,
})

// 添加 schema 类型
export const db = drizzle(client, { schema })
