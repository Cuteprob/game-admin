import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import prettier from 'prettier';
import { games, GameCategory } from '../config/sprunkigame';

// 获取页面的修改时间  
// npx tsx scripts/generate-sitemap.ts
function getLastModified(filePath: string): string {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0];
    } catch (error) {
        return '2024-11-18'; // 使用固定日期
    }
}

// 获取页面的更新频率
function getChangeFreq(pagePath: string): string {
    if (pagePath.startsWith('/games/')) {
        return 'daily';
    } else if (pagePath.startsWith('/categories/')) {
        return 'weekly';
    }
    return 'monthly';
}

// 获取页面优先级
function getPriority(pagePath: string): string {
    const priorities: Record<string, number> = {
        '/': 0.5,
        '/games': 0.9,
        '/features': 0.8,
        '/how-to-play': 0.8,
        '/faq': 0.8,
        '/privacy': 0.5,
        '/terms': 0.5,
        '/not-found': 0.5
    };

    if (pagePath.startsWith('/games/')) {
        return '0.6';
    } else if (pagePath.startsWith('/categories/')) {
        return '0.7';
    }

    return (priorities[pagePath] || 0.5).toFixed(1);
}

// 获取所有分类
function getCategories(): string[] {
    const categories = new Set<string>();
    games.forEach(game => {
        game.categories.forEach(category => {
            categories.add(category.toLowerCase().replace(/\s+/g, '-'));
        });
    });
    return Array.from(categories);
}

// 生成 URL 条目
function generateUrlEntry(pagePath: string, lastmod: string): string {
    return `
  <url>
    <loc>https://sprunkiphase4.app${pagePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangeFreq(pagePath)}</changefreq>
    <priority>${getPriority(pagePath)}</priority>
  </url>`;
}

async function generateSitemap(): Promise<void> {
    try {
        // 预定义的页面顺序
        const predefinedPages = [
            '/',
            '/faq',
            '/features',
            '/how-to-play',
            '/privacy',
            '/terms'
        ];

        // 1. 生成预定义页面的 URL 条目
        const staticUrlEntries = predefinedPages.map(pagePath => {
            const filePath = path.join(process.cwd(), 'app', pagePath === '/' ? 'page.tsx' : `${pagePath}/page.tsx`);
            const lastmod = pagePath === '/' ? '2024-11-18' : '2024-11-14';
            return generateUrlEntry(pagePath, lastmod);
        });

        // 2. 生成游戏页面的 URL 条目
        const gameUrlEntries = games.map(game => {
            const pagePath = `/games/${game.id}`;
            return generateUrlEntry(pagePath, '2024-11-18');
        });

        // 3. 生成分类页面的 URL 条目
        const categories = getCategories();
        const categoryUrlEntries = categories.map(category => {
            const pagePath = `/categories/${category}`;
            return generateUrlEntry(pagePath, '2024-11-18');
        });

        // 4. 合并所有 URL 条目
        const allUrlEntries = [
            ...staticUrlEntries,
            ...gameUrlEntries,
            ...categoryUrlEntries
        ];

        // 5. 生成完整的 sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>${allUrlEntries.join('')}
</urlset>`;

        // 6. 格式化 XML
        const prettierConfig = await prettier.resolveConfig(process.cwd());
        const formattedSitemap = await prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        });

        // 7. 写入文件
        fs.writeFileSync('public/sitemap.xml', formattedSitemap);
        console.log('✅ Sitemap generated successfully!');

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// 执行生成
generateSitemap();
