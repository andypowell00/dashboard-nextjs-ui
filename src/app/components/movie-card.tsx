import React from 'react'
import { Film } from 'lucide-react'

interface MovieItem {
  type: string  
  title: string
  url?: string
  date?: string
  thumbnail?: string
  description?: string
}

interface MovieCardProps {
  item: MovieItem
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  return (
    <div className="glass-card card-hover overflow-hidden">
      <div className="relative h-48">
        {item.thumbnail ? (
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-10">
            <Film className="h-16 w-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-background)] to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-[var(--accent-1)] transition-colors duration-200">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {item.title}
          </a>
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{item.description}</p>
      </div>
    </div>
  )
}

export default MovieCard

