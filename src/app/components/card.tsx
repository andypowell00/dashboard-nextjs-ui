import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon, Newspaper } from 'lucide-react'

interface Item {
  type: string
  image_url?: string
  title: string
  url?: string
  body?: string
}

interface ItemProps {
  item: Item
}

const Card: React.FC<ItemProps> = ({ item }) => {
  const [showContent, setShowContent] = useState<boolean>(false)
  
  if (!item || !item.type) {
    return null
  }

  const isNews = item.type === 'news'
  const isReddit = item.type === 'reddit'

  return (
    <div className="glass-card card-hover overflow-hidden">
      <div className="relative h-48">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-10">
            <Newspaper className="h-16 w-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-background)] to-transparent" />
        {(isNews || isReddit) && item.body && (
          <button
            onClick={() => setShowContent(!showContent)}
            className="absolute top-3 right-3 p-2 glass-card hover:bg-opacity-80 transition-all duration-200 group"
            aria-label={showContent ? "Hide content" : "Show content"}
          >
            {showContent ? (
              <EyeOffIcon className="h-4 w-4 text-[var(--text-secondary)] group-hover:text-white" />
            ) : (
              <EyeIcon className="h-4 w-4 text-[var(--text-secondary)] group-hover:text-white" />
            )}
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-[var(--accent-1)] transition-colors duration-200">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {item.title}
          </a>
        </h3>
        {isNews && item.body && (
          <p className={`text-[var(--text-secondary)] text-sm ${showContent ? '' : 'line-clamp-3'}`}>
            {item.body}
          </p>
        )}
      </div>
    </div>
  )
}

export default Card

