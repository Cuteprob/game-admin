"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StarIcon, SaveIcon, RotateCcwIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { 
  RatingManagementProps, 
  UpsertRatingData, 
  RatingDistribution 
} from "@/types/comment"

export function RatingManagement({ 
  gameId, 
  projectId, 
  locale, 
  currentRating, 
  onUpdate 
}: RatingManagementProps) {
  const [averageRating, setAverageRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [distribution, setDistribution] = useState<RatingDistribution>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  })
  const [saving, setSaving] = useState(false)
  const [recalculating, setRecalculating] = useState(false)

  useEffect(() => {
    if (currentRating) {
      setAverageRating(currentRating.averageRating)
      setTotalRatings(currentRating.totalRatings)
      
      // 直接从 currentRating 获取评分分布数据
      setDistribution({
        1: currentRating.rating1Count || 0,
        2: currentRating.rating2Count || 0,
        3: currentRating.rating3Count || 0,
        4: currentRating.rating4Count || 0,
        5: currentRating.rating5Count || 0
      })
    }
  }, [currentRating])

  const handleSave = async () => {
    try {
      setSaving(true)
      
      const data: UpsertRatingData = {
        gameId,
        projectId,
        locale,
        averageRating,
        totalRatings,
        ratingDistribution: distribution
      }
      
      await onUpdate(data)
      toast.success('Rating updated successfully')
    } catch (error) {
      console.error('Failed to update rating:', error)
      toast.error('Failed to update rating')
    } finally {
      setSaving(false)
    }
  }

  const handleRecalculate = async () => {
    try {
      setRecalculating(true)
      
      const response = await fetch(`/api/admin/ratings/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectId, 
          locale, 
          action: 'recalculate' 
        })
      })

      const result = await response.json()
      
      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to recalculate rating')
      }
      
      if (result.data) {
        setAverageRating(result.data.averageRating)
        setTotalRatings(result.data.totalRatings)
        
        // 直接从返回的数据获取评分分布
        setDistribution({
          1: result.data.rating1Count || 0,
          2: result.data.rating2Count || 0,
          3: result.data.rating3Count || 0,
          4: result.data.rating4Count || 0,
          5: result.data.rating5Count || 0
        })
      }
      
      toast.success('Rating recalculated from comments')
    } catch (error) {
      console.error('Failed to recalculate rating:', error)
      toast.error('Failed to recalculate rating')
    } finally {
      setRecalculating(false)
    }
  }

  const updateDistribution = (star: number, value: number) => {
    setDistribution(prev => ({
      ...prev,
      [star]: Math.max(0, value)
    }))
    
    // 自动更新总评分数
    const newTotal = Object.values({
      ...distribution,
      [star]: Math.max(0, value)
    }).reduce((sum, count) => sum + count, 0)
    setTotalRatings(newTotal)
    
    // 自动计算平均评分
    if (newTotal > 0) {
      const weightedSum = Object.entries({
        ...distribution,
        [star]: Math.max(0, value)
      }).reduce((sum, [rating, count]) => sum + (parseInt(rating) * count), 0)
      setAverageRating(Math.round((weightedSum / newTotal) * 10) / 10)
    } else {
      setAverageRating(0)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : i === Math.floor(rating) && rating % 1 >= 0.5
            ? 'text-yellow-500 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          Rating Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 当前评分显示 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Average Rating</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">{renderStars(averageRating)}</div>
              <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
            </div>
          </div>
          <div>
            <Label>Total Ratings</Label>
            <div className="text-2xl font-bold mt-1">{totalRatings}</div>
          </div>
        </div>

        {/* 手动编辑 */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="averageRating">Average Rating (0-5)</Label>
              <Input
                id="averageRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={averageRating}
                onChange={(e) => setAverageRating(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="totalRatings">Total Ratings</Label>
              <Input
                id="totalRatings"
                type="number"
                min="0"
                value={totalRatings}
                onChange={(e) => setTotalRatings(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* 评分分布 */}
          <div>
            <Label>Rating Distribution</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                <div key={star} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-sm">{star}</span>
                    <StarIcon className="w-3 h-3 text-yellow-500" />
                  </div>
                  <Input
                    type="number"
                    min="0"
                    value={distribution[star as keyof RatingDistribution]}
                    onChange={(e) => updateDistribution(star, parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SaveIcon className="w-4 h-4" />
            )}
            Save Rating
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleRecalculate}
            disabled={recalculating}
            className="flex items-center gap-2"
          >
            {recalculating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcwIcon className="w-4 h-4" />
            )}
            Recalculate from Comments
          </Button>
        </div>

        {/* 说明文字 */}
        <div className="text-sm text-muted-foreground">
          <p>• You can manually set the rating data or recalculate from approved comments</p>
          <p>• Rating distribution will automatically update total ratings and average</p>
          <p>• This rating data is independent from comment ratings and will be used as the authoritative source</p>
          <p>• Recalculate option will sync with comment ratings but maintains independence afterward</p>
        </div>
      </CardContent>
    </Card>
  )
}




