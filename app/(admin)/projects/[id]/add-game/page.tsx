"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { AddGameForm } from "@/components/admin/projects/AddGameForm"
interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
}

export default function AddGamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
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
      <PageHeader 
        title={`Add Game to ${project.name}`}
        description="Select a game from the library and configure its localization settings."
      />
      
      <AddGameForm 
        project={project}
        onSuccess={() => {
          router.push(`/projects/${project.id}`)
          router.refresh()
        }}
      />
    </div>
  )
} 