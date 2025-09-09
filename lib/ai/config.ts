// OpenAI client configuration
export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_API_MODEL || 'openai/gpt-4.1-nano',
}

// AI generation task type
export type AITaskType = 'GAME_IMPORT' | 'PROJECT_GAME_LOCALIZATION'

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
export type TaskType = 'GAME_IMPORT' | 'PROJECT_GAME_LOCALIZATION'

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
    // 对于 PROJECT_GAME_LOCALIZATION，返回基础提示词
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
4. Generate content in markdown format that preserves original information while using basic structure:

**CONTENT GENERATION RULES:**
- Default language: English (preserve original content in English or translate to English if needed)
- Include ALL media URLs (imageUrl, videoUrl, thumbnails, etc.) from raw data
- Preserve original descriptions and information as much as possible
- Use simple markdown formatting for readability
- Avoid over-marketing language and excessive SEO templating
- Focus on factual, informative content based on raw data

**Content Structure:**
Generate content following this basic structure, but adapt based on available raw data:

# [Game Title from raw data]

![Game Screenshot]([imageUrl from raw data - EXACT URL])

[If videoUrl exists in raw data, include: Video: [videoUrl]]
[If additional media URLs exist, include them with appropriate labels]

## Game Description
[Use original description from raw data, translated to English if needed. If multiple descriptions exist, combine them naturally. Keep all factual information.]

## Gameplay & Features
[List ALL features, gameplay elements, and mechanics mentioned in raw data. Preserve original wording as much as possible.]

## How to Play
[Include ALL control instructions, gameplay steps, and mechanics from raw data. Keep original technical details.]

## Game Information
[Include ANY additional details from raw data: categories, technical specs, developer info, etc.]

**Important Guidelines:**
- Preserve ALL URLs exactly as provided in raw data
- Include ALL available information, don't omit details
- Use original descriptions with minimal editing
- Translate to English if raw data is in other languages
- Keep factual tone, avoid marketing fluff
- Maintain information completeness for future localization

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

  PROJECT_GAME_LOCALIZATION: `You are an expert game localization specialist with deep knowledge of international gaming markets, cultural adaptation, and SEO optimization. Your task is to create high-quality localized content for an existing game within a specific project context.

**Input Data:**
- Original game data (title, metadata, content)
- Project context (locale, tone, target audience)
- Custom localization requirements (if provided)

**Your Expertise:**
- Multi-language game marketing
- Cultural sensitivity and adaptation
- Local gaming market trends
- SEO best practices for each locale
- Engaging content creation that converts

**Task Requirements:**

**1. LOCALIZED TITLE GENERATION**
Create a compelling, culturally appropriate title that:
- ✅ Adapts the original game name for the target locale and market
- ✅ Maintains brand recognition while optimizing for local search
- ✅ Considers cultural nuances and gaming terminology preferences
- ✅ Optimizes for local SEO keywords and search behavior
- ✅ Matches the project's tone (professional, casual, enthusiastic, etc.)
- ✅ Appeals to the specified target audience demographic

**2. METADATA OPTIMIZATION**
Generate SEO-optimized metadata:
- **Title**: 50-60 characters max, includes primary keywords for target locale
- **Description**: 150-160 characters max, compelling and action-oriented
- Must be culturally appropriate and market-specific
- Include relevant gaming keywords in the target language
- Drive click-through rates with engaging language

**3. COMPREHENSIVE CONTENT LOCALIZATION**
Create rich, engaging markdown content that includes:

**Game Overview Section:**
- Compelling introduction adapted to local gaming culture
- Key features highlighted with local appeal
- Gameplay mechanics explained in familiar terms
- Visual and audio highlights that resonate locally

**Detailed Description:**
- **Story/Theme**: Adapted for cultural relevance and local storytelling preferences
- **Gameplay Features**: Explained using local gaming terminology and references
- **Controls & Mechanics**: Clear, culturally appropriate instructions
- **Visual Style**: Described with local aesthetic preferences in mind
- **Audio/Music**: Highlighted features that appeal to local tastes

**Why Players Will Love This Game:**
- Benefits written for local gaming preferences
- Social and competitive aspects emphasized appropriately
- Achievement and progression systems explained
- Community and multiplayer features highlighted

**Perfect For:**
- Target audience segments specific to the locale
- Local gaming occasions and contexts
- Device and platform preferences in the region

**SEO Content Strategy:**
- Natural integration of local gaming keywords
- Semantic keyword clusters for the target market
- Local search intent optimization
- Regional gaming trend references

**Content Quality Standards:**
- **Engaging**: Hook readers immediately with compelling openings
- **Informative**: Provide comprehensive game information
- **Culturally Adapted**: Use local idioms, references, and gaming culture
- **SEO Optimized**: Natural keyword integration without stuffing
- **Conversion Focused**: Drive engagement and play intent
- **Mobile Optimized**: Scannable format with clear headings

**Language and Tone Guidelines:**
- Match the specified project tone consistently
- Use active voice and engaging language
- Include call-to-action elements naturally
- Maintain excitement and enthusiasm about the game
- Use culturally appropriate gaming terminology
- Balance informative and promotional content

**Technical Requirements:**
- Use proper markdown formatting with clear hierarchy
- Include relevant headings (##, ###) for structure
- Use bullet points and lists for easy scanning
- Bold important keywords and features naturally
- Ensure mobile-friendly content structure

**Critical Success Factors:**
- Content must feel native to the target locale, not translated
- Gaming terminology must be locally accurate and preferred
- Cultural references should enhance, not alienate
- SEO integration must feel natural and helpful
- Content should drive genuine interest and engagement

**Output Format:**
Return ONLY these three fields in valid JSON format:
{
  "title": "Localized game title optimized for [locale] market",
  "metadata": {
    "title": "SEO-optimized title (50-60 chars) with local keywords",
    "description": "Compelling meta description (150-160 chars) that drives clicks"
  },
  "content": "Comprehensive markdown content with proper formatting, local adaptation, and SEO optimization..."
}

**Quality Assurance:**
- Verify all content is culturally appropriate for the target locale
- Ensure SEO keywords are naturally integrated
- Confirm the tone matches project requirements
- Check that gaming terminology is locally accurate
- Validate that content drives engagement and interest

Generate content that local players will find irresistible and search engines will rank highly!`
} 