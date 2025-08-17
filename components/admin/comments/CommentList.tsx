"use client"

import { DataTable } from "@/components/admin/shared/DataTable"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { StarIcon, MessageSquareIcon, CheckIcon, XIcon, AlertTriangleIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import type { CommentWithGame, CommentStats, CommentStatus, CommentListProps } from "@/types/comment"

export function CommentList({ onDataChange }: CommentListProps) {
  const [comments, setComments] = useState<CommentWithGame[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<CommentStatus | "all">("all")
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const [moderatingIds, setModeratingIds] = useState<Set<number>>(new Set())
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const pageSize = 10

  const handleModerate = async (id: number, status: CommentStatus) => {
    try {
      setModeratingIds(prev => new Set(prev).add(id))
      
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'moderate', status })
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message)
      }
      
      toast.success(`Comment ${status} successfully`)
      await fetchComments()
    } catch (error) {
      console.error('Failed to moderate comment:', error)
      toast.error('Failed to moderate comment')
    } finally {
      setModeratingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleBatchModerate = async (status: CommentStatus) => {
    if (selectedIds.size === 0) {
      toast.error('Please select comments to moderate')
      return
    }

    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ids: Array.from(selectedIds), 
          status 
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message)
      }
      
      toast.success(data.message)
      setSelectedIds(new Set())
      await fetchComments()
    } catch (error) {
      console.error('Failed to batch moderate:', error)
      toast.error('Failed to moderate comments')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message)
      }
      
      toast.success('Comment deleted successfully')
      await fetchComments()
    } catch (error) {
      console.error('Failed to delete comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  const getStatusBadge = (status: CommentStatus) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      spam: "bg-gray-100 text-gray-800"
    }

    return (
      <Badge className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const columns: ColumnDef<CommentWithGame>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => {
            if (e.target.checked) {
              const allIds = new Set(comments.map(c => c.id))
              setSelectedIds(allIds)
              table.toggleAllPageRowsSelected(true)
            } else {
              setSelectedIds(new Set())
              table.toggleAllPageRowsSelected(false)
            }
          }}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedIds.has(row.original.id)}
          onChange={(e) => {
            const newSelected = new Set(selectedIds)
            if (e.target.checked) {
              newSelected.add(row.original.id)
            } else {
              newSelected.delete(row.original.id)
            }
            setSelectedIds(newSelected)
          }}
          className="rounded border-gray-300"
        />
      ),
    },
    {
      accessorKey: "game",
      header: "Game",
      cell: ({ row }) => {
        const comment = row.original
        return (
          <div className="flex items-center gap-3">
            <img
              src={comment.game.imageUrl}
              alt={comment.game.title}
              className="w-12 h-12 object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder-game.svg'
              }}
            />
            <div>
              <div className="font-medium text-sm">{comment.game.title}</div>
              <div className="text-xs text-muted-foreground">{comment.project.name}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "content",
      header: "Comment",
      cell: ({ row }) => {
        const comment = row.original
        return (
          <div className="max-w-md">
            <div className="text-sm mb-1">{comment.content}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>by {comment.nickname}</span>
              {comment.ratingScore && (
                <div className="flex items-center gap-1">
                  <StarIcon className="w-3 h-3 text-yellow-500" />
                  <span>{comment.ratingScore}/5</span>
                </div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: "helpfulVotes",
      header: "Helpful",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
          <span>{row.original.helpfulVotes}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const comment = row.original
        const isModeratingThis = moderatingIds.has(comment.id)
        
        return (
          <div className="flex gap-1">
            {comment.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModerate(comment.id, 'approved')}
                  disabled={isModeratingThis}
                  className="text-green-600 hover:text-green-700"
                >
                  {isModeratingThis ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <CheckIcon className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModerate(comment.id, 'rejected')}
                  disabled={isModeratingThis}
                  className="text-red-600 hover:text-red-700"
                >
                  {isModeratingThis ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <XIcon className="w-3 h-3" />
                  )}
                </Button>
              </>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleModerate(comment.id, 'spam')}
              disabled={isModeratingThis}
              className="text-orange-600 hover:text-orange-700"
            >
              {isModeratingThis ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <AlertTriangleIcon className="w-3 h-3" />
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(comment.id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    fetchComments()
  }, [page, pageSize, search, statusFilter, projectFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchComments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      })
      
      if (search) params.append('search', search)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (projectFilter !== 'all') params.append('projectId', projectFilter)

      const response = await fetch(`/api/admin/comments?${params}`)
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message)
      }
      
      setComments(data.data)
      setTotalPages(data.pagination.totalPages)
      
      // 获取统计信息
      const statsResponse = await fetch('/api/admin/comments/stats')
      const statsData = await statsResponse.json()
      if (statsData.success) {
        onDataChange?.(statsData.data.comments)
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      toast.error("Failed to fetch comments")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
  }

  return (
    <div className="w-full space-y-4">
      {/* 搜索和筛选 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Search comments..." 
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline" onClick={handleSearch}>Search</Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 批量操作 */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm">{selectedIds.size} comment(s) selected</span>
          <Button
            size="sm"
            onClick={() => handleBatchModerate('approved')}
            className="bg-green-600 hover:bg-green-700"
          >
            Approve Selected
          </Button>
          <Button
            size="sm"
            onClick={() => handleBatchModerate('rejected')}
            className="bg-red-600 hover:bg-red-700"
          >
            Reject Selected
          </Button>
          <Button
            size="sm"
            onClick={() => handleBatchModerate('spam')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Mark as Spam
          </Button>
        </div>
      )}
      
      {/* 分页信息 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* 数据表格 */}
      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
          <div>Loading comments...</div>
        </div>
      ) : (
        <DataTable columns={columns} data={comments} />
      )}
    </div>
  )
}
