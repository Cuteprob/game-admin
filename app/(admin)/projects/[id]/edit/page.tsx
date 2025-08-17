"use client"

export const runtime = 'edge'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ProjectEditForm } from "@/components/admin/projects/ProjectEditForm"
import { Project } from "@/types/project"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        const { data } = await response.json()
        // 确保 aiConfig 是对象
        const aiConfig = typeof data.aiConfig === 'string' 
          ? JSON.parse(data.aiConfig)
          : data.aiConfig || {
              targetAudience: '',
              tone: '',
              seoKeywords: [],
              defaultPrompts: {
                title: '',
                description: ''
              }
            }
        
        setProject({
          ...data,
          aiConfig
        })
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

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.name, href: `/projects/${project.id}` },
    { label: "Edit", href: `/projects/${project.id}/edit` }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Edit ${project.name}`}
        description="Update project settings and AI configuration."
        breadcrumbs={breadcrumbs}
      />
      
      <ProjectEditForm 
        project={project}
        onSuccess={() => {
          router.push('/projects')
          router.refresh()
        }}
      />
    </div>
  )
} 