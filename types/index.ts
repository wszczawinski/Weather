export interface Forecast {
  time: string
  temperature_2m: number
  windspeed_10m: number
  weatherCode: number
  pressure: number
}

export interface Weather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_weather: CurrentWeather
  hourly_units: HourlyUnits
  hourly: HourlyWeather
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  precipitation_probability: string
  rain: string
  cloudcover: string
  windspeed_10m: string
}

export interface HourlyWeather {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  rain: number[]
  cloudcover: number[]
  windspeed_10m: number[]
  weathercode: number[]
  surface_pressure: number[]
}
