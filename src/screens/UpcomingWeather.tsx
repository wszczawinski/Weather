import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { IHourly, IForecast } from '../types'
import { ForecastItem } from '../components'

const EmptyForecastList = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  )
}

function UpcomingWeather({ weatherForecast }: { weatherForecast: IHourly }) {
  const forecastElements = weatherForecast?.time?.map((item, index) => {
    return {
      time: item,
      temperature_2m: weatherForecast?.temperature_2m
        ? weatherForecast?.temperature_2m[index]
        : 0,
      windspeed_10m: weatherForecast?.windspeed_10m
        ? weatherForecast?.windspeed_10m[index]
        : 0
    }
  })

  const renderItem = ({ item: forecast }: ListRenderItemInfo<IForecast>) => {
    return (
      <ForecastItem
        time={forecast.time}
        windspeed_10m={forecast.windspeed_10m}
        temperature_2m={forecast.temperature_2m}
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
    height: 10
  }
})

export default UpcomingWeather
