import { Feather } from '@expo/vector-icons'

interface IWeatherIcon {
  weatherCode: number
  iconSize: number
  isDay?: boolean
}

function WeatherIcon({ weatherCode, iconSize, isDay = true }: IWeatherIcon) {
  const getIcon = () => {
    switch (weatherCode) {
      case 1 || 2:
        return isDay ? 'sun' : 'moon'
      case 2 || 3 || 45 || 48:
        return 'cloud'
      case 61 || 63 || 65 || 66 || 67:
        return 'cloud-rain'
      case 71 || 73 || 75 || 77 || 85 || 86:
        return 'cloud-snow'
      case 95 || 96 || 99:
        return 'cloud-lightning'
      default:
        return 'cloud-drizzle'
    }
  }

  return <Feather name={getIcon()} size={iconSize} color="white" />
}

export default WeatherIcon
