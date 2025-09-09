"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Pencil, Star, BarChart3, ChevronDown, Bot, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { fetchJsonWithRetry } from '@/lib/utils/fetchWithRetry'
import { 
  ProjectCategory, 
  CategoryResponse 
} from '@/types/category'
import { 
  ProjectGame, 
  ProjectGameListProps 
} from '@/types/game'
import { 
  PaginatedResponse 
} from '@/types/common'
import { BulkResultsDialog } from './BulkResultsDialog'

export function ProjectGameList({ projectId, onDataChange }: ProjectGameListProps) {
  const router = useRouter()
  const [games, setGames] = useState<ProjectGame[]>([])
  const [publishingGameId, setPublishingGameId] = useState<string | null>(null)
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null)
  const [editingGameId, setEditingGameId] = useState<string | null>(null)
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState<{ [key: string]: boolean }>({})
  const [settingMainGame, setSettingMainGame] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const pageSize = 50
  const [initialCategories, setInitialCategories] = useState<string[]>([])
  
  // Bulk operations state
  const [selectedGameIds, setSelectedGameIds] = useState<string[]>([])
  const [bulkOperating, setBulkOperating] = useState(false)
  const [bulkCancelled, setBulkCancelled] = useState(false)
  const [bulkProgress, setBulkProgress] = useState<{current: number, total: number, currentGame?: string} | null>(null)
  const [bulkResults, setBulkResults] = useState<{success: string[], failed: {id: string, error: string}[]} | null>(null)
  const [showBulkResults, setShowBulkResults] = useState(false)

  // 获取分页游戏列表
  const fetchGames = useCallback(async (page: number) => {
    try {
      setLoading(true)
      const { data } = await fetchJsonWithRetry<PaginatedResponse<ProjectGame>>(
        `/api/projects/${projectId}/games?page=${page}&pageSize=${pageSize}`
      )
      if (data) {
        const items = data.items || []
        const total = data.total || 0
        
        setGames(items)
        setTotalItems(total)
      }
    } catch (error) {
      console.error('Failed to fetch games:', error)
      toast.error('Failed to fetch games')
    } finally {
      setLoading(false)
    }
  }, [projectId, pageSize])

  // 初始化时加载第一页数据
  useEffect(() => {
    fetchGames(1)
  }, [fetchGames])

  // 监听页码变化
  useEffect(() => {
    if (currentPage !== 1) {
      fetchGames(currentPage)
    }
  }, [currentPage, fetchGames])

  // 计算总页数
  const totalPages = Math.ceil(totalItems / pageSize)

  // 获取项目分类列表
  const fetchProjectCategories = async () => {
    try {
      const { data } = await fetchJsonWithRetry<CategoryResponse>(
        `/api/projects/${projectId}/categories`
      )
      if (data) {
        setProjectCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch project categories:', error)
      toast.error('Failed to fetch project categories')
    }
  }

  // 获取游戏分类列表
  const fetchGameCategories = async (gameId: string) => {
    try {
      setLoadingCategories(prev => ({ ...prev, [gameId]: true }))
      const { data } = await fetchJsonWithRetry<CategoryResponse>(
        `/api/projects/${projectId}/games/${gameId}/categories`
      )
      if (data) {
        const categories = data
        setGames(prevGames => 
          prevGames.map(game => 
            game.gameId === gameId 
              ? { ...game, categories }
              : game
          )
        )
        // 如果是当前正在编辑的游戏，更新选中状态
        if (editingGameId === gameId) {
          const activeCategories = categories
            .filter((cat: ProjectCategory) => cat.isActive)
            .map((cat: ProjectCategory) => cat.categoryId)
          setSelectedCategories(activeCategories)
          setInitialCategories(activeCategories)
        }
      }
    } catch (error) {
      console.error('Failed to fetch game categories:', error)
      if (editingGameId === gameId) {
        toast.error('Failed to fetch game categories')
      }
    } finally {
      setLoadingCategories(prev => ({ ...prev, [gameId]: false }))
    }
  }

  // 打开编辑分类对话框
  const handleEditCategories = async (gameId: string) => {
    // 1. 先重置状态
    setSelectedCategories([])
    setEditingGameId(gameId)
    
    try {
      // 2. 获取项目分类
      await fetchProjectCategories()
      
      // 3. 获取当前游戏的分类
      const game = games.find(g => g.gameId === gameId)
      if (game) {
        // 使用 effectiveCategories 设置选中状态
        const currentCategories = game.effectiveCategories
          ?.filter(cat => cat.isActive)
          .map(cat => cat.categoryId) || []
        setSelectedCategories(currentCategories)
        // 保存初始状态用于比较
        setInitialCategories(currentCategories)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to fetch categories')
      setEditingGameId(null)
    }
  }

  // 更新游戏分类
  const handleUpdateCategories = async (gameId: string) => {
    // 检查分类是否有变化
    const hasChanges = !areArraysEqual(selectedCategories.sort(), initialCategories.sort())
    
    if (!hasChanges) {
      toast.info('No changes to save')
      setEditingGameId(null)
      return
    }

    try {
      setLoading(true)
      await fetchJsonWithRetry(
        `/api/projects/${projectId}/games/${gameId}/categories/batch`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryIds: selectedCategories })
        }
      )

      // 直接重新获取游戏列表
      await fetchGames(currentPage)
      toast.success('Categories updated successfully')
      setEditingGameId(null)
    } catch (error) {
      console.error('Failed to update categories:', error)
      toast.error('Failed to update categories')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (gameId: string) => {
    try {
      setPublishingGameId(gameId)
      const data = await fetchJsonWithRetry(
        `/api/projects/${projectId}/games/${gameId}/publish`,
        { method: 'POST' }
      )

      // 更新本地状态
      setGames(prevGames => 
        prevGames.map(game => 
          game.gameId === gameId 
            ? { ...game, isPublished: true }
            : game
        )
      )

      toast.success('Game published successfully')
      
      // 如果提供了 onDataChange 回调，调用它
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error('Failed to publish game:', error)
      toast.error('Failed to publish game')
    } finally {
      setPublishingGameId(null)
    }
  }

  const handleDelete = async (gameId: string) => {
    if (!confirm('Are you sure you want to delete this game?')) {
      return
    }

    try {
      setDeletingGameId(gameId)
      await fetchJsonWithRetry(
        `/api/projects/${projectId}/games/${gameId}`,
        { method: 'DELETE' }
      )

      // 更新本地状态
      setGames(prevGames => prevGames.filter(game => game.gameId !== gameId))
      toast.success('Game deleted successfully')
      
      // 如果提供了 onDataChange 回调，调用它
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error('Failed to delete game:', error)
      toast.error('Failed to delete game')
    } finally {
      setDeletingGameId(null)
    }
  }

  // 设置/取消主游戏
  const handleSetMainGame = async (gameId: string, isMain: boolean) => {
    try {
      setSettingMainGame(gameId)
      
      // 先获取当前游戏数据
      const currentGame = games.find(g => g.gameId === gameId)
      if (!currentGame) {
        throw new Error('Game not found')
      }

      await fetchJsonWithRetry(
        `/api/projects/${projectId}/games/${gameId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: currentGame.title,
            metadata: currentGame.metadata,
            content: currentGame.content,
            isPublished: currentGame.isPublished,
            isMain: isMain,
            locale: currentGame.locale,
            baseVersion: currentGame.baseVersion
          })
        }
      )

      // 更新本地状态
      setGames(prevGames => 
        prevGames.map(game => 
          game.gameId === gameId 
            ? { ...game, isMain }
            : game
        )
      )

      toast.success(isMain ? 'Game set as main' : 'Game removed from main')
      
      // 如果提供了 onDataChange 回调，调用它
      if (onDataChange) {
        onDataChange()
      }
    } catch (error) {
      console.error('Failed to set main game:', error)
      toast.error('Failed to set main game')
    } finally {
      setSettingMainGame(null)
    }
  }

  // 数组比较函数
  const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false
    return arr1.every((value, index) => value === arr2[index])
  }

  // Bulk selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGameIds(games.map(game => game.gameId))
    } else {
      setSelectedGameIds([])
    }
  }

  const handleSelectGame = (gameId: string, checked: boolean) => {
    if (checked) {
      setSelectedGameIds(prev => [...prev, gameId])
    } else {
      setSelectedGameIds(prev => prev.filter(id => id !== gameId))
    }
  }

  const clearSelection = () => {
    setSelectedGameIds([])
  }

  const handleRetryFailedRegenerate = async (failedIds: string[]) => {
    setSelectedGameIds(failedIds)
    setShowBulkResults(false)
    // Wait a moment for dialog to close
    setTimeout(() => {
      handleBulkAIRegenerate()
    }, 100)
  }

  // Cancel bulk operation
  const handleCancelBulkOperation = () => {
    setBulkCancelled(true)
    toast.info('Cancelling bulk operation...')
  }

  // Bulk AI regeneration
  const handleBulkAIRegenerate = async () => {
    if (selectedGameIds.length === 0) {
      toast.error('Please select at least one game')
      return
    }

    const confirmMessage = `Are you sure you want to regenerate AI content for ${selectedGameIds.length} selected games? This will overwrite existing content.`
    if (!confirm(confirmMessage)) {
      return
    }

    setBulkOperating(true)
    setBulkCancelled(false)
    setBulkProgress({current: 0, total: selectedGameIds.length})
    setBulkResults({success: [], failed: []})

    const results = {success: [] as string[], failed: [] as {id: string, error: string}[]}
    let project: any = null

    try {
      // First, get project information for AI configuration with specific error handling
      console.log('Fetching project information...')
      setBulkProgress({current: 0, total: selectedGameIds.length, currentGame: 'Fetching project configuration...'})
      
      try {
        const projectResponse = await fetchJsonWithRetry(`/api/projects/${projectId}`) as { data?: any; error?: string }
        if (projectResponse.error) {
          throw new Error(`Failed to fetch project info: ${projectResponse.error}`)
        }
        project = projectResponse.data
        console.log('Project information fetched successfully')
      } catch (projectError) {
        console.error('Failed to fetch project information:', projectError)
        const errorMessage = projectError instanceof Error ? projectError.message : 'Failed to fetch project configuration'
        toast.error(`Cannot start bulk operation: ${errorMessage}`)
        setBulkOperating(false)
        setBulkProgress(null)
        return
      }

      // 添加整体操作超时（30分钟）
      const operationTimeout = setTimeout(() => {
        toast.error('Bulk operation timed out after 30 minutes')
        setBulkOperating(false)
        setBulkProgress(null)
      }, 30 * 60 * 1000)

      try {
        for (let i = 0; i < selectedGameIds.length; i++) {
          // 检查是否已被取消
          if (bulkCancelled) {
            console.log('Bulk operation was cancelled by user')
            break
          }

          const gameId = selectedGameIds[i]
          const game = games.find(g => g.gameId === gameId)
          
          if (!game) {
            results.failed.push({id: gameId, error: 'Game not found'})
            continue
          }

          setBulkProgress({current: i + 1, total: selectedGameIds.length, currentGame: game.title})

          try {
            // Prepare game data for AI generation using the same structure as single game generation
            const rawGameData = {
              title: game.title,
              metadata: game.metadata,
              content: game.content,
              projectContext: {
                locale: game.locale,
                tone: project.aiConfig?.tone || 'professional',
                targetAudience: project.aiConfig?.targetAudience || 'general'
              }
            }

            // Use the same AI generation endpoint as single game generation
            const customPrompt = project.aiConfig?.defaultPrompts?.description || undefined
            
            console.log(`Generating AI content for ${game.title}...`)
            
            // 为AI生成添加超时控制（2分钟）
            const aiController = new AbortController()
            const aiTimeout = setTimeout(() => aiController.abort(), 2 * 60 * 1000)
            
            try {
              const aiResponse = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  rawData: JSON.stringify(rawGameData),
                  customPrompt: customPrompt,
                  taskType: 'PROJECT_GAME_LOCALIZATION'
                }),
                signal: aiController.signal
              })

              clearTimeout(aiTimeout)

              if (!aiResponse.ok) {
                const errorData = await aiResponse.json().catch(() => ({}))
                throw new Error(errorData.error || `AI generation failed (${aiResponse.status})`)
              }

              const { data: generatedContent } = await aiResponse.json()
              console.log(`AI content generated for ${game.title}`)

              // Update the game with generated content
              const updateResponse = await fetchJsonWithRetry(
                `/api/projects/${projectId}/games/${gameId}`,
                {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: generatedContent.title || game.title,
                    metadata: generatedContent.metadata || game.metadata,
                    content: generatedContent.content || game.content,
                    isPublished: game.isPublished,
                    isMain: game.isMain,
                    locale: game.locale,
                    baseVersion: game.baseVersion
                  })
                }
              )

              if ((updateResponse as any).error) {
                throw new Error((updateResponse as any).error)
              }

              results.success.push(gameId)
              console.log(`Successfully regenerated content for ${game.title}`)
            } catch (fetchError) {
              clearTimeout(aiTimeout)
              throw fetchError
            }
          } catch (error) {
            console.error(`Failed to regenerate game ${gameId}:`, error)
            let errorMessage = 'Unknown error'
            
            if (error instanceof Error) {
              if (error.name === 'AbortError') {
                errorMessage = 'Operation timed out (2 minutes)'
              } else {
                errorMessage = error.message
              }
            }
            
            results.failed.push({id: gameId, error: errorMessage})
            
            // 只为重要错误显示toast，避免过多干扰
            if (errorMessage.includes('timeout') || errorMessage.includes('network') || errorMessage.includes('server')) {
              toast.error(`${game.title}: ${errorMessage}`)
            }
          }
        }
      } finally {
        clearTimeout(operationTimeout)
      }
    } catch (error) {
      console.error('Bulk operation failed:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to start bulk operation')
      setBulkOperating(false)
      return
    }

    setBulkResults(results)
    setBulkOperating(false)
    setBulkProgress(null)
    
    // Show completion summary
    const successCount = results.success.length
    const failedCount = results.failed.length
    const wasCancelled = bulkCancelled
    setBulkCancelled(false) // Reset cancel state
    
    if (wasCancelled) {
      toast.warning(`Operation cancelled. Completed: ${successCount} successful, ${failedCount} failed`)
    } else if (successCount > 0 && failedCount === 0) {
      toast.success(`Successfully regenerated content for all ${successCount} games`)
    } else if (successCount > 0 && failedCount > 0) {
      toast.warning(`Completed: ${successCount} successful, ${failedCount} failed`)
    } else {
      toast.error(`Failed to regenerate content for all ${failedCount} games`)
    }

    // Show results dialog
    setShowBulkResults(true)

    // Refresh games data
    await fetchGames(currentPage)

    clearSelection()
  }

  // Bulk publish toggle
  const handleBulkPublishToggle = async () => {
    if (selectedGameIds.length === 0) {
      toast.error('Please select at least one game')
      return
    }

    // Determine the action based on the first selected game's publish status
    const firstGame = games.find(g => selectedGameIds.includes(g.gameId))
    const willPublish = !firstGame?.isPublished
    const action = willPublish ? 'publish' : 'unpublish'
    
    const confirmMessage = `Are you sure you want to ${action} ${selectedGameIds.length} selected games?`
    if (!confirm(confirmMessage)) {
      return
    }

    setBulkOperating(true)
    setBulkProgress({current: 0, total: selectedGameIds.length})

    const results = {success: [] as string[], failed: [] as {id: string, error: string}[]}

    for (let i = 0; i < selectedGameIds.length; i++) {
      const gameId = selectedGameIds[i]
      const game = games.find(g => g.gameId === gameId)
      
      if (!game) {
        results.failed.push({id: gameId, error: 'Game not found'})
        continue
      }

      setBulkProgress({current: i + 1, total: selectedGameIds.length, currentGame: game.title})

      try {
        if (willPublish) {
          // Use the existing publish endpoint
          await fetchJsonWithRetry(
            `/api/projects/${projectId}/games/${gameId}/publish`,
            { method: 'POST' }
          )
        } else {
          // Update game to unpublish
          await fetchJsonWithRetry(
            `/api/projects/${projectId}/games/${gameId}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: game.title,
                metadata: game.metadata,
                content: game.content,
                isPublished: false,
                isMain: game.isMain,
                locale: game.locale,
                baseVersion: game.baseVersion
              })
            }
          )
        }

        results.success.push(gameId)
        toast.success(`Successfully ${willPublish ? 'published' : 'unpublished'}: ${game.title}`)
      } catch (error) {
        console.error(`Failed to ${action} game ${gameId}:`, error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        results.failed.push({id: gameId, error: errorMessage})
        toast.error(`Failed to ${action}: ${game.title}`)
      }
    }

    setBulkOperating(false)
    setBulkProgress(null)
    
    // Refresh the games list
    await fetchGames(currentPage)
    
    // Show final results
    const successCount = results.success.length
    const failedCount = results.failed.length
    
    if (successCount > 0 && failedCount === 0) {
      toast.success(`Successfully ${willPublish ? 'published' : 'unpublished'} ${successCount} games`)
    } else if (successCount > 0 && failedCount > 0) {
      toast.warning(`${willPublish ? 'Published' : 'Unpublished'} ${successCount} games, ${failedCount} failed`)
    } else {
      toast.error(`Failed to ${action} all ${failedCount} games`)
    }

    clearSelection()
  }

  return (
    <div className="space-y-4">
      {/* Bulk Operations Bar */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={selectedGameIds.length === games.length && games.length > 0}
            onCheckedChange={handleSelectAll}
            disabled={loading || bulkOperating}
            className={selectedGameIds.length > 0 && selectedGameIds.length < games.length ? 'data-[state=checked]:bg-muted data-[state=checked]:border-muted-foreground' : ''}
          />
          <span className="text-sm text-muted-foreground">
            Select All ({selectedGameIds.length}/{games.length})
          </span>
        </div>
        
        {selectedGameIds.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">
              {selectedGameIds.length} selected
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={bulkOperating}>
                  {bulkOperating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <>
                      Bulk Actions
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleBulkAIRegenerate} disabled={bulkOperating}>
                  <Bot className="w-4 h-4 mr-2" />
                  Regenerate with AI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBulkPublishToggle} disabled={bulkOperating}>
                  <FileText className="w-4 h-4 mr-2" />
                  Toggle Publish Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" onClick={clearSelection} disabled={bulkOperating}>
              Clear Selection
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left w-12">
                <span className="sr-only">Select</span>
              </th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Language</th>
              <th className="p-2 text-left">Categories</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Main Game</th>
              <th className="p-2 text-left">Version</th>
              <th className="p-2 text-left">Created At</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : (
              games.map((game: ProjectGame) => (
                <tr key={game.id} className="border-b">
                  <td className="p-2">
                    <Checkbox 
                      checked={selectedGameIds.includes(game.gameId)}
                      onCheckedChange={(checked) => handleSelectGame(game.gameId, checked as boolean)}
                      disabled={loading || bulkOperating}
                    />
                  </td>
                  <td className="p-2">{game.title}</td>
                  <td className="p-2">{game.locale.toUpperCase()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-1">
                        {loadingCategories[game.gameId] ? (
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        ) : (
                          game.effectiveCategories
                            ?.filter(cat => cat.isActive)
                            .map((category) => (
                              <Badge key={category.id} variant="secondary">
                                {category.displayName || category.category.name}
                              </Badge>
                            ))
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCategories(game.gameId)}
                        disabled={loadingCategories[game.gameId]}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={game.isPublished ? "default" : "secondary"}>
                        {game.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {!game.isPublished && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePublish(game.gameId)}
                          disabled={publishingGameId === game.gameId}
                        >
                          {publishingGameId === game.gameId ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Publishing...
                            </>
                          ) : (
                            "Publish"
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {game.isMain && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                      <Switch
                        checked={game.isMain}
                        onCheckedChange={(checked) => handleSetMainGame(game.gameId, checked)}
                        disabled={settingMainGame === game.gameId}
                      />
                      {settingMainGame === game.gameId && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                  </td>
                  <td className="p-2">{game.baseVersion}</td>
                  <td className="p-2">{new Date(game.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/projects/${projectId}/games/${game.gameId}`)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/projects/${projectId}/ratings?gameId=${game.gameId}&locale=${game.locale}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <BarChart3 className="mr-1 h-4 w-4" />
                        Rating
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(game.gameId)}
                        disabled={deletingGameId === game.gameId}
                      >
                        {deletingGameId === game.gameId ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页控制 */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {games.length} of {totalItems} items
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={editingGameId !== null} onOpenChange={(open) => !open && setEditingGameId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {projectCategories.map((category) => (
                  <div key={category.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={category.categoryId}
                      checked={selectedCategories.includes(category.categoryId)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category.categoryId])
                        } else {
                          setSelectedCategories(selectedCategories.filter(id => id !== category.categoryId))
                        }
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={category.categoryId}>
                        {category.displayName || category.category.name}
                      </Label>
                      {(category.description || category.category.description) && (
                        <p className="text-sm text-muted-foreground">
                          {category.description || category.category.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setEditingGameId(null)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => editingGameId && handleUpdateCategories(editingGameId)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Progress Dialog */}
      <Dialog open={bulkProgress !== null} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Operation in Progress</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm text-muted-foreground">
              Processing {bulkProgress?.current || 0} of {bulkProgress?.total || 0} games...
            </div>
            
            {bulkProgress?.currentGame && (
              <div className="text-sm">
                Current: <span className="font-medium">{bulkProgress.currentGame}</span>
              </div>
            )}
            
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${bulkProgress ? (bulkProgress.current / bulkProgress.total) * 100 : 0}%` 
                }}
              />
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Please wait, this may take a few minutes...
            </div>
            
            <div className="flex justify-center pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancelBulkOperation}
                disabled={bulkCancelled}
              >
                {bulkCancelled ? 'Cancelling...' : 'Cancel Operation'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Results Dialog */}
      {bulkResults && (
        <BulkResultsDialog
          open={showBulkResults}
          onOpenChange={setShowBulkResults}
          results={bulkResults}
          games={games}
          onRetryFailed={handleRetryFailedRegenerate}
          operation="AI Content Regeneration"
        />
      )}
    </div>
  )
} 