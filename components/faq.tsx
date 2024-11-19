interface FAQItem {
  question: string;
  answer: string;
  category: 'basic' | 'gameplay' | 'technical';
}

const faqs: FAQItem[] = [
  {
    question: "What is Sprunki Phase 4?",
    answer: "Sprunki Phase 4 is the latest evolution in our music creation series, featuring innovative gameplay mechanics that blend character abilities with sound elements. It introduces unique sound environments and character-specific musical styles, creating an immersive experience that encourages creativity and musical exploration.",
    category: 'basic'
  },
  {
    question: "How does the character system work?",
    answer: "Characters are organized into distinct groups: Melody Makers (Sky, Gray) create ethereal and haunting melodies, Rhythm Squad (Wenda, Tunner) brings unique vocals and beats, Harmony Heroes (Oren, Vineria) add depth to the sonic experience, and Special Additions (Mr. Tree, Simon) provide nature-themed and classic sounds.",
    category: 'basic'
  },
  {
    question: "What makes the sound design unique?",
    answer: "Each character brings their own distinct sound palette and musical style. From Sky's gentle and captivating tones to Brud's robust bass beats, the game creates dynamic sound environments that evolve with your composition. The sound design allows for real-time mixing and complex musical arrangements.",
    category: 'technical'
  },
  {
    question: "How do I create music in Sprunki Phase 4?",
    answer: "Music creation is intuitive and engaging. Experiment with different musical environments, mix character sounds in real-time, and discover interactive sound combinations. The game features a gradual learning curve that introduces complexity as you progress, making it accessible for both beginners and experienced creators.",
    category: 'gameplay'
  },
  {
    question: "What customization options are available?",
    answer: "Players can personalize their experience through sound processing options, adjustable effect parameters, and flexible style adaptation. You can tailor characters to your preferences and create unique performances through various combinations of sounds and effects.",
    category: 'gameplay'
  },
  {
    question: "How does the progression system work?",
    answer: "The game features a multi-phase learning curve that gradually introduces new complexities. As you progress, you'll unlock more advanced sound composition techniques, discover new character combinations, and develop your musical creativity through interactive exploration.",
    category: 'gameplay'
  },
  {
    question: "Do I need to download anything to play Sprunki Phase 4?",
    answer: "No, Sprunki Phase 4 is a browser-based game that runs directly in your web browser. You don't need to download or install any additional software. Simply visit our website and start creating music immediately.",
    category: 'technical'
  },
  {
    question: "Can I play Sprunki Phase 4 on mobile?",
    answer: "Yes, Sprunki Phase 4 is fully optimized for mobile devices. The intuitive touch interface and responsive design ensure a smooth music creation experience whether you're on a smartphone or tablet.",
    category: 'technical'
  },
  {
    question: "Are there different themes or modes in Sprunki Phase 4?",
    answer: "Yes, Sprunki Phase 4 offers various musical themes and creative modes. Each character group brings its own musical style, from ethereal melodies to energetic beats, allowing you to explore different genres and create diverse compositions.",
    category: 'gameplay'
  }
];

export function FAQ() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-heading text-primary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Find answers about Sprunki Phase 4's music creation, characters, and features
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid gap-8">
        {Object.entries(
          faqs.reduce((acc, faq) => {
            const category = faq.category;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(faq);
            return acc;
          }, {} as Record<string, FAQItem[]>)
        ).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-xl font-heading text-primary border-b border-border pb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="grid gap-4">
              {items.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg border border-border"
                >
                  <div className="border-b border-border p-4">
                    <h4 className="text-lg font-heading text-primary">
                      {faq.question}
                    </h4>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
