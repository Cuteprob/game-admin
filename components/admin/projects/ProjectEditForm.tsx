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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiCombobox } from "@/components/ui/multi-combobox"
import { toast } from "sonner"
import { ProjectCategoryList } from "@/components/admin/projects/ProjectCategoryList"

// 支持的语言选项
const SUPPORTED_LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: '简体中文', value: 'zh' },
  { label: '繁體中文', value: 'zh-TW' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
]

// 目标受众选项
const TARGET_AUDIENCES = [
  { label: 'General', value: 'general' },
  { label: 'Kids', value: 'kids' },
  { label: 'Teens', value: 'teens' },
  { label: 'Adults', value: 'adults' },
]

// 语气风格选项
const TONES = [
  { label: 'Professional', value: 'professional' },
  { label: 'Casual', value: 'casual' },
  { label: 'Friendly', value: 'friendly' },
  { label: 'Enthusiastic', value: 'enthusiastic' },
]
import { Project, ProjectEditFormProps } from '@/types/project'

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  defaultLocale: z.string({
    required_error: "Please select a default language",
  }),
  locales: z.array(z.string()).min(1, "At least one language is required"),
  aiConfig: z.object({
    targetAudience: z.string(),
    tone: z.string(),
    defaultPrompts: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
})

export function ProjectEditForm({ project, onSuccess }: ProjectEditFormProps) {
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState("general")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description || "",
      defaultLocale: project.defaultLocale,
      locales: project.locales,
      aiConfig: {
        targetAudience: project.aiConfig?.targetAudience || "",
        tone: project.aiConfig?.tone || "",
        defaultPrompts: {
          title: project.aiConfig?.defaultPrompts.title || "",
          description: project.aiConfig?.defaultPrompts.description || "",
        }
      }
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      toast.success('Project updated successfully')
      onSuccess?.()
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (tab === "general" || tab === "ai") {
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai">AI Configuration</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Game Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Project description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultLocale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Language</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supported Languages</FormLabel>
                  <FormControl>
                    <MultiCombobox
                      options={SUPPORTED_LANGUAGES}
                      selected={field.value}
                      onChange={(values) => field.onChange(values)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <FormField
              control={form.control}
              name="aiConfig.targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select target audience</option>
                      {TARGET_AUDIENCES.map((audience) => (
                        <option key={audience.value} value={audience.value}>
                          {audience.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiConfig.tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone of Voice</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select tone</option>
                      {TONES.map((tone) => (
                        <option key={tone.value} value={tone.value}>
                          {tone.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Prompts</h3>
              
              <FormField
                control={form.control}
                name="aiConfig.defaultPrompts.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Generation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Prompt for generating game titles..."
                        className="min-h-[100px] resize-vertical"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aiConfig.defaultPrompts.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description Generation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Prompt for generating game descriptions..."
                        className="min-h-[200px] resize-vertical"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <ProjectCategoryList projectId={project.id} />
          </TabsContent>
        </Tabs>

        {(tab === "general" || tab === "ai") && (
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </form>
    </Form>
  )
} 