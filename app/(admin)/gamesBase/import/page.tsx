"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { DEFAULT_PROMPTS } from "@/lib/ai/config"
import { Loader2 } from "lucide-react"

export default function ImportGamesPage() {
  const [rawData, setRawData] = useState("")
  const [jsonData, setJsonData] = useState("")
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_PROMPTS.GAME_IMPORT)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

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
      setJsonData(JSON.stringify(data, null, 2))
      toast.success("Successfully generated game data")
    } catch (error) {
      console.error("Generation error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to generate game data")
      
      // 如果是网络错误，显示重试建议
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

    // 验证 JSON 格式
    let parsedData
    try {
      parsedData = JSON.parse(jsonData)
      // 确保数据是数组格式
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