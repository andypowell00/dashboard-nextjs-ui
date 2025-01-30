"use client"

import { useEffect, useState } from 'react'
import { DashboardTabs } from '@/app/components/tabs'
import WeatherDisplay from '@/app/components/weather-display'
import { Item } from '@/app/types/item';



export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<Item | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/items')
        if (response.ok) {
          const data = await response.json()
          const weatherItem = data.find((item: Item) => item.type === 'weather');
          setWeatherData(weatherItem || null)
          setItems(data.filter((item: Item) => item.type !== 'weather'));
        } else {
          console.error(`Failed to fetch items. Status: ${response.status}`)
          setItems([])
        }
      } catch (error) {
        console.error("Failed to fetch items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--card-border)] backdrop-blur-xl bg-[var(--background)]/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1>{weatherData && <WeatherDisplay weather={weatherData} />}</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <DashboardTabs items={items} isLoading={isLoading} />
      </main>
    </div>
  )
}

