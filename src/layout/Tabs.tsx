import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { CurrentWeather, UpcomingWeather } from '../screens'
import { IWeather } from '../types'

const Tab = createMaterialBottomTabNavigator()

function Tabs({ weather }: { weather: IWeather }) {
  return (
    <Tab.Navigator
      barStyle={styles.tabBar}
      inactiveColor="gray"
      activeColor="white"
    >
      <Tab.Screen
        name={'Today'}
        children={() => <CurrentWeather weather={weather} />}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="coffee" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={'Forecast'}
        children={() =>
          weather.hourly && <UpcomingWeather weatherForecast={weather.hourly} />
        }
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart-2" size={22} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black'
  }
})

export default Tabs
