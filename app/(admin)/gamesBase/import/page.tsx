"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

// 游戏分类枚举映射
const CATEGORY_MAP: Record<string, string> = {
  // 游戏类型分类 (主分类)
  RACING: "Racing Games",
  ACTION: "Action Games",
  SHOOTER: "Shooter Games",
  PUZZLE: "Puzzle Games",
  STRATEGY: "Strategy Games",
  SPORTS: "Sports Games",
  ADVENTURE: "Adventure Games",
  
  // 游戏玩法分类
  MULTIPLAYER: "Multiplayer Games",
  TWO_PLAYER: "2 Player Games",
  SINGLE_PLAYER: "Single Player Games",
  
  // 主题分类
  CAR: "Car Games",
  FIGHTING: "Fighting Games",
  STICKMAN: "Stickman Games",
  RUNNING: "Running Games",
  BOXING: "Boxing Games",
  ANIMAL: "Animal Games",
  
  // 目标人群分类
  BOYS: "Games for Boys",
  GIRLS: "Games for Girls",
  KIDS: "Kids Games",
  
  // 功能性分类
  FEATURED: "Featured Games",
  NEW: "New Games",
  POPULAR: "Popular Games",
  TRENDING: "Trending Games",
  IO_GAMES: "IO Games",
  FPS: "FPS Games",
}

export default function ImportGamesPage() {
  const router = useRouter()
  const [jsonData, setJsonData] = useState("")
  const [importing, setImporting] = useState(false)

  const preprocessData = (data: string) => {
    try {
      let processed = data

      // 1. 替换 GameCategory 枚举引用为对应的游戏名称
      processed = processed.replace(/GameCategory\.([\w_]+)/g, (_, category: string) => {
        const gameName = CATEGORY_MAP[category]
        if (!gameName) {
          throw new Error(`Invalid game category: ${category}`)
        }
        return `"${gameName}"`
      })
      
      // 2. 给没有引号的属性名添加引号
      processed = processed.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '$1"$3":')
      
      // 3. 处理特殊字符
      processed = processed.replace(/\\([^"])/g, '\\\\$1') // 转义反斜杠
      processed = processed.replace(/(?<!\\)'/g, "\\'") // 处理单引号
      processed = processed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // 移除控制字符
      
      // 4. 移除末尾的逗号
      processed = processed.replace(/,(\s*[}\]])/g, '$1')
      
      // 5. 移除多余的空白字符（保留换行）
      processed = processed.split('\n').map(line => line.trim()).join('\n')

      // 7. 尝试解析和重新格式化
      try {
        // 先尝试作为JavaScript对象计算
        // eslint-disable-next-line no-eval
        const obj = eval('(' + processed + ')')
        return JSON.stringify(obj, null, 2)
      } catch (evalError) {
        try {
          // 如果eval失败，尝试直接解析JSON
          const obj = JSON.parse(processed)
          return JSON.stringify(obj, null, 2)
        } catch (jsonError) {
          console.error('Parse errors:', { evalError, jsonError })
          // 如果两种方式都失败，返回处理后的字符串
          return processed
        }
      }
    } catch (error) {
      console.error('Error in preprocessData:', error)
      throw error
    }
  }

  const handleImport = async () => {
    try {
      if (!jsonData.trim()) {
        throw new Error('Please enter some data to import')
      }

      // 预处理数据
      console.log('Original data:', jsonData)
      const processedData = preprocessData(jsonData)
      console.log('Processed data:', processedData)
      
      // 验证JSON格式
      let games
      try {
        games = JSON.parse(processedData)
      } catch (error: any) {
        console.error('JSON parse error:', error)
        console.error('Processed data that failed to parse:', processedData)
        throw new Error(`Invalid JSON format: ${error.message || 'Unknown error'}. Please check the console for details.`)
      }
      
      // 如果输入的是单个游戏对象，将其转换为数组
      if (!Array.isArray(games)) {
        games = [games]
      }

      // 验证和清理数据
      games = games.map(game => {
        // 确保所有必需字段存在
        const requiredFields = ['title', 'description', 'iframeUrl']
        const missingFields = requiredFields.filter(field => !game[field])
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')} for game: ${game.title || 'Unknown'}`)
        }

        // 清理和验证 URL
        if (game.iframeUrl && !game.iframeUrl.startsWith('http')) {
          throw new Error(`Invalid iframeUrl for game ${game.title}: URL must start with http or https`)
        }

        // 处理图片字段
        if (game.image && !game.imageUrl) {
          game.imageUrl = game.image
          delete game.image
        }

        return game
      })

      setImporting(true)
      const response = await fetch('/api/gamesBase/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(games)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Import failed')
      }

      const result = await response.json()
      toast.success(result.message)
      // 清空输入数据
      setJsonData("")
      // 刷新页面数据
      router.refresh()
    } catch (error) {
      console.error('Import error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to import games')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Import Games"
          description="Import games from JSON data"
        />
        <Button
          variant="outline"
          onClick={() => router.push('/gamesBase')}
        >
          Cancel
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">JSON Data</h3>
            <p className="text-sm text-muted-foreground">
              Paste your games data in JSON format or JavaScript object format. 
              You can import a single game object or an array of game objects.
              For categories, you can use GameCategory.CATEGORY_NAME format or just the category name as a string.
            </p>
            <p className="text-sm text-muted-foreground">
              Available categories: {Object.values(CATEGORY_MAP).join(', ')}
            </p>
          </div>

          <Textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder="Paste your JSON data here..."
            className="font-mono min-h-[400px]"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleImport}
              disabled={!jsonData.trim() || importing}
            >
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Games'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 