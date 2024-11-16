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
  showReviewSystem?: boolean;
}

interface ReviewFormData {
  name: string;
  email: string;
  comment: string;
  rating: number;
}

export function Rating({ 
  initialRating = 4.8, 
  totalVotes = 234, 
  onRate, 
  className, 
  size = "md",
  isReadOnly = false,
  showReviewSystem = false
}: RatingProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [currentRating, setCurrentRating] = useState(initialRating)
  const [currentVotes, setCurrentVotes] = useState(totalVotes)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    email: '',
    comment: '',
    rating: 0
  })

  const handleRate = (value: number) => {
    if (!hasVoted && !isReadOnly) {
      setRating(value)
      setHasVoted(true)
      onRate?.(value)

      const newTotalVotes = currentVotes + 1
      const newRating = ((currentRating * currentVotes) + value) / newTotalVotes
      
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
            filled ? "fill-accent text-accent" : "fill-slate-600 text-slate-600",
            !isReadOnly && !hasVoted && "hover:fill-accent hover:text-accent",
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Review submitted:', formData)
    setReviewSubmitted(true)
    setFormData({
      name: '',
      email: '',
      comment: '',
      rating: 0
    })
  }

  const ratingDisplay = (
    <div className="flex items-center gap-6">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>
      {!isReadOnly && (
        <div className="flex items-center gap-2 text-sm font-mono">
          <div className="flex items-center gap-1">
            <span className="font-medium text-accent">{currentRating}</span>
            <span className="text-border">/</span>
            <span className="text-text-secondary">5</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1">
            <span className="text-text-secondary">{currentVotes.toLocaleString()}</span>
            <span className="text-text-secondary">votes</span>
          </div>
        </div>
      )}
    </div>
  )

  if (!showReviewSystem) {
    return (
      <div className={cn(
        "flex items-center",
        {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
        },
        className
      )}>
        {ratingDisplay}
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-col gap-8 w-full max-w-2xl",
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      },
      className
    )}>
      {ratingDisplay}
      
      {!isReadOnly && (
        <>
          {reviewSubmitted ? (
            <div className="text-sm text-accent text-center p-4 bg-slate-800/80 rounded-2xl border border-[#2A2C32]">
              Thank you for your review! It will be displayed after moderation.
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-2xl border-[#2A2C32] shadow-sm focus:border-accent focus:ring-accent bg-slate-800/80 backdrop-blur-sm text-text-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-2xl border-[#2A2C32] shadow-sm focus:border-accent focus:ring-accent bg-slate-800/80 backdrop-blur-sm text-text-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary">Review</label>
                <textarea
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-2xl border-[#2A2C32] shadow-sm focus:border-accent focus:ring-accent bg-slate-800/80 backdrop-blur-sm text-text-primary"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-heading text-text-primary bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-[#2A2C32]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  )
}
