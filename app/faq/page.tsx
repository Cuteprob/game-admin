import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQ } from "@/components/faq";
import { RelatedGames } from "@/components/related-games";
export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4 max-w-7xl">
      <Breadcrumb 
          items={[
            { label: "Play Sprunki phase", href: "/" },
            { label: "FAQ", href: "/faq" }
          ]} 
      />  
      <div className="space-y-16">
        <FAQ />
        <RelatedGames />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Frequently Asked Questions - Sprunki phase",
  description: "Find answers to frequently asked questions. Get help with games, features, tips,and more. Discover controls, strategies, and gameplay mechanics.",
  keywords: ["FAQ", "Sprunki phase", "Sprunki phase FAQ", "Sprunki phase Help", "Sprunki phase Support"],
  alternates: {
    canonical: "https://sprunkiphase4.app/faq",
  },
}
