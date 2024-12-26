'use client'

import { useEffect, useRef, useState } from 'react'

export function Comments() {
  const ref = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const container = ref.current
    if (container) {
      container.innerHTML = ''
    }

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    
    const giscusAttributes = {
      'data-repo': 'JustinXW001/sprunkimegalovania.orgComment',
      'data-repo-id': 'R_kgDONfHOsg',
      'data-category': 'General',
      'data-category-id': 'DIC_kwDONfHOss4ClUX-',
      'data-mapping': 'specific',
      'data-term': 'Sprunki Megalovania Comments',
      'data-reactions-enabled': '0',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'light',
      'data-lang': 'en',
      'data-loading': 'lazy',
      'crossorigin': 'anonymous',
      'async': 'true'
    }

    Object.entries(giscusAttributes).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    script.onload = () => setIsLoading(false)

    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return (
    <aside className="w-full h-full">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border">
        <div className="p-6">
          {isLoading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <div ref={ref} className="giscus min-h-[200px] w-full" />
        </div>
      </div>
    </aside>
  )
}