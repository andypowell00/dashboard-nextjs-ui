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
    return null // or return a placeholder component
  }

  const isNews = item.type === 'news'
  const isReddit = item.type === 'reddit'

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-40">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <Newspaper className="h-16 w-16 text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        {(isNews || isReddit) && item.body && (
          <button
            onClick={() => setShowContent(!showContent)}
            className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors duration-200"
            aria-label={showContent ? "Hide content" : "Show content"}
          >
            {showContent ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-100">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {item.title}
            </a>
        </h3>
        {isNews && item.body && (
          <p className={`text-sm text-gray-300 mt-2 ${showContent ? '' : 'line-clamp-3'}`}>
            {item.body}
          </p>
        )}
      </div>
    </div>
  )
}

export default Card