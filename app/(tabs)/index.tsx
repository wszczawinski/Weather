import { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { SafeAreaView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WeatherIcon } from "@/components/WeatherIcon";
import { LocationContext, LocationStatus } from "@/contexts/LocationContext";
import { NoDataScreen } from "@/components/NoDataScreen";

export default function CurrentWeather() {
  const { location, status: locationStatus } = useContext(LocationContext);

  const {
    data: weather,
    isError,
  } = useWeatherQuery({
    latitude: location.latitude,
    longitude: location.longitude,
    enabled: locationStatus === LocationStatus.READY
  })

  if (!weather || isError) {
    return <NoDataScreen />
  }

  const { current_weather: currentWeather, elevation } = weather;
  const styles = style(currentWeather.winddirection)

  return (
    <SafeAreaView style={styles.wrapper}>
      <ThemedView style={styles.container}>
        <WeatherIcon
          weatherCode={currentWeather.weathercode}
          iconSize={100}
          isDay={!!currentWeather.is_day}
        />
        <ThemedText style={styles.temp}>
          {currentWeather.temperature} {' °C'}
        </ThemedText>
        <ThemedView style={styles.wind}>
          <Feather
            style={styles.windDirection}
            name={'arrow-up-circle'}
            size={30}
            color={'white'}
          />
          <ThemedText style={styles.feels}>
            {currentWeather.windspeed} {' m/s'}
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.info}>
          {elevation} {' m'}
        </ThemedText>
      </ThemedView>
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
    },
  })
