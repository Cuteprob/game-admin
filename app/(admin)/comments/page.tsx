"use client"

import { useState } from "react"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { CommentList } from "@/components/admin/comments/CommentList"
import { CommentStats } from "@/components/admin/comments/CommentStats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CommentStats as CommentStatsType } from "@/types/comment"

export default function CommentsPage() {
  const [stats, setStats] = useState<CommentStatsType>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    spam: 0
  })

  const handleStatsChange = (newStats: CommentStatsType) => {
    setStats(newStats)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Comment Management"
        description="Manage and moderate user comments and reviews"
      />

      {/* 统计卡片 */}
      <CommentStats stats={stats} />

      {/* 主要内容 */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Comments</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({stats.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({stats.rejected})
          </TabsTrigger>
          <TabsTrigger value="spam">
            Spam ({stats.spam})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <CommentList onDataChange={handleStatsChange} />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <CommentList onDataChange={handleStatsChange} />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <CommentList onDataChange={handleStatsChange} />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <CommentList onDataChange={handleStatsChange} />
        </TabsContent>

        <TabsContent value="spam" className="mt-6">
          <CommentList onDataChange={handleStatsChange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}




