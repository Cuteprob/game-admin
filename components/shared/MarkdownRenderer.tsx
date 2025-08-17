'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

import { MarkdownRendererProps } from '@/types/ui'

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn(
      "prose prose-neutral dark:prose-invert max-w-none",
      "prose-headings:font-semibold prose-headings:text-foreground",
      "prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6",
      "prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5",
      "prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4",
      "prose-p:text-muted-foreground prose-p:leading-relaxed",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-strong:text-foreground prose-strong:font-semibold",
      "prose-em:text-muted-foreground",
      "prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4",
      "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
      "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
      "prose-ul:list-disc prose-ul:pl-6",
      "prose-ol:list-decimal prose-ol:pl-6",
      "prose-li:text-muted-foreground",
      "prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-md",
      "prose-hr:border-border",
      className
    )}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义图片组件，支持居中显示
          img: ({ node, ...props }) => (
            <div className="flex justify-center my-4">
              <img 
                {...props} 
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          ),
          // 自定义链接组件
          a: ({ node, ...props }) => (
            <a 
              {...props} 
              className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          // 自定义代码块组件
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match
            return !isInline ? (
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          // 自定义表格组件
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border rounded-lg" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
