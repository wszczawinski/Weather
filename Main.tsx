import { useEffect, useState } from 'react'
import { Accuracy, LocationObject } from 'expo-location'
import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Feather } from '@expo/vector-icons'

import * as Location from 'expo-location'

import { Tabs } from './src/layout'
import { fetchWeather } from './src/helpers'

function Main() {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [locationError, setLocationError] = useState<boolean | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setLocationError(true)
        return
      } else {
        setLocationError(false)
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

  if (isLoading || locationError === null) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <ActivityIndicator size={'large'} color={'white'} />
      </SafeAreaView>
    )
  }

  if (locationError) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.text}>
          {'Permission to access location was denied'}
        </Text>
        <Feather name={'alert-octagon'} size={24} color="white" />
        <Text style={styles.text}>{'Enable location to check weather'}</Text>
      </SafeAreaView>
    )
  }

  return !weather || isError ? (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.text}>
        {'Oops! Something went wrong with fetching the data'}
      </Text>
      <Feather name={'zap-off'} size={24} color="white" />
      <Text style={styles.text}>
        {'Please try again later or check your internet connection'}
      </Text>
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
    alignItems: 'center',
    flex: 1
  },
  text: {
    color: 'white',
    padding: 20
  }
})

export default Main
