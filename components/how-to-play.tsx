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
    title: "Begin Your Shady Bears Journey",
    description: "Welcome to Shady Bears, where your shadow is your greatest challenge! Choose between single-player mode to master the basics or team up with a friend in 2-player mode for double the excitement.",
    tips: [
      "Single-player mode: Perfect for learning",
      "2-Player mode: Cooperative shadow-dodging",
      "Practice shadow-dodging techniques",
      "Learn acorn collection strategies"
    ]
  },
  {
    number: 2,
    title: "Master Shady Bears Controls",
    description: "Shady Bears features simple, intuitive controls that are easy to learn but challenging to master, especially when dodging your shadow!",
    tips: [
      "Move smoothly to outmaneuver shadows",
      "Time your jumps carefully",
      "Coordinate with your teammate",
      "Watch your shadow's movements"
    ],
    area: {
      name: "Basic Controls",
      hazards: [
        "Player 1: A/Left Arrow - Move Left",
        "Player 1: D/Right Arrow - Move Right",
        "Player 1: W/Up Arrow - Jump",
        "Player 2: J - Move Left",
        "Player 2: L - Move Right",
        "Player 2: I - Jump"
      ]
    }
  },
  {
    number: 3,
    title: "Shady Bears Power-ups & Strategies",
    description: "In Shady Bears, your shadow mimics your movements, making it both predictable and challenging. Learn to use this to your advantage while collecting acorns.",
    tips: [
      "Watch your shadow's patterns",
      "Collect acorns strategically",
      "Use honey for bonus points",
      "Look for helpful fireflies"
    ],
    area: {
      name: "Power-ups and Items",
      hazards: [
        "Acorns: Main collectibles for points",
        "Honey: Bonus points but attracts bees",
        "Fireflies: Help deal with shadows",
        "Strategic item placement throughout levels"
      ]
    }
  },
  {
    number: 4,
    title: "Master Shady Bears Like a Pro",
    description: "Master advanced techniques in Shady Bears to maximize your score and effectively avoid shadows. Coordinate with your teammate in 2-player mode for the best results!",
    tips: [
      "Plan your movement patterns",
      "Coordinate with your teammate",
      "Balance risk and reward",
      "Master timing for power-ups"
    ],
    area: {
      name: "Pro Tips",
      hazards: [
        "Use platforms to your advantage",
        "Time power-up collections carefully",
        "Communicate in multiplayer mode",
        "Learn shadow prediction patterns"
      ]
    }
  }
];

export function HowToPlay() {
  return (
    <section className="w-full" aria-labelledby="how-to-play-heading">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FFE5E5]">
            <h2 className="text-2xl font-heading text-primary">
              Shady Bears: Your Shadow-Chasing Adventure Guide
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Master Shady Bears&apos; unique shadow-dodging mechanics and discover the art of acorn collection in this exciting multiplayer adventure
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-md transition-all border border-[#FFE5E5] space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFE5E5] text-primary font-heading shadow-md">
                    {step.number}
                  </div>
                  <h2 className="text-xl font-heading text-text-primary">
                    {step.title}
                  </h2>
                </div>

                <p className="text-text-secondary">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-heading text-text-primary">Tips</h3>
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
                      <h3 className="font-heading text-text-primary">{step.area.name}</h3>
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
