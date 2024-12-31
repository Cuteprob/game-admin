"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { GameSelect } from "@/components/admin/games/GameSelect"
import { Game } from "@/repositories/gameRepository"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// 扩展 Game 类型以包含所有需要的字段
interface ExtendedGame extends Game {
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  features: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

interface Project {
  id: string
  name: string
  description: string | null
  defaultLocale: string
  locales: string[]
  aiConfig?: {
    tone?: string
    targetAudience?: string
  }
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  locale: z.string({
    required_error: "Please select a language",
  }),
  description: z.string().min(1, "Description is required"),
  metadata: z.string().optional(),
  features: z.string().optional(),
  faqs: z.string().optional(),
  gameId: z.string({
    required_error: "Please select a game",
  }),
  controls: z.string().optional(),
  iframeUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  rating: z.number().optional(),
  video: z.string().optional(),
})

interface AddGameFormProps {
  project: Project
  onSuccess: () => void
}

export function AddGameForm({ project, onSuccess }: AddGameFormProps) {
  const [loading, setLoading] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [generating, setGenerating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locale: project.defaultLocale,
    },
  })

  // 设置原始游戏数据
  const setOriginalGameData = (game: Game) => {
    // 保持与原始游戏一致的内容
    form.setValue('gameId', game.id)
    form.setValue('controls', JSON.stringify(game.controls))
    form.setValue('iframeUrl', game.iframeUrl)
    form.setValue('imageUrl', game.imageUrl)
    form.setValue('rating', game.rating)
    
    // 设置标题的初始值（可编辑）
    form.setValue('title', game.title)
  }

  // 生成内容
  const generateContent = async (game: Game) => {
    try {
      setGenerating(true)
      const response = await fetch(`/api/projects/${project.id}/games/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
          mode: 'ai',
          locale: form.getValues('locale'),
          originalContent: {
            description: game.description,
            metadata: game.metadata,
            features: game.features,
            faqs: game.faqs
          },
          aiConfig: project.aiConfig
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const { data } = await response.json()
      
      // 更新 AI 生成的内容
      form.setValue('description', data.description)
      if (data.metadata) form.setValue('metadata', JSON.stringify(data.metadata, null, 2))
      if (data.features) form.setValue('features', JSON.stringify(data.features, null, 2))
      if (data.faqs) form.setValue('faqs', JSON.stringify(data.faqs, null, 2))

      toast.success('Content generated successfully')
    } catch (error) {
      console.error('Failed to generate content:', error)
      toast.error('Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  // 计算格式化后的行数，并确保最小行数
  const calculateRows = (value: string | undefined) => {
    if (!value) return 10 // 设置空值时的最小行数
    try {
      // 如果是 JSON 字符串，先解析并重新格式化
      const parsed = JSON.parse(value)
      const formatted = JSON.stringify(parsed, null, 2)
      return Math.max(formatted.split('\n').length, 10) // 确保至少有10行
    } catch {
      // 如果不是 JSON 或解析失败，直接按换行符计算
      return Math.max(value.split('\n').length, 10) // 确保至少有10行
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedGame) {
      toast.error('Please select a game')
      return
    }

    try {
      setLoading(true)

      // 准备提交的数据
      const submitData = {
        // 手动编辑的内容
        title: values.title,
        locale: values.locale,

        // AI 生成的内容
        description: values.description,
        metadata: values.metadata ? JSON.parse(values.metadata) : selectedGame.metadata,
        features: values.features ? JSON.parse(values.features) : selectedGame.features,
        faqs: values.faqs ? JSON.parse(values.faqs) : selectedGame.faqs,

        // 保持与原始游戏一致的内容
        gameId: selectedGame.id,
        controls: selectedGame.controls,
        iframeUrl: selectedGame.iframeUrl,
        imageUrl: selectedGame.imageUrl,
        rating: selectedGame.rating
      }

      const response = await fetch(`/api/projects/${project.id}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error('Failed to add game to project')
      }

      toast.success('Game added to project')
      onSuccess()
    } catch (error) {
      console.error('Failed to add game:', error)
      toast.error('Failed to add game to project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game</FormLabel>
                    <FormControl>
                      <GameSelect
                        projectId={project.id}
                        value={selectedGame}
                        onSelect={(game) => {
                          field.onChange(game.id)
                          setSelectedGame(game)
                          // 生成内容
                          generateContent(game)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          if (selectedGame) {
                            generateContent(selectedGame)
                          }
                        }}
                      >
                        {project.locales.map((locale) => (
                          <option key={locale} value={locale}>
                            {locale.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {selectedGame && (
            <div className="grid grid-cols-2 gap-6">
              {/* 左侧：原始内容 */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Original Content</h3>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Title</h4>
                    <div className="p-2 rounded bg-muted break-words">
                      {selectedGame.title}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Description</h4>
                    <div className="p-2 rounded bg-muted break-words">
                      {selectedGame.description}
                    </div>
                  </div>

                  {selectedGame.metadata && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Metadata</h4>
                      <div className="p-2 rounded bg-muted font-mono text-sm whitespace-pre-wrap break-words">
                        {JSON.stringify(selectedGame.metadata, null, 2)}
                      </div>
                    </div>
                  )}

                  {selectedGame.features && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Features</h4>
                      <div className="p-2 rounded bg-muted font-mono text-sm whitespace-pre-wrap break-words">
                        {JSON.stringify(selectedGame.features, null, 2)}
                      </div>
                    </div>
                  )}

                  {selectedGame.faqs && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">FAQs</h4>
                      <div className="p-2 rounded bg-muted font-mono text-sm whitespace-pre-wrap break-words">
                        {JSON.stringify(selectedGame.faqs, null, 2)}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* 右侧：生成/编辑内容 */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between h-7">
                    <h3 className="text-lg font-medium">Generated Content</h3>
                    {generating && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Title</FormLabel>
                        <FormControl>
                          <div className="p-2 rounded bg-muted">
                            <Input 
                              {...field} 
                              className="bg-transparent border-0 focus-visible:ring-0 px-0 py-0 h-auto"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Description</FormLabel>
                        <FormControl>
                          <div className="p-2 rounded bg-muted">
                            <Textarea
                              {...field}
                              className="bg-transparent border-0 focus-visible:ring-0 px-0 py-0 h-auto resize-none min-h-[200px]"
                              rows={Math.max((field.value?.split('\n').length || 0) + 0, 0)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metadata"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Metadata</FormLabel>
                        <FormControl>
                          <div className="p-2 rounded bg-muted">
                            <Textarea
                              {...field}
                              className="font-mono text-sm bg-transparent border-0 focus-visible:ring-0 px-0 py-0 h-auto resize-none whitespace-pre-wrap min-h-[200px]"
                              rows={Math.max((field.value?.split('\n').length || 0) + 6, 5)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Features</FormLabel>
                        <FormControl>
                          <div className="p-2 rounded bg-muted">
                            <Textarea
                              {...field}
                              className="font-mono text-sm bg-transparent border-0 focus-visible:ring-0 px-0 py-0 h-auto resize-none whitespace-pre-wrap min-h-[200px]"
                              rows={Math.max((field.value?.split('\n').length || 0) + 2, 5)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="faqs"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">FAQs</FormLabel>
                        <FormControl>
                          <div className="p-2 rounded bg-muted">
                            <Textarea
                              {...field}
                              className="font-mono text-sm bg-transparent border-0 focus-visible:ring-0 px-0 py-0 h-auto resize-none whitespace-pre-wrap min-h-[200px]"
                              rows={Math.max((field.value?.split('\n').length || 0) + 30, 8)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading || generating}>
            {loading ? "Adding..." : "Add Game"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 