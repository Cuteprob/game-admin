interface GameVersion {
  version: string;
  title: string;
  description: string;
  features: string[];
  type: 'main' | 'modded' | 'special';
  video?: {
    youtubeId: string;
    title: string;
  };
}

const versions: GameVersion[] = [
  // 主系列版本
  {
    version: "Phase 1",
    title: "The Original Sprunki Phase",
    description: "The groundbreaking first release that introduced players to the core mechanics of music creation through character arrangement. This version established the foundation for all future Sprunki Phase games.",
    features: [
      "Original character arrangement system",
      "Core music creation mechanics",
      "Basic sound mixing features",
      "Fundamental gameplay elements"
    ],
    type: 'main',
    video: {
      youtubeId: "QbkNnlDVC1k",  // 这里需要替换为实际的YouTube ID
      title: "Sprunki Phase 1 Gameplay"
    }
  },
  {
    version: "Phase 2",
    title: "Enhanced Creative Experience",
    description: "A significant expansion that brought new levels, characters, and enhanced graphics to Sprunki Phase. This version introduced additional gameplay mechanics that encouraged creativity and strategic thinking.",
    features: [
      "New character additions",
      "Enhanced graphics engine",
      "Expanded sound library",
      "Strategic gameplay elements"
    ],
    type: 'main',
    video: {
      youtubeId: "WNEaYjH5wbI",
      title: "Sprunki phase - Music Game"
    }
  },
  {
    version: "Phase 3",
    title: "Advanced Sound Evolution",
    description: "Continued the evolution of Sprunki Phase with more complex challenges and a broader range of sound elements, further engaging players in music composition.",
    features: [
      "Complex sound combinations",
      "Advanced music challenges",
      "Extended sound range",
      "Improved mixing capabilities"
    ],
    type: 'main',
    video: {
      youtubeId: "wwe35EyXgmo",
      title: "Sprunki phase - Music Game"
    }
  },
  {
    version: "Phase 7",
    title: "Latest Sprunki Innovation",
    description: "The current flagship version featuring enhanced visuals, dynamic soundtracks, and unique characters with special abilities. Emphasizes creativity and experimentation in music creation.",
    features: [
      "Dynamic soundtrack system",
      "Enhanced visual effects",
      "Special character abilities",
      "Advanced music creation tools"
    ],
    type: 'main',
    video: {
      youtubeId: "ArEBxMnuCcQ",
      title: "Sprunki phase - Music Game"
    }
  },
  // 特殊版本
  {
    version: "Sprunki Retake",
    title: "Classic Reimagined",
    description: "A special edition that reimagines the classic Sprunki Phase experience with modern features and enhanced gameplay mechanics.",
    features: [
      "Modernized classic features",
      "Updated sound engine",
      "Refined user interface",
      "Nostalgic elements"
    ],
    type: 'special',
  },
  {
    version: "Dandy's World",
    title: "Themed Adventure",
    description: "A unique themed version introducing different environments and challenges, providing a fresh perspective on the Sprunki experience.",
    features: [
      "Unique themed environments",
      "Special sound effects",
      "Custom character designs",
      "Themed challenges"
    ],
    type: 'special'
  },
  // 社区版本
  {
    version: "Modded Version",
    title: "Community Enhanced",
    description: "A fan-created modification that enhances the original game with improved graphics, new sound elements, and unique gameplay features.",
    features: [
      "Community-created content",
      "Enhanced graphics",
      "New sound elements",
      "Custom features"
    ],
    type: 'modded'
  },
  {
    version: "Sprunki But Alpha",
    title: "Experimental Edition",
    description: "An experimental version featuring innovative mechanics and gameplay elements not found in the main series.",
    features: [
      "Experimental features",
      "New gameplay mechanics",
      "Unique sound combinations",
      "Testing ground for innovations"
    ],
    type: 'modded'
  }
];

// 添加视频组件
function GameVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-slate-900">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function GameVersions() {
  return (
    <section className="w-full" aria-labelledby="versions-heading">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-heading text-primary mb-4">
            Sprunki Phase Versions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore the evolution of Sprunki Phase through its various releases and community creations
          </p>
        </div>

        {/* Main Versions */}
        <div className="space-y-8">
          <h3 className="text-2xl font-heading text-primary border-b border-[#2A2C32] pb-2">
            Main Series
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {versions
              .filter(v => v.type === 'main')
              .map((version, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-heading text-[#E8E9F3]">
                        {version.title}
                      </h4>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                        {version.version}
                      </span>
                    </div>
                    <p className="text-text-secondary">
                      {version.description}
                    </p>
                    {/* 添加视频部分 */}
                    {version.video && (
                      <div className="mt-4">
                        <GameVideo 
                          youtubeId={version.video.youtubeId}
                          title={version.video.title}
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      {version.features.map((feature, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-2 bg-slate-700/20 p-3 rounded-lg"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Special Editions */}
        <div className="space-y-8">
          <h3 className="text-2xl font-heading text-primary border-b border-[#2A2C32] pb-2">
            Special Editions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {versions
              .filter(v => v.type === 'special')
              .map((version, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
                >
                  {/* 同上的卡片内容结构 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-heading text-[#E8E9F3]">
                        {version.title}
                      </h4>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                        {version.version}
                      </span>
                    </div>
                    <p className="text-text-secondary">
                      {version.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {version.features.map((feature, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-2 bg-slate-700/20 p-3 rounded-lg"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Community Versions */}
        <div className="space-y-8">
          <h3 className="text-2xl font-heading text-primary border-b border-[#2A2C32] pb-2">
            Community Creations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {versions
              .filter(v => v.type === 'modded')
              .map((version, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
                >
                  {/* 同上的卡片内容结构 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-heading text-[#E8E9F3]">
                        {version.title}
                      </h4>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                        {version.version}
                      </span>
                    </div>
                    <p className="text-text-secondary">
                      {version.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {version.features.map((feature, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-2 bg-slate-700/20 p-3 rounded-lg"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
} 