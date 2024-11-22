"use client"

import React, { useState } from 'react'
import Card from '@/app/components/card'

interface Item {
  type: string
  image_url?: string
  title: string
  url?: string
  body?: string
  date?: string
  high_temp?: number
  low_temp?: number
  status?: string
  _id?: {
    $oid: string
  }
}

interface DashboardTabsProps {
  items: Item[]
  isLoading: boolean
}

export function DashboardTabs({ items, isLoading }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("reddit")

  const filterItems = (type: string) => items.filter(item => item.type === type)

  const renderContent = (type: string) => {
    const filteredItems = filterItems(type)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <Card key={item._id?.$oid || index} item={item} />
        ))}
      </div>
    )
  }

  const tabs = ["reddit", "news", "concerts", "movies"]

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

