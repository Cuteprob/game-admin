import Link from "next/link"
import { GameCategory } from "@/config/sprunkigame"

export function Footer() {
  return (
    <footer className="bg-slate-800/80 backdrop-blur-sm border-t border-[#2A2C32]">
      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-12">
        {/* 分类导航区 */}
        <div className="space-y-6">
          <h2 className="font-heading text-primary text-xl text-center mb-8">
            Game Categories
          </h2>
          <div className="grid gap-4">
            {/* 主要游戏类型 - 大尺寸 */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                GameCategory.SPRUNKIPHASE,
                GameCategory.INCREDIBOX,
                GameCategory.SPRUNKI,
                GameCategory.HALLOWEEN,
                GameCategory.MOD,
                GameCategory.MUSIC,
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toString().toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-slate-800/80 text-text-secondary hover:bg-slate-700 hover:text-primary transition-all duration-300 border border-[#2A2C32] hover:shadow-[0_0_15px_rgba(74,144,226,0.1)]"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* 玩法和主题分类 - 中等尺寸 */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                GameCategory.NEW,
                GameCategory.HOT,
                GameCategory.FEATURED,
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toString().toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-800/80 text-text-secondary hover:bg-slate-700 hover:text-primary transition-all duration-300 border border-[#2A2C32]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 主要内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#2A2C32]">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpeg" 
                alt="Sprunki phase Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-heading text-primary">
                Sprunki Phase
              </span>
            </div>
            <p className="text-text-secondary">
              Welcome to Sprunki Phase, where music creation meets interactive gameplay! Create unique beats, mix sounds, and transform characters in this innovative music-making adventure. Join our creative community and start your musical journey today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="font-heading text-text-secondary">Quick Links</h2>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link href="/how-to-play" className="text-text-secondary hover:text-primary transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-text-secondary hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-text-secondary hover:text-primary transition-colors">
                  All Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="font-heading text-text-secondary">Contact</h2>
            <div className="space-y-2">
              <p className="text-text-secondary">support@sprunkiphase.xyz</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-text-secondary hover:text-primary transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息区 */}
        <div className="text-center pt-8 border-t border-[#2A2C32]">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} Sprunki Phase - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
