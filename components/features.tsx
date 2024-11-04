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
    title: "High Quality Graphics",
    description: "Experience House of Hazards with stunning visuals and smooth animations that bring the game to life. Our HD graphics showcase every detail of the hazard-filled house, from the dynamic obstacles to the interactive environments. House of Hazards delivers crystal-clear quality that enhances your gaming experience, whether you're navigating through the garden's swinging obstacles or dodging flying toast in the kitchen.",
    icon: "/features/graphics-quality.png",
    highlight: "HD Quality",
    size: "large"
  },
  {
    title: "Easy Controls",
    description: "Jump right into House of Hazards with intuitive controls. Perfect for both new players and experienced gamers.",
    icon: "/features/easy-controls.png",
    highlight: "Simple & Fun",
    size: "small"
  },
  {
    title: "Multiplayer Fun",
    description: "Challenge your friends in House of Hazards with up to 3 players in exciting competitive matches.",
    icon: "/features/multiplayer.png",
    highlight: "1-3 Players",
    size: "small"
  },
  {
    title: "Unique Punishment",
    description: "Experience the thrill of House of Hazards' unique spin wheel punishment system in 2-player mode.",
    icon: "/features/punishment.png",
    highlight: "Exciting Twists",
    size: "small"
  },
  {
    title: "Dynamic Tasks",
    description: "Complete various tasks in House of Hazards while avoiding unexpected hazards and obstacles.",
    icon: "/features/tasks.png",
    highlight: "Fun Goals",
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
              Discover House of Hazards Features
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Experience a unique blend of challenges, multiplayer fun, and exciting gameplay mechanics
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
