import React from 'react';

interface Feature {
  title: string;
  description: string[];
  highlight: string;
  category: 'evolution' | 'gameplay' | 'technical';
}

const features: Feature[] = [
  {
    title: "Character Cast & Transformations",
    description: [
      "Orin: The central character of Incredibox Sprunki with versatile sound contributions and special Mr. Fun computer transformations.",
      
      "Clucker: Master of rhythmic beats, providing essential drum patterns and unique beat combinations in Incredibox.",
      
      "Funbot: Brings electronic elements and synthesized beats to Incredibox Sprunki with futuristic transformations.",
      
      "Ratty: Creates unexpected musical twists with special sound combinations and hidden features.",
      
      "Venia: Contributes ethereal tones and melodic elements, unlocking beautiful visual displays."
    ],
    highlight: "Core Cast",
    category: 'evolution'
  },
  {
    title: "Music Creation System",
    description: [
      "Intuitive Interface: Drag-and-drop system inspired by Incredibox for seamless sound mixing and layering.",
      
      "Character Sounds: Each Incredibox Sprunki character brings unique sound loops and effects to your mix.",
      
      "Real-time Mixing: Instant audio feedback as you create and modify your musical compositions.",
      
      "Beat Synchronization: Automatic tempo matching ensures perfect rhythm in all combinations.",
      
      "Sound Categories: Organized library of beats, melodies, effects, and vocals for easy access."
    ],
    highlight: "Core Mechanics",
    category: 'gameplay'
  },
  {
    title: "Dynamic Music Design",
    description: [
      "Sound Layering: Create complex musical compositions by combining multiple audio tracks in Incredibox Sprunki.",
      
      "Adaptive System: Music dynamically responds to your actions, creating seamless transitions.",
      
      "Character Integration: Unique sounds from each character blend perfectly in the mix.",
      
      "Special Combinations: Unlock unique audio events through creative experimentation.",
      
      "Professional Audio: High-quality sound output maintains clarity in complex arrangements."
    ],
    highlight: "Audio",
    category: 'technical'
  },
  {
    title: "Community Features",
    description: [
      "Share Creations: Showcase your Sprunki Phase musical masterpieces with the global community.",
      
      "Community Hub: Connect with fellow creators, share tips, and collaborate on projects.",
      
      "Achievement System: Track progress and unlock rewards as you master Sprunki Phase.",
      
      "Regular Events: Participate in special challenges and collaborative community projects.",
      
      "Feedback System: Rate compositions and help other creators improve their work."
    ],
    highlight: "Social",
    category: 'technical'
  }
];

export function Features() {
  return (
    <section className="w-full" aria-labelledby="features-heading">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-heading text-primary mb-4">
            Sprunki Phase Features
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore the evolution and features, from its origins to the latest innovations
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid gap-8">
          {/* Characters Section */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#2A2C32]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-heading text-primary">
                Character Cast & Transformations
              </h3>
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-heading rounded-full">
                Core Cast
              </span>
            </div>
            <div className="grid gap-4">
              {features[0].description.map((item, i) => (
                <div 
                  key={i}
                  className="bg-slate-700/20 rounded-lg p-4 hover:bg-slate-700/30 transition-colors"
                >
                  <p className="text-text-secondary leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Music System & Technical Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Music Creation System */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#2A2C32]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading text-primary">
                  Music Creation System
                </h3>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                  Core Mechanics
                </span>
              </div>
              <div className="space-y-4">
                {features[1].description.map((item, i) => (
                  <div 
                    key={i}
                    className="bg-slate-700/20 rounded-lg p-4"
                  >
                    <p className="text-text-secondary leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Music Design */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#2A2C32]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading text-primary">
                  Dynamic Music Design
                </h3>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-heading rounded-full">
                  Audio
                </span>
              </div>
              <div className="space-y-4">
                {features[2].description.map((item, i) => (
                  <div 
                    key={i}
                    className="bg-slate-700/20 rounded-lg p-4"
                  >
                    <p className="text-text-secondary leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Features */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-[#2A2C32]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-heading text-primary">
                Community Features
              </h3>
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-heading rounded-full">
                Social
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {features[3].description.map((item, i) => (
                <div 
                  key={i}
                  className="bg-slate-700/20 rounded-lg p-4 hover:bg-slate-700/30 transition-colors"
                >
                  <p className="text-text-secondary leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
