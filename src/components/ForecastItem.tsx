import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import { IForecast } from '../types'
import WeatherIcon from './WeatherIcon'

const ForecastItem = ({
  time,
  temperature_2m,
  windspeed_10m,
  weatherCode
}: IForecast) => {
  return (
    <View style={styles.forecastItem}>
      <View style={styles.element}>
        <WeatherIcon iconSize={20} weatherCode={weatherCode} />
        <Text style={styles.forecastText}>
          {moment(time).format('ddd')} {moment(time).format('HH')}
        </Text>
      </View>
      <Text style={styles.forecastText}>
        {temperature_2m}
        {' °C'}
      </Text>
      <Text style={styles.forecastText}>
        {windspeed_10m}
        {' m/s'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  forecastItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  forecastText: {
    color: 'white',
    width: 60,
    display: 'flex'
  },
  element: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
})

export default ForecastItem
