import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import prettier from 'prettier';
import { games, GameCategory } from '../config/sprunkigame';

// 获取页面的修改时间
function getLastModified(filePath: string): string {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0];
    } catch (error) {
        return new Date().toISOString().split('T')[0];
    }
}

// 获取页面的更新频率
function getChangeFreq(pagePath: string): string {
    if (pagePath === '/' || pagePath.startsWith('/games/')) {
        return 'daily';
    } else if (pagePath.startsWith('/categories/')) {
        return 'weekly';
    }
    return 'monthly';
}

// 获取页面优先级
function getPriority(pagePath: string): string {
    const priorities: Record<string, number> = {
        '/': 1.0,
        '/games': 0.9,
        '/features': 0.8,
        '/how-to-play': 0.8,
        '/faq': 0.8,
    };

    if (pagePath.startsWith('/categories/')) {
        return '0.7';
    } else if (pagePath.startsWith('/games/')) {
        return '0.6';
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

async function generateSitemap(): Promise<void> {
    try {
        // 1. 获取所有静态页面路径
        const pages = await globby([
            'app/**/*.tsx',
            '!app/**/_*.tsx',
            '!app/**/layout.tsx',
            '!app/**/error.tsx',
            '!app/**/loading.tsx',
            '!app/**/[*.tsx', // 排除动态路由模板
            '!app/games/[id]/**',  // 排除游戏详情页模板
            '!app/categories/[category]/**',  // 排除分类页模板
        ], {
            cwd: process.cwd(),
        });

        // 2. 生成静态页面的 URL 条目
        const staticUrlEntries = pages.map((page: string) => {
            // 转换文件路径为URL路径
            const pagePath = page
                .replace('app', '')
                .replace('/page.tsx', '')
                .replace('.tsx', '');

            // 排除动态路由模板路径
            if (pagePath.includes('[') || pagePath.includes(']')) {
                return '';
            }

            // 获取完整的文件路径
            const filePath = path.join(process.cwd(), page);
            const lastmod = getLastModified(filePath);

            return `
    <url>
        <loc>https://www.sprunkiphase.xyz${pagePath}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${getChangeFreq(pagePath)}</changefreq>
        <priority>${getPriority(pagePath)}</priority>
    </url>`;
        }).filter(Boolean);  // 移除空条目

        // 3. 生成游戏页面的 URL 条目
        const gameUrlEntries = games.map(game => {
            const pagePath = `/games/${game.id}`;
            const lastmod = new Date().toISOString().split('T')[0]; // 使用当前日期
            return `
    <url>
        <loc>https://www.sprunkiphase.xyz${pagePath}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${getChangeFreq(pagePath)}</changefreq>
        <priority>${getPriority(pagePath)}</priority>
    </url>`;
        });

        // 4. 生成分类页面的 URL 条目
        const categories = getCategories();
        const categoryUrlEntries = categories.map(category => {
            const pagePath = `/categories/${category}`;
            const lastmod = new Date().toISOString().split('T')[0]; // 使用当前日期
            return `
    <url>
        <loc>https://www.sprunkiphase.xyz${pagePath}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${getChangeFreq(pagePath)}</changefreq>
        <priority>${getPriority(pagePath)}</priority>
    </url>`;
        });

        // 5. 合并所有 URL 条目
        const allUrlEntries = [
            ...staticUrlEntries,
            ...gameUrlEntries,
            ...categoryUrlEntries,
        ];

        // 6. 生成完整的 sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrlEntries.join('\n')}
</urlset>`;

        // 7. 格式化 XML
        const prettierConfig = await prettier.resolveConfig(process.cwd());
        const formattedSitemap = await prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        });

        // 8. 写入文件
        fs.writeFileSync('public/sitemap.xml', formattedSitemap);
        console.log('✅ Sitemap generated successfully!');

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// 执行生成
generateSitemap();
