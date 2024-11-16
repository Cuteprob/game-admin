"use client"
import { useState } from 'react';

interface GameVideoProps {
  youtubeId: string;
  clipId?: string;
  clipTime?: string;
  title: string;
  thumbnail: string;
}

export function GameVideo({ youtubeId, clipId, clipTime, title, thumbnail }: GameVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}${clipId && clipTime ? `?clip=${clipId}&clipt=${clipTime}` : ''}`;

  return (
    <div className="w-full mt-6">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
        {!isLoaded && (
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/5 group"
          >
            <img 
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-red-600/90 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-text-secondary text-sm font-medium">{title}</p>
            </div>
          </button>
        )}
        
        {isLoaded && (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  );
} 