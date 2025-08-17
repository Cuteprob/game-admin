"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Loader2 } from "lucide-react"
import { Category, CategoryDialogProps } from '@/types/category'

const formSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-zA-Z0-9_-]+$/, "ID can only contain letters, numbers, underscores, and hyphens"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
})

export function CategoryDialog({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryDialogProps) {
  const [saving, setSaving] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        id: category.id,
        name: category.name,
        description: category.description || "",
      })
    } else {
      form.reset({
        id: "",
        name: "",
        description: "",
      })
    }
  }, [category, form])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (saving) return
    
    try {
      setSaving(true)
      await onSave(data)
      onOpenChange(false) // 成功后关闭对话框
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!saving) {
        onOpenChange(open)
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter category ID (e.g., MUSIC, HOT, NEW)" 
                      {...field} 
                      disabled={!!category} // 编辑时不允许修改ID
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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
                      placeholder="Enter category description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {category ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  category ? "Update" : "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 