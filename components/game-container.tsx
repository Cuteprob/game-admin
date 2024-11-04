"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRef, useState, useEffect } from "react"
import { Icons } from "@/config/icons"
import { Game } from "@/config/games"

interface GameContainerProps {
  game: Game;
}

export function GameContainer({ game }: GameContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + 10;
          if (next === 100) {
            clearInterval(timer);
            setIsLoading(false);
          }
          return next;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const enterFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleIframeError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="aspect-video w-full relative rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5E5] p-4">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-10">
          <Progress value={progress} className="w-[60%] mb-4" />
          <p className="text-sm text-text-secondary">Loading game...</p>
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