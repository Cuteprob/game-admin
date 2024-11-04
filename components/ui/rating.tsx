"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export interface RatingProps {
  initialRating?: number;
  totalVotes?: number;
  onRate?: (rating: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  isReadOnly?: boolean;
}

export function Rating({ 
  initialRating = 4.8, 
  totalVotes = 234, 
  onRate, 
  className, 
  size = "md",
  isReadOnly = false 
}: RatingProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [currentRating, setCurrentRating] = useState(initialRating)
  const [currentVotes, setCurrentVotes] = useState(totalVotes)

  const handleRate = (value: number) => {
    if (!hasVoted && !isReadOnly) {
      setRating(value)
      setHasVoted(true)
      onRate?.(value)

      // 计算新的平均评分和总票数
      const newTotalVotes = currentVotes + 1
      const newRating = ((currentRating * currentVotes) + value) / newTotalVotes
      
      // 更新状态
      setCurrentVotes(newTotalVotes)
      setCurrentRating(Number(newRating.toFixed(1)))
    }
  }

  const renderStar = (position: number) => {
    const filled = isReadOnly ? currentRating >= position : (hasVoted ? rating : hoveredRating) >= position

    return (
      <button
        key={position}
        className={cn(
          "transition-colors",
          !isReadOnly && !hasVoted && "cursor-pointer hover:scale-110",
          "disabled:cursor-default",
          {
            'w-6 h-6': size === 'sm',
            'w-8 h-8': size === 'md',
            'w-10 h-10': size === 'lg',
          }
        )}
        disabled={hasVoted || isReadOnly}
        onClick={() => handleRate(position)}
        onMouseEnter={() => !isReadOnly && !hasVoted && setHoveredRating(position)}
        onMouseLeave={() => !isReadOnly && !hasVoted && setHoveredRating(0)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={cn(
            filled ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200",
            !isReadOnly && !hasVoted && "hover:fill-yellow-400 hover:text-yellow-400",
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </button>
    )
  }

  return (
    <div className={cn(
      "flex flex-col items-center gap-4",
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      },
      className
    )}>
      <div className="flex items-center gap-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(renderStar)}
        </div>
        {!isReadOnly && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-700">{currentRating}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">5</span>
            </div>
            <span className="text-slate-400">•</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">{currentVotes.toLocaleString()}</span>
              <span className="text-slate-500">votes</span>
            </div>
          </div>
        )}
      </div>
      {!isReadOnly && hasVoted && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-green-600 font-medium">
            Thanks for rating!
          </p>
          <p className="text-xs text-slate-500">
            You rated {rating} stars
          </p>
        </div>
      )}
    </div>
  )
}
