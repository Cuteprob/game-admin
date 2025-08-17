"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { DEFAULT_PROMPTS } from "@/lib/ai/config"
import { Loader2, Eye, Edit3, Save, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Category } from "@/types/category"

export default function ImportGamesPage() {
  const [rawData, setRawData] = useState("")
  const [jsonData, setJsonData] = useState("")
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_PROMPTS.GAME_IMPORT)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewContent, setPreviewContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // 获取所有分类
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const { data } = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  // 处理分类选择
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // 过滤分类
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 格式化Markdown内容
  const formatMarkdown = (content: string): string => {
    if (!content) return content
    
    console.log("🔍 开始格式化content，长度:", content.length)
    
    // 将压缩的Markdown内容展开为多行格式
    const formatted = content
      // 处理标题 - 使用更精确的正则表达式
      .replace(/^(#{2,4})\s*(.+?)(?=\n|$)/gm, '\n$1 $2\n')
      // 处理列表项 - 确保列表项前后有适当的空行
      .replace(/^(\d+\.\s*)/gm, '\n$1')
      .replace(/^(-\s*)/gm, '\n$1')
      .replace(/^(\*\s*)/gm, '\n$1')
      // 处理图片 - 确保图片前后有适当的空行
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\n![$1]($2)\n')
      // 处理分隔线
      .replace(/^---$/gm, '\n---\n')
      // 清理多余的空行，保持最多两个连续空行
      .replace(/\n{3,}/g, '\n\n')
      // 确保开头和结尾有适当的空行
      .replace(/^/, '\n')
      .replace(/$/, '\n')
      .trim()
    
    console.log("✨ 格式化完成，长度:", formatted.length)
    console.log("📊 是否有变化:", content !== formatted)
    
    return formatted
  }

  // 递归格式化对象中的所有content字段
  const formatContentFields = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(item => formatContentFields(item))
    }
    
    if (obj && typeof obj === 'object') {
      const formatted = { ...obj }
      
      // 格式化content字段
      if (formatted.content && typeof formatted.content === 'string') {
        formatted.content = formatMarkdown(formatted.content)
      }
      
      // 递归处理嵌套对象
      Object.keys(formatted).forEach(key => {
        if (typeof formatted[key] === 'object' && formatted[key] !== null) {
          formatted[key] = formatContentFields(formatted[key])
        }
      })
      
      return formatted
    }
    
    return obj
  }

  // 提取并格式化Markdown内容用于预览
  const extractMarkdownContent = (jsonString: string): string => {
    try {
      const parsedData = JSON.parse(jsonString)
      const data = Array.isArray(parsedData) ? parsedData[0] : parsedData
      
      // 检查 content 字段是否为字符串类型
      if (data && data.content && typeof data.content === 'string') {
        return formatMarkdown(data.content)
      }
      
      return "No content found in JSON data"
    } catch (error) {
      console.error("Error extracting markdown:", error)
      return "Invalid JSON format"
    }
  }

  // 将编辑后的Markdown内容更新回JSON
  const updateJsonWithMarkdown = (markdownContent: string) => {
    try {
      const parsedData = JSON.parse(jsonData)
      const data = Array.isArray(parsedData) ? parsedData[0] : parsedData
      
      if (data) {
        // 更新 content 字段
        data.content = markdownContent
        
        const updatedJson = Array.isArray(parsedData) ? [data] : data
        setJsonData(JSON.stringify(updatedJson, null, 2))
        toast.success("Markdown content updated in JSON")
      }
    } catch (error) {
      console.error("Error updating JSON:", error)
      toast.error("Failed to update JSON with markdown content")
    }
  }

  // 切换预览模式
  const togglePreviewMode = () => {
    if (!jsonData) {
      toast.error("No JSON data to preview")
      return
    }

    if (!isPreviewMode) {
      // 切换到预览模式
      const markdownContent = extractMarkdownContent(jsonData)
      setPreviewContent(markdownContent)
      setIsPreviewMode(true)
      setIsEditing(false)
      toast.success("Switched to Markdown preview mode")
    } else {
      // 切换回JSON模式
      setIsPreviewMode(false)
      setIsEditing(false)
      toast.success("Switched back to JSON mode")
    }
  }

  // 开始编辑Markdown
  const startEditing = () => {
    setIsEditing(true)
    toast.success("Entered edit mode - you can now modify the Markdown content")
  }

  // 保存编辑的Markdown内容
  const saveMarkdownContent = () => {
    updateJsonWithMarkdown(previewContent)
    setIsEditing(false)
    setIsPreviewMode(false)
  }

  // 取消编辑
  const cancelEditing = () => {
    setIsEditing(false)
    const markdownContent = extractMarkdownContent(jsonData)
    setPreviewContent(markdownContent)
    toast.info("Edit cancelled")
  }

  const generateGameData = async () => {
    if (!rawData) {
      toast.error("Please enter raw game data")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          rawData, 
          customPrompt,
          taskType: 'GAME_IMPORT'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to generate game data")
      }

      const { data } = await response.json()
      
      // 将选中的分类名称添加到生成的数据中
      const selectedCategoryNames = selectedCategories.map(id => 
        categories.find(c => c.id === id)?.name
      ).filter(Boolean)
      
      const processedData = Array.isArray(data) 
        ? data.map(game => ({ ...game, categories: selectedCategoryNames }))
        : { ...data, categories: selectedCategoryNames }

      // 格式化content字段
      console.log("🔄 开始自动格式化生成的数据")
      const formattedData = formatContentFields(processedData)
      console.log("✅ 自动格式化完成")

      const jsonString = JSON.stringify(formattedData, null, 2)
      setJsonData(jsonString)
      toast.success("Successfully generated and formatted game data")
    } catch (error) {
      console.error("Generation error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to generate game data")
      
      if (error instanceof Error && (
        error.message.includes('network') || 
        error.message.includes('connect')
      )) {
        toast.error("Network error. Please check your connection and try again.", {
          duration: 5000
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const importGames = async () => {
    if (!jsonData) {
      toast.error("Please generate or enter game data first")
      return
    }

    let parsedData
    try {
      parsedData = JSON.parse(jsonData)
      if (!Array.isArray(parsedData)) {
        parsedData = [parsedData]
      }
    } catch (error) {
      toast.error("Invalid JSON format. Please check the data format.")
      return
    }

    setIsImporting(true)
    try {
      const response = await fetch("/api/gamesBase/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to import games")
      }

      toast.success("Successfully imported games")
      setRawData("")
      setJsonData("")
      setSelectedCategories([])
      setIsPreviewMode(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Import error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to import games")
    } finally {
      setIsImporting(false)
    }
  }

  // 渲染Markdown预览内容
  const renderMarkdownPreview = (content: string) => {
    return content.split('\n').map((line, index) => {
      // 处理标题
      if (line.match(/^#{1,6}\s/)) {
        const level = line.match(/^(#{1,6})\s/)?.[1].length || 1
        const text = line.replace(/^#{1,6}\s/, '')
        const Tag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements
        return <Tag key={index} className={`font-bold ${level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg'} mt-4 mb-2`}>{text}</Tag>
      }
      
      // 处理粗体文本
      if (line.includes('**')) {
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.match(/^\*\*[^*]+\*\*$/)) {
                return <strong key={partIndex} className="font-bold">{part.slice(2, -2)}</strong>
              }
              return part
            })}
          </p>
        )
      }
      
      // 处理图片
      if (line.match(/!\[([^\]]*)\]\(([^)]+)\)/)) {
        const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
        if (match) {
          return (
            <div key={index} className="my-4">
              <img 
                src={match[2]} 
                alt={match[1]} 
                className="max-w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              {match[1] && <p className="text-sm text-gray-500 mt-1 text-center">{match[1]}</p>}
            </div>
          )
        }
      }
      
      // 处理链接
      if (line.match(/\[([^\]]+)\]\(([^)]+)\)/)) {
        const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g)
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
              if (linkMatch) {
                return (
                  <a 
                    key={partIndex} 
                    href={linkMatch[2]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {linkMatch[1]}
                  </a>
                )
              }
              return part
            })}
          </p>
        )
      }
      
      // 处理分隔线
      if (line.trim() === '---') {
        return <hr key={index} className="my-4 border-gray-300" />
      }
      
      // 处理列表项
      if (line.match(/^(\d+\.|\*|\-)\s/)) {
        return <li key={index} className="ml-4 mb-1">{line.replace(/^(\d+\.|\*|\-)\s/, '')}</li>
      }
      
      // 处理空行
      if (line.trim() === '') {
        return <br key={index} />
      }
      
      // 普通文本
      return <p key={index} className="mb-2">{line}</p>
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Import Games</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Raw Game Data</h2>
            <Textarea
              placeholder="Enter raw game data here..."
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              className="h-[200px] font-mono"
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Custom Prompt</h2>
            <Textarea
              placeholder="Enter custom prompt here..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="h-[200px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Categories</h2>
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            <ScrollArea className="h-[200px] border rounded-md p-2">
              {isLoadingCategories ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <Badge
                        variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                      >
                        {category.name}
                      </Badge>
                      {category.description && (
                        <span className="text-sm text-muted-foreground">
                          {category.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          <Button 
            onClick={generateGameData} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Game Data"
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {isPreviewMode ? "Markdown Preview" : "Generated JSON"}
              </h2>
              <div className="flex gap-2">
                {isPreviewMode && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startEditing}
                  >
                    <Edit3 className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                )}
                {isPreviewMode && isEditing && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={saveMarkdownContent}
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelEditing}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePreviewMode}
                  disabled={!jsonData}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  {isPreviewMode ? "JSON" : "Preview"}
                </Button>
              </div>
            </div>
            
            {isPreviewMode ? (
              <Card className="h-[400px]">
                <CardContent className="p-4 h-full overflow-auto">
                  {isEditing ? (
                    <Textarea
                      value={previewContent}
                      onChange={(e) => setPreviewContent(e.target.value)}
                      className="h-full font-mono resize-none border-0 focus-visible:ring-0"
                      placeholder="Edit Markdown content here..."
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      {renderMarkdownPreview(previewContent)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Textarea
                placeholder="Generated JSON will appear here..."
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="h-[400px] font-mono"
              />
            )}
          </div>
          
          <Button 
            onClick={importGames}
            disabled={isImporting}
            className="w-full"
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              "Import Games"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
