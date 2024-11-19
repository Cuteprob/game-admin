import React from 'react';

interface Feature {
  title: string;
  description: string[];
  highlight: string;
  category: 'evolution' | 'gameplay' | 'technical' | 'characters';
}

const features: Feature[] = [
  {
    title: "Sprunki Phase 4 Combat Evolution",
    description: [
      "Sprite Companion: A revolutionary defensive ally that blocks enemy bullets while following your movements.",
      "Windgunner Transformation: Unlock powerful offensive capabilities through specific gameplay conditions.",
      "Dynamic Combat: Experience rhythm-based gameplay with strategic bullet-blocking mechanics.",
      "Adaptive Difficulty: Face evolving enemy patterns and challenges as you progress.",
      "Multiple Combat Styles: Switch between defensive and offensive approaches based on your playstyle."
    ],
    highlight: "Combat System",
    category: 'gameplay'
  },
  {
    title: "Character Ensemble",
    description: [
      "Support Specialists: Sky and Mr. Tree bring gentle, nature-inspired sounds with healing abilities.",
      "Combat Experts: Clukr and Brud deliver energetic beats with powerful offensive capabilities.",
      "Magic Users: Wenda and Vineria weave elegant melodies with crowd control abilities.",
      "Technical Specialists: Mr. Fun Computer and Oren provide precise, mechanical rhythms.",
      "Unique Specialists: Gray, Raddy, Tunner, and others each bring distinctive sound signatures."
    ],
    highlight: "Characters",
    category: 'characters'
  },
  {
    title: "Sound Design & Rhythm",
    description: [
      "Unique Sound Palette: Each character brings their own distinct sound environment and musical style.",
      "Voice Personalities: From gentle ethereal tones to robust mechanical beats.",
      "Dynamic Sound Mixing: Real-time sound composition based on character interactions.",
      "Musical Combat: Rhythm-based gameplay that integrates with character abilities.",
      "Atmospheric Progression: Sound environments evolve with game progression."
    ],
    highlight: "Sound Design",
    category: 'technical'
  },
  {
    title: "Advanced Game Mechanics",
    description: [
      "Passive Item System: Your companion provides constant support and enables powerful transformations.",
      "Randomized Triggers: Each playthrough features unique transformation conditions for varied gameplay.",
      "Strategic Depth: Master the timing of transformations and defensive maneuvers.",
      "Sound Integration: Maintain musical rhythm while engaging in intense combat sequences.",
      "Progressive Challenge: Unlock new abilities and face increasingly complex enemy patterns."
    ],
    highlight: "Game Systems",
    category: 'technical'
  },
  {
    title: "Community & Updates",
    description: [
      "Community Strategies: Share and discover new tactics for maximizing combat effectiveness.",
      "Regular Updates: Continuous refinement of gameplay mechanics and balance.",
      "Player Feedback: Features evolved based on community input and gameplay data.",
      "Competitive Elements: Compare strategies and scores with other players.",
      "Active Community: Join discussions about tactics and game discoveries."
    ],
    highlight: "Social Features",
    category: 'evolution'
  }
];

export function Features() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-heading text-primary mb-4">
          Sprunki Phase 4 Features
        </h2>
        <p className="text-muted-foreground">
          Discover the latest innovations and improvements in Sprunki Phase 4
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card rounded-lg border border-border"
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-border p-4">
              <h3 className="text-xl font-heading text-primary flex-1">
                {feature.title}
              </h3>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {feature.highlight}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid gap-4">
                {feature.description.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
