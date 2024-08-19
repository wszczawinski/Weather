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
  const indicatorLength = 24
  const position = Math.floor(
    (indicatorLength - 1) * ((temperature - minTemp) / (maxTemp - minTemp))
  )

  let indicatorElements = []
  for (let i = 0; i < indicatorLength; i++) {
    indicatorElements.push(i === position ? '|' : ' ')
  }

  const indicatorString = indicatorElements.join('')

  const getTemperatureStyle = () => {
    if (temperature > 24) {
      return styles.textOrange
    } else if (temperature > 15) {
      return styles.textYellow
    } else if (temperature > 6) {
      return styles.textGreen
    } else {
      return styles.textBlue
    }
  }

  return <Text style={getTemperatureStyle()}>{indicatorString}</Text>
}

const styles = StyleSheet.create({
  textOrange: { color: 'orange' },
  textGreen: { color: 'green' },
  textYellow: { color: 'yellow' },
  textBlue: { color: 'blue' }
})

export default TemperatureIndicator
