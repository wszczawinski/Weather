import { useQuery } from '@tanstack/react-query'
import { fetchOpenMeteo } from '../helpers/fetchOpenMeteo'

export interface useWeatherQueryProps {
    latitude: number,
    longitude: number,
    enabled: boolean
}

export const WEATHER_QUERY_KEY = "WEATHER";

export const useWeatherQuery = ({ latitude, longitude, enabled }: useWeatherQueryProps) => useQuery({
    queryFn: () => fetchOpenMeteo(latitude, longitude),
    queryKey: [WEATHER_QUERY_KEY, latitude, longitude],
    enabled
})
