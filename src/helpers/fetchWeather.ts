import { IWeather } from '../types'

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<IWeather> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,surface_pressure,precipitation_probability,rain,weathercode,cloudcover,windspeed_10m&current_weather=true`
  const res = await fetch(url)
  return res.json()
}
