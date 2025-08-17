import { sqliteTable, AnySQLiteColumn, text, foreignKey, primaryKey, index, integer, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const categories = sqliteTable("categories", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const gameCategories = sqliteTable("game_categories", {
	gameId: text("game_id").notNull().references(() => gamesBase.id, { onDelete: "cascade" } ),
	categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" } ),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
},
(table) => [
	primaryKey({ columns: [table.gameId, table.categoryId], name: "game_categories_game_id_category_id_pk"})
]);

export const projectCategories = sqliteTable("project_categories", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" } ),
	categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" } ),
	displayName: text("display_name"),
	description: text(),
	sortOrder: integer("sort_order").default(0),
	isActive: integer("is_active").default(1),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
},
(table) => [
	index("project_category_unique").on(table.projectId, table.categoryId),
]);

export const projectGameCategories = sqliteTable("project_game_categories", {
	projectGameId: integer("project_game_id").notNull().references(() => projectGames.id, { onDelete: "cascade" } ),
	projectCategoryId: integer("project_category_id").notNull().references(() => projectCategories.id, { onDelete: "cascade" } ),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
},
(table) => [
	primaryKey({ columns: [table.projectGameId, table.projectCategoryId], name: "project_game_categories_project_game_id_project_category_id_pk"})
]);

export const projects = sqliteTable("projects", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	defaultLocale: text("default_locale").notNull(),
	locales: text().notNull(),
	aiConfig: text("ai_config").default("{}").notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const gameComments = sqliteTable("game_comments", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	content: text().notNull(),
	nickname: text().notNull(),
	email: text(),
	gameId: text("game_id").notNull().references(() => gamesBase.id, { onDelete: "cascade" } ),
	projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" } ),
	locale: text().notNull(),
	ratingScore: integer("rating_score"),
	status: text().default("pending").notNull(),
	helpfulVotes: integer("helpful_votes").default(0),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
	moderatedAt: text("moderated_at"),
});

export const gameRatings = sqliteTable("game_ratings", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	gameId: text("game_id").notNull().references(() => gamesBase.id, { onDelete: "cascade" } ),
	projectId: text("project_id").notNull().references(() => projects.id, { onDelete: "cascade" } ),
	locale: text().notNull(),
	averageRating: real("average_rating"),
	totalRatings: integer("total_ratings").default(0),
	ratingDistribution: text("rating_distribution").default("{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0}"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const gamesBase = sqliteTable("games_base", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	iframeUrl: text("iframe_url").notNull(),
	imageUrl: text("image_url").notNull(),
	rating: real(),
	createdAt: text("created_at").notNull(),
	metadata: text().notNull(),
	content: text(),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const projectGames = sqliteTable("project_games", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	projectId: text("project_id").notNull(),
	gameId: text("game_id").notNull().references(() => gamesBase.id),
	locale: text().notNull(),
	title: text().notNull(),
	metadata: text().notNull(),
	content: text(),
	baseVersion: integer("base_version").notNull(),
	isPublished: integer("is_published").default(0),
	isMain: integer("is_main").default(0),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

