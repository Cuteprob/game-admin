# 游戏添加标准操作流程 (SOP)

## 1. 数据准备阶段

### 1.1 基础信息收集
- 游戏ID (kebab-case格式)
- 游戏标题
- 游戏描述
- iframe URL
- 游戏图片 (存放在 public/games/ 目录)
- 初始评分 (4.7-5.0范围)

### 1.2 分类标准
每个游戏必须包含以下分类：
- 至少1个主分类 (RACING/ACTION等)
- 至少1个玩法分类 (SINGLE_PLAYER/TWO_PLAYER/MULTIPLAYER)
- 相关主题分类 (如适用)
- 至少1个目标人群分类 (BOYS/GIRLS/KIDS)
- 至少1个功能性分类 (FEATURED/NEW/POPULAR/TRENDING)

总计应包含6-9个分类。

### 1.3 Metadata优化
- title: 40-50字符 (包含空格和符号)
- description: 140-150字符 (包含空格和符号)
- keywords: 相关关键词列表，包含目标关键词

## 2. 内容编写标准

### 2.1 游戏描述
- 简洁明了
- 突出游戏特色
- 自然融入关键词
- 避免过度营销语言

### 2.2 Controls指南
- fullscreenTip
- movement指南
- actions指南
- special技巧 (如适用)

### 2.3 Features列表
- 7-8个特性
- 突出游戏独特之处
- 使用动态和吸引人的描述
- 包含游戏核心机制

### 2.4 FAQs编写
- 5-7个常见问题
- 分类：gameplay/technical/features
- 回答详细且有帮助
- 自然融入关键词

## 3. SEO优化要求

### 3.1 关键词优化
- 主要关键词在title中出现
- description自然包含关键词
- 关键词在features和FAQs中适度出现
- 避免关键词堆砌

### 3.2 内容结构
- 使用合适的heading层级
- 内容段落组织合理
- 确保可读性和用户体验
- 适当使用列表和分段

## 4. 质量检查清单

### 4.1 数据完整性
- [ ] 所有必需字段都已填写
- [ ] 分类数量在6-9个范围内
- [ ] 图片路径正确
- [ ] iframe URL可访问

### 4.2 内容质量
- [ ] 描述文字流畅自然
- [ ] 控制指南清晰完整
- [ ] 特性列表有吸引力
- [ ] FAQ解答有实际帮助

### 4.3 SEO检查
- [ ] metadata字符数符合要求
- [ ] 关键词分布自然
- [ ] 内容结构合理
- [ ] 无重复或冗余内容

### 4.4 技术检查
- [ ] 代码格式正确
- [ ] 无类型错误
- [ ] 图片资源存在
- [ ] 分类使用正确

## 5. 提交流程

1. 准备游戏数据对象
2. 添加到games数组
3. 确保createdAt日期正确设置
4. 进行完整性检查
5. 测试所有辅助函数
6. 提交代码并验证

## 6. 维护更新

- 定期检查游戏链接是否有效
- 更新游戏评分
- 根据用户反馈优化内容
- 保持分类系统的一致性

## 注意事项

1. 创建日期规则：
    - 游戏创建日期应为当前日期
2. 图片命名规范：
   - 使用小写字母
   - 使用连字符分隔
   - 保存在正确的目录

3. 关键词优化：
   - 参考待优化关键词列表
   - 确保自然融入内容
   - 避免过度优化

4. 分类选择：
   - 确保分类的准确性
   - 保持分类数量适中
   - 覆盖所有必需类型
类型列表：
// 游戏类型分类 (主分类)
  RACING = "Racing Games",      // 赛车
  ACTION = "Action Games",      // 动作
  SHOOTER = "Shooter Games",    // 射击
  PUZZLE = "Puzzle Games",      // 解谜
  STRATEGY = "Strategy Games",  // 策略
  SPORTS = "Sports Games",      // 体育
  ADVENTURE = "Adventure Games", // 冒险
  
  // 游戏玩法分类
  MULTIPLAYER = "Multiplayer Games",    // 多人游戏
  TWO_PLAYER = "2 Player Games",        // 双人游戏
  SINGLE_PLAYER = "Single Player Games", // 单人游戏

  
  // 主题分类
  CAR = "Car Games",           // 汽车游戏
  FIGHTING = "Fighting Games", // 格斗游戏
  STICKMAN = "Stickman Games", // 火柴人游戏
  RUNNING = "Running Games",   // 跑酷游戏
  BOXING = "Boxing Games",     // 拳击游戏
  ANIMAL = "Animal Games",     // 动物游戏（新增）
  
  // 目标人群分类
  BOYS = "Games for Boys",     // 男孩游戏
  GIRLS = "Games for Girls",   // 女孩游戏
  KIDS = "Kids Games",         // 儿童游戏
  
  // 功能性分类
  FEATURED = "Featured Games",  // 特色游戏
  NEW = "New Games",           // 新游戏
  POPULAR = "Popular Games",   // 热门游戏
  TRENDING = "Trending Games", // 趋势游戏
  IO_GAMES = "IO Games",        // IO 游戏
  FPS = "FPS Games",            // 第一人称射击