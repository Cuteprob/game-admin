interface FAQItem {
  question: string;
  answer: string;
  category: 'basic' | 'gameplay' | 'technical' | 'community';
}

const faqs: FAQItem[] = [
  {
    question: "What exactly is Sprunki Phase?",
    answer: "Sprunki Phase is an innovative music creation game inspired by Incredibox. It allows players to create unique musical compositions by combining different character sounds and beats. Each character contributes distinct audio elements, and when transformed into 'Mr. Fun' computers, they unlock special sound combinations.",
    category: 'basic'
  },
  {
    question: "How do I create music in Sprunki Phase?",
    answer: "Creating music is intuitive and fun. Simply drag and drop characters onto the stage to add their unique sounds to your mix. Each character in Sprunki Phase contributes different elements like beats, melodies, or effects. You can activate or deactivate sounds by clicking characters, and use the spacebar to reset your Sprunki Phase composition.",
    category: 'gameplay'
  },
  {
    question: "What makes Sprunki Phase different from other music games?",
    answer: "Sprunki Phase stands out with its unique character transformation system and Incredibox-inspired gameplay mechanics. Unlike traditional music games, Sprunki Phase combines visual character animations with sound creation, allowing players to see their music come to life. The game also features special combinations that unlock bonus animations and hidden features.",
    category: 'basic'
  },
  {
    question: "Which Sprunki Phase version should I start with?",
    answer: "For newcomers, we recommend starting with Sprunki Phase 1 to learn the basic mechanics. As you become comfortable with the core gameplay, you can explore later versions like Sprunki Phase 7 or Sprunki Retake, each offering unique features and sound libraries. Each version of Sprunki Phase builds upon the previous one, introducing new characters and mechanics.",
    category: 'gameplay'
  },
  {
    question: "Can I save my Sprunki Phase creations?",
    answer: "Yes! Sprunki Phase includes a save feature that lets you store your favorite musical compositions. You can also share your Sprunki Phase creations with the community, get feedback from other players, and discover compositions made by fellow creators. This social aspect is a key part of the Sprunki Phase experience.",
    category: 'technical'
  },
  {
    question: "Are there different sound categories in Sprunki Phase?",
    answer: "Yes, Sprunki Phase offers various sound categories including beats, melodies, effects, and vocals. Each character in Sprunki Phase specializes in different sound types - for example, Clucker focuses on rhythmic beats while Funbot brings electronic elements. This variety allows for rich and diverse musical compositions.",
    category: 'technical'
  },
  {
    question: "How can I join the Sprunki Phase community?",
    answer: "The Sprunki Phase community is open to all players! You can participate by sharing your creations, rating other players' compositions, and joining discussions about different Sprunki Phase versions and techniques. Many players also share tips and tutorials for creating better music in Sprunki Phase.",
    category: 'community'
  },
  {
    question: "What are the system requirements for Sprunki Phase?",
    answer: "Sprunki Phase is a browser-based game that runs smoothly on most modern devices. You don't need to download or install anything - simply visit our website to start creating music in Sprunki Phase immediately. The game works best with an updated browser and stable internet connection.",
    category: 'technical'
  }
];

export function FAQ() {
  return (
    <section className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#2A2C32]">
          <h2 className="text-2xl font-heading text-primary">
            Sprunki Phase FAQ
          </h2>
        </div>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Find answers to common questions about Sprunki Phase music creation and gameplay
        </p>
      </div>
      
      {/* Basic Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading text-primary border-b border-[#2A2C32] pb-2">
          Getting Started
        </h3>
        <div className="space-y-4">
          {faqs
            .filter(faq => faq.category === 'basic')
            .map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
              >
                <h4 className="text-lg font-heading text-text-secondary mb-2">
                  {faq.question}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Gameplay Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading text-primary border-b border-[#2A2C32] pb-2">
          Gameplay & Features
        </h3>
        <div className="space-y-4">
          {faqs
            .filter(faq => faq.category === 'gameplay')
            .map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
              >
                <h4 className="text-lg font-heading text-text-secondary mb-2">
                  {faq.question}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Technical Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading text-primary border-b border-[#2A2C32] pb-2">
          Technical Details
        </h3>
        <div className="space-y-4">
          {faqs
            .filter(faq => faq.category === 'technical')
            .map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
              >
                <h4 className="text-lg font-heading text-text-secondary mb-2">
                  {faq.question}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Community Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading text-primary border-b border-[#2A2C32] pb-2">
          Community & Sharing
        </h3>
        <div className="space-y-4">
          {faqs
            .filter(faq => faq.category === 'community')
            .map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] transition-all"
              >
                <h4 className="text-lg font-heading text-text-secondary mb-2">
                  {faq.question}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
