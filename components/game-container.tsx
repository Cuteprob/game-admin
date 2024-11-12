"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRef, useState } from "react"
import { Icons } from "@/config/icons"
import { Game } from "@/config/games"

interface GameContainerProps {
  game: Game;
}

export function GameContainer({ game }: GameContainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const enterFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleIframeError = () => {
    setError(true);
  };

  return (
    <div className="aspect-video w-full relative rounded-2xl bg-white/90 backdrop-blur-sm border border-[#FFE5E5] p-4">
      {!isPlaying ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl z-10">
          {/* 图片容器 */}
          <div className="relative group">
            {/* 背景光效 */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 blur-lg animate-pulse" />
            </div>
            
            {/* 游戏图片 - 移动端优化 */}
            <img
              src={game.image}
              alt={game.title}
              className="relative w-36 h-36 md:w-48 md:h-48 rounded-xl mb-4 shadow-slate-400 shadow-2xl 
              hover:scale-110 transition-transform duration-300 z-10 
              sm:mb-6" // 移动端调整大小和间距
            />
          </div>

          {/* 游戏标题 - 移动端优化 */}
          <h2 className="text-xl md:text-2xl font-heading text-primary mb-4 md:mb-6 text-center px-4">
            {game.title}
          </h2>

          {/* 游戏按钮 - 移动端优化 */}
          <button
            onClick={() => setIsPlaying(true)}
            className="relative px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-heading 
            text-[#FFF5E4] bg-[#ff6b6bd8] hover:bg-[#ff5252fa] 
            rounded-full transition-all duration-300 shadow-sm 
            hover:shadow-2xl hover:scale-110 md:hover:scale-125 border border-[#FFE5E5] 
            animate-pulse delay-500 hover:animate-none
            active:scale-95" // 添加点击反馈
          >
            Play Now
          </button>
        </div>
      ) : null}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-10">
          <p className="text-sm text-red-500">Failed to load game. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-[#FFF5E4] rounded-full hover:bg-[#ff5252fa] transition-colors"
          >
            Refresh Page
          </button>
        </div>
      ) : null}

      <iframe 
        ref={iframeRef}
        src={game.iframeUrl}
        title={game.title}
        className="w-full h-full border-0 rounded-xl bg-white" 
        allowFullScreen
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer"
        onError={handleIframeError}
      />

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-text-secondary">
          {game.controls.fullscreenTip}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={enterFullscreen}
            className="bg-white/90 hover:bg-secondary/10 border-secondary text-secondary"
          >         
            {Icons.fullscreen}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white/90 hover:bg-secondary/10 border-secondary text-secondary"
              >
                {Icons.help}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white border border-[#FFE5E5] rounded-2xl p-0">
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-heading text-primary text-sm mb-2">Movement Controls</h3>
                  <ul className="space-y-1">
                    {game.controls.guide.movement.map((control, index) => (
                      <li key={index} className="text-sm text-text-secondary">{control}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-primary text-sm mb-2">Game Actions</h3>
                  <ul className="space-y-1">
                    {game.controls.guide.actions.map((action, index) => (
                      <li key={index} className="text-sm text-text-secondary">{action}</li>
                    ))}
                  </ul>
                </div>
                {game.controls.guide.special && (
                  <div>
                    <h3 className="font-heading text-primary text-sm mb-2">Special Controls</h3>
                    <ul className="space-y-1">
                      {game.controls.guide.special.map((special, index) => (
                        <li key={index} className="text-sm text-text-secondary">{special}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
} 