import { StyleSheet, TextStyle } from 'react-native'
import { TEMP_INDICATOR_LENGTH } from '@/constants'
import { ThemedText } from './ThemedText'

interface TemperatureIndicatorProps {
  minTemp: number
  maxTemp: number
  temperature: number
}

type TempCategory = 'hot' | 'warm' | 'cool' | 'cold'

export const TemperatureIndicator = ({
  minTemp,
  maxTemp,
  temperature
}: TemperatureIndicatorProps) => {
  const position = Math.floor(
    (TEMP_INDICATOR_LENGTH - 1) * ((temperature - minTemp) / (maxTemp - minTemp))
  )

  const indicatorString = Array.from({ length: TEMP_INDICATOR_LENGTH }, (_, i) =>
    i === position ? '|' : ' '
  ).join('')

  const temperatureStyles: Record<TempCategory, TextStyle> = {
    hot: styles.textOrange,
    warm: styles.textYellow,
    cool: styles.textGreen,
    cold: styles.textBlue
  }

  const getTempCategory = (temperature: number): TempCategory => {
    if (temperature >= 25) return 'hot'
    if (temperature >= 16) return 'warm'
    if (temperature >= 7) return 'cool'
    return 'cold'
  }

  const style = temperatureStyles[getTempCategory(temperature)]

  return <ThemedText style={style}>{indicatorString}</ThemedText>
}

const styles = StyleSheet.create({
  textOrange: { color: 'orange' },
  textGreen: { color: 'green' },
  textYellow: { color: 'yellow' },
  textBlue: { color: 'blue' }
})
