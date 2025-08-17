-- 移除 game_base 表中的 video 和 version 字段
-- 这些字段不再需要，为了保持数据库设计的简洁性

-- 移除 video 字段
ALTER TABLE `games_base` DROP COLUMN `video`;

-- 移除 version 字段  
ALTER TABLE `games_base` DROP COLUMN `version`;
