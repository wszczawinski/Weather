export interface Forecast {
  time: string;
  temperature_2m: number;
  windspeed_10m: number;
  weatherCode: number;
  pressure: number;
}

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: Current;
  current_units: CurrentUnits;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Current {
  cloud_cover: number;
  interval: number;
  is_day: number;
  precipitation: number;
  relative_humidity_2m: number;
  surface_pressure: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}
export interface CurrentUnits {
  cloud_cover: string;
  interval: string;
  is_day: string;
  precipitation: string;
  relative_humidity_2m: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
}

export interface HourlyUnits {
  cloudcover: string;
  precipitation: string;
  rain: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  weathercode: string;
  wind_direction_10m: string;
  windspeed_10m: string;
}

export interface Hourly {
  cloudcover: number[]
  precipitation: number[]
  rain: number[]
  surface_pressure: number[]
  temperature_2m: number[]
  time: string[]
  weathercode: number[]
  wind_direction_10m: number[]
  windspeed_10m: number[]
}

interface Daily {
  daylight_duration: number[];
  sunrise: string[];
  sunset: string[];
  time: string[];
};

export interface DailyUnits {
  daylight_duration: string;
  sunrise: string;
  sunset: string;
  time: string;
};
