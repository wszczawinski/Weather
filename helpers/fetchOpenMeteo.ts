import { Weather } from '@/types'

export const fetchOpenMeteo = async (
  latitude: number,
  longitude: number
): Promise<Weather> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,surface_pressure,precipitation,rain,weathercode,cloudcover,windspeed_10m,wind_direction_10m&current=cloud_cover,weather_code,is_day,temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,surface_pressure,wind_direction_10m&daily=sunrise,sunset,daylight_duration&timezone=auto`
  const res = await fetch(url)
  return res.json()
}
