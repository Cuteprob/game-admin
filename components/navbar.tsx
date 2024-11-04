import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-[#FFE5E5]">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center space-x-4">
          <Image 
            src="/logo.jpeg" 
            alt="House of Hazards Logo" 
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-heading text-primary tracking-wide">
            House of Hazards
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/games" 
            className="text-text-secondary hover:text-[#ff5252fa] transition-colors"
          >
            Games
          </Link>
          <Link 
            href="/features" 
            className="text-text-secondary hover:text-[#ff5252fa] transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/how-to-play" 
            className="text-text-secondary hover:text-[#ff5252fa] transition-colors"
          >
            How to Play
          </Link>
          <Link 
            href="/faq" 
            className="text-text-secondary hover:text-[#ff5252fa] transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  )
}
