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
    title: "Choose Your Game Mode",
    description: "House of Hazards offers multiple play modes to suit your style. Play solo against computer players, team up in 2-player mode with unique punishment mechanics, or enjoy 3-player mode for maximum chaos!",
    tips: [
      "1-Player mode: Compete against computer players",
      "2-Player mode: Features unique punishment spin wheel",
      "3-Player mode: Maximum multiplayer fun",
      "Tutorial available for new players"
    ]
  },
  {
    number: 2,
    title: "Master the Controls",
    description: "House of Hazards features simple and intuitive controls. Use WASD or arrow keys for movement, and learn special actions to navigate through hazards effectively.",
    tips: [
      "Player 1: WASD or Arrow keys",
      "Player 2: IJKL keys",
      "Jump to avoid obstacles",
      "Crouch to dodge hazards"
    ],
    area: {
      name: "Basic Controls",
      hazards: [
        "A/Left Arrow - Turn left",
        "D/Right Arrow - Turn right",
        "W/Up Arrow - Jump",
        "S/Down Arrow - Crouch"
      ]
    }
  },
  {
    number: 3,
    title: "Complete Daily Tasks",
    description: "Navigate through House of Hazards while completing various tasks. From drinking morning coffee to collecting mail, each task brings its own challenges and obstacles.",
    tips: [
      "Drink coffee in the kitchen",
      "Brush teeth in the bathroom",
      "Water the garden carrots",
      "Collect mail from the garage"
    ],
    area: {
      name: "Task Locations",
      hazards: [
        "Kitchen: Watch for flying toast and automatic faucets",
        "Garden: Avoid jumping teddy bears and swinging obstacles",
        "Garage: Dodge pitching machines and skateboards",
        "House: Beware of falling ceiling fans"
      ]
    }
  },
  {
    number: 4,
    title: "Face the Consequences",
    description: "In House of Hazards' 2-player mode, losing players face unique punishments determined by the spin wheel. Each punishment adds an exciting twist to the next round!",
    tips: [
      "Higher scores get bigger wedges on the spin wheel",
      "Six different types of punishments",
      "Punishments affect next round gameplay",
      "Strategy becomes key with handicaps"
    ],
    area: {
      name: "Possible Punishments",
      hazards: [
        "Heavy Weight: Reduced movement speed",
        "Friendly Friend: Leave flowers instead of picking up",
        "Nonstop Dab: Increased hazard frequency",
        "Inverted Controls: Reversed movement controls"
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
              How to Play House of Hazards?
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Master the art of dodging hazards and completing tasks in this exciting multiplayer game
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
                  <h3 className="text-xl font-heading text-text-primary">
                    {step.title}
                  </h3>
                </div>

                <p className="text-text-secondary">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-heading text-text-primary">Tips</h4>
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
                      <h4 className="font-heading text-text-primary">{step.area.name}</h4>
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
