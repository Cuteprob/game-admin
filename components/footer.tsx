import Link from "next/link"
import { GameCategory } from "@/config/sprunkigame"

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-12">
        {/* 分类导航区 */}
        <div className="space-y-6">
          <h2 className="font-heading text-primary text-xl font-bold text-center mb-8">
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
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-background hover:bg-muted text-foreground hover:text-primary transition-all duration-300 border border-border hover:shadow-game"
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
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-background hover:bg-muted text-foreground hover:text-primary transition-all duration-300 border border-border"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 链接区域 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-primary font-bold">Game</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-play" className="text-sm text-foreground hover:text-primary transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-primary font-bold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@sprunkiphase4.app" className="text-sm text-foreground hover:text-primary transition-colors">
                  support@sprunkiphase4.app
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-primary font-bold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sprunki Phase 4. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
