import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
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
  maxTemp,
  pressure
}: IForecastItem) => {
  const getDay = () =>
    moment(time).format('HH') === '00' && (
      <Text style={[styles.day, styles.textWhite]}>
        {moment(time).isSame(new Date(), 'day')
          ? 'Today'
          : moment(time).format('dddd   DD MMMM')}
      </Text>
    )

  const getTime = () => `${moment(time).format('HH')} h`

  return (
    <View style={styles.forecastItem}>
      {getDay()}
      <View style={styles.forecastInfo}>
        <View style={styles.forecastInfoElement}>
          <WeatherIcon iconSize={16} weatherCode={weatherCode} />

          <Text style={[styles.textWhite, styles.hour]}>{getTime()}</Text>

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
            {` ${Math.round(temperature_2m)} °C`}
          </Text>
          <Text style={[styles.pressure, styles.textWhite]}>
            {` ${Math.round(pressure)} hPa`}
          </Text>
          <Text style={[styles.wind, styles.textWhite]}>
            <Feather name={'wind'} size={16} color="white" />
            {` ${Math.round(windspeed_10m)} m/s`}
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
    gap: 10,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 500
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
    gap: 5,
    alignItems: 'center'
  },
  temp: {
    width: 45,
    display: 'flex'
  },
  pressure: {
    width: 65,
    display: 'flex'
  },
  wind: {
    width: 65,
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
