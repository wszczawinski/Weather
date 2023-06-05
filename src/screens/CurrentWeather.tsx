import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ICurrentWeather } from '../types'

const CurrentWeather = ({
  currentWeather
}: {
  currentWeather: ICurrentWeather
}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Feather name="sun" size={100} color="white" />
        <Text style={styles.temp}>{currentWeather.temperature}</Text>
        <Text style={styles.feels}>{currentWeather.windspeed}</Text>
        <Text style={styles.highLow}>{currentWeather.winddirection}</Text>
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.info}>It's sunny</Text>
        <Text style={styles.info}>Go out!</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  temp: {
    color: 'white',
    fontSize: 50
  },
  feels: {
    color: 'white',
    fontSize: 30
  },
  highLow: {
    color: 'white',
    fontSize: 30
  },
  additionalInfo: {
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 40
  },
  info: {
    color: 'white',
    fontSize: 36
  }
})

export default CurrentWeather
