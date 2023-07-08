import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import { IForecast } from '../types'
import WeatherIcon from './WeatherIcon'
import TemperatureIndicator from './TemperatureIndicator'

interface IForecastItem extends IForecast {
  minTemp: number
  maxTemp: number
}

const ForecastItem = ({
  time,
  temperature_2m,
  windspeed_10m,
  weatherCode,
  minTemp,
  maxTemp
}: IForecastItem) => {
  return (
    <View style={styles.forecastItem}>
      {moment(time).format('HH') === '00' && (
        <Text style={[styles.day, styles.textWhite]}>
          {moment(time).format('dddd   DD MMMM')}
        </Text>
      )}
      <View style={styles.forecastInfo}>
        <View style={styles.forecastInfoElement}>
          <WeatherIcon iconSize={16} weatherCode={weatherCode} />
          <Text style={[styles.textWhite, styles.hour]}>
            {moment(time).format('HH')} {'h'}
          </Text>
          <View style={styles.indicator}>
            <TemperatureIndicator
              maxTemp={maxTemp}
              minTemp={minTemp}
              temperature={temperature_2m}
            />
          </View>
        </View>

        <View style={styles.forecastInfoElement}>
          <Text style={[styles.temp, styles.textWhite]}>
            {temperature_2m}
            {' °C'}
          </Text>
          <Text style={[styles.wind, styles.textWhite]}>
            {windspeed_10m}
            {' m/s'}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  forecastItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  indicator: {
    borderColor: 'grey',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  forecastInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  forecastInfoElement: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  temp: {
    width: 50,
    display: 'flex'
  },
  wind: {
    width: 55,
    display: 'flex'
  },
  hour: {
    width: 30
  },
  day: {
    display: 'flex',
    alignSelf: 'center'
  },
  textWhite: {
    color: 'white'
  },
  textGrey: {
    color: 'grey'
  }
})

export default ForecastItem
