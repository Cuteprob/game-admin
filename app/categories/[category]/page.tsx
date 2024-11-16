import { Metadata } from "next"
import { Game, GameCategory, games, getGamesByCategory } from "@/config/sprunkigame"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Link from "next/link"
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
      canonical: `https://www.sprunkiphase.xyz/categories/${params.category}`,
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
          { label: "Play Sprunki phase", href: "/" },
          { label: categoryName, href: `/categories/${params.category}` }
        ]} 
      />
      
      <div className="space-y-12">
        {/* 分类标题和描述 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-heading text-primary">
            {categoryName}
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover and play the best {categoryName.toLowerCase()} on Sprunki phase. 
            All games are free to play and no download required!
          </p>
        </div>

        {/* 该分类的游戏 - 按日期排序 */}
        <section className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="group block"
              >
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-[#2A2C32] overflow-hidden transition-all hover:shadow-[0_0_15px_rgba(74,144,226,0.1)]">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-heading text-primary text-lg mb-2 line-clamp-1">
                      {game.title}
                    </h2>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 所有游戏 - 按日期排序 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading text-primary">More Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {allGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="group block"
              >
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-[#2A2C32] overflow-hidden transition-all hover:shadow-[0_0_15px_rgba(74,144,226,0.1)]">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-primary text-lg mb-2 line-clamp-1">
                      {game.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
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