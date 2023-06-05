import { StyleSheet, Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { IForecast } from '../types'

const ForecastItem = ({ time, temperature_2m, windspeed_10m }: IForecast) => (
  <View style={styles.forecastItem}>
    <Feather name={'cloud-rain'} size={20} color={'white'} />
    <Text style={styles.forecastText}>
      {time}: {temperature_2m}, {windspeed_10m}{' '}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  forecastItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:20
  },
  forecastText: {
    color: 'white',
    paddingLeft: 10
  }
})



export default ForecastItem
