"use client"
import Link from "next/link"
import Image from "next/image"
import { GameCategory } from "@/config/games"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navCategories = [
    GameCategory.FEATURED,
    GameCategory.NEW,
    GameCategory.POPULAR,
    GameCategory.TRENDING
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#FFE5E5]">
      <div className="container mx-auto px-4 h-14">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-full">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Categories */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white border-t border-[#FFE5E5] shadow-lg">
            {navCategories.map((category) => (
              <Link 
                key={category}
                href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
