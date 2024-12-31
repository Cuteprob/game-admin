"use client"

import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { GameList } from "@/components/admin/games/GameList"
import { Plus, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { GamesResponse } from "@/app/api/gamesBase/route"

export default function GamesBasePage() {
  const router = useRouter()
  const [totalGames, setTotalGames] = useState<number>(0)

  useEffect(() => {
    // 获取游戏总数
    fetch('/api/gamesBase')
      .then(res => res.json())
      .then((data: GamesResponse) => {
        setTotalGames(data.total)
      })
      .catch(error => {
        console.error('Failed to fetch total games:', error)
      })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <PageHeader
            title="Games Base"
            description="Manage original game data"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Total Games: {totalGames}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/gamesBase/import')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Games
          </Button>
          <Button
            onClick={() => router.push('/gamesBase/new')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </Button>
        </div>
      </div>

      <GameList onDataChange={(total) => setTotalGames(total)} />
    </div>
  )
} 