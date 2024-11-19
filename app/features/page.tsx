import { Features } from "@/components/features";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RelatedGames } from "@/components/related-games";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        <Breadcrumb 
          items={[
            { label: "Play Sprunki phase", href: "/" },
            { label: "Features", href: "/features" }
          ]} 
        />
        <div className="space-y-16 mt-4">
          <Features />
          <RelatedGames />
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: "Discover Sprunki phase Features - Sprunki phase",
  description: "Discover Sprunki phase's features and benefits. Learn about our game collection, instant play technology, and enjoy the best unblocked games online.",
  alternates: {
    canonical: "https://sprunkiphase4.app/features",
  },
}
