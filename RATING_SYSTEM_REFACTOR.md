# 评分系统重构说明

## 重构目标

将游戏评分系统从依赖评论的方式重构为独立的评分系统，使 `game_ratings` 表成为评分数据的唯一权威来源。

## 重构内容

### 1. 数据类型修复

**修改文件**: `types/comment.ts`

- 修复了 `GameRating` 接口，移除了 `ratingDistribution` 字符串字段
- 添加了独立的评分计数字段：`rating1Count`, `rating2Count`, `rating3Count`, `rating4Count`, `rating5Count`
- 使类型定义与数据库 schema 保持一致

### 2. 数据仓库层重构

**修改文件**: `repositories/ratingRepository.ts`

- 添加了 `dbToGameRating()` 转换函数，确保数据库记录正确转换为 TypeScript 接口
- 更新了 `getGameRating()` 和 `upsertGameRating()` 函数使用转换函数
- 添加了 `syncCommentRatingToGameRatings()` 函数用于评论评分同步

### 3. 管理界面组件重构

**修改文件**: `components/admin/comments/RatingManagement.tsx`

- 移除了对 `ratingDistribution` JSON 字符串的解析逻辑
- 直接从 `GameRating` 对象的单独字段获取评分分布数据
- 更新了重新计算功能，确保返回的数据格式正确
- 更新了说明文字，明确评分系统的独立性

### 4. 管理页面更新

**修改文件**: `app/(admin)/projects/[id]/ratings/page.tsx`

- 重构了 `parseRatingDistribution()` 函数为 `getRatingDistribution()`
- 直接从 `GameRating` 对象获取评分分布，不再解析JSON字符串
- 确保评分显示组件获取正确的数据格式

### 5. 新增公开API

**新建文件**: `app/api/games/[gameId]/rating/route.ts`

- `GET`: 获取游戏评分（前端公开接口）
- `POST`: 用户直接评分（不通过评论）
- 支持独立的评分提交，直接更新 `game_ratings` 表

**新建文件**: `app/api/games/[gameId]/comments/route.ts`

- `POST`: 用户提交评论（可包含评分）
- 当评论被批准时，自动同步评分到 `game_ratings` 表

### 6. 评论系统集成

**已有功能**: `app/api/admin/comments/[id]/route.ts`

- 评论审核时自动同步评分数据
- 评论删除时重新计算评分
- 确保评论中的评分变更会反映到 `game_ratings` 表

## 系统架构

### 评分数据流

1. **用户直接评分**：
   ```
   用户评分 → /api/games/[gameId]/rating → game_ratings 表
   ```

2. **评论中的评分**：
   ```
   用户评论+评分 → /api/games/[gameId]/comments → game_comments 表
   管理员审核 → /api/admin/comments/[id] → 同步到 game_ratings 表
   ```

3. **评分显示**：
   ```
   前端获取评分 → /api/games/[gameId]/rating → 从 game_ratings 表读取
   ```

### 数据一致性

- `game_ratings` 表是评分数据的**唯一权威来源**
- 评论中的评分仅在审核通过后才会同步到 `game_ratings`
- 管理员可以手动调整 `game_ratings` 中的数据，不受评论影响
- 支持从评论重新计算评分，但这是可选操作

## 使用方式

### 前端获取评分数据

```typescript
// 获取游戏评分
const response = await fetch(`/api/games/${gameId}/rating?projectId=${projectId}&locale=${locale}`)
const { data } = await response.json()
// data: { averageRating, totalRatings, distribution }
```

### 前端提交直接评分

```typescript
// 用户直接评分
const response = await fetch(`/api/games/${gameId}/rating`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId,
    locale,
    rating: 5 // 1-5 星
  })
})
```

### 前端提交评论（含评分）

```typescript
// 用户评论+评分
const response = await fetch(`/api/games/${gameId}/comments`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: "很好的游戏！",
    nickname: "用户名",
    projectId,
    locale,
    ratingScore: 5 // 可选，1-5 星
  })
})
```

### 管理后台操作

- 访问 `/projects/[id]/ratings` 查看和管理游戏评分
- 可以手动设置评分数据
- 可以从已审核的评论重新计算评分
- 评分数据独立于评论，管理员有完全控制权

## 优势

1. **数据独立性**：评分数据不再依赖评论，可以独立管理
2. **灵活性**：支持用户直接评分或通过评论评分两种方式
3. **一致性**：所有评分查询都从同一个数据源获取
4. **可控性**：管理员可以完全控制最终显示的评分数据
5. **性能**：避免了从评论中实时计算评分的性能开销

## 兼容性

此重构保持了向后兼容性：
- 现有的评论系统继续工作
- 现有的管理界面功能保持不变
- 添加了新的独立评分功能
- 数据库结构没有改变
