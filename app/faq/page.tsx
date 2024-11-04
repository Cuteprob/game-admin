import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQ } from "@/components/faq";
import { RelatedGames } from "@/components/related-games";
export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4 max-w-7xl">
      <Breadcrumb 
          items={[
            { label: "Play House of Hazards", href: "/" },
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
  title: "FAQ - House of Hazards",
  description: "Find answers to frequently asked questions about House of Hazards. Get help with games, features, and more.",
  alternates: {
    canonical: "https://www.houseofhazards.online/faq",
  },
}
