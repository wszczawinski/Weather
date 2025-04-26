import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WeatherIcon } from "@/components/WeatherIcon";
import { NoDataScreen } from "@/components/NoDataScreen";
import { useWeatherQuery } from "@/hooks/useWeatherQuery";
import { DayNightProgress } from "@/components/DayNightProgress";
import { LocationContext, LocationStatus } from "@/contexts/LocationContext";

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

  const { current: currentWeather, elevation, current_units: units, daily } = weather;
  const styles = style(currentWeather.wind_direction_10m)

  return (
    <SafeAreaView style={styles.wrapper}>
      <DayNightProgress sunset={daily.sunset[0]} sunrise={daily.sunrise[0]} daylightDuration={daily.daylight_duration[0]} />

      <ThemedView style={styles.container}>
        <WeatherIcon
          weatherCode={currentWeather.weather_code}
          iconSize={100}
          isDay={!!currentWeather.is_day}
        />

        <ThemedText type="title_xl">
          {currentWeather.temperature_2m} {units.temperature_2m}
        </ThemedText>

        <ThemedView style={styles.row}>
          <Feather
            style={styles.windDirection}
            name={'arrow-up-circle'}
            size={32}
            color={'white'}
          />
          <ThemedText type="title">
            {currentWeather.wind_speed_10m} {units.wind_speed_10m}
          </ThemedText>
        </ThemedView>
        <ThemedText type="subtitle" style={styles.row}>
          <MaterialCommunityIcons name="elevation-rise" size={18} />
          {elevation} {'m'}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText style={styles.row}>
          <Entypo name="water" size={12} />
          {currentWeather.precipitation.toFixed(1)} {units.precipitation}

          <Entypo name="minus" size={10} color="gray" />

          <MaterialCommunityIcons name="weather-partly-cloudy" size={18} />
          {Math.round(currentWeather.cloud_cover)} {units.cloud_cover}

          <Entypo name="minus" size={10} color="gray" />

          <AntDesign name="dashboard" size={16} />
          {Math.round(currentWeather.surface_pressure)} {units.surface_pressure}
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  )
}

const style = (winddirection: number) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: "center"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      padding: 20,
      paddingBottom: 60
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      gap: 12
    },
    windDirection: {
      transform: [{ rotate: `${winddirection}deg` }],
    },
  })
