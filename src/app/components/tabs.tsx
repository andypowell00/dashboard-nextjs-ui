"use client"

import React, { useState } from 'react'
import Card from '@/app/components/card'
import MusicCard from '@/app/components/music-card'
import MovieCard from '@/app/components/movie-card'
import { Item } from '@/app/types/item';

interface DashboardTabsProps {
  items: Item[]
  isLoading: boolean
}

export function DashboardTabs({ items, isLoading }: DashboardTabsProps) {
  //console.log('Items received in DashboardTabs:', items);
  const [activeTab, setActiveTab] = useState("news")

  const filterItems = (type: string) => {
    //console.log('Filtering items for type:', type);
    return items.filter(item => item.type === type);
  }

  const renderContent = (type: string) => {
    const filteredItems = filterItems(type === "trailers" ? "trailer" : type)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          switch (type) {
            case 'music':
              return <MusicCard key={item._id?.$oid || index} item={item} />
            case 'trailer':
              return <MovieCard key={item._id?.$oid || index} item={item} />
            default:
              return <Card key={item._id?.$oid || index} item={item} />
          }
        })}
      </div>
    )
  }

  const tabs = ["news","reddit", "trailers", "music"]

  return (
    <div className="w-full">
      <div className="glass-card p-1 mb-8 inline-flex rounded-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--accent-1)] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-[var(--accent-2)] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {renderContent(activeTab)}
        </div>
      )}
    </div>
  )
}

