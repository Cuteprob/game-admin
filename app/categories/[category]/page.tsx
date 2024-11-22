import { Metadata } from "next"
import { Game, GameCategory, games, getGamesByCategory } from "@/config/sprunkigame"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"
import Image from 'next/image';
import { notFound } from "next/navigation"

export const runtime = 'edge';

interface CategoryPageProps {
  params: {
    category: string
  }
}

// 获取分类名称的显示格式
function getCategoryDisplayName(categorySlug: string): string {
  const category = Object.values(GameCategory).find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
  return category || 'Unknown Category';
}

// 添加日期排序函数
const sortGamesByDate = (games: Game[]) => {
  return [...games].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

// 生成页面元数据
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = getCategoryDisplayName(params.category);
  
  return {
    title: `${categoryName} - Free Music Games | Sprunki phase`,
    description: `Play the best ${categoryName.toLowerCase()} on Sprunki phase. Find your favorite games and enjoy hours of entertainment! All games are free to play and no download required!`,
    alternates: {
      canonical: `https://sprunkiphase4.app/categories/${params.category}`,
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = getCategoryDisplayName(params.category);
  
  if (!categoryName) {
    notFound();
  }

  // 获取该分类的游戏并按日期排序
  const categoryGames = sortGamesByDate(getGamesByCategory(categoryName as GameCategory));
  
  // 获取所有游戏并按日期排序
  const allGames = sortGamesByDate(games);
  
  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb 
        items={[
          { label: "Play Sprunki phase 4", href: "/" },
          { label: categoryName, href: `/categories/${params.category}` }
        ]} 
      />
      
      <div className="space-y-12">
        {/* 分类标题和描述 */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-primary tracking-tight mb-2">
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of {categoryName.toLowerCase()}
          </p>
        </div>

        {/* 该分类的游戏 - 按日期排序 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryGames.map((game) => (
            <Link
              key={game.id}
              href={game.id === 'sprunki-phase-4' ? '/' : `/${game.id}`}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 hover:shadow-game transition-all"
            >
              <div className="space-y-4">
                <div className="aspect-video relative rounded-xl overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-foreground mb-2">
                    {game.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {game.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 所有游戏 - 按日期排序 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading text-primary">More Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {allGames.map((game) => (
              <Link
                key={game.id}
                href={game.id === 'sprunki-phase-4' ? '/' : `/${game.id}`}
                className="group block"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden transition-all hover:shadow-game">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 