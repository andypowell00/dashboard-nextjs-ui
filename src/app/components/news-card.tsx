// components/cards/NewsCard.tsx
import React from 'react';
import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import { NewsItem } from '@/app/types/newsItem';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const imageSrc = item.thumbnail || '/fallback-image.jpg';

  return (
    <div className="glass-card card-hover overflow-hidden">
      <div className="relative h-48">
        {imageSrc ? (
          <Image
            src={imageSrc}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-10">
            <Newspaper className="h-16 w-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-background)] to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-[var(--accent-1)] transition-colors duration-200">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {item.title}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default NewsCard;
