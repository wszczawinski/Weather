import { StyleSheet, TextStyle } from 'react-native'

import { INDICATOR_LENGTH } from '@/constants'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Category = 'boil' | 'hot' | 'warm' | 'cool' | 'cold'

interface IndicatorProps {
  min: number
  max: number
  value: number
  indicatorLength?: number
}

export const Indicator = ({
  min,
  max,
  value,
  indicatorLength = INDICATOR_LENGTH
}: IndicatorProps) => {

  const position = Math.floor((indicatorLength - 1) * ((value - min) / (max - min)))

  const indicatorString = Array.from({ length: indicatorLength }, (_, i) => i === position ? '|' : ' ').join('')

  const temperatureStyles: Record<Category, TextStyle> = {
    boil: styles.textRed,
    hot: styles.textOrange,
    warm: styles.textYellow,
    cool: styles.textGreen,
    cold: styles.textBlue
  }

  const getTempCategory = (value: number): Category => {
    if (value >= 40) return 'boil'
    if (value >= 25) return 'hot'
    if (value >= 16) return 'warm'
    if (value >= 7) return 'cool'
    return 'cold'
  }

  const style = temperatureStyles[getTempCategory(value)]

  return (
    <ThemedView style={styles.indicator}>
      <ThemedText type='small' style={[style, styles.font20]}>{indicatorString}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  textRed: { color: 'red' },
  textOrange: { color: 'orange' },
  textGreen: { color: 'green' },
  textYellow: { color: 'yellow' },
  textBlue: { color: 'blue' },
  font20: {
    fontSize: 16,
    marginTop: -3,
    fontWeight: "bold"
  },
  indicator: {
    borderColor: 'grey',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
})
