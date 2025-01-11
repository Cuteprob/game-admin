"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { DEFAULT_PROMPTS } from "@/lib/ai/config"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface Category {
  id: string
  name: string
  description?: string
}

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

      setJsonData(JSON.stringify(processedData, null, 2))
      toast.success("Successfully generated game data")
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
    } catch (error) {
      console.error("Import error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to import games")
    } finally {
      setIsImporting(false)
    }
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
            <h2 className="text-lg font-semibold mb-2">Generated JSON</h2>
            <Textarea
              placeholder="Generated JSON will appear here..."
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="h-[440px] font-mono"
            />
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