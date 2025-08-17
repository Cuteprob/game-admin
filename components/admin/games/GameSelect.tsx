"use client"

import * as React from "react"
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Removed Next.js Image import - using regular img tag for Cloudflare Pages
import { Game } from '@/config/sprunkigame';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { GameSelectComponentProps } from "@/types/game"

type GameSelectProps = GameSelectComponentProps & {
  onSelect: (games: Game[]) => void
  selectedGames?: Game[]
}

export function GameSelect({ 
  projectId,
  onSelect,
  selectedGames = [],
  trigger
}: GameSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [games, setGames] = React.useState<Game[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")

  // 加载可用游戏
  const loadGames = React.useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await fetch(`/api/games/available?projectId=${projectId}`)
      if (!response.ok) {
        throw new Error('Failed to load games')
      }
      const data = await response.json()
      // 按创建日期从新到旧排序
      const sortedGames = (data || []).sort((a: Game, b: Game) => 
        new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      )
      setGames(sortedGames)
    } catch (error) {
      console.error('Failed to load games:', error)
      setError('Failed to load games')
      setGames([])
    } finally {
      setLoading(false)
    }
  }, [projectId])

  // 搜索游戏
  const handleSearch = React.useCallback((value: string) => {
    setSearch(value)
    if (!value.trim()) {
      loadGames()
      return
    }

    const searchGames = async () => {
      try {
        setError(null)
        setLoading(true)
        const response = await fetch(`/api/games/search?q=${encodeURIComponent(value)}`)
        if (!response.ok) {
          throw new Error('Failed to search games')
        }
        const { data } = await response.json()
        // 按创建日期从新到旧排序
        const sortedGames = (data || []).sort((a: Game, b: Game) => 
          new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        )
        setGames(sortedGames)
      } catch (error) {
        console.error('Failed to search games:', error)
        setError('Failed to search games')
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(searchGames, 300)
    return () => clearTimeout(timeoutId)
  }, [loadGames])

  // 处理游戏选择
  const handleSelect = (game: Game) => {
    const isSelected = selectedGames.some(g => g.id === game.id)
    if (isSelected) {
      onSelect(selectedGames.filter(g => g.id !== game.id))
    } else {
      onSelect([...selectedGames, game])
    }
  }

  // 首次打开时加载游戏
  React.useEffect(() => {
    if (open && games.length === 0 && !error) {
      loadGames()
    }
  }, [open, games.length, loadGames, error])

  const selectableGames = games.filter(game => 
    !selectedGames.some(selected => selected.id === game.id)
  )

  return (
    <div className="relative w-full">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedGames.map((game) => (
            <Badge
              key={game.id}
              variant="secondary"
              className="rounded-sm px-1 font-normal"
            >
              {game.title}
              <button
                className="ml-1 rounded-sm hover:bg-muted"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSelect(game)
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              handleSearch(e.target.value)
            }}
            onFocus={() => setOpen(true)}
            placeholder={selectedGames.length === 0 ? "Select games..." : undefined}
            className="flex-1 bg-transparent border-0 outline-none focus-visible:ring-0 px-0"
          />
        </div>
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 w-full mt-2">
          <div className="rounded-md border bg-popover text-popover-foreground shadow-md">
            <ScrollArea className="h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                  <span>{error}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setError(null)
                      loadGames()
                    }}
                  >
                    Try again
                  </Button>
                </div>
              ) : selectableGames.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No games found.
                </div>
              ) : (
                <div className="p-1">
                  {selectableGames
                    .filter(game => 
                      game.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((game) => (
                      <div
                        key={game.id}
                        onClick={() => {
                          handleSelect(game)
                          setSearch("")
                        }}
                        className="relative flex items-start gap-2 p-2 cursor-pointer hover:bg-accent rounded-sm"
                      >
                        <div className="flex items-start gap-3 w-full pr-6">
                          <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0 py-1">
                            <span className="font-medium truncate text-sm">
                              {game.title}
                            </span>

                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}

      {/* 点击外部关闭下拉框 */}
      {open && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
} 