"use client"
import Link from "next/link"
import Image from "next/image"
import { GameCategory } from "@/config/sprunkigame"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navCategories = [
    GameCategory.SPRUNKIPHASE,
    GameCategory.SPRUNKI,
    GameCategory.HOT,
    GameCategory.INCREDIBOX,
    GameCategory.MOD,
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-sm border-b border-[#2A2C32]">
      <div className="container mx-auto px-4 h-14">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center space-x-4">
            <Image 
              src="/logo.jpeg" 
              alt="Sprunki phase Logo" 
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-heading text-primary tracking-wide">
              Sprunki Phase
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
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-slate-800/80 text-[#9BA1B0] hover:bg-slate-700 hover:text-secondary transition-all duration-300 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)] hover:scale-105"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-slate-800/90 border-t border-[#2A2C32] shadow-lg">
            {navCategories.map((category) => (
              <Link 
                key={category}
                href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-text-secondary hover:bg-slate-700 hover:text-secondary transition-all duration-300 rounded-lg mx-2"
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
