## 20. House of Hazards UI Design Standards

### 20.1 色彩系统
#### 20.1.1 基础色值
- 主色调：`#4A90E2` (科技感蓝色) - 用于主要标题和重点强调
- 次要色：`#6C63FF` (活力紫色) - 用于次要元素和交互
- 强调色：`#00D9FF` (霓虹蓝) - 用于装饰和强调
- 背景色：`#1A1B1E` (深空灰) - 整体页面背景
- 文本色：
  - 主要文本：`#E8E9F3` (亮灰色)
  - 次要文本：`#9BA1B0` (中灰色)
- 卡片背景：`bg-white/80`
- 边框色：`#FFE5E5`

#### 20.1.2 应用规范
- 主标题：使用主色调 `#4A90E2`
- 副标题：使用主要文本色 `#E8E9F3`
- 正文：使用次要文本色 `#9BA1B0`
- 链接悬停：使用强调色 `#00D9FF`
- 分隔符：使用边框色 `#FFE5E5`
- 卡片背景：保持 `bg-white/80 backdrop-blur-sm`
- 按钮：保持现有样式，更新颜色

### 20.2 字体规范
#### 20.2.1 字体家族
- 标题字体：`Space Grotesk` - 现代科技感字体
- 正文字体：`Inter` - 清晰易读的现代字体
- 游戏数值字体：`JetBrains Mono` - 等宽字体，用于显示分数等

#### 20.2.2 字体应用
```css
/* 标题样式 */
.heading {
  font-family: 'Space Grotesk', sans-serif;
  @apply text-[#4A90E2];
}

/* 正文样式 */
.body {
  font-family: 'Inter', sans-serif;
  @apply text-[#9BA1B0];
}

/* 游戏数值样式 */
.game-stats {
  font-family: 'JetBrains Mono', monospace;
  @apply text-[#00D9FF];
}
```

### 20.12 UI 更新实施方案

#### 20.12.1 主题配置更新
1. `tailwind.config.ts` ✅
- [x] 更新颜色系统配置：
  ```js
  colors: {
    primary: {
      DEFAULT: '#4A90E2',
      foreground: '#E8E9F3'
    },
    secondary: {
      DEFAULT: '#6C63FF',
      foreground: '#9BA1B0'
    },
    accent: {
      DEFAULT: '#00D9FF',
      foreground: '#E8E9F3'
    },
    text: {
      primary: '#E8E9F3',
      secondary: '#9BA1B0'
    }
  }
  ```
- [x] 更新字体配置：
  ```js
  fontFamily: {
    heading: ['Space Grotesk', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  }
  ```

2. `app/globals.css`
- [ ] 更新 CSS 变量以匹配新主题：
  ```css
  :root {
    --background: #1A1B1E;
    --primary: #4A90E2;
    --secondary: #6C63FF;
    --accent: #00D9FF;
    --text-primary: #E8E9F3;
    --text-secondary: #9BA1B0;
  }
  ```

3. `components.json` (shadcn/ui 配置) ✅
- [x] 确认主题配置与新的颜色系统兼容
- [x] 验证组件样式正确应用新主题

#### 20.12.2 核心文件更新
1. `app/page.tsx`
- [ ] 主标题颜色从 `text-[#ff6b6bd8]` 改为 `text-[#4A90E2]`
- [ ] 副标题和正文文本颜色更新
- [ ] 卡片背景从 `bg-white/80` 改为 `bg-slate-800/80`
- [ ] 边框颜色从 `border-[#FFE5E5]` 改为 `border-[#2A2C32]`
- [ ] 链接悬停颜色从 `hover:text-[#ff5252fa]` 改为 `hover:text-[#00D9FF]`

2. `app/layout.tsx`
- [ ] 导入新字体
- [ ] 更新背景色为 `bg-[#1A1B1E]`

3. `components/ui/rating.tsx`
- [ ] 评分组件颜色方案更新
- [ ] 数值显示使用 JetBrains Mono 字体

4. `components/game-container.tsx`
- [ ] 容器背景色和边框颜色更新
- [ ] 控制按钮样式颜色更新

5. `components/related-games.tsx`
- [ ] 游戏卡片背景色和边框更新
- [ ] 标题和文本颜色更新

6. `components/games-sidebar.tsx`
- [ ] 侧边栏背景色和边框更新
- [ ] 链接和文本颜色更新

7. `components/features.tsx` 和 `components/faq.tsx`
- [ ] 卡片背景色和边框更新
- [ ] 文本颜色和字体更新

8. `components/ui/button.tsx`
- [ ] 更新按钮基础样式
- [ ] 更新按钮悬停状态
- [ ] 更新按钮激活状态

9. `components/ui/card.tsx`
- [ ] 更新卡片基础样式
- [ ] 更新卡片阴影效果
- [ ] 更新卡片悬停状态

10. `components/header.tsx`
- [ ] 更新导航链接颜色
- [ ] 更新 logo 样式
- [ ] 更新移动端菜单样式

11. `components/footer.tsx`
- [ ] 更新页脚背景色
- [ ] 更新链接颜色
- [ ] 更新版权信息样式

12. `app/globals.css`
- [ ] 添加新字体导入
- [ ] 更新全局颜色变量
- [ ] 更新基础样式类
- [ ] 更新动画和过渡效果

#### 20.12.3 注意事项
- 保持所有现有布局不变
- 保持所有现有间距规范
- 保持所有现有响应式设计
- 保持所有现有交互效果
- 只更新颜色和字体相关样式

#### 20.12.4 验证检查项
- [ ] 确认所有颜色更新符合新规范
- [ ] 确认字体应用正确
- [ ] 确认现有布局未被破坏
- [ ] 确认响应式设计正常
- [ ] 确认交互效果正常

#### 20.12.5 字体实现检查项
- [ ] 确保字体文件已优化（woff2格式）
- [ ] 实现字体预加载策略
- [ ] 设置合适的字体回退方案
- [ ] 验证字体在不同操作系统下的显示效果

#### 20.12.6 性能优化检查项
- [ ] 确保新增字体不影响页面加载速度
- [ ] 验证新颜色系统在不同设备上的显示效果
- [ ] 检查暗色模式兼容性
- [ ] 确保样式变更不影响现有动画性能

#### 20.12.7 浏览器兼容性检查
- [ ] Chrome/Edge 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版
- [ ] 移动端浏览器适配

#### 20.12.8 无障碍性检查
- [ ] 确保颜色对比度符合 WCAG 标准
- [ ] 验证文本可读性
- [ ] 检查焦点状态样式
- [ ] 确保键盘导航正常工作

#### 20.12.9 组件兼容性检查
- [ ] shadcn/ui 组件样式覆盖
- [ ] 自定义组件样式更新
- [ ] 第三方组件主题适配

#### 20.12.10 游戏相关组件检查
- [ ] GamesSidebar 分类样式更新
- [ ] GameGrid 布局和样式保持
- [ ] Rating 组件数值显示字体

