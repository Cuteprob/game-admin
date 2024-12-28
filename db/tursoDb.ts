import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema';  // 导入所有 schema

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
});

// 添加 schema 类型
export const db = drizzle(client, { schema });
