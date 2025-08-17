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
import { toast } from "sonner"
import { GameSelect } from "@/components/admin/games/GameSelect"
import { Card } from "@/components/ui/card"
import { Game } from '@/config/sprunkigame';
import { Project, AddGameFormProps } from '@/types/project'

const formSchema = z.object({
  locale: z.string({
    required_error: "Please select a language",
  }),
  gameIds: z.array(z.string()).min(1, "Please select at least one game"),
})

export function AddGameForm({ project, onSuccess }: AddGameFormProps) {
  const [loading, setLoading] = useState(false)
  const [selectedGames, setSelectedGames] = useState<Game[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locale: project.defaultLocale,
      gameIds: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedGames.length === 0) {
      toast.error('Please select at least one game')
      return
    }

    try {
      setLoading(true)

      // 准备提交的数据
      const submitData = selectedGames.map(game => ({
        gameId: game.id,
        locale: values.locale,
        title: game.title,
        metadata: game.metadata,
        content: game.content,
        createdAt: game.createdAt,
        rating: game.rating
      }))

      const response = await fetch(`/api/projects/${project.id}/games/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        throw new Error('Failed to add games to project')
      }

      toast.success('Games added to project')
      onSuccess()
    } catch (error) {
      console.error('Failed to add games:', error)
      toast.error('Failed to add games to project')
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
                name="gameIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Games</FormLabel>
                    <FormControl>
                      <GameSelect
                        projectId={project.id}
                        selectedGames={selectedGames}
                        onSelect={(games) => {
                          setSelectedGames(games)
                          field.onChange(games.map(g => g.id))
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
                      >
                        {project.locales.map((locale: string) => (
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Games"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 