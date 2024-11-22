export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-6">
        {/* 主动画 */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-b-primary rounded-full animate-spin-reverse" />
          </div>
        </div>
        
        {/* 加载文字 */}
        <div className="text-primary/80 font-medium flex items-center gap-2">
          <span className="animate-pulse">Loading</span>
          <span className="inline-flex gap-1">
            <span className="animate-bounce delay-0">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </div>
      </div>
    </div>
  )
}
