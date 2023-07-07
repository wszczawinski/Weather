import { useEffect, useState } from 'react'
import { Accuracy, LocationObject } from 'expo-location'
import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'

import * as Location from 'expo-location'

import { Tabs } from './src/layout'
import { fetchWeather } from './src/helpers'

function Main() {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Accuracy.Lowest
      })
      setLocation(location)
    })()
  }, [])

  const {
    data: weather,
    isLoading,
    isError
  } = useQuery({
    queryFn: () =>
      location?.coords.latitude && location?.coords?.longitude
        ? fetchWeather(location?.coords.latitude, location?.coords?.longitude)
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
