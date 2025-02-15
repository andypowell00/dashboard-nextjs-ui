import React from 'react'
import { Newspaper, RssIcon as Reddit } from 'lucide-react'
import { Item } from '@/app/types/item';
import Image from "next/image";

interface ItemProps {
  item: Item
}

const Card: React.FC<ItemProps> = ({ item }) => {
  if (!item || !item.type) {
    return null
  }

  return (
    <div className="glass-card card-hover overflow-hidden">
      <div className="relative h-48">
        {(item.type === 'reddit' ? item.image_url : item.thumbnail) ? (
          <Image 
            src={item.type === 'reddit' ? item.image_url || "/fallback-image.jpg" : item.thumbnail || "/fallback-image.jpg"} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-10">
            {item.type === 'reddit' ? (
              <Reddit className="h-16 w-16 text-white" />
            ) : (
              <Newspaper className="h-16 w-16 text-white" />
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-background)] to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-[var(--accent-1)] transition-colors duration-200">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {item.title}
          </a>
        </h3>
      </div>
    </div>
  )
}

export default Card

