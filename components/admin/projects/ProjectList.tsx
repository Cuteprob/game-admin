// components/admin/projects/ProjectList.tsx
"use client"

import { DataTable } from "@/components/admin/shared/DataTable"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
  createdAt: string
  updatedAt: string
}

// 在 columns 定义前声明类型
type ProjectListProps = {
  onDelete: (id: string) => void
}

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data.data || [])
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

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

  const columns: ColumnDef<Project>[] = [
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
    </div>
  )
}