import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
  size?: 'large' | 'small';
}

const features: Feature[] = [
  {
    title: "Shady Bears Adventure",
    description: "Experience Shady Bears' unique shadow mechanics where your own shadow becomes your greatest challenge. Master the art of shadow-dodging while collecting acorns in this innovative platformer. Every movement counts as your shadow mimics and chases you, creating an exciting blend of strategy and quick reflexes.",
    icon: "/features/shadow-mechanics.webp",
    highlight: "Unique Gameplay",
    size: "large"
  },
  {
    title: "Two-Player Action",
    description: "Team up with a friend in Shady Bears' exciting 2-player mode. Coordinate your movements and help each other avoid shadows!",
    icon: "/features/multiplayer.webp",
    highlight: "2 Players",
    size: "small"
  },
  {
    title: "Power-Up System",
    description: "In Shady Bears, collect sweet honey for bonus points and discover magical fireflies that help you overcome shadows. But be careful - those pesky bees are always buzzing around!",
    icon: "/features/power-ups.webp",
    highlight: "Strategic Items",
    size: "small"
  },
  {
    title: "Acorn Collection",
    description: "Gather acorns throughout your Shady Bears adventure while avoiding your shadow clone.",
    icon: "/features/acorns.webp",
    highlight: "Score Points",
    size: "small"
  },
  {
    title: "Browser-Based Gaming",
    description: "Jump into Shady Bears instantly through your browser - no downloads required!",
    icon: "/features/browser-gaming.webp",
    highlight: "Play Now",
    size: "small"
  }
];

export function Features() {
  return (
    <section className="w-full" aria-labelledby="features-heading">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FFE5E5]">
            <h2 className="text-2xl font-heading text-primary">
              Discover Shady Bears Game Features
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Experience Shady Bears&apos; unique blend of shadow-chasing challenges, multiplayer fun, and exciting gameplay mechanics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 row-span-2">
            {features.filter(f => f.size === 'large').map((feature, index) => (
              <div 
                key={index}
                className="h-full group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#FFE5E5] hover:shadow-md transition-all"
              >
                <div className="relative w-80 h-80 mx-auto mb-8">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading text-text-primary text-center">
                    {feature.title}
                  </h3>
                  {feature.highlight && (
                    <div className="flex justify-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                  )}
                  <p className="text-text-secondary leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {features.filter(f => f.size === 'small').map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#FFE5E5] hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-heading text-text-primary text-center">
                    {feature.title}
                  </h3>
                  {feature.highlight && (
                    <div className="flex justify-center">
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-heading rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-text-secondary text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
