
// 确保这是一个客户端组件，因为它使用了 React Hooks (useEffect)
'use client';

import React, { useEffect } from 'react';

// 定义组件接收的 props 类型
import { CusdisCommentProps } from '@/types/ui'

/**
 * 一个可复用的 Cusdis 评论组件
 * 已配置为使用 Cusdis 官方托管服务
 */
export function CusdisComment({ 
  pageId, 
  pageUrl, 
  pageTitle, 
  theme = 'auto' 
}: CusdisCommentProps) {
  
  // 使用官方托管服务，Host 和 App ID 是固定的
  const cusdisHost = "https://cusdis.com";
  const cusdisAppId = "7ffe757d-2b89-45ce-a6eb-184aab230d32";

  useEffect(() => {
    // Cusdis 的脚本依赖于页面上存在一个 <script> 标签。
    // 这个 effect 会在组件挂载时，动态地创建并添加这个脚本。
    const script = document.createElement('script');
    // 使用官方 embed code 提供的脚本地址
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    
    // 将脚本添加到 body 中
    document.body.appendChild(script);

    // 组件卸载时，清理掉添加的脚本
    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); 

  return (
    <div className="mt-8">
      {/* 
        这是 Cusdis 渲染评论区所需的主容器。
        我们通过 data-* 属性将所有配置和页面信息传递给它。
        使用 key={pageId} 是一个 React 技巧：当 pageId 变化时 (例如在单页应用中切换文章),
        React 会销毁旧的 div 并创建一个全新的 div，这会强制 Cusdis 重新初始化，确保评论区正确更新。
      */}
      <div
        id="cusdis_thread"
        key={pageId}
        data-host={cusdisHost}
        data-app-id={cusdisAppId}
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
        data-theme={theme}
      ></div>
    </div>
  );
}
