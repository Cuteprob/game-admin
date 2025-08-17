CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `game_categories` (
	`game_id` text NOT NULL,
	`category_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`game_id`, `category_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games_base`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `games_base` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`iframe_url` text NOT NULL,
	`image_url` text NOT NULL,
	`rating` real DEFAULT 0,
	`created_at` text NOT NULL,
	`metadata` text NOT NULL,
	`controls` text,
	`features` text,
	`faqs` text,
	`video` text,
	`content` text,
	`version` integer DEFAULT 1,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `project_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`category_id` text NOT NULL,
	`display_name` text,
	`description` text,
	`sort_order` integer DEFAULT 0,
	`is_active` integer DEFAULT 1,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `project_category_unique` ON `project_categories` (`project_id`,`category_id`);--> statement-breakpoint
CREATE TABLE `project_game_categories` (
	`project_game_id` integer NOT NULL,
	`project_category_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(`project_game_id`, `project_category_id`),
	FOREIGN KEY (`project_game_id`) REFERENCES `project_games`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_category_id`) REFERENCES `project_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`game_id` text NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`metadata` text NOT NULL,
	`controls` text,
	`features` text,
	`faqs` text,
	`content` text,
	`base_version` integer NOT NULL,
	`is_published` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`game_id`) REFERENCES `games_base`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `project_game_unique` ON `project_games` (`project_id`,`game_id`,`locale`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`default_locale` text NOT NULL,
	`locales` text NOT NULL,
	`ai_config` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
