"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, RotateCcw, X } from "lucide-react"

interface BulkResult {
  success: string[]
  failed: Array<{id: string, error: string}>
}

interface BulkResultsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  results: BulkResult
  games: Array<{gameId: string, title: string}>
  onRetryFailed?: (failedIds: string[]) => void
  operation?: string
}

export function BulkResultsDialog({ 
  open, 
  onOpenChange, 
  results, 
  games,
  onRetryFailed,
  operation = "operation"
}: BulkResultsDialogProps) {
  const successCount = results.success.length
  const failedCount = results.failed.length
  const totalCount = successCount + failedCount

  const getGameTitle = (gameId: string) => {
    const game = games.find(g => g.gameId === gameId)
    return game?.title || gameId
  }

  const handleRetryFailed = () => {
    if (onRetryFailed && results.failed.length > 0) {
      const failedIds = results.failed.map(f => f.id)
      onRetryFailed(failedIds)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bulk {operation} Results</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="text-sm">
              <span className="font-medium">Total: {totalCount}</span>
            </div>
            {successCount > 0 && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                {successCount} successful
              </Badge>
            )}
            {failedCount > 0 && (
              <Badge variant="outline" className="text-red-600 border-red-600">
                <XCircle className="h-3 w-3 mr-1" />
                {failedCount} failed
              </Badge>
            )}
          </div>

          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              {/* Success Section */}
              {successCount > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Successful ({successCount})
                  </h4>
                  <div className="space-y-1 pl-6">
                    {results.success.map((gameId) => (
                      <div key={gameId} className="text-sm text-muted-foreground">
                        {getGameTitle(gameId)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Failed Section */}
              {failedCount > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600 flex items-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    Failed ({failedCount})
                  </h4>
                  <div className="space-y-2 pl-6">
                    {results.failed.map((failure) => (
                      <div key={failure.id} className="space-y-1">
                        <div className="text-sm font-medium">
                          {getGameTitle(failure.id)}
                        </div>
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                          {failure.error}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <div>
              {failedCount > 0 && onRetryFailed && (
                <Button
                  variant="outline"
                  onClick={handleRetryFailed}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retry Failed ({failedCount})
                </Button>
              )}
            </div>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
