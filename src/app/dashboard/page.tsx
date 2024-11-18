"use client"

import { useEffect, useState } from 'react'
import Card from '@/app/components/card'
import WeatherDisplay from '@/app/components/weather-display'
import { Loader2 } from 'lucide-react'

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

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<Item | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/items')
        if (response.ok) {
          const text = await response.text()
          try {
            const data = JSON.parse(text)
            console.log("Fetched data:", data)
            const weatherItem = data.find((item: Item) => item.type === 'weather')
            setWeatherData(weatherItem || null)
            setItems(data.filter((item: Item) => item.type !== 'weather'))
          } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError)
            setItems([])
          }
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {weatherData && <WeatherDisplay weather={weatherData} />}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <Card key={item._id?.$oid || index} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}