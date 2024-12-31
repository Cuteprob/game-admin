"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProjectGameList } from "@/components/admin/projects/ProjectGameList"
interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        const { data } = await response.json()
        setProject(data)
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title={project.name}
          description={project.description || `Manage games in ${project.name}`}
        />
        <div className="flex gap-2">
          <Link href={`/projects/${project.id}/edit`}>
            <Button variant="outline">Edit Project</Button>
          </Link>
          <Link href={`/projects/${project.id}/add-game`}>
            <Button>Add Game</Button>
          </Link>
        </div>
      </div>

      <ProjectGameList projectId={params.id} />
    </div>
  )
} 