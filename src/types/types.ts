export interface IForecast {
  time: string
  temperature_2m: number
  windspeed_10m: number
}
export interface IWeather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: ICurrentWeather
  hourly_units: IHourlyUnits
  hourly: IHourly
}
export interface ICurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}
export interface IHourlyUnits {
  time: string
  temperature_2m: string
  precipitation_probability: string
  rain: string
  cloudcover: string
  windspeed_10m: string
}
export interface IHourly {
  time?: string[] | null
  temperature_2m?: number[] | null
  precipitation_probability?: number[] | null
  rain?: number[] | null
  cloudcover?: number[] | null
  windspeed_10m?: number[] | null
}
