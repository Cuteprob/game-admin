"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { type GameBase } from "@/lib/db/schema"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MultiCombobox } from "@/components/ui/multi-combobox"

interface GameFormProps {
  game?: Partial<GameBase> & {
    categories?: string[]
  }
  onSubmit?: (data: Partial<GameBase> & {
    categories: string[]
  }) => Promise<void>
}

interface FormData {
  id: string
  title: string
  description: string
  iframeUrl: string
  imageUrl: string
  rating: number
  categories: string[]
  metadata: string
  controls: string
  features: string
  faqs: string
  video: string
  createdAt: string
}

function isValidJSON(str: string) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export function GameForm({ game, onSubmit }: GameFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  
  const [formData, setFormData] = useState<FormData>({
    id: game?.id || '',
    title: game?.title || '',
    description: game?.description || '',
    iframeUrl: game?.iframeUrl || '',
    imageUrl: game?.imageUrl || '',
    rating: game?.rating || 0,
    categories: game?.categories || [],
    metadata: game?.metadata || JSON.stringify({
      title: "",
      description: "",
      keywords: []
    }, null, 2),
    controls: game?.controls || JSON.stringify({
      movement: [],
      actions: [],
      special: []
    }, null, 2),
    features: game?.features || '[]',
    faqs: game?.faqs || '[]',
    video: game?.video || JSON.stringify({
      youtubeId: "",
      title: "",
      thumbnail: ""
    }, null, 2),
    createdAt: game?.createdAt || new Date().toISOString()
  })

  // 获取分类列表
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.data || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // 当 game prop 更新时，更新表单数据
  useEffect(() => {
    if (game) {
      setFormData(prevData => ({
        ...prevData,
        ...game,
        rating: game.rating || 0,
        categories: game.categories || [],
        video: game.video || prevData.video
      }))
    }
  }, [game])

  const formatJSON = (field: 'metadata' | 'controls' | 'features' | 'faqs' | 'video') => {
    try {
      const formatted = JSON.stringify(JSON.parse(formData[field]), null, 2)
      setFormData({ ...formData, [field]: formatted })
      setErrors({ ...errors, [field]: '' })
    } catch (e) {
      setErrors({ ...errors, [field]: 'Invalid JSON format' })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        const response = await fetch('/api/gamesBase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Failed to save game')
        }

        router.push('/gamesBase')
      }
    } catch (error) {
      console.error('Failed to save game:', error)
      setErrors({ ...errors, submit: 'Failed to save game' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Basic Information</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter the essential details about your game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="id" className="text-sm font-medium">Game ID</Label>
              <Input
                id="id"
                placeholder="e.g., sprunki-phase-1"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
                className="bg-background/50"
              />
              <p className="text-[13px] text-muted-foreground">
                Use lowercase letters, numbers, and hyphens only
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Sprunki Phase 1"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your game..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="min-h-[120px] bg-background/50 resize-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rating" className="text-sm font-medium">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="e.g., 4.5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categories" className="text-sm font-medium">Categories</Label>
              <MultiCombobox
                options={categories.map(cat => ({
                  value: cat.id,
                  label: cat.name
                }))}
                selected={formData.categories || []}
                onChange={(values) => {
                  console.log('GameForm onChange:', values)
                  setFormData({ ...formData, categories: values })
                }}
                placeholder="Select categories..."
              />
              <p className="text-[13px] text-muted-foreground">
                You can select multiple categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URLs and Resources */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Game Resources</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Add the necessary URLs for your game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="iframeUrl" className="text-sm font-medium">Game URL</Label>
              <Input
                id="iframeUrl"
                placeholder="https://example.com/game/embed"
                value={formData.iframeUrl}
                onChange={(e) => setFormData({ ...formData, iframeUrl: e.target.value })}
                required
                type="url"
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="text-sm font-medium">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/images/game.webp"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
                type="url"
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Advanced Settings</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure metadata, controls, and other advanced options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="metadata" className="text-sm font-medium">Metadata (JSON)</Label>
              <Textarea
                id="metadata"
                value={formData.metadata}
                onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                onBlur={() => formatJSON('metadata')}
                className="font-mono text-sm min-h-[200px] bg-background/50"
              />
              {errors.metadata && (
                <p className="text-sm text-destructive">{errors.metadata}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="controls" className="text-sm font-medium">Controls (JSON)</Label>
              <Textarea
                id="controls"
                value={formData.controls}
                onChange={(e) => setFormData({ ...formData, controls: e.target.value })}
                onBlur={() => formatJSON('controls')}
                className="font-mono text-sm min-h-[200px] bg-background/50"
              />
              {errors.controls && (
                <p className="text-sm text-destructive">{errors.controls}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="features" className="text-sm font-medium">Features (JSON)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                onBlur={() => formatJSON('features')}
                className="font-mono text-sm min-h-[150px] bg-background/50"
              />
              {errors.features && (
                <p className="text-sm text-destructive">{errors.features}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="faqs" className="text-sm font-medium">FAQs (JSON)</Label>
              <Textarea
                id="faqs"
                value={formData.faqs}
                onChange={(e) => setFormData({ ...formData, faqs: e.target.value })}
                onBlur={() => formatJSON('faqs')}
                className="font-mono text-sm min-h-[150px] bg-background/50"
              />
              {errors.faqs && (
                <p className="text-sm text-destructive">{errors.faqs}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Settings */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-semibold">Video Settings</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure video information for the game
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="video" className="text-sm font-medium">Video Configuration (JSON)</Label>
            <Textarea
              id="video"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              onBlur={() => formatJSON('video')}
              className="font-mono text-sm min-h-[150px] bg-background/50"
            />
            {errors.video && (
              <p className="text-sm text-destructive">{errors.video}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="min-w-[100px]"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? 'Saving...' : 'Save Game'}
        </Button>
      </div>

      {errors.submit && (
        <p className="text-sm text-destructive text-center mt-4">{errors.submit}</p>
      )}
    </form>
  )
} 