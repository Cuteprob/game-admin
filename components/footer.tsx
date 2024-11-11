import Link from "next/link"
import { GameCategory } from "@/config/games"

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-[#FFE5E5]">
      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-12">
        {/* 分类导航区 - 移到最上面 */}
        <div className="space-y-6">
          <h3 className="font-heading text-text-primary text-xl text-center mb-8">
            Game Categories
          </h3>
          <div className="grid gap-4">
            {/* 主要游戏类型 - 大尺寸 */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                GameCategory.ACTION,
                GameCategory.ADVENTURE,
                GameCategory.RACING,
                GameCategory.SHOOTER,
                GameCategory.PUZZLE,
                GameCategory.STRATEGY,
                GameCategory.SPORTS,
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toString().toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/80 text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 border border-[#FFE5E5]"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* 玩法和主题分类 - 中等尺寸 */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                GameCategory.MULTIPLAYER,
                GameCategory.TWO_PLAYER,
                GameCategory.SINGLE_PLAYER,
                GameCategory.CAR,
                GameCategory.FIGHTING,
                GameCategory.RUNNING,
                GameCategory.ANIMAL,
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toString().toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/80 text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 border border-[#FFE5E5]"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* 目标人群和功能性分类 - 小尺寸 */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                GameCategory.BOYS,
                GameCategory.GIRLS,
                GameCategory.KIDS,
                GameCategory.FEATURED,
                GameCategory.NEW,
                GameCategory.POPULAR,
                GameCategory.TRENDING
              ].map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toString().toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/80 text-text-secondary hover:bg-[#ff6b6bd8] hover:text-white transition-all duration-300 border border-[#FFE5E5]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 主要内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#FFE5E5]">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpeg" 
                alt="Shady Bears Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-heading text-primary">
                Shady Bears
              </span>
            </div>
            <p className="text-text-secondary">
              Welcome to Shady Bears, where shadows become your greatest challenge! Master the art of shadow-dodging while collecting acorns in this unique multiplayer adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-text-primary">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link href="/how-to-play" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  All Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-text-primary">Contact</h3>
            <div className="space-y-2">
              <p className="text-text-secondary">support@shadybears.org</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-text-secondary hover:text-[#ff5252fa] transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息区 */}
        <div className="text-center pt-8 border-t border-[#FFE5E5]">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} Shady Bears - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
