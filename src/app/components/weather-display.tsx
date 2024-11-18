import React from 'react'
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react'

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
        return <Cloud className="h-6 w-6 text-gray-400" />
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

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center">
        {getWeatherIcon(weather.status || '')}
      </div>
      <div>
        <span className="font-semibold">{weather.high_temp}°</span> / <span>{weather.low_temp}°</span>
      </div>
      <div>{weather.date}</div>
    </div>
  )
}

export default WeatherDisplay