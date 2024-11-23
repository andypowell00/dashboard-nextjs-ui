import React from 'react'
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react'
import { parseISO, format } from 'date-fns'

interface WeatherProps {
  weather: {
    date?: string
    high_temp?: number
    low_temp?: number
    status?: string
  }
}

const WeatherDisplay: React.FC<WeatherProps> = ({ weather }) => {
  const getWeatherIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sunny':
      case 'clear sky':  
        return <Sun className="h-6 w-6 text-yellow-400" />
      case 'overcast clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <Cloud className="h-6 w-6 text-blue-300" />
      case 'rain':
      case 'shower rain':
      case 'thunderstorm':
        return <CloudRain className="h-6 w-6 text-blue-400" />
      case 'snow':
        return <Snowflake className="h-6 w-6 text-blue-200" />
      default:
        return <Sun className="h-6 w-6 text-yellow-400" />
    }
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Invalid date'
    const date = parseISO(dateString)
    
    // Convert to New York time
    const nyDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }))
    
    return format(nyDate, 'MMMM d, yyyy')
  }
 
  return (
    <div className="glass-card px-6 py-3 inline-flex items-center space-x-6 text-sm">
      <div className="flex items-center space-x-2">
        {getWeatherIcon(weather.status || '')}
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-[var(--accent-1)]">{Math.round(weather.high_temp ?? 0)}°</span>
        <span className="text-[var(--text-secondary)]">/</span>
        <span className="text-[var(--text-secondary)]">{Math.round(weather.low_temp ?? 0)}°</span>
      </div>
      <div className="text-[var(--text-secondary)]">
        {formatDate(weather.date)}
      </div>
    </div>
  )
}

export default WeatherDisplay

