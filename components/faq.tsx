interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Shady Bears?",
    answer: "Shady Bears is a unique multiplayer platformer where your own shadow becomes your greatest challenge. In this innovative game, you control a cute bear collecting acorns while avoiding your shadow clone that mimics your every move, creating an exciting mix of strategy and quick reflexes."
  },
  {
    question: "How do I play Shady Bears?",
    answer: "Playing Shady Bears is simple! Use WASD or arrow keys for Player 1 (A/Left to move left, D/Right to move right, W/Up to jump). For Player 2, use IJKL keys (J to move left, L to move right, I to jump). Your goal is to collect acorns while avoiding your shadow, which follows and copies your movements."
  },
  {
    question: "What makes Shady Bears unique?",
    answer: "The core feature of Shady Bears is its innovative shadow-chasing mechanic. Your own shadow becomes your opponent, mimicking your movements and trying to catch you. This creates a unique challenge where you must think strategically about every move, making Shady Bears different from traditional platformers."
  },
  {
    question: "What power-ups are available in Shady Bears?",
    answer: "In Shady Bears, you can collect various power-ups to help your journey. Honey gives you bonus points but attracts bees, adding an extra challenge. Fireflies can help you deal with shadows, and acorns are your main collectibles for scoring points."
  },
  {
    question: "Can I play Shady Bears with friends?",
    answer: "Yes! Shady Bears supports 2-player mode where you can team up with a friend. Each player controls their own bear and must avoid their respective shadows, creating exciting cooperative gameplay moments."
  },
  {
    question: "Is Shady Bears free to play?",
    answer: "Yes! Shady Bears is completely free to play right in your browser. No downloads or installations required - just visit our website and start your shadow-dodging adventure in Shady Bears immediately!"
  },
  {
    question: "Is Shady Bears unblocked?",
    answer: "Yes! Shady Bears is unblocked and free to play right in your browser. No downloads or installations required - just visit our website and start your shadow-dodging adventure in Shady Bears immediately!"
  },
  {
    question: "Can I play Shady Bears on mobile devices and desktop?",
    answer: "Yes! Shady Bears is available on both mobile devices and desktop computers. You can play it right in your browser, no downloads or installations required! "
  }
];

export function FAQ() {
  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#FFE5E5]">
          <h2 className="text-2xl font-heading text-primary">
            Shady Bears FAQ - Your Questions Answered
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
