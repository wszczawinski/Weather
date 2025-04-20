import { useContext } from "react";
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, View } from "react-native";

import { LocationContext, LocationStatus } from "@/contexts/LocationContext";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { NoDataScreen } from "@/components/NoDataScreen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ForecastItem } from "@/components/ForecastItem";
import { Forecast } from '@/types'

const EmptyForecastList = () => {
  return (
    <ThemedView>
      <ThemedText>Empty</ThemedText>
    </ThemedView>
  )
}

export default function ForecastTab() {
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

  const { hourly } = weather;

  const forecastElements = hourly.time.map((item, index) => {
    return {
      time: item,
      temperature_2m: hourly.temperature_2m[index],
      windspeed_10m: hourly.windspeed_10m[index],
      weatherCode: hourly.weathercode[index],
      pressure: hourly.surface_pressure[index]
    }
  })

  const renderItem = ({ item: forecast }: ListRenderItemInfo<Forecast>) => {
    return (
      <ForecastItem
        time={forecast.time}
        windspeed_10m={forecast.windspeed_10m}
        temperature_2m={forecast.temperature_2m}
        weatherCode={forecast.weatherCode}
        minTemp={Math.min(...hourly.temperature_2m)}
        maxTemp={Math.max(...hourly.temperature_2m)}
        pressure={forecast.pressure}
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeWrapper}>
      <FlatList
        style={styles.forecastList}
        data={forecastElements}
        renderItem={renderItem}
        keyExtractor={(item) => item.time}
        ItemSeparatorComponent={() => (
          <View style={styles.forecastSeparatorItem} />
        )}
        ListEmptyComponent={<EmptyForecastList />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
    backgroundColor: 'black'
  },
  forecastList: {
    display: 'flex',
    paddingVertical: 0,
    marginBottom: 20,
    marginTop: 20
  },
  forecastSeparatorItem: {
    height: 8
  }
})
