"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { RatingManagement } from "@/components/admin/comments/RatingManagement"
import { RatingDisplay } from "@/components/admin/comments/RatingDisplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { StarIcon, GamepadIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { 
  GameRating, 
  UpsertRatingData, 
  RatingDistribution 
} from "@/types/comment"
import type { ProjectGame } from "@/types/game"
import type { Project } from "@/types/project"

interface GameWithRating extends ProjectGame {
  rating?: GameRating
}

export default function ProjectRatingsPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [games, setGames] = useState<GameWithRating[]>([])
  const [selectedGameId, setSelectedGameId] = useState<string>("")
  const [selectedLocale, setSelectedLocale] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // 从 URL 参数获取初始值
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const gameId = urlParams.get('gameId')
      const locale = urlParams.get('locale')
      
      if (gameId) setSelectedGameId(gameId)
      if (locale) setSelectedLocale(locale)
    }
  }, [])

  useEffect(() => {
    if (projectId) {
      fetchProjectAndGames()
    }
  }, [projectId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedGameId && selectedLocale) {
      fetchGameRating()
    }
  }, [selectedGameId, selectedLocale]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProjectAndGames = async () => {
    try {
      setLoading(true)
      
      // 获取项目信息
      const projectResponse = await fetch(`/api/projects/${projectId}`)
      const projectData = await projectResponse.json()
      
      if (!projectResponse.ok || projectData.error) {
        throw new Error(projectData.error || 'Failed to fetch project')
      }
      
      setProject(projectData.data)
      
      // 如果没有从 URL 参数设置语言，使用默认语言
      if (!selectedLocale) {
        setSelectedLocale(projectData.data.defaultLocale)
      }
      
      // 获取项目游戏
      const gamesResponse = await fetch(`/api/projects/${projectId}/games`)
      const gamesData = await gamesResponse.json()
      
      if (!gamesResponse.ok || gamesData.error) {
        throw new Error(gamesData.error || 'Failed to fetch games')
      }
      
      setGames(gamesData.data.items || [])
      
      // 如果没有从 URL 参数设置游戏，使用第一个游戏
      if (!selectedGameId && gamesData.data.items && gamesData.data.items.length > 0) {
        setSelectedGameId(gamesData.data.items[0].gameId)
      }
    } catch (error) {
      console.error('Failed to fetch project and games:', error)
      toast.error('Failed to load project data')
    } finally {
      setLoading(false)
    }
  }

  const fetchGameRating = async () => {
    if (!selectedGameId || !selectedLocale) return
    
    try {
      const response = await fetch(
        `/api/admin/ratings/${selectedGameId}?projectId=${projectId}&locale=${selectedLocale}`
      )
      const data = await response.json()
      
      // 更新games数组中对应游戏的rating
      setGames(prev => prev.map(game => 
        game.gameId === selectedGameId 
          ? { ...game, rating: response.ok ? data.data : undefined }
          : game
      ))
    } catch (error) {
      console.error('Failed to fetch game rating:', error)
    }
  }

  const handleUpdateRating = async (data: UpsertRatingData) => {
    try {
      setUpdating(true)
      
      const response = await fetch('/api/admin/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to update rating')
      }
      
      // 更新本地状态
      setGames(prev => prev.map(game => 
        game.gameId === selectedGameId 
          ? { ...game, rating: result.data }
          : game
      ))
      
      toast.success('Rating updated successfully')
    } catch (error) {
      console.error('Failed to update rating:', error)
      toast.error('Failed to update rating')
    } finally {
      setUpdating(false)
    }
  }

  const getCurrentGame = () => {
    return games.find(game => game.gameId === selectedGameId)
  }

  const getCurrentRating = () => {
    const game = getCurrentGame()
    return game?.rating
  }

  const parseRatingDistribution = (distributionJson?: string): RatingDistribution | undefined => {
    if (!distributionJson) return undefined
    
    try {
      const parsed = JSON.parse(distributionJson)
      return {
        1: parsed['1'] || 0,
        2: parsed['2'] || 0,
        3: parsed['3'] || 0,
        4: parsed['4'] || 0,
        5: parsed['5'] || 0
      }
    } catch {
      return undefined
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading project data...</span>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Failed to load project</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Rating Management - ${project.name}`}
        description="Manage and preset game ratings for this project"
      />

      {/* 游戏和语言选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GamepadIcon className="w-5 h-5" />
            Select Game and Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Game</label>
              <Select value={selectedGameId} onValueChange={setSelectedGameId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                  {games.map(game => (
                    <SelectItem key={game.gameId} value={game.gameId}>
                      {game.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Language</label>
              <Select value={selectedLocale} onValueChange={setSelectedLocale}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {project.locales.map(locale => (
                    <SelectItem key={locale} value={locale}>
                      {locale.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 当前游戏信息 */}
      {selectedGameId && getCurrentGame() && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 当前评分显示 */}
          <RatingDisplay
            rating={getCurrentRating()?.averageRating || 0}
            totalRatings={getCurrentRating()?.totalRatings || 0}
            distribution={parseRatingDistribution(getCurrentRating()?.ratingDistribution)}
            showDetails={true}
          />

          {/* 评分管理 */}
          <RatingManagement
            gameId={selectedGameId}
            projectId={projectId}
            locale={selectedLocale}
            currentRating={getCurrentRating()}
            onUpdate={handleUpdateRating}
          />
        </div>
      )}

      {/* 无游戏时的提示 */}
      {games.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <GamepadIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Games Found</h3>
            <p className="text-muted-foreground">
              This project doesn't have any games yet. Add some games first to manage their ratings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
