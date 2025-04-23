import { useContext } from "react";
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, View } from "react-native";
import moment from "moment";

import { LocationContext, LocationStatus } from "@/contexts/LocationContext";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { NoDataScreen } from "@/components/NoDataScreen";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ForecastItem } from "@/components/ForecastItem";
import { Forecast } from '@/types';

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

  const { hourly, daily } = weather;

  const getIsDay = (time: string, index: number) => moment(time).isAfter(daily.sunrise[index]) && moment(time).isBefore(daily.sunset[index])

  const forecastElements: Forecast[] = hourly.time.map((item, index) => {
    return {
      time: item,
      isDay: getIsDay(item, Math.floor(index / 24)),
      temperature_2m: hourly.temperature_2m[index],
      windspeed_10m: hourly.windspeed_10m[index],
      weatherCode: hourly.weathercode[index],
      surface_pressure: hourly.surface_pressure[index],
      cloudcover: hourly.cloudcover[index],
      precipitation: hourly.precipitation[index],
      rain: hourly.rain[index],
      wind_direction_10m: hourly.wind_direction_10m[index],
    }
  })

  const renderItem = ({ item: forecast }: ListRenderItemInfo<Forecast>) => {
    return (
      <ForecastItem
        forecast={forecast}
        minTemp={Math.min(...hourly.temperature_2m)}
        maxTemp={Math.max(...hourly.temperature_2m)}
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
