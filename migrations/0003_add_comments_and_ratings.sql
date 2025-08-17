-- 添加游戏评论和评分功能
-- Migration: 0003_add_comments_and_ratings

-- 创建游戏评论表
CREATE TABLE `game_comments` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `content` text NOT NULL,
  `nickname` text NOT NULL,
  `email` text,
  `game_id` text NOT NULL,
  `project_id` text NOT NULL,
  `locale` text NOT NULL,
  `rating_score` integer CHECK(`rating_score` >= 0 AND `rating_score` <= 5),
  `status` text DEFAULT 'pending' NOT NULL,
  `helpful_votes` integer DEFAULT 0,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP,
  `moderated_at` text,
  FOREIGN KEY (`game_id`) REFERENCES `games_base`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 创建游戏评分汇总表
CREATE TABLE `game_ratings` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `game_id` text NOT NULL,
  `project_id` text NOT NULL,
  `locale` text NOT NULL,
  `average_rating` real DEFAULT 0,
  `total_ratings` integer DEFAULT 0,
  `rating_distribution` text DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0}',
  `updated_at` text DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`game_id`) REFERENCES `games_base`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- 为 game_comments 表创建索引
CREATE INDEX `idx_game_comments_game_project` ON `game_comments` (`game_id`, `project_id`);
CREATE INDEX `idx_game_comments_status` ON `game_comments` (`status`);
CREATE INDEX `idx_game_comments_created_at` ON `game_comments` (`created_at`);

-- 为 game_ratings 表创建索引
CREATE UNIQUE INDEX `idx_game_ratings_unique` ON `game_ratings` (`game_id`, `project_id`, `locale`);
CREATE INDEX `idx_game_ratings_game` ON `game_ratings` (`game_id`);
CREATE INDEX `idx_game_ratings_project` ON `game_ratings` (`project_id`);




