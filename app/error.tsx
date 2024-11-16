"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
} 