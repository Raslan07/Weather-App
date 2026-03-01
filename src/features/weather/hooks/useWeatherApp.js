import { useEffect, useMemo, useState } from 'react'
import { fetchForecast, searchLocations } from '../api/openMeteoClient'
import { getLocationLabel, pickHourlyEntriesByDay } from '../utils/formatters'

const DEFAULT_LOCATION = {
  name: 'Berlin',
  country: 'Germany',
  latitude: 52.5244,
  longitude: 13.4105,
  timezone: 'Europe/Berlin',
}

export function useWeatherApp() {
  const [query, setQuery] = useState('')
  const [unitSystem, setUnitSystem] = useState('metric')
  const [searchResults, setSearchResults] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)
  const [forecast, setForecast] = useState(null)
  const [selectedDay, setSelectedDay] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInitialForecast() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchForecast({
          latitude: DEFAULT_LOCATION.latitude,
          longitude: DEFAULT_LOCATION.longitude,
          timezone: DEFAULT_LOCATION.timezone,
          unitSystem,
        })
        setForecast(data)
        setSelectedDay(data.daily.time[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadInitialForecast()
  }, [unitSystem])

  async function handleSearch(event) {
    event.preventDefault()

    if (!query.trim()) return

    setSearchLoading(true)
    setError('')

    try {
      const results = await searchLocations(query.trim())
      setSearchResults(results)
      if (!results.length) {
        setError('No matching locations found. Try another city.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSearchLoading(false)
    }
  }

  async function handleLocationSelect(location) {
    setSelectedLocation(location)
    setSearchResults([])
    setQuery('')
    setLoading(true)
    setError('')

    try {
      const data = await fetchForecast({
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
        unitSystem,
      })
      setForecast(data)
      setSelectedDay(data.daily.time[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const dailyForecast = useMemo(() => {
    if (!forecast?.daily) return []

    return forecast.daily.time.map((day, index) => ({
      day,
      tempMax: forecast.daily.temperature_2m_max[index],
      tempMin: forecast.daily.temperature_2m_min[index],
      weatherCode: forecast.daily.weather_code[index],
      precipitation: forecast.daily.precipitation_sum[index],
    }))
  }, [forecast])

  const hourlyForecast = useMemo(() => {
    if (!forecast || !selectedDay) return []
    return pickHourlyEntriesByDay(forecast.hourly, selectedDay, forecast.timezone)
  }, [forecast, selectedDay])

  return {
    query,
    setQuery,
    unitSystem,
    setUnitSystem,
    searchResults,
    selectedLocation,
    forecast,
    dailyForecast,
    hourlyForecast,
    selectedDay,
    setSelectedDay,
    loading,
    searchLoading,
    error,
    handleSearch,
    handleLocationSelect,
    getLocationLabel,
  }
}
