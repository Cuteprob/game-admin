import { cn } from "@/lib/utils";
import Image from "next/image";

interface Step {
  number: number;
  title: string;
  description: string;
  tips: string[];
  area?: {
    name: string;
    hazards: string[];
  };
}

const steps: Step[] = [
  {
    number: 1,
    title: "Getting Started with Sprunki Phase",
    description: "Welcome to Sprunki Phase, where music creation becomes an adventure! Choose your characters and discover how each one contributes unique sounds to your musical masterpiece.",
    tips: [
      "Explore different characters",
      "Learn each character's unique sound",
      "Start with simple beat combinations",
      "Experiment with Incredibox-style mixing"
    ],
    area: {
      name: "Basic Controls",
      hazards: [
        "Drag & Drop: Assign sounds to characters",
        "Click characters to activate/deactivate",
        "Use spacebar to reset all sounds",
        "Right-click to remove individual sounds"
      ]
    }
  },
  {
    number: 2,
    title: "Master Sprunki Phase Sound Mixing",
    description: "In Sprunki Phase, creating the perfect mix is an art. Learn how different characters and sounds complement each other, inspired by Incredibox and Colorbox Mustard mechanics.",
    tips: [
      "Layer sounds strategically",
      "Time your additions perfectly",
      "Create rhythm patterns",
      "Mix different sound categories"
    ],
    area: {
      name: "Sound Categories",
      hazards: [
        "Beats: Foundation rhythm sounds",
        "Melodies: Main musical elements",
        "Effects: Special sound additions",
        "Vocals: Character voice elements"
      ]
    }
  },
  {
    number: 3,
    title: "Discover Sprunki Phase Special Features",
    description: "Each version of Sprunki Phase, from Retake to Phase 7, offers unique features and bonus animations. Learn how to unlock these special combinations.",
    tips: [
      "Experiment with character combinations",
      "Watch for special animations",
      "Discover hidden sound effects",
      "Master phase-specific features"
    ],
    area: {
      name: "Special Features",
      hazards: [
        "Bonus Animations: Unlock through specific combinations",
        "Character Transformations: Mr. Fun computer modes",
        "Phase-specific Elements: Unique to each version",
        "Community Discoveries: Share your findings"
      ]
    }
  },
  {
    number: 4,
    title: "Share Your Sprunki Phase Creations",
    description: "Join the Sprunki Phase community! Learn how to save, share, and collaborate with other music creators in this evolving musical universe.",
    tips: [
      "Save your best mixes",
      "Share with the community",
      "Learn from other creators",
      "Explore community favorites"
    ],
    area: {
      name: "Community Features",
      hazards: [
        "Save Feature: Store your favorite mixes",
        "Share System: Distribute your creations",
        "Community Hub: Connect with other creators",
        "Feedback System: Rate and comment"
      ]
    }
  }
];

export function HowToPlay() {
  return (
    <section className="w-full" aria-labelledby="how-to-play-heading">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-block bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#2A2C32]">
            <h2 className="text-2xl font-heading text-primary">
              Master Sprunki Phase Music Creation
            </h2>
          </div>
          <p className="text-lg text-[#9BA1B0] max-w-2xl mx-auto">
            Learn how to create amazing music, from basic beats to advanced Incredibox-style mixing techniques
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all border border-[#2A2C32] space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary font-heading shadow-md">
                    {step.number}
                  </div>
                  <h2 className="text-xl font-heading text-text-secondary">
                    {step.title}
                  </h2>
                </div>

                <p className="text-text-secondary">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-heading text-text-secondary">Tips</h3>
                    <ul className="space-y-2">
                      {step.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span className="text-text-secondary">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {step.area && (
                    <div className="space-y-3">
                      <h3 className="font-heading text-text-secondary">{step.area.name}</h3>
                      <ul className="space-y-2">
                        {step.area.hazards.map((hazard, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span className="text-text-secondary">{hazard}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
