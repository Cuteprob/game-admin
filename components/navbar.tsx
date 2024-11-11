import Link from "next/link"
import Image from "next/image"
import { GameCategory } from "@/config/games"

export function Navbar() {
  const navCategories = [
    GameCategory.FEATURED,
    GameCategory.NEW,
    GameCategory.POPULAR,
    GameCategory.TRENDING
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#FFE5E5]">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center space-x-4">
          <Image 
            src="/logo.jpeg" 
            alt="Shady Bears Logo" 
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-heading text-primary tracking-wide">
            Shady Bears
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {navCategories.map((category) => (
            <Link 
              key={category}
              href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/80 text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 border border-[#FFE5E5] hover:shadow-md hover:scale-105"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
