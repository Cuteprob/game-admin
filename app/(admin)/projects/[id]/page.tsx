"use client"

export const runtime = 'edge'

import { useState, useEffect } from "react"
import { ProjectGameList } from "@/components/admin/projects/ProjectGameList"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { AddGameButton } from "@/components/admin/projects/AddGameButton"
import { fetchJsonWithRetry } from '@/lib/utils/fetchWithRetry'
import { Project, ApiResponse } from '@/types'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)

  // 加载项目数据
  useEffect(() => {
    async function fetchProject() {
      try {
        const { data } = await fetchJsonWithRetry<ApiResponse<Project>>(
          `/api/projects/${params.id}`
        )
        setProject(data)
      } catch (error) {
        console.error('Failed to fetch project:', error)
      }
    }

    fetchProject()
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
          onSuccess={() => {}}
        />
      </div>

      <ProjectGameList 
        projectId={params.id}
      />
    </div>
  )
} 