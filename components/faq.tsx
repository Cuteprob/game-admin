import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What makes House of Hazards different from other games?",
    answer: "House of Hazards is a unique multiplayer platformer that combines thrilling challenges with unexpected obstacles. Players navigate through a hazard-filled house, completing various tasks while avoiding dynamic obstacles. What truly sets House of Hazards apart is its multiple play modes (1-3 players), unique punishment mechanics, and endless entertainment right in your browser."
  },
  {
    question: "How do I play House of Hazards?",
    answer: "House of Hazards features simple and intuitive controls. Use WASD or arrow keys for Player 1 movement (A/Left to turn left, D/Right to turn right, W/Up to jump, S/Down to crouch). For Player 2, use IJKL keys (J to turn left, L to turn right, I to jump, K to crouch). Complete tasks like drinking coffee or collecting mail while avoiding various hazards in the house."
  },
  {
    question: "What are the different game modes in House of Hazards?",
    answer: "House of Hazards offers multiple play modes: 1 Player mode (compete against computer players), 2 Player mode (with unique punishment spin options), and 3 Player mode. Each mode provides different challenges and competitive gameplay experiences."
  },
  {
    question: "What kind of hazards will I encounter in House of Hazards?",
    answer: "House of Hazards features various obstacles throughout different areas. In the house, watch out for falling ceiling fans, automatic faucets, and flying toast. In the garden, avoid jumping teddy bears and swinging obstacles. The garage contains pitching machines and moving skateboards - each area presents unique challenges!"
  },
  {
    question: "Is House of Hazards available for mobile devices?",
    answer: "Currently, House of Hazards is only available as a browser-based game. You can play it directly in your web browser without any downloads. Mobile versions for Android and iOS are planned for future releases."
  },
  {
    question: "What makes House of Hazards fun to play?",
    answer: "House of Hazards combines several engaging elements: high-quality graphics and HD sounds, easy-to-learn controls, unexpected obstacles, and exciting multiplayer gameplay. The unique punishment system in 2-player mode adds extra excitement, making each game session different and entertaining."
  }
];

export function FAQ() {
  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FFE5E5]">
          <h2 className="text-2xl font-heading text-primary">
            Frequently Asked Questions
          </h2>
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FFE5E5] p-6">
            <h3 className="text-lg font-heading text-text-primary mb-2">
              {faq.question}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
