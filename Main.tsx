import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'

import * as Location from 'expo-location'

import { Tabs } from './src/layout'
import { IWeather } from './src/types'
import { useEffect, useState } from 'react'
import { LocationObject } from 'expo-location'

function Main() {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest
      })
      setLocation(location)
    })()
  }, [])

  const feachWeather = async (
    latitude: number,
    longitude: number
  ): Promise<IWeather> => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,rain,cloudcover,windspeed_10m&current_weather=true`
    const res = await fetch(url)
    return res.json()
  }

  const {
    data: weather,
    isLoading,
    isError
  } = useQuery({
    queryFn: () =>
      location?.coords.latitude && location?.coords?.longitude
        ? feachWeather(location?.coords.latitude, location?.coords?.longitude)
        : null,
    queryKey: ['weather'],
    enabled: !!location
  })

  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <ActivityIndicator size={'large'} color={'white'} />
      </SafeAreaView>
    )
  }

  return !weather || isError || error ? (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>{error || 'No data'} </Text>
    </SafeAreaView>
  ) : (
    <NavigationContainer>
      <Tabs weather={weather} />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    color: 'white'
  }
})

export default Main
