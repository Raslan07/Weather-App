const GEOCODE_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast'

const WEATHER_PARAMS = {
  current:
    'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
  hourly: 'temperature_2m,weather_code',
  daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
}

export async function searchLocations(query) {
  const params = new URLSearchParams({
    name: query,
    count: '6',
    language: 'en',
    format: 'json',
  })

  const response = await fetch(`${GEOCODE_ENDPOINT}?${params}`)

  if (!response.ok) {
    throw new Error('Unable to search locations right now.')
  }

  const data = await response.json()
  return data.results ?? []
}

export async function fetchForecast({ latitude, longitude, timezone = 'auto', unitSystem }) {
  const isImperial = unitSystem === 'imperial'

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone,
    forecast_days: '7',
    current: WEATHER_PARAMS.current,
    daily: WEATHER_PARAMS.daily,
    hourly: WEATHER_PARAMS.hourly,
    temperature_unit: isImperial ? 'fahrenheit' : 'celsius',
    wind_speed_unit: isImperial ? 'mph' : 'kmh',
    precipitation_unit: isImperial ? 'inch' : 'mm',
  })

  const response = await fetch(`${WEATHER_ENDPOINT}?${params}`)

  if (!response.ok) {
    throw new Error('Unable to fetch weather right now.')
  }

  return response.json()
}
