const DAY_FORMATTER = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
const HOUR_FORMATTER = new Intl.DateTimeFormat('en-US', { hour: 'numeric' })

export function getLocationLabel(location) {
  const segments = [location.name, location.admin1, location.country].filter(Boolean)
  return segments.join(', ')
}

export function getDayLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return DAY_FORMATTER.format(date)
}

export function getHourLabel(dateTime) {
  return HOUR_FORMATTER.format(new Date(dateTime))
}

export function pickHourlyEntriesByDay(hourly, day, timezone) {
  if (!hourly?.time?.length) return []

  return hourly.time
    .map((time, index) => ({
      time,
      date: time.split('T')[0],
      temperature: hourly.temperature_2m[index],
      weatherCode: hourly.weather_code[index],
    }))
    .filter((entry) => entry.date === day)
    .map((entry) => ({
      ...entry,
      label: getHourLabel(entry.time, timezone),
    }))
}
