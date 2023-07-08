import { StyleSheet, Text } from 'react-native'

interface ITemperatureIndicator {
  minTemp: number
  maxTemp: number
  temperature: number
}

function TemperatureIndicator({
  minTemp,
  maxTemp,
  temperature
}: ITemperatureIndicator) {
  const indicatorLength = 40
  const position = Math.floor(
    indicatorLength * ((temperature - minTemp) / (maxTemp - minTemp))
  )

  let indicatorElements = []
  for (let i = 0; i < indicatorLength; i++) {
    indicatorElements.push(i === position ? '|' : ' ')
  }

  const indicatorString = indicatorElements.join('')

  return (
    <Text
      style={
        temperature > 24
          ? styles.textOrange
          : temperature > 15
          ? styles.textYellow
          : temperature > 6
          ? styles.textGreen
          : styles.textBlue
      }
    >
      {indicatorString}
    </Text>
  )
}

const styles = StyleSheet.create({
  textOrange: { color: 'orange' },
  textGreen: { color: 'green' },
  textYellow: { color: 'yellow' },
  textBlue: { color: 'blue' }
})

export default TemperatureIndicator
