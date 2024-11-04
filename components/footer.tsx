import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-[#FFE5E5]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpeg" 
                alt="House of Hazards Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-heading text-primary">
                House of Hazards
              </span>
            </div>
            <p className="text-text-secondary max-w-sm">
              Experience thrilling multiplayer challenges in House of Hazards. Navigate through hazard-filled rooms, complete tasks, and compete with friends in this exciting browser-based game.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-text-primary">Game Guide</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-play" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  Game Features
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-heading text-text-primary">Game Modes</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-text-secondary">
                  Single Player Mode
                </span>
              </li>
              <li>
                <span className="text-text-secondary">
                  2 Player Mode
                </span>
              </li>
              <li>
                <span className="text-text-secondary">
                  3 Player Mode
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#FFE5E5]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-text-secondary">
              © {new Date().getFullYear()} House of Hazards. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-text-secondary hover:text-[#ff5252fa] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-text-secondary hover:text-[#ff5252fa] transition-colors"
              >
                Terms of Service
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-sm text-text-secondary hover:text-[#ff5252fa] transition-colors cursor-help">
                    Contact
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>support@houseofhazards.com</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
