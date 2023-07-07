import { Feather } from '@expo/vector-icons'

interface IWeatherIcon {
  weatherCode: number
  iconSize: number
  isDay?: boolean
}

function WeatherIcon({ weatherCode, iconSize, isDay = true }: IWeatherIcon) {
  return (
    <Feather
      name={
        weatherCode === 0 || weatherCode === 1
          ? isDay
            ? 'sun'
            : 'moon'
          : weatherCode === 2 || weatherCode === 3
          ? 'cloud'
          : 'cloud-drizzle'
      }
      size={iconSize}
      color="white"
    />
  )
}

export default WeatherIcon
