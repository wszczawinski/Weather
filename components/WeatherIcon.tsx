import { Feather } from '@expo/vector-icons'

type FeatherIconName = keyof typeof Feather.glyphMap

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
  const iconMap = new Map<number, FeatherIconName>([
    [0, 'sun'],
    [1, isDay ? 'sun' : 'moon'],
    [2, 'cloud'],
    [3, 'cloud'],
    [45, 'cloud'],
    [48, 'cloud'],
    [61, 'cloud-rain'],
    [63, 'cloud-rain'],
    [65, 'cloud-rain'],
    [66, 'cloud-rain'],
    [67, 'cloud-rain'],
    [71, 'cloud-snow'],
    [73, 'cloud-snow'],
    [75, 'cloud-snow'],
    [77, 'cloud-snow'],
    [85, 'cloud-snow'],
    [86, 'cloud-snow'],
    [95, 'cloud-lightning'],
    [96, 'cloud-lightning'],
    [99, 'cloud-lightning']
  ])

  const iconName: FeatherIconName = iconMap.get(weatherCode) ?? 'cloud-drizzle'

  return <Feather name={iconName} size={iconSize} color="white" />
}
