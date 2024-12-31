"use client"

import * as React from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Game } from "@/repositories/gameRepository"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GameSelectProps {
  projectId: string
  onSelect: (game: Game) => void
  trigger?: React.ReactNode
  value?: Game | null
}

export function GameSelect({ 
  projectId,
  onSelect,
  trigger,
  value
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
      const { data } = await response.json()
      setGames(data || [])
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
        setGames(data || [])
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

  // 首次打开时加载游戏
  React.useEffect(() => {
    if (open && games.length === 0 && !error) {
      loadGames()
    }
  }, [open, games.length, loadGames, error])

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value?.id}
      onValueChange={(gameId) => {
        const game = games.find(g => g.id === gameId)
        if (game) {
          onSelect(game)
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {loading ? (
            <div className="flex items-center">
              <span className="truncate">{value ? value.title : "Select game..."}</span>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            <span className="truncate">{value ? value.title : "Select game..."}</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder="Search games..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="mb-2"
          />
        </div>
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
          ) : games.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No games found.
            </div>
          ) : (
            games.map((game) => (
              <SelectItem
                key={game.id}
                value={game.id}
                className="relative flex items-start gap-2 p-2 cursor-pointer hover:bg-accent focus:bg-accent data-[state=checked]:bg-accent"
              >
                <div className="flex items-start gap-3 w-full pr-6">
                  <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={game.imageUrl}
                      alt={game.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 py-1">
                    <span className="font-medium truncate text-sm">
                      {game.title}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {game.description}
                    </span>
                  </div>
                  <Check className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-primary",
                    value?.id === game.id ? "opacity-100" : "opacity-0"
                  )} />
                </div>
              </SelectItem>
            ))
          )}
        </ScrollArea>
      </SelectContent>
    </Select>
  )
} 