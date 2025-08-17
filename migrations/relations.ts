import { relations } from "drizzle-orm/relations";
import { categories, gameCategories, gamesBase, projectCategories, projects, projectGameCategories, projectGames, gameComments, gameRatings } from "./schema";

export const gameCategoriesRelations = relations(gameCategories, ({one}) => ({
	category: one(categories, {
		fields: [gameCategories.categoryId],
		references: [categories.id]
	}),
	gamesBase: one(gamesBase, {
		fields: [gameCategories.gameId],
		references: [gamesBase.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	gameCategories: many(gameCategories),
	projectCategories: many(projectCategories),
}));

export const gamesBaseRelations = relations(gamesBase, ({many}) => ({
	gameCategories: many(gameCategories),
	gameComments: many(gameComments),
	gameRatings: many(gameRatings),
	projectGames: many(projectGames),
}));

export const projectCategoriesRelations = relations(projectCategories, ({one, many}) => ({
	category: one(categories, {
		fields: [projectCategories.categoryId],
		references: [categories.id]
	}),
	project: one(projects, {
		fields: [projectCategories.projectId],
		references: [projects.id]
	}),
	projectGameCategories: many(projectGameCategories),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	projectCategories: many(projectCategories),
	gameComments: many(gameComments),
	gameRatings: many(gameRatings),
}));

export const projectGameCategoriesRelations = relations(projectGameCategories, ({one}) => ({
	projectCategory: one(projectCategories, {
		fields: [projectGameCategories.projectCategoryId],
		references: [projectCategories.id]
	}),
	projectGame: one(projectGames, {
		fields: [projectGameCategories.projectGameId],
		references: [projectGames.id]
	}),
}));

export const projectGamesRelations = relations(projectGames, ({one, many}) => ({
	projectGameCategories: many(projectGameCategories),
	gamesBase: one(gamesBase, {
		fields: [projectGames.gameId],
		references: [gamesBase.id]
	}),
}));

export const gameCommentsRelations = relations(gameComments, ({one}) => ({
	project: one(projects, {
		fields: [gameComments.projectId],
		references: [projects.id]
	}),
	gamesBase: one(gamesBase, {
		fields: [gameComments.gameId],
		references: [gamesBase.id]
	}),
}));

export const gameRatingsRelations = relations(gameRatings, ({one}) => ({
	project: one(projects, {
		fields: [gameRatings.projectId],
		references: [projects.id]
	}),
	gamesBase: one(gamesBase, {
		fields: [gameRatings.gameId],
		references: [gamesBase.id]
	}),
}));