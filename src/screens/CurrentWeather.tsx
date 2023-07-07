import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { IWeather } from '../types'
import { WeatherIcon } from '../components'

const CurrentWeather = ({ weather }: { weather: IWeather }) => {
  const { current_weather: currentWeather, elevation } = weather

  const styles = style(currentWeather.winddirection)
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <WeatherIcon
          weatherCode={currentWeather.weathercode}
          iconSize={100}
          isDay={!!currentWeather.is_day}
        />
        <Text style={styles.temp}>
          {currentWeather.temperature} {' °C'}
        </Text>
        <View style={styles.wind}>
          <Feather
            style={styles.windDirection}
            name={'arrow-up-circle'}
            size={30}
            color={'white'}
          />
          <Text style={styles.feels}>
            {currentWeather.windspeed} {' m/s'}
          </Text>
        </View>
        <Text style={styles.info}>
          {elevation} {' m'}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const style = (winddirection: number) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: 'black'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },
    temp: {
      color: 'white',
      fontSize: 50
    },
    feels: {
      color: 'white',
      fontSize: 30,
      paddingLeft: 20
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
      fontSize: 20
    },
    wind: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    windDirection: {
      transform: [{ rotate: `${winddirection}deg` }],
      paddingRight: 10
    }
  })

export default CurrentWeather
