import { 
  sqliteTable, 
  text, 
  integer, 
  real,
  primaryKey,
  index
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from 'drizzle-orm';

// 原始游戏数据表
export const gamesBase = sqliteTable('games_base', {
  id: text('id').primaryKey(),                    // 游戏唯一标识符
  title: text('title').notNull(),                 // 游戏标题
  iframeUrl: text('iframe_url').notNull(),        // 游戏iframe地址
  imageUrl: text('image_url').notNull(),          // 游戏图片URL
  rating: real('rating').default(0),              // 游戏评分
  createdAt: text('created_at').notNull(),        // 创建时间
  metadata: text('metadata').notNull(),           // JSON as text
  video: text('video'),                          // JSON as text
  content: text('content'),                      // Markdown content as text
  version: integer('version').default(1),         // 版本号
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`),            // 更新时间
});

// 游戏分类表
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),                    // 分类ID，如 'MUSIC'
  name: text('name').notNull(),                   // 显示名称，如 'Music Games'
  description: text('description'),                // 分类描述
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`),            // 创建时间
});

// 游戏-分类关联表（多对多）
export const gameCategories = sqliteTable('game_categories', {
  gameId: text('game_id')
    .notNull()
    .references(() => gamesBase.id, { onDelete: 'cascade' }),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  pk: primaryKey(table.gameId, table.categoryId),  // 复合主键
}));

// 项目特定游戏数据表
export const projectGames = sqliteTable('project_games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: text('project_id').notNull(),
  gameId: text('game_id')
    .notNull()
    .references(() => gamesBase.id),
  locale: text('locale').notNull(),
  title: text('title').notNull(),
  metadata: text('metadata').notNull(),
  content: text('content'),                      // Markdown content as text
  baseVersion: integer('base_version').notNull(),
  isPublished: integer('is_published').default(0),
  isMain: integer('is_main').default(0),         // 是否为主游戏
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  unq: index('project_game_unique').on(table.projectId, table.gameId, table.locale)
}));

// 项目表
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),  // 使用 nanoid
  name: text('name').notNull(),
  description: text('description'),
  defaultLocale: text('default_locale').notNull(),
  locales: text('locales').notNull(), // JSON 数组存储支持的语言
  aiConfig: text('ai_config').notNull().default('{}'), // AI 配置: { targetAudience, tone, defaultPrompts }
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
})

// 项目特定分类表
export const projectCategories = sqliteTable('project_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  displayName: text('display_name'),              // 项目中的显示名称，可以覆盖原始分类名
  description: text('description'),               // 项目中的分类描述
  sortOrder: integer('sort_order').default(0),    // 排序顺序
  isActive: integer('is_active').default(1),      // 是否激活
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  // 确保每个项目中的分类是唯一的
  unq: index('project_category_unique').on(table.projectId, table.categoryId)
}));

// 项目游戏-分类关联表
export const projectGameCategories = sqliteTable('project_game_categories', {
  projectGameId: integer('project_game_id')
    .notNull()
    .references(() => projectGames.id, { onDelete: 'cascade' }),
  projectCategoryId: integer('project_category_id')
    .notNull()
    .references(() => projectCategories.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  pk: primaryKey(table.projectGameId, table.projectCategoryId),  // 复合主键
}));

// 类型定义
export type GameBase = typeof gamesBase.$inferSelect;
export type NewGameBase = typeof gamesBase.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type GameCategory = typeof gameCategories.$inferSelect;
export type NewGameCategory = typeof gameCategories.$inferInsert;

export type ProjectGame = typeof projectGames.$inferSelect;
export type NewProjectGame = typeof projectGames.$inferInsert;

export type ProjectCategory = typeof projectCategories.$inferSelect;
export type NewProjectCategory = typeof projectCategories.$inferInsert;

export type ProjectGameCategory = typeof projectGameCategories.$inferSelect;
export type NewProjectGameCategory = typeof projectGameCategories.$inferInsert;

// 定义关系
export const gamesBaseRelations = relations(gamesBase, ({ many }) => ({
  categories: many(gameCategories)
}));

export const gameCategoriesRelations = relations(gameCategories, ({ one }) => ({
  game: one(gamesBase, {
    fields: [gameCategories.gameId],
    references: [gamesBase.id],
  }),
  category: one(categories, {
    fields: [gameCategories.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  games: many(gameCategories)
}));

// 添加 projectGames 的关系定义
export const projectGamesRelations = relations(projectGames, ({ one, many }) => ({
  game: one(gamesBase, {
    fields: [projectGames.gameId],
    references: [gamesBase.id],
  }),
  categories: many(projectGameCategories)
}));

export const projectGameCategoriesRelations = relations(projectGameCategories, ({ one }) => ({
  projectGame: one(projectGames, {
    fields: [projectGameCategories.projectGameId],
    references: [projectGames.id],
  }),
  projectCategory: one(projectCategories, {
    fields: [projectGameCategories.projectCategoryId],
    references: [projectCategories.id],
  })
}));

export const projectCategoriesRelations = relations(projectCategories, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectCategories.projectId],
    references: [projects.id],
  }),
  category: one(categories, {
    fields: [projectCategories.categoryId],
    references: [categories.id],
  }),
  games: many(projectGameCategories)
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  categories: many(projectCategories)
}));
