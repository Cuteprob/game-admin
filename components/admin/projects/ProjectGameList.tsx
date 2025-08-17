"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Pencil, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

  // 获取分页游戏列表
  const fetchGames = async (page: number) => {
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
  }

  // 初始化时加载第一页数据
  useEffect(() => {
    fetchGames(1)
  }, [projectId])

  // 监听页码变化
  useEffect(() => {
    if (currentPage !== 1) {
      fetchGames(currentPage)
    }
  }, [currentPage])

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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
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
                <td colSpan={9} className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : (
              games.map((game: ProjectGame) => (
                <tr key={game.id} className="border-b">
                  <td className="p-2">{game.title}</td>
                  <td className="p-2 max-w-[300px] truncate">{game.description}</td>
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
    </div>
  )
} 