"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

interface ProjectGame {
  id: string
  gameId: string
  title: string
  description: string | null
  locale: string
  isPublished: boolean
  baseVersion: number
  createdAt: string
  updatedAt: string
}

interface ProjectGameListProps {
  projectId: string
}

export function ProjectGameList({ projectId }: ProjectGameListProps) {
  const [games, setGames] = useState<ProjectGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjectGames() {
      try {
        const response = await fetch(`/api/projects/${projectId}/games`)
        const { data } = await response.json()
        setGames(data)
      } catch (error) {
        console.error('Failed to fetch project games:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectGames()
  }, [projectId])

  if (loading) {
    return <div>Loading games...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No games found. Add some games to get started.
              </TableCell>
            </TableRow>
          ) : (
            games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{game.locale}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={game.isPublished ? "default" : "secondary"}>
                    {game.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>v{game.baseVersion}</TableCell>
                <TableCell>{new Date(game.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/projects/${projectId}/games/${game.gameId}`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        // TODO: Implement delete functionality
                        console.log('Delete game:', game.gameId)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 