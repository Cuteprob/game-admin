// components/admin/projects/ProjectList.tsx
"use client"

import { DataTable } from "@/components/admin/shared/DataTable"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Tags, Gamepad2, FolderOpen } from "lucide-react"
import { AddGameButton } from "@/components/admin/projects/AddGameButton"
import { ProjectCategorySelect } from "@/components/admin/projects/ProjectCategorySelect"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Project, ProjectListProps } from '@/types/project'

interface ProjectWithStats extends Project {
  gamesCount?: number
  categoriesCount?: number
}

export function ProjectList() {
  const [projects, setProjects] = useState<ProjectWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [editingCategoriesProjectId, setEditingCategoriesProjectId] = useState<string | null>(null)

  // 刷新特定项目的统计信息
  const refreshProjectStats = async (projectId: string) => {
    try {
      // 获取游戏数量
      const gamesResponse = await fetch(`/api/projects/${projectId}/games?pageSize=1`)
      const gamesData = await gamesResponse.json()
      const gamesCount = gamesData.data?.total || 0

      // 获取分类数量
      const categoriesResponse = await fetch(`/api/projects/${projectId}/categories`)
      const categoriesData = await categoriesResponse.json()
      const categoriesCount = categoriesData.data?.length || 0

      // 更新特定项目的统计信息
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? { ...project, gamesCount, categoriesCount }
            : project
        )
      )
    } catch (error) {
      console.error(`Failed to refresh stats for project ${projectId}:`, error)
    }
  }

  // 提取获取项目数据的函数，以便在需要时重新调用
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()
      const projectsData = data.data || []
      
      // 为每个项目获取统计信息
      const projectsWithStats = await Promise.all(
        projectsData.map(async (project: Project) => {
          try {
            // 获取游戏数量
            const gamesResponse = await fetch(`/api/projects/${project.id}/games?pageSize=1`)
            const gamesData = await gamesResponse.json()
            const gamesCount = gamesData.data?.total || 0

            // 获取分类数量
            const categoriesResponse = await fetch(`/api/projects/${project.id}/categories`)
            const categoriesData = await categoriesResponse.json()
            const categoriesCount = categoriesData.data?.length || 0

            return {
              ...project,
              gamesCount,
              categoriesCount
            }
          } catch (error) {
            console.error(`Failed to fetch stats for project ${project.id}:`, error)
            return {
              ...project,
              gamesCount: 0,
              categoriesCount: 0
            }
          }
        })
      )
      
      setProjects(projectsWithStats)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSearch = () => {
    // 本地搜索实现
    // TODO: 如果项目数量增多，可以改为后端搜索
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id))
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const columns: ColumnDef<ProjectWithStats>[] = [
    {
      accessorKey: "id",
      header: "Project ID",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="font-mono text-sm">
            <Badge variant="outline" className="font-mono">
              {project.id}
            </Badge>
          </div>
        )
      }
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">{project.name}</div>
            {project.description && (
              <div className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </div>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "stats",
      header: "Stats",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Gamepad2 className="w-3 h-3" />
              <Badge variant="secondary" className="text-xs">
                {project.gamesCount || 0} games
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Tags className="w-3 h-3" />
              <Badge variant="outline" className="text-xs">
                {project.categoriesCount || 0} categories
              </Badge>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: "locales",
      header: "Languages",
      cell: ({ row }) => {
        const locales = row.original.locales
        return (
          <div className="flex flex-wrap gap-1">
            {locales.map((locale) => (
              <Badge key={locale} variant="secondary">
                {locale}
              </Badge>
            ))}
          </div>
        )
      }
    },
    {
      accessorKey: "defaultLocale",
      header: "Default Language",
      cell: ({ row }) => {
        return (
          <Badge variant="outline">
            {row.original.defaultLocale}
          </Badge>
        )
      }
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            {new Date(row.original.createdAt).toLocaleDateString()}
          </div>
        )
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="flex gap-2">
            <Link href={`/projects/${project.id}`}>
              <Button variant="outline" size="sm">
                Games
              </Button>
            </Link>
            <AddGameButton 
              project={project}
              variant="outline"
              size="sm"
              onSuccess={() => {
                // 刷新项目列表
                window.location.reload()
              }}
            >
              Add Game
            </AddGameButton>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingCategoriesProjectId(project.id)}
            >
              <Tags className="w-4 h-4 mr-1" />
              Categories
            </Button>
            <Link href={`/projects/${project.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </Button>
          </div>
        )
      }
    }
  ]

  const filteredProjects = search
    ? projects.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : projects

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Input 
              placeholder="Search projects..." 
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="outline" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="relative w-full">
            <DataTable columns={columns} data={filteredProjects} />
          </div>
        )}
      </div>

      {/* Categories编辑对话框 */}
      <Dialog 
        open={editingCategoriesProjectId !== null} 
        onOpenChange={(open) => !open && setEditingCategoriesProjectId(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Project Categories</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-1">
            {editingCategoriesProjectId && (
              <ProjectCategorySelect 
                projectId={editingCategoriesProjectId}
                onSave={() => {
                  setEditingCategoriesProjectId(null)
                  // 只刷新当前项目的统计信息，提高性能
                  refreshProjectStats(editingCategoriesProjectId)
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}