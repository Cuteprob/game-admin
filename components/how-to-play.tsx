import { cn } from "@/lib/utils";
import Image from "next/image";

interface Step {
  number: number;
  title: string;
  description: string;
  tips: string[];
  area: {
    name: string;
    hazards: string[];
  };
  image?: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Start Your Sprunki Phase 4 Journey",
    description: "Start your Sprunki Phase 4 journey by exploring our extensive collection of rhythmic patterns, melodic elements, and special effects. Each sound element is carefully crafted to complement the game's innovative combat mechanics.",
    tips: [
      "Browse through different sound categories",
      "Preview sounds before selection",
      "Consider combat rhythm compatibility",
      "Look for special transformation triggers"
    ],
    area: {
      name: "Sound Library",
      hazards: [
        "Beats: Foundation for combat rhythm",
        "Melodies: Enhance transformation timing",
        "Effects: Special combat bonuses",
        "Companion Sounds: Defensive harmonies"
      ]
    },
    image: "/features/step-1.webp"
  },
  {
    number: 2,
    title: "Master Sprunki Phase 4 Combat Flow",
    description: "In Sprunki Phase 4, strategically place your selected sounds to create a powerful combat rhythm. Each element's position affects both your musical composition and battle effectiveness.",
    tips: [
      "Consider rhythm flow",
      "Balance defensive and offensive sounds",
      "Create synergistic combinations",
      "Plan for transformation moments"
    ],
    area: {
      name: "Arrangement Tactics",
      hazards: [
        "Element Spacing: Timing is crucial",
        "Layer Management: Build complexity",
        "Pattern Creation: Combat effectiveness",
        "Sound Synergy: Enhanced power"
      ]
    },
    image: "/features/step-2.webp"
  },
  {
    number: 3,
    title: "Unleash Sprunki Phase 4 Powers",
    description: "Discover powerful combinations that trigger special effects in Sprunki Phase 4. Experiment with different sound arrangements to unlock unique combat abilities and transformation sequences.",
    tips: [
      "Test various sound combinations",
      "Watch for transformation triggers",
      "Practice rhythm maintenance",
      "Learn enemy pattern responses"
    ],
    area: {
      name: "Combat Mastery",
      hazards: [
        "Pattern Recognition: Enemy behaviors",
        "Transformation Timing: Power activation",
        "Rhythm Control: Maintain effectiveness",
        "Combo Chains: Enhanced damage"
      ]
    },
    image: "/features/step-3.webp"
  },
  {
    number: 4,
    title: "Advanced Sprunki Phase 4 Tactics",
    description: "Fine-tune your musical combat strategy in Sprunki Phase 4. Adjust your sound arrangement and timing to maximize both defensive capabilities and offensive power.",
    tips: [
      "Balance attack and defense",
      "Optimize transformation timing",
      "Refine rhythm patterns",
      "Master companion positioning"
    ],
    area: {
      name: "Combat Optimization",
      hazards: [
        "Defensive Timing: Block effectiveness",
        "Attack Windows: Maximum damage",
        "Power Management: Resource control",
        "Rhythm Maintenance: Sustained power"
      ]
    }
  },
  {
    number: 5,
    title: "Join the Sprunki Phase 4 Community",
    description: "Share your combat strategies and musical compositions with the Sprunki Phase 4 community. Learn from other players, discover new techniques, and contribute to the evolving meta.",
    tips: [
      "Record your best combinations",
      "Share successful strategies",
      "Study community discoveries",
      "Participate in challenges"
    ],
    area: {
      name: "Community Engagement",
      hazards: [
        "Strategy Sharing: Help others grow",
        "Technique Exchange: Learn new moves",
        "Challenge Participation: Test skills",
        "Community Events: Special rewards"
      ]
    }
  }
];

export function HowToPlay() {
  return (
    <section className="w-full max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block bg-card/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-border">
          <h2 className="text-2xl font-heading text-primary">
            Master Sprunki Phase 4 Combat Music
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn how to create powerful musical combinations while mastering the art of combat in Sprunki Phase 4
        </p>
      </div>

      <div className="grid gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 bg-primary/5 border-b border-border p-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-background font-heading text-lg">
                {step.number}
              </span>
              <h3 className="text-xl font-heading text-primary">
                {step.title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid gap-8 md:grid-cols-3">
                {/* Description Column */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Tips Column */}
                <div className="space-y-4">
                  <h4 className="font-heading text-foreground text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Tips
                  </h4>
                  <ul className="grid gap-2.5">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Area Info or Image */}
                <div className="space-y-4">
                  {step.image ? (
                    <>
                      <h4 className="font-heading text-foreground text-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Preview
                      </h4>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border/50">
                        <Image
                          src={step.image}
                          alt={`Step ${step.number}: ${step.title}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-heading text-foreground text-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {step.area.name}
                      </h4>
                      <ul className="grid gap-2.5">
                        {step.area.hazards.map((hazard, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                              {hazard}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
