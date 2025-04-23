import { MaterialCommunityIcons } from '@expo/vector-icons'

type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap

interface WeatherIconProps {
  weatherCode: number
  iconSize: number
  isDay?: boolean
}

export const WeatherIcon = ({
  weatherCode,
  iconSize,
  isDay = true
}: WeatherIconProps) => {
  const iconMap = new Map<number, MaterialIconName>([
    [0, isDay ? 'weather-sunny' : 'weather-night'],
    [1, isDay ? 'weather-sunny' : 'weather-night'],
    [2, isDay ? 'weather-partly-cloudy' : "weather-night-partly-cloudy"],
    [3, 'weather-cloudy'],
    [45, 'weather-fog'],
    [48, 'weather-fog'],
    [51, 'weather-partly-rainy'],
    [53, 'weather-rainy'],
    [55, 'weather-rainy'],
    [56, 'weather-snowy-rainy'],
    [57, 'weather-snowy-rainy'],
    [61, 'weather-partly-rainy'],
    [63, 'weather-rainy'],
    [65, 'weather-pouring'],
    [66, 'weather-partly-snowy-rainy'],
    [67, 'weather-snowy-rainy'],
    [71, 'weather-partly-snowy'],
    [73, 'weather-snowy'],
    [75, 'weather-snowy-heavy'],
    [77, 'weather-snowy-heavy'],
    [80, 'weather-partly-rainy'],
    [81, 'weather-rainy'],
    [82, 'weather-pouring'],
    [85, 'weather-partly-snowy'],
    [86, 'weather-snowy'],
    [95, 'weather-lightning'],
    [96, 'weather-lightning-rainy'],
    [99, 'weather-lightning-rainy']
  ])

  const iconName: MaterialIconName = iconMap.get(weatherCode) ?? 'weather-partly-rainy'

  return <MaterialCommunityIcons name={iconName} size={iconSize} color="white" />
}
