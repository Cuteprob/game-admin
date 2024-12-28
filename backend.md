# 游戏管理系统后端开发文档

## 1. 系统概述

### 1.1 项目背景
本系统旨在构建一个通用的游戏数据管理平台，支持多个项目复用相同的游戏数据，并通过 AI 生成针对不同项目的特定描述。

### 1.2 核心功能
- 原始游戏数据管理
- 游戏分类管理
- 项目特定游戏数据管理
- 图片资源管理 (Cloudflare R2)
- AI 内容生成

### 1.3 技术栈
- 数据库：Turso (SQLite)
- 存储：Cloudflare R2
- 框架：Next.js (Edge Runtime)
- AI：OpenAI API
- 认证：NextAuth.js

## 2. 数据库设计

### 2.1 原始游戏数据表 (games_base)

```sql
CREATE TABLE games_base (
id TEXT PRIMARY KEY, -- 游戏唯一标识符
title TEXT NOT NULL, -- 游戏标题
description TEXT NOT NULL, -- 游戏描述
iframe_url TEXT NOT NULL, -- 游戏iframe地址
image_url TEXT NOT NULL, -- 游戏图片URL
rating DECIMAL(3,1) DEFAULT 0, -- 游戏评分
created_at DATETIME NOT NULL, -- 创建时间
metadata JSON NOT NULL, -- SEO元数据
controls JSON NOT NULL, -- 控制指南
features JSON NOT NULL, -- 特性列表
faqs JSON NOT NULL, -- 常见问题
video JSON, -- ���频信息（可选）
version INTEGER DEFAULT 1, -- 版本号
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

相关 JSON 结构：

```json
{
"metadata": {
"title": "string",
"description": "string",
"keywords": ["string"]
},
"controls": {
"fullscreenTip": "string",
"guide": {
"movement": ["string"],
"actions": ["string"],
"special": ["string"]
}
},
"video": {
"youtubeId": "string",
"clipId": "string?",
"clipTime": "string?",
"title": "string",
"thumbnail": "string"
}
}
```

### 2.2 游戏分类设计

```sql
-- 游戏分类表
CREATE TABLE categories (
  id TEXT PRIMARY KEY,             -- 如 'MUSIC', 'HOT'
  name TEXT NOT NULL,              -- 显示名称，如 'Music Games'
  description TEXT,                -- 分类描述
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 游戏-分类关联表（多对多关系）
CREATE TABLE game_categories (
  game_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (game_id, category_id),
  FOREIGN KEY (game_id) REFERENCES games_base(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

示例数据：
```sql
-- 插入分类
INSERT INTO categories (id, name, description) VALUES
('MUSIC', 'Music Games', 'Games focused on music creation and rhythm'),
('HOT', 'Hot Games', 'Popular and trending games'),
('NEW', 'New Games', 'Recently added games'),
('FEATURED', 'Featured Games', 'Editor''s choice games');

-- 关联游戏和分类
INSERT INTO game_categories (game_id, category_id) VALUES
('sprunki-phase-1', 'MUSIC'),
('sprunki-phase-1', 'HOT'),
('sprunki-phase-1', 'FEATURED');
```

查询示例：
```typescript
// 获取游戏的所有分类
const getGameCategories = async (gameId: string) => {
  return await db.prepare(`
    SELECT c.* 
    FROM categories c
    JOIN game_categories gc ON c.id = gc.category_id
    WHERE gc.game_id = ?
  `).bind(gameId).all();
};

// 获取分类下的所有游戏
const getGamesByCategory = async (categoryId: string) => {
  return await db.prepare(`
    SELECT g.* 
    FROM games_base g
    JOIN game_categories gc ON g.id = gc.game_id
    WHERE gc.category_id = ?
  `).bind(categoryId).all();
};

// 添加游戏分类关联
const addGameCategory = async (gameId: string, categoryId: string) => {
  return await db.prepare(`
    INSERT INTO game_categories (game_id, category_id)
    VALUES (?, ?)
  `).bind(gameId, categoryId).run();
};
```

### 2.3 项目特定游戏数据表 (project_games)
```sql
CREATE TABLE project_games (
id INTEGER PRIMARY KEY AUTOINCREMENT,
project_id TEXT NOT NULL, -- 项目标识符
game_id TEXT NOT NULL, -- 关联的原始游戏ID
locale TEXT NOT NULL, -- 语言代码
title TEXT NOT NULL, -- 项目特定标题
description TEXT NOT NULL, -- 项目特定描述
metadata JSON NOT NULL, -- 项目特定SEO数据
features JSON NOT NULL, -- 项目特定特性
faqs JSON NOT NULL, -- 项目特定FAQ
base_version INTEGER NOT NULL, -- 原始数据版本号
is_published BOOLEAN DEFAULT false,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
UNIQUE(project_id, game_id, locale)
);
```

### 2.4 图片管理规范
- 存储结构：/projects/{projectId}/games/{gameId}/{imageType}
- 图片处理：
  - 缩略图生成（尺寸规范）
  - 格式转换（WebP优先）
  - 压缩策略
- 命名规范：{gameId}-{imageType}-{timestamp}.{ext}

## 3. API 设计

### 3.1 管理后台 API

#### 游戏管理
```typescript
// 获取游戏列表
GET /api/admin/games
Query Parameters:
page: number
limit: number
category?: string
search?: string
// 创建游戏
POST /api/admin/games
Body: {
title: string
description: string
iframeUrl: string
imageUrl: string
categories: string[]
metadata: GameMetadata
controls: GameControls
features: string[]
faqs: GameFAQ[]
video?: GameVideo
}
// 更新游戏
PUT /api/admin/games/:id
Body: 同创建游戏
// 删除游戏
DELETE /api/admin/games/:id
```

#### 图片上传
```typescript
// 获取R2上传URL
POST /api/admin/upload-url
Body: {
filename: string
contentType: string
}
Response: {
uploadUrl: string // 预签名上传URL
publicUrl: string // 文件公共访问URL
}
```

#### 项目游戏管理
```typescript
// 获取项目游戏列表
GET /api/admin/projects/:projectId/games
Query Parameters:
page: number
limit: number
locale: string
// 添加游戏到项目
POST /api/admin/projects/:projectId/games
Body: {
gameIds: string[]
locale: string
aiPrompt?: string
}
// 更新项目游戏
PUT /api/admin/projects/:projectId/games/:gameId
Body: {
title?: string
description?: string
metadata?: GameMetadata
features?: string[]
faqs?: GameFAQ[]
isPublished?: boolean
}
// 从项目移除游戏
DELETE /api/admin/projects/:projectId/games/:gameId
```

### 3.2 前台 API
```typescript
// 获取项目游戏列表
GET /api/:projectId/games
Query Parameters:
category?: string
locale?: string
// 获取游戏详情
GET /api/:projectId/games/:gameId
Query Parameters:
locale?: string
```

### 3.3 权限设计
- 角色定义：管理员、编辑者、查看者
- 资源权限矩阵
- 操作权限控制
- 项目隔离

## 4. 数据适配层

### 4.1 类型定义
```typescript
// 数据库类型
interface DBGame {
id: string;
title: string;
description: string;
iframe_url: string;
image_url: string;
rating: number;
created_at: string;
metadata: string; // JSON string
controls: string; // JSON string
features: string; // JSON string
faqs: string; // JSON string
video?: string; // JSON string
version: number;
}
interface DBProjectGame {
project_id: string;
game_id: string;
locale: string;
title: string;
description: string;
metadata: string; // JSON string
features: string; // JSON string
faqs: string; // JSON string
base_version: number;
is_published: boolean;
}
// 应用接口类型
interface Game {
id: string;
title: string;
description: string;
iframeUrl: string;
image: string;
rating: number;
categories: GameCategory[];
createdAt: string;
metadata: GameMetadata;
controls: GameControls;
features: string[];
faqs: GameFAQ[];
video?: GameVideo;
}
```

### 4.2 适配函数
```typescript
export function adaptToGameInterface(
baseGame: DBGame,
projectGame?: DBProjectGame,
locale: string = 'en'
): Game {
return {
id: baseGame.id,
title: projectGame?.title || baseGame.title,
description: projectGame?.description || baseGame.description,
iframeUrl: baseGame.iframe_url,
image: baseGame.image_url,
rating: baseGame.rating,
categories: JSON.parse(baseGame.categories),
createdAt: baseGame.created_at,
metadata: {
...JSON.parse(baseGame.metadata),
...(projectGame ? JSON.parse(projectGame.metadata) : {})
},
controls: JSON.parse(baseGame.controls),
features: JSON.parse(projectGame?.features || baseGame.features),
faqs: JSON.parse(projectGame?.faqs || baseGame.faqs),
video: baseGame.video ? JSON.parse(baseGame.video) : undefined
};
}
```

## 5. AI 内容生成

### 5.1 生成配置
```typescript
interface AIGenerationConfig {
projectId: string;
locale: string;
targetAudience?: string;
tone?: string;
seoKeywords?: string[];
}
interface AIGenerationResult {
title: string;
description: string;
metadata: GameMetadata;
features: string[];
faqs: GameFAQ[];
}
```

### 5.2 生成函数
```typescript
async function generateProjectContent(
baseGame: DBGame,
config: AIGenerationConfig
): Promise<AIGenerationResult> {
const prompt = 基于以下游戏数据: ${JSON.stringify(baseGame)} 为项目 "${config.projectId}" 生成新的游戏描述，要求： - 目标语言: ${config.locale} - 目标受众: ${config.targetAudience || '通用'} - 语气风格: ${config.tone || '专业'} - SEO关键词: ${config.seoKeywords?.join(', ')} - 保持游戏核心信息准确 - 优化SEO元数据 - 生成相关的FAQ ;
const response = await openai.createCompletion({
model: "gpt-4",
prompt,
temperature: 0.7,
max_tokens: 2000
});
return parseAIResponse(response.choices[0].text);
}
```

### 5.3 提示词模板
- 标题生成模板
- 描述生成模板
- FAQ生成模板
- SEO优化模板

### 5.4 生成结果验证
- 内容长度检查
- 关键信息保留检查
- SEO 要素验证
- 多语言质量检查

## 6. 部署配置

### 6.1 环境变量
```
DATABASE_URL=
Cloudflare R2
CF_ACCOUNT_ID=
CF_ACCESS_KEY_ID=
CF_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
OpenAI
OPENAI_API_KEY=
认证
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

### 6.2 数据同步策略
1. 版本控制：使用 version 字段追踪原始数据变更
2. 定期检查：通过 Cron Job 检查需要更新的项目数据
3. 按需更新：仅更新发生变化的字段
4. 失败重试：实现重试机制和错误日志

## 7. 注意事项

### 7.1 安全性
- 实现细粒度的权限控制
- 验证所有用户输入
- 限制上传文件大小和类型
- 使用预签名 URL 进行安全上传
- 实现请求速率限制

### 7.2 性能优化
- 实现适当的缓存策略
- 优化数据库查询
- 使用 Edge Functions 处理数据转换
- 图片压缩和优化

### 7.3 错误处理
- AI 生成失败的回退策���
- 数据同步失败的处理
- 上传失败的重试机制
- 完善的错误日志记录

### 7.4 数据备份
- 定期数据库备份
- R2 存储备份策略
- 版本历史记录
- 版本历史记录