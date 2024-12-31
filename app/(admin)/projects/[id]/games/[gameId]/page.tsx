"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"

interface ProjectGame {
  id: string
  gameId: string
  title: string
  description: string
  locale: string
  metadata: any
  features: any
  faqs: any
  isPublished: boolean
  baseVersion: number
  createdAt: string
  updatedAt: string
}

interface Game {
  id: string
  title: string
  description: string
  metadata: any
  features: any
  faqs: any
}

interface Project {
  id: string
  title: string
  description: string
  aiConfig: {
    targetAudience: string
    tone: string
    defaultPrompts: {
      title: string
      description: string
      features: string
      faqs: string
    }
  }
}

// 格式化JSON显示
function JsonDisplay({ data }: { data: any }) {
  // 如果数据是字符串格式的JSON,先解析它
  const formattedData = typeof data === 'string' ? JSON.parse(data) : data
  
  // 格式化FAQ项目
  const formatFaqItem = (item: any) => {
    if (item.question && item.answer) {
      return (
        <div className="space-y-1">
          <div>
            <span className="text-blue-500">Q:</span> {item.question}
          </div>
          <div className="pl-4">
            <span className="text-green-500">A:</span> {item.answer}
          </div>
          {item.category && (
            <div className="pl-4 text-muted-foreground text-xs">
              Category: {item.category}
            </div>
          )}
        </div>
      )
    }
    return formatValue(item)
  }

  // 格式化显示
  const formatValue = (value: any): string | JSX.Element => {
    if (Array.isArray(value)) {
      // 检查是否是FAQ数组
      if (value.length > 0 && value[0].question && value[0].answer) {
        return (
          <div className="space-y-4">
            {value.map((item, index) => (
              <div key={index}>{formatFaqItem(item)}</div>
            ))}
          </div>
        )
      }
      // 普通数组
      return value.map(item => 
        typeof item === 'string' ? `"${item}"` : formatValue(item)
      ).join(', ')
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2)
    }
    return typeof value === 'string' ? `"${value}"` : String(value)
  }

  // 如果是数组,显示为列表
  if (Array.isArray(formattedData)) {
    // 检查是否是FAQ数组
    if (formattedData.length > 0 && formattedData[0].question && formattedData[0].answer) {
      return (
        <div className="p-4 rounded bg-muted font-mono text-sm space-y-4">
          {formattedData.map((item, index) => (
            <div key={index}>{formatFaqItem(item)}</div>
          ))}
        </div>
      )
    }
    // 普通数组
    return (
      <div className="p-2 rounded bg-muted font-mono text-sm space-y-1">
        {formattedData.map((item, index) => (
          <div key={index} className="break-words">
            • {formatValue(item)}
          </div>
        ))}
      </div>
    )
  }

  // 如果是对象,显示为格式化的JSON
  if (typeof formattedData === 'object' && formattedData !== null) {
    return (
      <div className="p-2 rounded bg-muted font-mono text-sm space-y-2">
        {Object.entries(formattedData).map(([key, value]) => (
          <div key={key} className="break-words">
            <span className="text-blue-500">{key}:</span>{' '}
            {formatValue(value)}
          </div>
        ))}
      </div>
    )
  }

  // 其他类型直接显示
  return (
    <div className="p-2 rounded bg-muted font-mono text-sm break-words">
      {String(formattedData)}
    </div>
  )
}

export default function EditGamePage({ 
  params 
}: { 
  params: { id: string; gameId: string } 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projectGame, setProjectGame] = useState<ProjectGame | null>(null)
  const [originalGame, setOriginalGame] = useState<Game | null>(null)
  const [editedContent, setEditedContent] = useState<Partial<ProjectGame>>({})
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({})
  const [generating, setGenerating] = useState(false)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // 获取项目游戏数据
        const projectGameResponse = await fetch(
          `/api/projects/${params.id}/games/${params.gameId}`
        )
        const projectGameData = await projectGameResponse.json()
        setProjectGame(projectGameData.data)
        // 初始化编辑内容
        setEditedContent(projectGameData.data)

        // 获取原始游戏数据
        const gameResponse = await fetch(`/api/gamesBase/${params.gameId}`)
        const gameData = await gameResponse.json()
        setOriginalGame(gameData.data)

        // 获取项目数据
        const projectResponse = await fetch(`/api/projects/${params.id}`)
        const projectData = await projectResponse.json()
        setProject(projectData.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        toast.error('Failed to load game data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, params.gameId])

  // 处理JSON字段更新
  const handleJsonChange = (field: string, value: string) => {
    try {
      const parsed = JSON.parse(value)
      setJsonErrors(prev => ({ ...prev, [field]: '' }))
      setEditedContent(prev => ({ ...prev, [field]: parsed }))
    } catch (e) {
      setJsonErrors(prev => ({ ...prev, [field]: 'Invalid JSON format' }))
    }
  }

  // 保存更改
  const handleSave = async () => {
    if (!editedContent) return
    
    // 检查是否有JSON错误
    if (Object.values(jsonErrors).some(error => error)) {
      toast.error('Please fix JSON format errors before saving')
      return
    }
    
    setSaving(true)
    try {
      const response = await fetch(
        `/api/projects/${params.id}/games/${params.gameId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedContent)
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to save changes')
      }

      const data = await response.json()
      setProjectGame(data.data)
      toast.success('Changes saved successfully')
    } catch (error) {
      console.error('Failed to save changes:', error)
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  // 处理发布状态变更
  const handleTogglePublish = async () => {
    if (!projectGame) return

    try {
      const response = await fetch(
        `/api/projects/${params.id}/games/${params.gameId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editedContent,
            isPublished: !projectGame.isPublished
          })
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to update publish status')
      }

      const data = await response.json()
      setProjectGame(data.data)
      setEditedContent(data.data)
      toast.success(
        `Game ${projectGame.isPublished ? 'unpublished' : 'published'} successfully`
      )
    } catch (error) {
      console.error('Failed to update publish status:', error)
      toast.error('Failed to update publish status')
    }
  }

  // 生成AI内容
  const handleGenerateContent = async () => {
    if (!originalGame || !projectGame || !project) return

    setGenerating(true)
    try {
      const response = await fetch(`/api/projects/${params.id}/games/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: params.gameId,
          mode: 'ai',
          locale: projectGame.locale,
          originalContent: {
            description: originalGame.description,
            metadata: originalGame.metadata,
            features: originalGame.features,
            faqs: originalGame.faqs
          },
          aiConfig: {
            tone: project.aiConfig.tone,
            targetAudience: project.aiConfig.targetAudience,
            prompts: {
              title: project.aiConfig.defaultPrompts.title,
              description: project.aiConfig.defaultPrompts.description,
              features: project.aiConfig.defaultPrompts.features,
              faqs: project.aiConfig.defaultPrompts.faqs
            }
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const { data } = await response.json()
      setEditedContent({
        ...editedContent,
        ...data
      })
      toast.success('Content generated successfully')
    } catch (error) {
      console.error('Failed to generate content:', error)
      toast.error('Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!projectGame || !originalGame) {
    return <div>Game not found</div>
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex items-center justify-between">
        <PageHeader 
          title={projectGame.title}
          description={`Edit game content and manage localization`}
        />
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/projects/${params.id}`)}
          >
            Back to Project
          </Button>
          <Button
            variant={projectGame.isPublished ? "outline" : "default"}
            onClick={handleTogglePublish}
          >
            {projectGame.isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 左侧：原始内容 */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Original Content</h3>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Title</h4>
              <div className="p-2 rounded bg-muted break-words">
                {originalGame.title}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <div className="p-2 rounded bg-muted break-words">
                {originalGame.description}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Metadata</h4>
              <JsonDisplay data={originalGame.metadata} />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Features</h4>
              <JsonDisplay data={originalGame.features} />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">FAQs</h4>
              <JsonDisplay data={originalGame.faqs} />
            </div>
          </div>
        </Card>

        {/* 右侧：本地化内容 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Localized Content</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleGenerateContent}
                >
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating
                    </>
                  ) : (
                    'Generate with AI'
                  )}
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Title</h4>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  title: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Description</h4>
              <Textarea
                value={editedContent.description || ''}
                onChange={(e) => setEditedContent({
                  ...editedContent,
                  description: e.target.value
                })}
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Metadata</h4>
                {jsonErrors.metadata && (
                  <span className="text-sm text-destructive">{jsonErrors.metadata}</span>
                )}
              </div>
              <Textarea
                value={JSON.stringify(editedContent.metadata, null, 2)}
                onChange={(e) => handleJsonChange('metadata', e.target.value)}
                className="font-mono text-sm"
                rows={16}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Features</h4>
                {jsonErrors.features && (
                  <span className="text-sm text-destructive">{jsonErrors.features}</span>
                )}
              </div>
              <Textarea
                value={JSON.stringify(editedContent.features, null, 2)}
                onChange={(e) => handleJsonChange('features', e.target.value)}
                className="font-mono text-sm"
                rows={10}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">FAQs</h4>
                {jsonErrors.faqs && (
                  <span className="text-sm text-destructive">{jsonErrors.faqs}</span>
                )}
              </div>
              <Textarea
                value={JSON.stringify(editedContent.faqs, null, 2)}
                onChange={(e) => handleJsonChange('faqs', e.target.value)}
                className="font-mono text-sm"
                rows={70}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 