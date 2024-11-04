# House of Hazards 开发规范

## 0. 文件结构
主要涉及文件：
```
src/
├── app/
│   ├── page.tsx                 # 主页面
│   ├── layout.tsx              # 全局布局
│   ├── globals.css             # 全局样式
│   └── games/
│       ├── page.tsx            # 游戏列表页
│       └── [id]/
│           └── page.tsx        # 游戏详情页
├── components/
│   ├── features.tsx            # 特性展示组件
│   ├── faq.tsx                # FAQ组件
│   ├── footer.tsx             # 页脚组件
│   ├── game-container.tsx     # 游戏容器组件
│   ├── games-sidebar.tsx      # 游戏侧边栏
│   ├── how-to-play.tsx        # 游戏指南组件
│   ├── navbar.tsx             # 导航栏组件
│   ├── related-games.tsx      # 相关游戏组件
│   └── ui/                    # UI基础组件
│       ├── button.tsx
│       ├── rating.tsx
│       └── ...
├── config/
│   ├── games.ts               # 游戏数据配置
│   └── icons.tsx              # 图标配置
└── public/
    └── features/              # 特性图片资源
        ├── graphics-quality.png
        ├── easy-controls.png
        └── ...
```

## 1. 依赖关系
### 1.1 核心依赖
```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0"
  }
}
```

### 1.2 字体依赖
```tsx
// app/layout.tsx
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
```

## 1. SEO 优化标准
### 1.1 关键词密度控制
- 目标密度：3%-4%
- 关键词："House of Hazards"
- 分布要求：
  * 标题：1-2次
  * 描述文本：2-3次/段
  * 特性介绍：1-2次/特性
  * 自然融入，避免堆砌

### 1.2 Metadata 规范
- 标题长度：40-50字符
- 描述长度：120-160字符
- 关键词数量：2-5个
- 格式示例：
  ```typescript
  export const metadata: Metadata = {
    title: "House of Hazards - Free Online Multiplayer Game Platform",
    description: "Play House of Hazards, a thrilling multiplayer game with unique challenges. Navigate hazard-filled rooms, compete with friends and enjoy browser gaming!",
    keywords: [
      "house of hazards",
      "multiplayer game",
      "online game",
      "browser game",
      "free game"
    ]
  }
  ```

## 2. 组件设计标准
### 2.1 Features 组件
- 使用马赛克布局
- 左侧大卡片展示主要特性
- 右侧小卡片展示其他特性
- 图片尺寸规范：
  * 大卡片：256x256px
  * 小卡片：128x128px

### 2.2 FAQ 组件
- 问答形式展示
- 每个问题自然包关键词
- 回答详细且信息丰富
- 保持流畅的语言风格

### 2.3 HowToPlay 组件
- 步骤式引导
- 包含游戏模式说明
- 详细的控制指南
- 任务和惩罚机制说明

## 3. 图片资源规范
### 3.1 图片规格
- 尺寸：400x225px (16:9)
- 格式：PNG（带透明背景）
- 质量：80%
- 大小：< 50KB

### 3.2 命名规则
- 使用 kebab-case
- 位置：/public/features/
- 示例：graphics-quality.png

## 4. 设计系统
### 4.1 色彩系统
- 主色调：#FF6B6B
- 次要色：#FFB84C
- 强调色：#FF9F9F
- 背景色：#FFF5E4
- 文本色：
  * 主要：#4A4A4A
  * 次要：#767676

### 4.2 字体规范
- 标题：Fredoka One
- 正文：Quicksand
- 大小：
  * 主标题：text-3xl
  * 副标题：text-xl
  * 正文：text-base
  * 小文本：text-sm

### 4.3 布局标准
- 响应式：
  * 小屏：2-3列
  * 大屏：5列
- 间距：
  * 组件间：space-y-8
  * 内部：p-4/p-6

## 5. 实现检查清单
### 5.1 SEO 检查
- [ ] 关键词密度达标
- [ ] Metadata 长度符合规范
- [ ] 关键词分布自然
- [ ] 标题层级合理

### 5.2 组件检查
- [ ] Features 布局正确
- [ ] FAQ 内容完整
- [ ] HowToPlay 步骤清晰
- [ ] 交互效果流畅

### 5.3 资源检查
- [ ] 图片规格统一
- [ ] 命名规范正确
- [ ] 载优化完成
- [ ] 文件大小达标

### 5.4 设计检查
- [ ] 色彩应用统一
- [ ] 字体使用正确
- [ ] 响应式正常
- [ ] 间距规范统一 

## 6. 域名配置规范
### 6.1 域名重定向标准
- 主域名：www.houseofhazards.online
- 重定向规则：
  * houseofhazards.online -> www.houseofhazards.online
  * http:// -> https://
  * 使用 301 永久重定向

### 6.2 Cloudflare 配置
- Page Rules 设置：
  ```plaintext
  URL pattern: houseofhazards.online/*
  Setting: Forwarding URL
  Status: 301 Permanent Redirect
  Destination URL: https://www.houseofhazards.online/$1
  ```
- SSL/TLS: Full (Strict)
- Always Use HTTPS: On

### 6.3 内部链接规范
- 所有内部链接使用 www 版本
- metadata 配置：
  ```typescript
  metadataBase: new URL('https://www.houseofhazards.online')
  canonical: "https://www.houseofhazards.online"
  ```
- sitemap.xml 使用 www 版本
- robots.txt 中使用 www 版本

### 6.4 验证方法
1. 使用 curl 测试重定向：
   ```bash
   curl -I http://houseofhazards.online
   curl -I https://houseofhazards.online
   ```
   
2. 期望结果：
   - 301 永久重定向
   - 正确的 Location header
   - 适当的缓存控制

3. Google Search Console：
   - 仅添加 www 版本
   - 验证所有权
   - 监控重定向性能

### 6.5 维护检查清单
- [ ] 定期验证重定向是否正常
- [ ] 检查内部链接一致性
- [ ] 监控 Search Console 报告
- [ ] 确保 SSL 证书有效