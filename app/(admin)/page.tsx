"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { 
  LayoutGrid,
  GamepadIcon, 
  Languages,
  CircleDot,
  BrainCircuit,
  ListChecks,
  AlertCircle
} from "lucide-react"

interface DashboardStats {
  // Project Stats
  totalProjects: number
  projectGamesCount: {
    projectId: string
    count: number
    languages: string[]
    published: number
    unpublished: number
  }[]
  
  // Base Game Stats
  totalGames: number
  totalCategories: number
  recentGames: {
    id: string
    title: string
    createdAt: string
  }[]
  
  // AI Task Stats
  pendingTasks: number
  completedTasks: number
  failedTasks: number
  recentTasks: {
    id: string
    projectId: string
    status: string
    createdAt: string
  }[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    projectGamesCount: [],
    totalGames: 0,
    totalCategories: 0,
    recentGames: [],
    pendingTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    recentTasks: []
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of game management system"
      />

      {/* Project Overview */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Project Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          {stats.projectGamesCount.map(project => (
            <Card key={project.projectId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{project.projectId}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.languages.length}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.count}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <CircleDot className="h-3 w-3 text-green-500" />
                  <span>{project.published} published</span>
                  <CircleDot className="h-3 w-3 text-yellow-500" />
                  <span>{project.unpublished} draft</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Base Game Stats */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Base Game Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Games</CardTitle>
              <GamepadIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGames}</div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.recentGames.map(game => (
                  <div key={game.id} className="flex items-center justify-between">
                    <span className="text-sm">{game.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Task Status */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">AI Generation Status</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.failedTasks}</div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.recentTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{task.projectId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 