"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// 添加重试工具函数
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<Response> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(5000), // 5秒超时
      });
      
      if (response.ok) {
        return response;
      }
      
      lastError = new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      lastError = error;
      
      // 如果不是最后一次重试，等待后继续
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, i)));
        continue;
      }
    }
  }
  
  throw lastError;
}

interface ProjectGame {
  id: string
  gameId: string
  title: string
  description: string
  locale: string
  isPublished: boolean
  baseVersion: number
  createdAt: string
  updatedAt: string
}

interface ProjectGameListProps {
  projectId: string
  games: ProjectGame[]
  onDataChange?: () => void
}

export function ProjectGameList({ projectId, games: initialGames, onDataChange }: ProjectGameListProps) {
  const router = useRouter()
  const [games, setGames] = useState<ProjectGame[]>(initialGames)
  const [publishingGameId, setPublishingGameId] = useState<string | null>(null)
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null)

  const handlePublish = async (gameId: string) => {
    try {
      setPublishingGameId(gameId)
      const response = await fetchWithRetry(
        `/api/projects/${projectId}/games/${gameId}/publish`,
        { method: 'POST' }
      );

      const data = await response.json();

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
      const response = await fetchWithRetry(
        `/api/projects/${projectId}/games/${gameId}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

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

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Language</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Version</th>
            <th className="p-2 text-left">Created At</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="border-b">
              <td className="p-2">{game.title}</td>
              <td className="p-2 max-w-[300px] truncate">{game.description}</td>
              <td className="p-2">{game.locale.toUpperCase()}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  )
} 