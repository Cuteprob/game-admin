"use client"

import { DataTable } from "@/components/admin/shared/DataTable"
import { type ColumnDef } from "@tanstack/react-table"
import { GameBase } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { StarIcon, ExternalLinkIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

// 添加重试工具函数
async function fetchWithRetry<T>(
  url: string, 
  options: RequestInit, 
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: any;
  let attempt = 0;
  const abortControllers: AbortController[] = [];
  
  try {
    while (attempt < maxRetries) {
      try {
        const controller = new AbortController();
        abortControllers.push(controller);
        
        const timeoutId = setTimeout(() => {
          controller.abort('timeout');
        }, 15000);
        
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // 成功获取数据后，取消所有其他正在进行的请求
          abortControllers
            .filter(c => c !== controller)
            .forEach(c => c.abort('success'));
          
          return data as T;
        } finally {
          clearTimeout(timeoutId);
        }
      } catch (error: any) {
        // 如果是因为其他请求成功而被取消的，直接返回
        if (error.name === 'AbortError' && error.message === 'success') {
          throw new Error('Request cancelled due to successful retry');
        }
        
        lastError = error;
        attempt++;
        
        // 记录详细的错误信息
        console.log(`Attempt ${attempt}/${maxRetries} failed:`, {
          url,
          error: error.message,
          type: error.name,
          isTimeout: error instanceof DOMException && error.name === 'AbortError'
        });
        
        if (attempt < maxRetries) {
          const delay = error instanceof DOMException && error.name === 'AbortError'
            ? 0  // 超时错误立即重试
            : retryDelay * Math.pow(2, attempt - 1);  // 其他错误使用指数退避
            
          if (delay > 0) {
            console.log(`Waiting ${delay}ms before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
    }
    
    console.error(`All ${maxRetries} attempts failed for ${url}`, lastError);
    throw lastError;
  } finally {
    // 清理所有的 abort controllers
    abortControllers.forEach(controller => {
      try {
        controller.abort('cleanup');
      } catch (e) {
        // 忽略清理时的错误
      }
    });
  }
}

interface GameWithCategories extends GameBase {
  categories: Array<{
    categoryId: string
    category: {
      id: string
      name: string
    }
  }>
}

interface GameListProps {
  onDataChange?: (total: number) => void
}

export function GameList({ onDataChange }: GameListProps) {
  const [games, setGames] = useState<GameWithCategories[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const pageSize = 10

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) {
      return
    }

    try {
      setDeletingId(id)
      const data = await fetchWithRetry<{ message: string }>(
        `/api/gamesBase/${id}`,
        { method: 'DELETE' }
      )
      
      toast.success('Game deleted successfully')
      // 重新获取数据而不是刷新页面
      await fetchGames()
    } catch (error) {
      console.error('Failed to delete game:', error)
      toast.error('Failed to delete game')
    } finally {
      setDeletingId(null)
    }
  }

  const columns: ColumnDef<GameWithCategories>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="relative w-20 h-20 shrink-0 overflow-hidden">
            <Image
              src={row.original.imageUrl}
              alt={row.original.title}
              width={80}
              height={80}
              className="object-cover rounded-md"
              sizes="80px"
              loading="lazy"
            />
          </div>
        )
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const game = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">{game.title}</div>
            <div className="flex flex-wrap gap-1">
              {game.categories.map(({ category }) => (
                <Badge key={category.id} variant="secondary" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.original.description
        return <div className="max-w-[300px] truncate">{description}</div>
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original.rating
        return (
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span>{rating ? rating.toFixed(1) : 'N/A'}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "iframeUrl",
      header: "Game URL",
      cell: ({ row }) => {
        const url = row.original.iframeUrl
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
          >
            <ExternalLinkIcon className="w-4 h-4" />
            <span className="max-w-[200px] truncate">{url}</span>
          </a>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString()
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const game = row.original
        return (
          <div className="flex gap-2">
            <Link href={`/gamesBase/${game.id}`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(game.id)}
              disabled={deletingId === game.id}
            >
              {deletingId === game.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    fetchGames()
  }, [page, pageSize, search])

  const fetchGames = async () => {
    try {
      setLoading(true)
      const data = await fetchWithRetry<{
        data: GameWithCategories[]
        total: number
        message?: string
      }>(
        `/api/gamesBase?page=${page}&pageSize=${pageSize}${
          search ? `&search=${search}` : ""
        }`,
        { method: 'GET' }
      )
      
      setGames(data.data)
      setTotalPages(Math.ceil(data.total / pageSize))
      onDataChange?.(data.total)
    } catch (error) {
      console.error("Failed to fetch games:", error)
      toast.error("Failed to fetch games")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Input 
              placeholder="Search games..." 
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="outline" onClick={handleSearch}>Search</Button>
          </div>
          <div className="flex items-center gap-4">
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
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="relative w-full">
            <DataTable columns={columns} data={games} />
          </div>
        )}
      </div>
    </div>
  )
} 