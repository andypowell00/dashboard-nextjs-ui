import React from 'react';
import { Music } from 'lucide-react';
import { cn } from "@/lib/utils"

interface MusicItem {
  image: string
  title: string
  artist: string
  release_date: string
  summary: string
  type: string
}

interface MusicCardProps {
  item: MusicItem;
}

const MusicCard: React.FC<MusicCardProps> = ({ item }) => {
  return (
    <div className="glass-card card-hover overflow-hidden">
      <div className="relative aspect-square max-h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-10" />
        {item.image && (
          <img 
            src={item.image} 
            alt={`${item.title} by ${item.artist}`}
            className={cn(
              "absolute inset-0 w-full h-full object-contain transition-all duration-300",
              "hover:scale-110 group-hover:opacity-90"
            )}
          />
        )}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-[var(--card-background)]",
            "via-transparent to-transparent opacity-90"
          )}
        />
        {!item.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-16 w-16 text-white" />
          </div>
        )}
      </div>
      <div className="p-4 bg-[var(--card-background)]">
        <h3 className="text-lg font-semibold mb-0.5 line-clamp-1 hover:text-[var(--accent-1)] transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-1">{item.artist}</p>
        <p className="text-xs text-[var(--text-secondary)] mb-2">Release Date: {item.release_date}</p>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{item.summary}</p>
      </div>
    </div>
  )
}

export default MusicCard;

