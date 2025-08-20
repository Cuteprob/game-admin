// OpenAI client configuration
export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_API_MODEL || 'openai/gpt-4.1-nano',
}

// AI generation task type
export type AITaskType = 'GAME_IMPORT' | 'GAME_CONTENT'

// AI generation configuration interface
export interface AIGenerationConfig {
  taskType: AITaskType
  systemPrompt?: string
  temperature?: number
}

// 模型配置接口
export interface ModelConfig {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty?: number
  complexity: 'low' | 'medium' | 'high'
  jsonReliability: 'low' | 'medium' | 'high'
  costEfficiency: 'low' | 'medium' | 'high'
}

// 验证过的4个模型配置（按优先级排序）
export const VERIFIED_MODELS: Record<string, ModelConfig> = {
  // 主模型 - 当前首选
  'openai/gpt-4.1-nano': {
    temperature: 0.3,
    maxTokens: 4000,
    topP: 0.9,
    frequencyPenalty: 0.2,
    presencePenalty: 0.1,
    complexity: 'high',
    jsonReliability: 'high',
    costEfficiency: 'high'
  },
  
  // 备用模型1 - 性价比之王
  'google/gemini-2.5-flash-lite': {
    temperature: 0.3,
    maxTokens: 3500,
    topP: 0.85,
    frequencyPenalty: 0.1,
    complexity: 'high',
    jsonReliability: 'high',
    costEfficiency: 'high'
  },
  
  // 备用模型2 - 经典可靠
  'openai/gpt-4o-mini': {
    temperature: 0.3,
    maxTokens: 3000,
    topP: 0.9,
    frequencyPenalty: 0.2,
    complexity: 'high',
    jsonReliability: 'high',
    costEfficiency: 'medium'
  },
  
  // 备用模型3 - 大参数开源
  'openai/gpt-oss-120b': {
    temperature: 0.3,
    maxTokens: 2500,
    topP: 0.9,
    frequencyPenalty: 0.2,
    complexity: 'high',
    jsonReliability: 'high',
    costEfficiency: 'high'
  }
}

// 验证过的模型列表（按优先级排序）
export const VERIFIED_MODEL_LIST = [
  'openai/gpt-4.1-nano',
  'google/gemini-2.5-flash-lite', 
  'openai/gpt-4o-mini',
  'openai/gpt-oss-120b'
] as const

// 任务类型定义
export type TaskType = 'GAME_IMPORT' | 'GAME_CONTENT'

export interface OptimizationOptions {
  model: string
  taskComplexity?: 'simple' | 'medium' | 'complex'
  outputFormat?: 'json' | 'text' | 'markdown'
}

// 提示词优化器类
export class PromptOptimizer {
  /**
   * 获取模型配置
   */
  static getModelConfig(modelName: string): ModelConfig {
    return VERIFIED_MODELS[modelName] || VERIFIED_MODELS['openai/gpt-4.1-nano']
  }

  /**
   * 优化提示词以适应特定模型
   */
  static optimizePrompt(taskType: TaskType, options: OptimizationOptions): string {
    const config = this.getModelConfig(options.model)
    const basePrompt = this.getBasePrompt(taskType)
    
    // 所有验证过的模型都是高能力模型，使用完整提示词
    if (config.complexity === 'high' && config.jsonReliability === 'high') {
      return this.enhanceForHighCapabilityModel(basePrompt, taskType)
    } else {
      // 降级处理，但仍使用完整提示词
      return this.adaptForMediumCapabilityModel(basePrompt, taskType)
    }
  }

  /**
   * 获取基础提示词
   */
  private static getBasePrompt(taskType: TaskType): string {
    return DEFAULT_PROMPTS[taskType]
  }

  /**
   * 获取备选提示词（用于fallback或测试）
   */
  static getAlternativePrompt(taskType: TaskType, version: 'simplified' | 'minimal'): string {
    if (taskType === 'GAME_IMPORT') {
      return version === 'simplified' 
        ? ALTERNATIVE_PROMPTS.GAME_IMPORT_SIMPLIFIED
        : ALTERNATIVE_PROMPTS.GAME_IMPORT_MINIMAL
    }
    return DEFAULT_PROMPTS[taskType]
  }

  /**
   * 为高能力模型增强提示词
   */
  private static enhanceForHighCapabilityModel(basePrompt: string, taskType: TaskType): string {
    const enhancement = `ENHANCED MODE - Verified High-Capability Model:
- Apply sophisticated content analysis and generation
- Ensure exceptional JSON structure compliance
- Generate rich, SEO-optimized content with natural keyword integration
- Maintain perfect URL preservation and formatting

`
    return enhancement + basePrompt
  }

  /**
   * 为中等能力模型适配提示词
   */
  private static adaptForMediumCapabilityModel(basePrompt: string, taskType: TaskType): string {
    const guidance = `VERIFIED MODEL - Standard Guidelines:
- Follow ALL instructions carefully, especially URL preservation rules
- Generate complete, structured content as specified
- Ensure valid JSON output format
- Pay special attention to markdown formatting requirements

`
    return guidance + basePrompt
  }

  /**
   * 获取验证过的模型列表
   */
  static getVerifiedModels(): string[] {
    return [...VERIFIED_MODEL_LIST]
  }

  /**
   * 检查模型是否已验证
   */
  static isVerifiedModel(modelName: string): boolean {
    return VERIFIED_MODEL_LIST.includes(modelName as any)
  }
}

// 提示词版本接口（预留给未来的版本管理功能）
export interface PromptVersion {
  id: string
  name: string
  description: string
  prompt: string
  createdAt: Date
  isActive: boolean
  successRate?: number
}

// 备选提示词版本（用于fallback或A/B测试）
export const ALTERNATIVE_PROMPTS = {
  GAME_IMPORT_SIMPLIFIED: `You are a game data processing expert. Analyze the provided raw game data and generate a structured game data object.

CRITICAL RULES:
1. Copy imageUrl and iframeUrl EXACTLY as provided - do not modify any characters
2. Use relative paths for internal links: /gameId
3. Generate actual content when you see [instructions] - do not repeat the instruction text
4. Base all content on the provided raw data only - do not invent information

⚠️ CRITICAL: The "content" field MUST be a simple string with markdown content, NOT an object.

Generate content in this JSON structure:
{
  "title": "Game Title",
  "imageUrl": "exact_url_from_input",
  "iframeUrl": "exact_url_from_input", 
  "metadata": {
    "title": "SEO title (30 chars)",
    "description": "SEO description (130 chars)"
  },
  "content": "## Short Description\\n[10 word description]\\n\\n## Game Overview\\n[20-30 word introduction]\\n\\n## How To Play\\n[30-50 word gameplay description]\\n\\n## Game Features\\n[20-30 word features list]"
}`,

  GAME_IMPORT_MINIMAL: `You are a game data processor. 

⚠️ CRITICAL: The "content" field MUST be a simple string with markdown content, NOT an object.

Generate JSON with this structure:
{
  "title": "Game Title",
  "imageUrl": "exact_url_from_input",
  "iframeUrl": "exact_url_from_input",
  "metadata": {
    "title": "SEO title",
    "description": "SEO description"
  },
  "content": "## Description\\n[Game description]\\n\\n## How To Play\\n[Gameplay instructions]\\n\\n## Features\\n[Game features]"
}

Keep URLs exactly as provided. Generate content based on input data only.`
}

// Default system prompts
export const DEFAULT_PROMPTS = {
  GAME_IMPORT: `You are a game data processing expert. Your task is to analyze the provided raw game data and generate a structured game data object with markdown content.

⚠️ **CRITICAL RULE - URL PRESERVATION** ⚠️
You MUST copy the imageUrl and iframeUrl EXACTLY as provided in the raw data. 
DO NOT change any characters, hyphens, underscores, or formatting in URLs.
If the raw data has "bunny-farm", keep it as "bunny-farm", NOT "bunny_farm".

⚠️ **CRITICAL RULE - INTERNAL LINK FORMAT** ⚠️
For internal game page links, use the format /{gameId} where {gameId} is the exact game ID from the raw data.
DO NOT use hardcoded domains like "game-domain.org" or "game.org".
Use relative paths that work across different project domains.

⚠️ **CRITICAL RULE - CONTENT GENERATION** ⚠️
When you see instructions in square brackets like [Create a catchy...], you MUST generate the actual content, NOT repeat the instruction text.
DO NOT output the instruction text itself - generate the requested content instead.

⚠️ **CRITICAL RULE - DATA ACCURACY** ⚠️
You MUST base ALL content generation on the provided raw game data ONLY. 
DO NOT invent, fabricate, or add information that is not present in the original data.
DO NOT create misleading descriptions that don't match the actual game features.
If specific game details are not provided in the raw data, use general descriptions or omit those details rather than making assumptions.

Please follow these guidelines:
1. Keep game ID、title、iframeUrl、imageUrl EXACTLY as provided in raw game data - DO NOT modify any URLs
2. Generate metadata that follows these rules:
   - Title should be around 30 characters and include SEO keywords
   - Description should be around 130 characters and include SEO keywords
   - No keywords generated
3. Ensure all URLs are properly formatted
4. Generate content in markdown format following this exact structure:

## [Create a catchy, engaging short description of the game in exactly 10 words or less. Example: "Welcome to Scrandle – The Ultimate Food Comparison Game"]

[Generate a longer game description in 15-20 words that expands on the short description]

![Game Name Screenshot](image url)

## [Game Name] Overview 

### What is [Game Name]?
[Introduce the game name, make important keywords **bold**, 20-30 words]

### Gameplay
[Describe the gameplay based on provided information, 30-50 words, naturally incorporate keywords]

---

## How To Play [Game Name] Online?

[Game Name] is playable at **[Game Name](/gameId)**  - no download, no sign-up, just pure browser-based fun. It's mobile-friendly and 100% free. [Add more information about the game, 20-30 words, naturally incorporate keywords]

### Steps-By-Step To Play [Game Name] Online:

1. **Visit [Game Name] page** - Navigate to **[Game Name](/gameId)** , no app needed.
2. **Start playing** - [Describe specific game operation based on provided information, 3-5 steps, especially how to move or how to take action, clearly describe gameplay, naturally incorporate keywords]

### Tips & Tricks for [Game Name]

- **Master the basics** - [Describe game tips based on provided information, 3-5 tips, clearly describe specific techniques, naturally incorporate keywords]

### Why Play [Game Name]?
[List several game advantages, 20-30 words, naturally incorporate keywords]

---

## Related Games

If you enjoy **[Game Name]**, you might also like:

- **[Game Name](/gameId)**  - Brief introduction
- **[Game Name](/gameId)**  - Brief introduction

---

## FAQ
### **Q: What is [Game Name]?**
A: [Answer with keywords naturally incorporated]

### **Q: How do I start playing [Game Name]?**
A: [Answer with keywords naturally incorporated]

### **Q: What are the best strategies for [Game Name]?**
A: [Answer with keywords naturally incorporated]

### **Q: Is [Game Name] free to play?**
A: [Answer with keywords naturally incorporated]

### **Q: Can I play [Game Name] on mobile devices and desktop?**
A: [Answer with keywords naturally incorporated]



---

## Ready To Play [Game Name]?

Play [Game Name] Online now at **[Game Name](/gameId)** - [A call to action sentence containing keywords]

**Important Notes:**
- Use consistent game name formatting: [Game Name] for titles, [game name] for lowercase references
- Make important keywords **bold** throughout the content
- Ensure all links are properly formatted with descriptive text
- Keep content engaging and SEO-friendly
- Use proper markdown formatting for headers, lists, and emphasis
- **CRITICAL: NEVER modify the original imageUrl, iframeUrl, or any URLs from the raw data - use them exactly as provided**
- **CRITICAL: ONLY use information from the provided raw game data - do not invent or assume game features**
- **CRITICAL: Use folder structure for internal links** - Use /gameId format for game page links, where {gameId} should be replaced with the actual game ID from the raw data

⚠️ **CRITICAL RULE - CONTENT FORMAT** ⚠️
The "content" field MUST be a simple string containing the markdown content. 
DO NOT generate a complex object or nested structure for the content field.
CORRECT: "content": "## Game Title\n\nMarkdown content here..."
WRONG: "content": {"shortDescription": "...", "longDescription": "..."}

The output should match this EXACT format:
{
  "id": "string",
  "title": "string", 
  "iframeUrl": "string", // MUST be exactly as provided in raw data
  "imageUrl": "string", // MUST be exactly as provided in raw data
  "rating": number,
  "categories": ["string"],
  "metadata": {
    "title": "string",
    "description": "string"
  },
  "content": "string" // MUST be a simple string with markdown content
}

Please return the data in valid JSON format.`,

  GAME_CONTENT: `You are a game content creation expert. Your task is to generate engaging game descriptions and related content based on the game type.

Please follow these guidelines:
1. Create compelling game descriptions
2. Highlight unique features
3. Generate relevant FAQs
4. Optimize content for SEO
5. Maintain professional tone
6. Focus on gameplay aspects

Please return the data in JSON format.`
} 