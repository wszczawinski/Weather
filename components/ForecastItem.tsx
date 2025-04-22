import moment from 'moment'
import { StyleSheet } from 'react-native'

import { Indicator } from './Indicator'
import { WeatherIcon } from './WeatherIcon'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { Forecast } from '@/types'

interface ForecastItemProps extends Forecast {
  minTemp: number
  maxTemp: number
}

export const ForecastItem = ({
  time,
  temperature_2m,
  windspeed_10m,
  weatherCode,
  minTemp,
  maxTemp,
  pressure
}: ForecastItemProps) => {
  const getDay = () => (moment(time).isSame(new Date(), 'day') ? 'Today' : moment(time).format('dddd   DD MMMM'))
  const getTime = () => `${moment(time).format('HH')}h`

  return (
    <ThemedView style={styles.forecastItem}>
      {moment(time).format('HH') === '00' && <ThemedText style={styles.day}> {getDay()} </ThemedText>}

      <ThemedView style={styles.forecastInfo}>
        <ThemedView style={styles.forecastInfoElement}>
          <WeatherIcon iconSize={16} weatherCode={weatherCode} />

          <ThemedText type='small' style={[styles.hour, styles.mono]}>{getTime()}</ThemedText>

          <Indicator max={maxTemp} min={minTemp} value={temperature_2m} />
        </ThemedView>

        <ThemedView style={styles.forecastInfoElement}>
          <ThemedText type='small' style={[styles.temp, styles.mono]}>
            {`${Math.round(temperature_2m)}°C`}
          </ThemedText>
          <ThemedText type='small' style={[styles.pressure, styles.mono]}>
            {`${Math.round(pressure)}hPa`}
          </ThemedText>
          <ThemedText type='small' style={[styles.wind, styles.mono]}>
            {`${Math.round(windspeed_10m)}km/h`}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  forecastItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 400,
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
    width: 40,
    display: 'flex',
    justifyContent: "flex-end"
  },
  pressure: {
    width: 55,
    display: 'flex',
    justifyContent: "flex-end"
  },
  wind: {
    width: 54,
    display: 'flex',
    justifyContent: "flex-end"
  },
  hour: {
    width: 24,
  },
  day: {
    display: 'flex',
    alignSelf: 'center'
  },
  mono: {
    fontFamily: "monospace"
  }
})
