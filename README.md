# Game Admin System

一个现代化的游戏管理系统，用于管理和组织在线游戏数据。

## 功能特点

- 游戏管理：添加、编辑、删除和查看游戏
- 分类系统：多维度游戏分类管理
- 批量导入：支持批量导入游戏数据
- 响应式设计：支持各种设备访问
- 实时搜索：快速查找游戏
- 分页浏览：高效浏览大量数据

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Drizzle ORM
- SQLite (Turso)
- Shadcn/ui

## 开始使用

1. 克隆项目
```bash
git clone [repository-url]
cd game-admin
```

2. 安装依赖
```bash
npm install
# 或
pnpm install
```

3. 环境配置
```bash
cp .env.example .env
# 编辑 .env 文件，填写必要的环境变量
```

4. 数据库设置
```bash
# 运行数据库迁移
npm run db:migrate
# 或
pnpm db:migrate

# 初始化基础数据（分类等）
npm run db:seed
# 或
pnpm db:seed
```

5. 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

## 部署

1. 构建项目
```bash
npm run build
# 或
pnpm build
```

2. 启动生产服务器
```bash
npm start
# 或
pnpm start
```

## 数据导入

系统支持通过 JSON 格式批量导入游戏数据。导入数据需要包含以下字段：

- title: 游戏标题
- description: 游戏描述
- iframeUrl: 游戏嵌入 URL
- imageUrl: 游戏图片 URL
- categories: 游戏分类列表
- 其他可选字段...

## 项目结构

```
game-admin/
├── app/                # Next.js 应用目录
│   ├── (admin)/       # 管理后台路由
│   ├── api/           # API 路由
│   └── layout.tsx     # 根布局
├── components/        # React 组件
├── lib/              # 工具函数和配置
│   └── db/           # 数据库相关
├── public/           # 静态资源
└── styles/           # 样式文件
```

## 环境变量

必需的环境变量：

- `DATABASE_URL`: 数据库连接 URL

可选的环境变量：

- `NEXTAUTH_URL`: 认证 URL（如果使用认证）
- `NEXTAUTH_SECRET`: 认证密钥（如果使用认证）
- `UPLOAD_API_KEY`: 上传 API 密钥（如果使用外部上传服务）

## 开发指南

1. 代码规范
   - 使用 ESLint 和 Prettier 保持代码风格一致
   - 遵循 TypeScript 类型定义
   - 组件使用 React Hooks 和函数式组件

2. 提交规范
   - 使用清晰的提交信息
   - 遵循语义化版本控制

3. 测试
   - 运行单元测试：`npm run test`
   - 运行 E2E 测试：`npm run test:e2e`

## 许可证

[MIT License](LICENSE)