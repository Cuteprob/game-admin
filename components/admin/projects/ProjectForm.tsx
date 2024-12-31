"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiCombobox } from "@/components/ui/multi-combobox"

// 支持的语言列表
const SUPPORTED_LOCALES = [
  { label: "English", value: "en" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" }
]

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Project ID must be at least 2 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Project ID can only contain lowercase letters, numbers, and hyphens.",
  }),
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  defaultLocale: z.string({
    required_error: "Please select a default language.",
  }),
  locales: z.array(z.string()).min(1, {
    message: "Please select at least one language.",
  })
})

export function ProjectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      defaultLocale: "",
      locales: []
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      router.push('/projects')
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input placeholder="my-project-id" {...field} />
              </FormControl>
              <FormDescription>
                A unique identifier for your project. Use lowercase letters, numbers, and hyphens only.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="My Game Project" {...field} />
              </FormControl>
              <FormDescription>
                This is your project's display name.
              </FormDescription>
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
                  placeholder="Tell us about your project..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of your project.
              </FormDescription>
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
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SUPPORTED_LOCALES.map((locale) => (
                    <SelectItem key={locale.value} value={locale.value}>
                      {locale.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The primary language for this project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locales"
          render={({ field }) => {
            console.log('ProjectForm locales field:', field)
            return (
              <FormItem>
                <FormLabel>Supported Languages</FormLabel>
                <FormControl>
                  <MultiCombobox
                    selected={field.value || []}
                    options={SUPPORTED_LOCALES}
                    onChange={(values) => {
                      console.log('ProjectForm onChange:', values)
                      field.onChange(values)
                    }}
                    placeholder="Select languages..."
                  />
                </FormControl>
                <FormDescription>
                  Languages that will be supported in this project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Form>
  )
} 