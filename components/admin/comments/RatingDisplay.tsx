"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StarIcon } from "lucide-react"
import type { RatingDisplayProps, RatingDistribution } from "@/types/comment"

export function RatingDisplay({ 
  rating, 
  totalRatings, 
  distribution, 
  showDetails = true 
}: RatingDisplayProps) {
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4", 
      lg: "w-5 h-5"
    }
    
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`${sizeClasses[size]} ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : i === Math.floor(rating) && rating % 1 >= 0.5
            ? 'text-yellow-500 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const getDistributionPercentage = (star: number) => {
    if (!distribution || totalRatings === 0) return 0
    return Math.round((distribution[star as keyof RatingDistribution] / totalRatings) * 100)
  }

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({totalRatings})</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          Game Rating
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 主要评分显示 */}
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{rating.toFixed(1)}</div>
          <div className="flex justify-center mb-2">
            {renderStars(rating, "lg")}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {totalRatings} rating{totalRatings !== 1 ? 's' : ''}
          </div>
        </div>

        {/* 评分分布 */}
        {distribution && totalRatings > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Rating Distribution</h4>
            {[5, 4, 3, 2, 1].map(star => {
              const count = distribution[star as keyof RatingDistribution] || 0
              const percentage = getDistributionPercentage(star)
              
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 w-12">
                    <span>{star}</span>
                    <StarIcon className="w-3 h-3 text-yellow-500" />
                  </div>
                  <Progress 
                    value={percentage} 
                    className="flex-1 h-2"
                  />
                  <div className="w-12 text-right text-muted-foreground">
                    {count}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 无评分时的显示 */}
        {totalRatings === 0 && (
          <div className="text-center text-muted-foreground py-4">
            <StarIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <div>No ratings yet</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}




