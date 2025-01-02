"use client"

import { useState, useEffect } from "react"
import { ProjectGameList } from "@/components/admin/projects/ProjectGameList"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { AddGameButton } from "@/components/admin/projects/AddGameButton"
interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
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

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [games, setGames] = useState<ProjectGame[]>([])
  const [loading, setLoading] = useState(true)

  // 加载项目数据
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        const { data } = await response.json()
        setProject(data)
      } catch (error) {
        console.error('Failed to fetch project:', error)
      }
    }

    fetchProject()
  }, [params.id])

  // 加载游戏数据
  const loadGames = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${params.id}/games`)
      const { data } = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Failed to fetch games:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGames()
  }, [params.id])

  if (!project) {
    return <div>Loading project...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title={project.name}
        description={project.description || "No description"}
      />

      <div className="flex justify-end">
        <AddGameButton 
          project={project}
          onSuccess={loadGames}
        />
      </div>

      {loading ? (
        <div>Loading games...</div>
      ) : (
        <ProjectGameList 
          projectId={params.id}
          games={games}
          onDataChange={loadGames}
        />
      )}
    </div>
  )
} 