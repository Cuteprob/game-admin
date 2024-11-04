# houseofhazards-online Development SOP

## 文件结构
主要涉及文件：
- `app/page.tsx`: 主页面，包含游戏容器和布局
- `app/games/[id]/page.tsx`: 游戏详情页
- `app/games/page.tsx`: 游戏列表页
- `app/privacy/page.tsx`: 隐私政策页面
- `app/terms/page.tsx`: 服务条款页面
- `components/game-container.tsx`: 游戏容器组件
- `components/games-sidebar.tsx`: 游戏推荐侧边栏
- `components/related-games.tsx`: 相关游戏展示
- `components/ui/*`: shadcn/ui 组件
- `config/games.ts`: 游戏数据配置

## 1. 外部链接处理 (components/footer.tsx)
### 1.1 新标签页打开
问题：外部链接需要在新标签页打开并确保安全性
解决方案：
- 为所有外部链接（如 speedrun.com）添加 `target="_blank"`
- 同时添加 `rel="noopener noreferrer"` 确保安全性
- 内部链接（以 "/" 开头）保持在当前标签页打开
- 实现位置：主要在 footer.tsx 的 Community 部分
- 示例代码：
  ```tsx
  <a 
    href="https://www.speedrun.com/polytrack"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-600 hover:text-blue-600 transition-colors"
  >
    Leaderboard
  </a>
  ```

### 1.2 搜索引擎优化
问题：需要控制外部链接的 SEO 行为
解决方案：
- 为外部链接添加 `rel="nofollow"` 属性
- 完整的外部链接属性应为：`rel="nofollow noopener noreferrer"`
- 应用于所有指向第三方网站的链接
- 示例代码：
  ```tsx
  <a 
    href="https://www.speedrun.com/polytrack/levels"
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="text-slate-600 hover:text-blue-600 transition-colors"
  >
    Track Gallery
  </a>
  ```

### 1.3 链接类型区分
问题：需要区分内部链接和外部链接的处理方式
解决方案：
- 内部链接：使用 Next.js 的 Link 组件
  ```tsx
  <Link 
    href="/privacy" 
    className="text-slate-600 hover:text-blue-600 transition-colors"
  >
    Privacy Policy
  </Link>
  ```
- 外部链接：使用 a 标签，添加安全属性
  ```tsx
  <a 
    href="https://external-site.com"
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    External Link
  </a>
  ```

### 1.4 实现检查清单
- [ ] 所有外部链接都添加了 target="_blank"
- [ ] 所有外部链接都添加了 rel="noopener noreferrer"
- [ ] 所有外部链接都添加了 rel="nofollow"
- [ ] 内部链接用 Next.js Link 组件
- [ ] 链接样式保持一致

## 2. 游戏容器布局 (app/page.tsx)
### 2.1 基本结构
问题：需要合理组织游戏界面布局
解决方案：
- 游戏容器分为两个主要部分：
  1. 顶部：游戏 iframe（位于 app/page.tsx）
  2. 底部：控制按钮和提示信息
- 使用 space-y-4 控制垂直间距
- 最大宽度限制：max-w-4xl
- 示例代码：
  ```tsx
  <div className="aspect-video w-full relative rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg border border-slate-200 p-4">
    {/* Game Frame */}
    <iframe 
      ref={iframeRef}
      src={gameUrl}
      title={title}
      className="w-full h-full border-0 rounded-md bg-white" 
      allowFullScreen
    />

    {/* Controls and Instructions */}
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-slate-500">
        {fullscreenTip}
      </p>
      <div className="flex gap-2">
        {/* Control buttons */}
      </div>
    </div>
  </div>
  ```

### 2.2 控制按钮
问题：需要实现全屏和帮助功能
解决方案：
- 全屏按钮：使用 requestFullscreen API
- 帮助按钮：使用 shadcn/ui 的 DropdownMenu 组件
- 按钮样式：`hover:bg-slate-100 hover:text-blue-600 transition-colors shadow-sm`
- 按钮位：底部右侧对齐
- 示例代码：
  ```tsx
  <div className="flex gap-2">
    <Button 
      variant="outline" 
      size="icon"
      onClick={enterFullscreen}
      className="hover:bg-slate-200 bg-white/90 backdrop-blur-sm"
    >         
      {Icons.fullscreen}
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="hover:bg-slate-200 bg-white/90 backdrop-blur-sm"
        >
          {Icons.help}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ControlsGuide />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  ```

### 2.3 提示信息
问题：需要清晰的用户指引
解决方案：
- 清晰说明全屏操作方式
- 包含进入和退出全屏的说明
- 示例：`"Click the fullscreen button to expand the game window, press ESC to exit fullscreen"`
- 位置：底部左侧对齐
- 实现代码：
  ```tsx
  <p className="text-sm text-slate-500">
    Click the fullscreen button to expand the game window, press ESC to exit fullscreen
  </p>
  ```

### 2.4 实现检查清单
- [ ] 游戏容器使用正确的宽高比
- [ ] 控制按钮位置正确
- [ ] 提示文本清晰可见
- [ ] 全屏功能正常工作
- [ ] 帮助菜内容完整
- [ ] 响应式布局正常

## 3. React 水合（Hydration）问题处理
### 3.1 iframe 相关
问题：服务器端渲染和客户端渲染不匹配
解决方案：
- 移除 iframe 中的后备内容（p 标签）
- 使用自闭合标签形式
- 正确配置示例：
  ```tsx
  <iframe 
    ref={iframeRef}
    src={gameUrl}
    title={title}
    className="w-full h-full border-0 rounded-md bg-white" 
    allowFullScreen
    loading="lazy"
    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    referrerPolicy="no-referrer"
    onError={handleIframeError}
  />
  ```

### 3.2 加载状态处理
问题：需要优雅处理游戏加载过程
解决方案：
- 使用 Progress 组件显示加载进度
- 添加加载状态遮罩层
- 实现代码：
  ```tsx
  {isLoading ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10">
      <Progress value={progress} className="w-[60%] mb-4" />
      <p className="text-sm text-slate-500">Loading game...</p>
    </div>
  ) : null}
  ```

### 3.3 错误处理
问题：需要处理游戏加载失败的情况
解决方案：
- 添加错误状态和处理函数
- 显示用户友好的错误信息
- 提供重试选项
- 实现代码：
  ```tsx
  {error ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10">
      <p className="text-sm text-red-500">Failed to load game. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  ) : null}
  ```

### 3.4 实现检查清单
- [ ] iframe 使用自闭合标签
- [ ] 移除所有后备内容
- [ ] 加载状态显示正常
- [ ] 错误处理完善
- [ ] 进度条动画流畅
- [ ] 用户反馈清晰

## 4. 联系方式处理 (components/footer.tsx)
### 4.1 使用 Tooltip 组件
问题：需要优雅地显示联系方式，避免直接暴露邮箱
解决方案：
- 使用 shadcn/ui 的 Tooltip 组件替代传统链接
- 鼠标悬停时显示邮箱地址
- 实现位置：footer.tsx 的底部区域
- 完整实现示例：
  ```tsx
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-help">
        Contact
      </TooltipTrigger>
      <TooltipContent>
        <p>support@polytrack.com</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  ```

### 4.2 样式和交互
问题：需要保持与整体设计一致的视觉效果
解决方案：
- 使用一致的颜色主题
- 添加合适的悬停效果
- 使用 cursor-help 提示可交互
- 保持适当的间距

### 4.3 实现检查清单
- [ ] Tooltip 组件正常工作
- [ ] 悬停效果流畅
- [ ] 样式与整体设计一致
- [ ] 邮箱地址正确显示
- [ ] 移动端适配正常

## 5. 安全性考虑
### 5.1 iframe 安全配置 (components/game-container.tsx)
问题：需要安全地加载第三方游戏内容
解决方案：
- 使用 sandbox 属性限制权限：
  ```tsx
  <iframe 
    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    referrerPolicy="no-referrer"
    // ... other props
  />
  ```
- 权限说明：
  - allow-scripts: 允许运行脚本
  - allow-same-origin: 允许同源访问
  - allow-popups: 允许弹窗
  - allow-forms: 允许表单提交

### 5.2 外部资源处理
问题：需要安全地处理外部资源和链接
解决方案：
- 图片资源：
  ```tsx
  <img 
    src={game.image}
    alt={game.title}
    className="..."
    loading="lazy"  // 懒加载优化
    onError={handleImageError}  // 错误处理
  />
  ```
- 外部链接：
  ```tsx
  <a 
    href={game.url}
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="..."
  >
    {game.title}
  </a>
  ```

### 5.3 错误边界处理
问题：需要防止游戏错误影响整个应用
解决方案：
- 实现错误边界组件
- 添加错误处理和恢复机制
- 用户友好的错误提示
- 示例代码：
  ```tsx
  const handleIframeError = () => {
    setError(true);
    setIsLoading(false);
    // 可选：错误上报
    reportError('Game failed to load');
  };
  ```

### 5.4 实现检查清单
- [ ] iframe sandbox 配置正确
- [ ] 外部链接包含安全属性
- [ ] 图片资源正确处理
- [ ] 错误处理完善
- [ ] 用户数据安全保护

## 6. 样式指南
### 6.1 交互效果
问题：需要保持一致的交互体验
解决方案：
- 使用统一的过渡效果：
  ```css
  transition-colors    /* 颜色过渡 */
  transition-transform /* 变换过渡 */
  duration-300        /* 过渡时长 */
  ```
- 悬停效果示例：
  ```tsx
  // 按钮悬停
  className="hover:bg-slate-100 hover:text-blue-600 transition-colors"
  
  // 卡片悬停
  className="hover:shadow-md transition-shadow"
  
  // 图片悬停
  className="group-hover:scale-105 transition-transform duration-300"
  ```

### 6.2 响应式设计
问题：需要适配不同屏幕尺寸
解决方案：
- 使用 Tailwind 断点：
  ```css
  grid-cols-2          /* 移动端：2列 */
  md:grid-cols-3      /* 平板：3列 */
  lg:grid-cols-4      /* 桌面：4列 */
  xl:grid-cols-5      /* 大屏：5列 */
  ```
- 间距适配：
  ```css
  p-4 md:p-6 lg:p-8   /* 响应式内边距 */
  gap-4 md:gap-6      /* 响应式间距 */
  ```

### 6.3 颜色主题
问题：需要保持一致的视觉风格
解决方案：
- 主要颜色：
  ```css
  text-blue-600       /* 主要强调色 */
  text-slate-800      /* 主要文本色 */
  text-slate-600      /* 次要文本色 */
  text-slate-500      /* 辅助文本色 */
  ```
- 背景颜色：
  ```css
  bg-white            /* 主要背景色 */
  bg-slate-50         /* 次要背景色 */
  bg-gradient-to-br   /* 渐变背景 */
  ```

### 6.4 布局规范
问题：需要统一的布局结构
解决方案：
- 容器宽度：
  ```css
  max-w-4xl          /* 内容区域最大宽度 */
  max-w-7xl          /* 页面最大宽度 */
  ```
- 间距使用：
  ```css
  space-y-4         /* 垂直间距 */
  gap-4             /* 网格/弹性盒间距 */
  mb-4 mt-4         /* 外边距 */
  p-4               /* 内边距 */
  ```

### 6.5 实现检查清单
- [ ] 所有交互效果统一
- [ ] 响应式布局正常
- [ ] 颜色使用符合规范
- [ ] 间距使用一致
- [ ] 布局结构清晰

## 7. 组件依赖
### 7.1 必要的 shadcn/ui 组件 (components/ui/*)
问题：需要确保所有必要的 UI 组件可用
解决方案：
- 核心组件列表及其文件路径：
  ```
  components/ui/button.tsx
  components/ui/progress.tsx
  components/ui/dropdown-menu.tsx
  components/ui/tooltip.tsx
  components/ui/tabs.tsx
  components/ui/breadcrumb.tsx
  ```

### 7.2 图标配置 (config/icons.tsx)
问题：需要统一管理图标资源
解决方案：
- 创建图标配置文件：
  ```tsx
  export const Icons = {
    fullscreen: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M3 8V5a2 2 0 0 1 2-2h3"/>
        <path d="M16 3h3a2 2 0 0 1 2 2v3"/>
        <path d="M21 16v3a2 2 0 0 1-2 2h-3"/>
        <path d="M8 21H5a2 2 0 0 1-2-2v-3"/>
      </svg>
    ),
    help: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
    )
  }
  ```

### 7.3 类型定义 (types/*.ts)
问题：需要确保类型定义完整
解决方案：
- 组件 Props 类型：
  ```tsx
  interface GameContainerProps {
    game: Game;
  }

  interface GamesSidebarProps {
    currentGameId?: string;
  }

  interface BreadcrumbProps {
    items: {
      label: string;
      href: string;
    }[];
  }
  ```

### 7.4 实现检查清单
- [ ] 所有必要的 UI 组件已安装
- [ ] 图标配置完整
- [ ] 类型定义准确
- [ ] 组件导入路径正确
- [ ] 组件样式正确加载

## 8. 组件实现
### 8.1 游戏容器组件 (components/game-container.tsx)
问题：需要可复用的游戏展示容器
解决方案：
- 创建独立的游戏容器组件
- 支持加载状态和错误处理
- 实现全屏和控制功能
- 示例代码：
  ```tsx
  interface GameContainerProps {
    game: Game;
  }

  export function GameContainer({ game }: GameContainerProps) {
    // ... implementation
  }
  ```

### 8.2 游戏侧边栏 (components/games-sidebar.tsx)
问题：需要展示相似游戏推荐
解决方案：
- 创建侧边栏组件
- 过同类型游戏
- 实现紧凑的列表布局
- 示例代码：
  ```tsx
  interface GamesSidebarProps {
    currentGameId?: string;
  }

  export function GamesSidebar({ currentGameId }: GamesSidebarProps) {
    // ... implementation
  }
  ```

### 8.3 相关游戏展示 (components/related-games.tsx)
问题：需要展示游戏推��卡片
解决方案：
- 创建游戏卡片网格
- 实现响应式布局
- 添加交互效果
- 示例代码：
  ```tsx
  export function RelatedGames() {
    const featuredGames = games.slice(0, 4);
    // ... implementation
  }
  ```

### 8.4 实现检查清单
- [ ] 组件接口定义清晰
- [ ] Props 类型完整
- [ ] 错误处理完善
- [ ] 样式符合规范
- [ ] 复用性良好

## 9. 页面内容创建
### 9.1 基础页面结构 (app/privacy/page.tsx, app/terms/page.tsx)
问题：需要创建统一的法律页面（Privacy Policy, Terms of Service）
解决方案：
- 使用一致的页面布局结构：
  ```tsx
  <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
    <Breadcrumb items={[...]} />
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <h1>...</h1>
      <div className="prose prose-slate max-w-none">
        <sections.../>
      </div>
    </div>
  </main>
  ```

### 9.2 内容组织 (app/privacy/page.tsx, app/terms/page.tsx)
问题：需要清晰组织法律文档内容
解决方案：
- 使用 section 标签分隔不同部分
- 统一的标题层级结构：
  - h1: 页面主标题
  - h2: 章节标题
- 内容格式：
  ```tsx
  <section className="mt-8">
    <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Section Title</h2>
    <p className="text-slate-600 leading-relaxed mb-4">
      Main content...
    </p>
    <ul className="list-disc pl-6 space-y-2 text-slate-600">
      <li>List item...</li>
    </ul>
  </section>
  ```

### 9.3 样式指南 (app/privacy/page.tsx, app/terms/page.tsx)
问题：需要保持页面样式一致性
解决方案：
- 标题：
  - 主标题：`text-3xl font-bold text-slate-900`
  - 章节标题：`text-2xl font-semibold text-slate-800`
- 正文：
  - 段落：`text-slate-600 leading-relaxed`
  - 列表：`list-disc pl-6 space-y-2 text-slate-600`
- 间距：
  - 章节间距：`mt-8`
  - 段落间距：`mb-4`
  - 整体内容：`space-y-8`

### 9.4 更新日期处理 (app/privacy/page.tsx, app/terms/page.tsx)
问题：需要显示内容的最后更新日期
解决方案：
- 在页面顶部显示最后更新日期
- 使用 `new Date().toLocaleDateString()`
- 样式：`text-slate-600 leading-relaxed`
- 示例代码：
  ```tsx
  <p className="text-slate-600 leading-relaxed">
    Last updated: {new Date().toLocaleDateString()}
  </p>
  ```

### 9.5 实现检查清单
- [ ] 页面结构统一
- [ ] 标题层级正确
- [ ] 样式应用一致
- [ ] 更新日期显示正确
- [ ] 内容格式规范

## 10. SEO 优化指南
### 10.1 关键词密度控制 (components/faq.tsx)
问题：需要控制关键词密度在合理范围内
解决方案：
- 保持关键词密度在 3%-4% 之间
- 使用同义词和代词替换
- 避免过度优化
- 示例实现：
  ```tsx
  // 使用同义词替换
  "the game" // 替代产品名
  "our racing game" // 作为变体
  "track builder" // 描述功能
  ```

### 10.2 Metadata 配置 (app/layout.tsx, app/games/[id]/page.tsx)
问题：需要为每个页面配置合适的元数据
解决方案：
- 主页元数据：
  ```tsx
  export const metadata: Metadata = {
    title: "PolyTrack - Free Online Track Building Game",
    description: "Build and race on custom tracks in this fast-paced, low-poly driving game. Create, compete, and connect with the global PolyTrack community.",
    keywords: ["polytrack", "racing game", "track builder", "online game"],
  }
  ```
- 游戏页面动态元数据：
  ```tsx
  export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
    const game = games.find(game => game.id === params.id)
    return {
      title: game.metadata.title,
      description: game.metadata.description,
      keywords: game.metadata.keywords,
    }
  }
  ```

### 10.3 图片优化 (components/related-games.tsx, components/games-sidebar.tsx)
问题：需要优化图片资源以提升 SEO 表现
解决方案：
- 添加有意义的 alt 文本
- 使用适当的���片尺寸
- 实现懒加载
- 示例代码：
  ```tsx
  <img
    src={game.image}
    alt={`${game.title} screenshot - Play online racing game`}
    className="w-full h-full object-cover"
    loading="lazy"
  />
  ```

### 10.4 URL 结构优化 (app/games/[id]/page.tsx)
问题：需要优化 URL 结构以利于 SEO
解决方案：
- 使用清晰的路径结构
- 实现静态路径生成
- 示例代码：
  ```tsx
  export async function generateStaticParams() {
    return games.map((game) => ({
      id: game.id,
    }))
  }
  ```

### 10.5 实现检查清单
- [ ] 关键词密度合理
- [ ] Metadata 配置完整
- [ ] 图片优化到位
- [ ] URL 结构合理
- [ ] 内容语义化

## 11. 游戏推荐系统
### 11.1 相关游戏展示 (components/related-games.tsx)
问题：需要展示更多游戏选项，增加用户转化
解决方案：
- 创建独的 RelatedGames 组件
- 实现网格布局展示游戏卡片
- 游戏数据结构：
  ```typescript
  interface Game {
    id: string;
    title: string;
    description: string;
    image: string;
    type: GameType;
  }
  ```
- 卡片样式：
  ```tsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {games.map((game) => (
      <Link
        key={game.id}
        href={`/games/${game.id}`}
        className="group block bg-white rounded-lg shadow-sm..."
      >
        // ... card content
      </Link>
    ))}
  </div>
  ```

### 11.2 侧边栏推荐 (components/games-sidebar.tsx)
问题：需要在游戏区域右侧展示相似游戏推荐
解决方案：
- 创建 GamesSidebar 组件
- 数据结构：
  ```typescript
  interface SimilarGame {
    id: string;
    title: string;
    description: string;
    image: string;
    rating: number;
  }
  ```
- 布局整合 (app/games/[id]/page.tsx)：
  ```tsx
  <div className="flex gap-8">
    <div className="flex-1">
      {/* 现有游戏容器 */}
    </div>
    <GamesSidebar currentGameId={game.id} />
  </div>
  ```

### 11.3 样式规范
- 标题样式：
  ```tsx
  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
    Play Other Games
  </h2>
  ```
- 卡片交互：
  - 悬停效果：`hover:shadow-md transition-shadow`
  - 图标缩放：`group-hover:scale-110 transition-transform`
- 响应式设计：
  - 网格布局：`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
  - 侧边栏宽度：`max-w-xs`

### 11.4 SEO 优化
- 外部链接处理：
  - `target="_blank"`
  - `rel="nofollow noopener noreferrer"`
- 图片优化：
  - 添加有意义的 alt 文本
  - 使用适当的图片尺寸
- 语义化标签：
  - 使用 section 标签包裹相关内容
  - 使用适当的标题层级

### 11.5 实现检查清单
- [ ] 组件复用正确
- [ ] 样式应用统一
- [ ] 响应式布局正常
- [ ] SEO 优化到位
- [ ] 交互效果流畅

## 12. 游戏页面系统
### 12.1 游戏数据配置 (config/games.ts)
问题：需要统一管理游戏数据，支持游戏特定的配置
解决方案：
- 创建游戏数据结构：
  ```typescript
  export type GameType = 
    | "Racing"      // 赛车
    | "Action"      // 动作
    | "Shooter"     // 射击
    | "Puzzle"      // 解谜
    | "Strategy"    // 策略
    | "Sports"      // 体育
    | "Adventure";  // 冒险

  export interface Game {
    id: string;
    title: string;
    description: string;
    iframeUrl: string;
    image: string;
    rating: number;
    type: GameType;
    metadata: {
      title: string;
      description: string;
      keywords: string[];
    };
    controls: {
      fullscreenTip: string;
      guide: {
        movement: string[];
        actions: string[];
        special?: string[];
      };
    };
    features: string[];
  }
  ```

### 12.2 游戏列表页 (app/games/page.tsx)
问题：需要展所有游戏并按类型分类
解决方案：
- 实现分类展示：
  ```tsx
  export default function GamesPage() {
    const gameTypes = Array.from(new Set(games.map(game => game.type)));

    return (
      <div className="space-y-16">
        {/* All Games Section */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Game Categories */}
        {gameTypes.map((type) => (
          <GameCategorySection key={type} type={type} />
        ))}
      </div>
    );
  }
  ```

### 12.3 游戏详情页 (app/games/[id]/page.tsx)
问题：需要为每个游戏创建独立的详情页面
解决方案：
1. 静态路径生成：
   ```tsx
   export async function generateStaticParams() {
     return games.map((game) => ({
       id: game.id,
     }))
   }
   ```

2. 页面布局：
   ```tsx
   <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
     <Breadcrumb items={[...]} />
     
     <div className="space-y-12">
       {/* Game Section with Sidebar */}
       <div className="flex gap-8">
         <div className="flex-1">
           <GameContainer game={game} />
         </div>
         <GamesSidebar currentGameId={game.id} />
       </div>

       <RelatedGames />
       
       {/* Game Description */}
       <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
         <div className="space-y-4">
           <h2 className="text-2xl font-bold">About {game.title}</h2>
           <p className="text-lg text-slate-600">{game.description}</p>
         </div>
       </section>

       {/* Features and Controls */}
       <section className="max-w-4xl mx-auto space-y-8">
         <GameFeatures features={game.features} />
         <GameControls controls={game.controls} />
       </section>
     </div>
   </main>
   ```

### 12.4 SEO 和性能优化
问题：需要确保页面的 SEO 和性能表现
解决方案：
1. Metadata 生成：
   ```tsx
   export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
     const game = games.find(game => game.id === params.id);
     return {
       title: game.metadata.title,
       description: game.metadata.description,
       keywords: game.metadata.keywords,
     }
   }
   ```

2. 图片优化：
   ```tsx
   <img
     src={game.image}
     alt={`${game.title} screenshot`}
     className="w-full h-full object-cover"
     loading="lazy"
   />
   ```

### 12.5 实现检查清单
- [ ] 游戏数据结构完整
- [ ] 列表页分类展示正确
- [ ] 详情页布局合理
- [ ] 静态生成配置正确
- [ ] SEO 优化到位
- [ ] 响应式布局正常
- [ ] 组件复用恰当
- [ ] 性能优化完善

## 13. 游戏推荐系统优化
### 13.1 导航与游戏中心集成
问题：需要提供清晰的游戏中心入口和游戏推荐系统
解决方案：
- 在导航栏添加 Games 链接
- 优化游戏推荐组件
- 实现多层次的游戏发现机制

### 13.2 游戏侧边栏改进 (components/games-sidebar.tsx)
问题：需要展示相关游戏并提供更多游戏的入口
解决方案：
```typescript
interface GamesSidebarProps {
  currentGameId: string;
  gameType: string;
  limit?: number;
}

// 实现要点：
- 显示固定数量（默认4个）的同类型游戏
- 整合评分系统
- 提供"查看更多"链接到对应分类
- 优化布局和交互效果
```

### 13.3 相关游戏展示优化 (components/related-games.tsx)
问题：需要灵活展示更多游戏选项
解决方案：
```typescript
interface RelatedGamesProps {
  currentGameId?: string;
  maxGamesPerPage?: number;
  maxPages?: number;
}

// 心功能：
- 支持分页展示（默认每页5个，最多3页）
- 响应式布局（1/2/4/5列）
- 底部添加游戏中心入口
```

### 13.4 评分系统集成 (components/ui/rating.tsx)
问题：需要统一的游戏评分展示组件
解决方案：
```typescript
interface RatingProps {
  initialRating?: number;
  totalVotes?: number;
  onRate?: (rating: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  isReadOnly?: boolean;
}

// 关键特性：
- 支持只读/交互模式
- 多种尺寸选项
- 评分和投票统计
- 响应式交互效果
```

### 13.5 实现检查清单
- [ ] 导航栏 Games 链接正确配置
- [ ] 游戏侧边栏展示正常
- [ ] 相关游戏布局响应式正常
- [ ] 评分组件各种模式工作正常
- [ ] 所有链接正确指向目标页面
- [ ] 交互效果流畅自然
- [ ] 类型定义完整准确
- [ ] 组件间数据流转正确
```

## 14. 游戏配置标准化
### 14.1 游戏数据规范
问题：需要统一游戏配置的格式和标准
解决方案：
1. 游戏ID规范：
   - 使用 kebab-case 格式
   - 保持简短且具描述性
   - 示例：`city-car-stunt-4`, `rise-of-speed`

2. 图片规范：
   - 统一使用 .jpg 格式
   - 路径格式：`/games/Game_Name.jpg`
   - 片尺寸建议：800x600 或 16:9 比例

3. 评分规范：
   - 评分范围：4.0-5.0
   - 保留一位小数
   - 初始评分建议：4.7-4.9

4. 类型规范：
```typescript
type GameType = 
  | "Racing"   // 赛车游戏
  | "Action"   // 动作游戏
  | "Shooter"  // 射击游戏
  | "Puzzle"   // 解谜游戏
  | "Strategy" // 策略游戏
  | "Sports"   // 体育游戏
  | "Adventure"; // 冒险游戏
```

### 14.2 SEO 优化规范
1. 标题格式：
   - `{游戏名} - {游戏类型} | PolyTrack`
   - 包含主要关键词
   - 长度控制在 60 字符以内

2. 描述格式：
   - 包含游戏核心特性
   - 突出独特卖点
   - 长度控制在 150-160 字符
   - 包含行动召唤语句

3. 关键词规范：
   - 包含游戏名称变体
   - 包含游戏类型相关词
   - 包含游戏特性描述
   - 包含目标用户群相关词
   - 建议数量：10-15个

### 14.3 实现检查清单
- [ ] 游戏ID格式正确
- [ ] 图片格式统一
- [ ] 评分范围合理
- [ ] 游戏类型准确
- [ ] SEO元数据完整
- [ ] 关键词覆盖全面
- [ ] 描述文本优化
- [ ] 特性列表完整
```

## 15. 游戏页面 SEO 深度优化
### 15.1 游戏专属 FAQ 系统
问题：需要为每个游戏添加专门的 FAQ 以提升 SEO 和用户体验
解决方案：
1. FAQ 数据结构：
```typescript
interface GameFAQ {
  question: string;
  answer: string;
  category?: 'gameplay' | 'technical' | 'features' | 'general';
}

// 在 Game 接口中添加
interface Game {
  // ... 现有字段
  faqs: GameFAQ[];
}
```

2. FAQ 内容规范：
- 每个游戏至少包含 5-8 个常见问题
- 问题类别覆盖：
  * 游戏玩法
  * 技术要求
  * 特色功能
  * 常见问题
- 答案长度：50-150字
- 使用自然对话语气

3. FAQ 展示组件：
```tsx
<section className="max-w-4xl mx-auto mt-8">
  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
  <Accordion type="single" collapsible>
    {game.faqs.map((faq, index) => (
      <AccordionItem key={index} value={`faq-${index}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</section>
```

### 15.2 关键词优化策略
1. 长尾关键词扩展：
- 游戏特定功能
- 游戏玩法变体
- 目标用户群体
- 游戏难度级别
- 游戏更新内容

2. 关键词分类：
```typescript
interface GameKeywords {
  primary: string[];    // 主要关键词 (3-5个)
  secondary: string[];  // 次要关键词 (5-8个)
  related: string[];    // 相关关键词 (8-12个)
  technical: string[];  // 技术相关词 (3-5个)
}
```

3. 关键词布局：
- 标题中包含主要关键词
- 描述自然融入次关键词
- FAQ 中覆盖相关关键词
- 特性列表包含技术关键词

### 15.3 内容结构优化
1. 游戏描述分层：
```typescript
interface GameDescription {
  short: string;      // 简短描述 (150字以内)
  detailed: string;   // 详细描述 (300-500字)
  highlights: string[]; // 核心亮点 (3-5点)
}
```

2. 内容组织：
- H1: 游戏标题
- H2: 主要分区（About, Features, Controls, FAQ）
- H3: 子分区标题
- 使用语义化标签
- 添加结构化数据

### 15.4 实现检查清单
- [ ] FAQ 内容完整且有价值
- [ ] 关键词覆盖全面且自
- [ ] 内容结构层次分明
- [ ] 标题标签使用恰当
- [ ] 描述文本优化到位
- [ ] 结构化数据完整
- [ ] 移动端显示正常
- [ ] 页面加载性能良好
```

## 16. 图片资源标准化
### 16.1 图片规格标准
问题：需要统一图片格式和尺寸，优化加载性能
解决方案：

1. 缩略图规范：
- 尺寸：400x225px (16:9)
- 用���：
  * 游戏列表展示
  * 相关游戏推荐
  * 侧边栏预览
- 保持统一的宽高比以确保视觉一致性

2. 图片格式规范：
- 主要格式：.jpg
- 压缩质量：80%
- 文件大小限制：< 50KB
- 备选格式：.webp（如需进一步优化）

3. 命名规范：
```
public/games/
  ├── game-name.jpg      // 使用 kebab-case
  └── README.md          // 图片规范说明文档
```

### 16.2 图片优化流程
1. 图片处理步骤：
   - 裁剪到 400x225
   - 转换为 JPG 格式
   - 压缩到 50KB 以下
   - 保持图片质量

2. 图片加载优化：
```html
<img
  src="/games/game-name.jpg"
  alt="Game title"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

### 16.3 实现检查清单
- [ ] 所有图片尺寸为 400x225
- [ ] 文件格式统一为 JPG
- [ ] 文件大小小于 50KB
- [ ] 文件名使用 kebab-case
- [ ] 图片质量清晰
- [ ] 懒加载正确实现
- [ ] 图片比例一致
```

## 17. 首页 SEO 优化
### 17.1 关键词密度优化
问题：首页 PolyTrack 关键词密度需要提升到 3.5%-4.5%
解决方案：

1. 标题和描述优化：
```tsx
<h1 className="flex flex-col md:flex-row md:items-center gap-2">
  <span className="text-3xl font-bold">
    Welcome to PolyTrack
  </span>
  <span className="text-lg text-slate-600">
    Your Ultimate Gaming Platform
  </span>
</h1>

<p className="text-lg text-slate-600">
  Discover PolyTrack's extensive collection of free online games. 
  PolyTrack brings you the best gaming experience with carefully selected titles.
</p>
```

2. 特性介绍优化：
```tsx
<h2>The PolyTrack Gaming Experience</h2>
<div className="grid grid-cols-3">
  <div>
    <h3>Instant PolyTrack Gaming</h3>
    <p>Access PolyTrack's game collection instantly...</p>
  </div>
  // ... 其他特性
</div>
```

3. 行动召唤优化：
```tsx
<h2>Start Your PolyTrack Journey Today</h2>
<p>Join thousands of players on PolyTrack...</p>
<Link>Explore PolyTrack Games</Link>
```

### 17.2 优化原则
1. 关键词使用规范：
   - 标题中自然使用品牌名
   - 描述文本中适量重复
   - 特性介绍中融入品牌名
   - 保持文本自然可读性

2. 关键位置布局：
   - 页面标题 (H1)
   - 主要描述文本
   - 特性标题 (H2/H3)
   - 行动召唤按钮

3. 避免过度优化：
   - 不刻意堆砌关键词
   - 保持语言流畅自然
   - 优先考虑用户体验
   - 符合搜索引擎指南

### 17.3 实现检查清单
- [ ] 关键词密度达到 3.5%-4.5%
- [ ] 文本保持自然可读
- [ ] 标题层级合理
- [ ] 品牌名使用恰当
- [ ] 页面结构完整
- [ ] 用户体验良好
- [ ] 符合 SEO 最佳实践
- [ ] 移动端显示正常
```

## 18. Canonical URL 配置
### 18.1 Canonical URL 实现
问题：需要为所有页面添加 canonical URL 以避免重复内容问题
解决方案：

1. 页面 Metadata 配置：
```typescript
// 游戏详情页
export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  return {
    // ... 其他 metadata
    alternates: {
      canonical: `https://polytrack.xyz/games/${params.id}`,
    },
  }
}

// 首页
export const metadata: Metadata = {
  // ... 其他 metadata
  alternates: {
    canonical: "https://polytrack.xyz",
  },
}
```

2. 页面类型及其 Canonical URL：
- 首页：`https://polytrack.xyz`
- 游戏列表页：`https://polytrack.xyz/games`
- 游戏详情页：`https://polytrack.xyz/games/{id}`
- 功能介绍页：`https://polytrack.xyz/features`
- 帮助页面：`https://polytrack.xyz/how-to-play`
- FAQ页面：`https://polytrack.xyz/faq`

### 18.2 实现要点
1. URL 格式规范：
   - 使用完整的绝对路径
   - 不包含查询参数
   - 使用小写字母
   - 使用连字符分隔单词

2. 注意事项：
   - 每个页面只设置一个 canonical URL
   - URL 必须可访问
   - 保持 URL 稳定性
   - 避免循环引用

### 18.3 实现检查清单
- [ ] 所有页面都配置了 canonical URL
- [ ] URL 格式符合规范
- [ ] 路径正确且可访问
- [ ] 无重复配置
- [ ] 无循环引用
- [ ] 与 sitemap.xml 一致
- [ ] 与实际访问路径一致
```

## 19. Metadata 内容长度标准化
### 19.1 Metadata 长度规范
问题：需要优化游戏页面的 metadata 内容长度，提高 SEO 效果
解决方案：

1. 长度标准：
```typescript
interface GameMetadata {
  title: string;     // 40-50字符
  description: string; // 120-140字符
  keywords: string[]; // 2-5个关键词
}
```

2. 标题格式规范：
- 游戏名在前
- 包含游戏类型
- 以 "| PolyTrack" 结尾
- 示例：`"Basketball Legends - Multiplayer Sports Game | PolyTrack"`

3. 描述文本规范：
- 包含游戏核心玩法
- 突出主要特性
- 包含行动召唤
- 示例：`"Choose from legendary basketball players and compete in intense matches. Master special moves, unlock characters, and dominate the court in multiple game modes."`

4. 关键词规范：
- 游戏名称必选
- 游戏类型必选
- 游戏特色词
- 目标用户词
- 示例：`["basketball legends", "sports game", "multiplayer game", "basketball action"]`

### 19.2 实现检查清单
- [ ] 所有游戏标题在40-50字符
- [ ] 所有描述在120-140字符
- [ ] 关键词数量在2-5个
- [ ] 内容相关且自然
- [ ] 标题格式统一
- [ ] 描述包含核心特性
- [ ] 关键词覆盖全面
- [ ] 无重复内容
```

## 20. House of Hazards UI Design Standards

### 20.1 色彩系统
#### 20.1.1 基础色值
- 主色调：`#FF6B6B` (温暖的珊瑚红) - 用于主要标题和重点强调
- 次要色：`#FFB84C` (温暖的橙色) - 用于次要元素和交互
- 强调色：`#FF9F9F` (柔和的粉红) - 用于装饰和强调
- 背景色：`#FFF5E4` (温暖的米色) - 整体页面背景
- 文本色：
  - 主要文本：`#4A4A4A` (深灰色)
  - 次要文本：`#767676` (中灰色)

#### 20.1.2 应用规范
- 主标题：使用主色调 `#FF6B6B`
- 副标题：使用主要文本色 `#4A4A4A`
- 正文：使用次要文本色 `#767676`
- 链接悬停：使用 `#ff5252fa`
- 分隔符：使用 `#FFE5E5`
- 卡片背景：使用 `bg-white/80 backdrop-blur-sm`

### 20.2 字体规范
#### 20.2.1 字体家族
- 标题字体：`Fredoka One` - 圆润可爱的风格
- 正文字体：`Quicksand` - 易读现代风格

#### 20.2.2 字体层级
- 主标题：`text-3xl font-heading`
- 副标题：`text-xl font-heading`
- 正文：`text-base`
- 小文本：`text-sm`

### 20.3 布局标准
#### 20.3.1 响应式设计
- 小屏（移动端和平板）：2-3列
- 大屏（桌面和大屏）：5列

#### 20.3.2 间距规范
- 组件间距：`space-y-8`
- 内部间距：`p-4` (小组件) 或 `p-6` (大组件)
- 文本间距：`mb-2` (标题到内容) 或 `mt-4` (分隔内容)

### 20.4 组件样式
#### 20.4.1 卡片设计
```css
bg-white/80 backdrop-blur-sm
rounded-2xl
border border-[#FFE5E5]
hover:shadow-md
transition-all
```

#### 20.4.2 按钮样式
```css
/* 主要按钮 */
bg-primary text-[#FFF5E4] hover:bg-primary/90
rounded-full
transition-colors
font-heading

/* 次要按钮 */
border-2 border-secondary
bg-white/80
hover:bg-secondary/10
text-secondary
```

#### 20.4.3 链接样式
```css
text-text-secondary
hover:text-[#ff5252fa]
transition-colors
```

### 20.5 交互效果
#### 20.5.1 过渡动画
- 颜色过渡：`transition-colors`
- 变换过渡：`transition-transform duration-300`
- 阴影过渡：`transition-shadow`

#### 20.5.2 悬停效果
- 卡片悬停：`hover:shadow-md`
- 图片悬停：`group-hover:scale-105`
- 链接悬停：`hover:text-[#ff5252fa]`

### 20.6 设计原则
#### 20.6.1 视觉层级
- 使用颜色和大小建立清晰的视觉层级
- 主要内容使用较大字号和主色调
- 次要内容使用较小字号和次要文本色

#### 20.6.2 交互反馈
- 所有可交互元素都应有明确的悬停状态
- 使用过渡动画提供平滑的状态变化
- 保持交互反馈的一致性

#### 20.6.3 可访问性
- 确保文本对比度符合 WCAG 标准
- 使用适当的字体大小确保可读性
- 提供清晰的焦点状态

### 20.7 实现检查清单
- [ ] 颜色使用符合规范
- [ ] 字体应用正确
- [ ] 间距统一
- [ ] 响应式布局正常
- [ ] 交互效果流畅
- [ ] 过渡动画统一
- [ ] 组件样式一致
- [ ] 可访问性达标