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
	`description` text NOT NULL,
	`iframe_url` text NOT NULL,
	`image_url` text NOT NULL,
	`rating` real DEFAULT 0,
	`created_at` text NOT NULL,
	`metadata` text NOT NULL,
	`controls` text NOT NULL,
	`features` text NOT NULL,
	`faqs` text NOT NULL,
	`video` text,
	`version` integer DEFAULT 1,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `project_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`game_id` text NOT NULL,
	`locale` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text NOT NULL,
	`features` text NOT NULL,
	`faqs` text NOT NULL,
	`base_version` integer NOT NULL,
	`is_published` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`game_id`) REFERENCES `games_base`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `project_game_unique` ON `project_games` (`project_id`,`game_id`,`locale`);