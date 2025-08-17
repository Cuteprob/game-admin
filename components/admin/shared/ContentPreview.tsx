'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer'
import { Eye, Edit3, Code } from 'lucide-react'

import { ContentPreviewProps } from '@/types/ui'

export function ContentPreview({ 
  content, 
  onChange, 
  title = "Content", 
  placeholder = "Enter your content here...",
  className 
}: ContentPreviewProps) {
  const [activeTab, setActiveTab] = useState('edit')

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="raw" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Raw
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-4">
            <Textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="min-h-[400px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="min-h-[400px] border rounded-lg p-4 bg-background">
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <div className="text-muted-foreground text-center py-8">
                  No content to preview
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="raw" className="mt-4">
            <div className="min-h-[400px] border rounded-lg p-4 bg-muted font-mono text-sm overflow-auto">
              <pre className="whitespace-pre-wrap">{content}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
