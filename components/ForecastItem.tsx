import moment from 'moment'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { WeatherIcon } from './WeatherIcon'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { Indicator } from './Indicator'
import { Forecast } from '@/types'

interface ForecastItemProps {
  forecast: Forecast
  minTemp: number
  maxTemp: number
}

export const ForecastItem = ({
  forecast,
  minTemp,
  maxTemp,
}: ForecastItemProps) => {
  const { isDay, cloudcover, precipitation, surface_pressure, temperature_2m, time, weatherCode, windspeed_10m, wind_direction_10m } = forecast;
  const isToday = moment(time).isSame(new Date(), 'day')
  const isCurrentHour = isToday && moment().isSame(time, "hour");
  console.log("🚀 -> isCurrentHour:", isCurrentHour)

  const getDay = () => isToday ? 'Today' : moment(time).format('ddd   DD MMMM')
  const getTime = () => `${moment(time).format('HH')}`

  const stylesWind = styleWind(wind_direction_10m)

  return (
    <ThemedView style={styles.forecastItem}>
      {moment(time).format('HH') === '00' &&
        <ThemedView style={styles.forecastInfo}>
          <ThemedView style={styles.forecastInfoElement}>
            <ThemedText style={styles.day}> {getDay()} </ThemedText>
          </ThemedView>

          <ThemedView style={styles.forecastInfoElement}>
            <ThemedText type='small' style={[styles.info, styles.mono]}>
              {`°C`}
            </ThemedText>
            <ThemedText type='small' style={[styles.info, styles.mono]}>
              {`hPa`}
            </ThemedText>
            <ThemedText type='small' style={[styles.infoRain, styles.mono]}>
              {`mm`}
            </ThemedText>
            <ThemedText type='small' style={[styles.info, styles.mono]}>
              {`%`}
            </ThemedText>
            <ThemedText type='small' style={[styles.infoWind, styles.mono]}>
              {`km/h`}
            </ThemedText>
          </ThemedView>
        </ThemedView>}

      <ThemedView style={styles.forecastInfo}>
        <ThemedView style={styles.forecastInfoElement}>
          <WeatherIcon iconSize={18} weatherCode={weatherCode} isDay={isDay} />

          <ThemedText
            type='small'
            style={[isCurrentHour ? styles.hourNow : styles.hour, styles.mono]}>
            {getTime()}
          </ThemedText>

          <Indicator max={maxTemp} min={minTemp} value={temperature_2m} />
        </ThemedView>

        <ThemedView style={styles.forecastInfoElement}>
          <ThemedText type='small' style={[styles.info, styles.mono]}>
            {Math.round(temperature_2m)}
          </ThemedText>
          <ThemedText type='small' style={[styles.info, styles.mono]}>
            {Math.round(surface_pressure)}
          </ThemedText>
          <ThemedText type='small' style={[styles.infoRain, styles.mono]}>
            {Math.round(precipitation)}
          </ThemedText>
          <ThemedText type='small' style={[styles.info, styles.mono]}>
            {Math.round(cloudcover)}
          </ThemedText>

          <ThemedText type='small' style={[styles.infoWind, styles.mono]}>
            <AntDesign style={stylesWind.windDirection} name="arrowup"  size={12} color="white" />
            {Math.round(windspeed_10m)}
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
  info: {
    width: 35,
    display: 'flex',
    justifyContent: "flex-end"
  },
  infoWind: {
    width: 40,
    paddingLeft: 10,
    display: 'flex',
    justifyContent: "space-between"
  },
  infoRain: {
    width: 30,
    display: 'flex',
    justifyContent: "flex-end"
  },
  hour: {
    width: 16,
  },
  hourNow: {
    width: 16,
    color: "red"
  },
  day: {
    display: 'flex',
    alignSelf: 'center'
  },
  mono: {
    fontFamily: "monospace"
  }
})

const styleWind = (winddirection: number) =>
  StyleSheet.create({
    windDirection: {
      transform: [{ rotate: `${winddirection}deg` }],
    },
  })
