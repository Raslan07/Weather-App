import { getWeatherVisuals } from '../utils/weatherCodeMap'
import { getDayLabel } from '../utils/formatters'
import { useWeatherApp } from '../hooks/useWeatherApp'

function SearchForm({ query, setQuery, handleSearch, searchLoading }) {
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <label htmlFor="city-search" className="search-label">
        How&apos;s the sky looking today?
      </label>
      <div className="search-row">
        <input
          id="city-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a city, e.g., New York"
          aria-label="Search for a city"
        />
        <button className="btn-primary" type="submit" disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

function UnitToggle({ unitSystem, setUnitSystem }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Switch measurement units">
      <p>Units</p>
      <button
        type="button"
        className={unitSystem === 'metric' ? 'chip is-active' : 'chip'}
        onClick={() => setUnitSystem('metric')}
      >
        Metric
      </button>
      <button
        type="button"
        className={unitSystem === 'imperial' ? 'chip is-active' : 'chip'}
        onClick={() => setUnitSystem('imperial')}
      >
        Imperial
      </button>
    </div>
  )
}

function CurrentWeather({ forecast, selectedLocation, getLocationLabel, unitSystem }) {
  if (!forecast?.current) return null

  const { icon, label } = getWeatherVisuals(forecast.current.weather_code)
  const tempUnit = unitSystem === 'imperial' ? '°F' : '°C'
  const windUnit = unitSystem === 'imperial' ? 'mph' : 'km/h'
  const precipitationUnit = unitSystem === 'imperial' ? 'in' : 'mm'

  return (
    <section className="panel current" aria-live="polite">
      <div className="current-main">
        <img src={icon} alt={label} width="64" height="64" />
        <div>
          <h1>{Math.round(forecast.current.temperature_2m)}{tempUnit}</h1>
          <p>{label}</p>
          <p className="location">{getLocationLabel(selectedLocation)}</p>
        </div>
      </div>
      <dl className="metrics-grid">
        <div>
          <dt>Feels like</dt>
          <dd>{Math.round(forecast.current.apparent_temperature)}{tempUnit}</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{forecast.current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{Math.round(forecast.current.wind_speed_10m)} {windUnit}</dd>
        </div>
        <div>
          <dt>Precipitation</dt>
          <dd>{forecast.current.precipitation} {precipitationUnit}</dd>
        </div>
      </dl>
    </section>
  )
}

function DailyForecast({ days, selectedDay, setSelectedDay, unitSystem }) {
  const tempUnit = unitSystem === 'imperial' ? '°F' : '°C'

  return (
    <section className="panel">
      <h2>Daily forecast</h2>
      <div className="day-grid">
        {days.map((day) => {
          const { icon, label } = getWeatherVisuals(day.weatherCode)
          return (
            <button
              type="button"
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={day.day === selectedDay ? 'day-card is-active' : 'day-card'}
              aria-pressed={day.day === selectedDay}
            >
              <p>{getDayLabel(day.day)}</p>
              <img src={icon} alt={label} width="36" height="36" />
              <p>{Math.round(day.tempMax)}{tempUnit} / {Math.round(day.tempMin)}{tempUnit}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function HourlyForecast({ hours, unitSystem }) {
  const tempUnit = unitSystem === 'imperial' ? '°F' : '°C'

  return (
    <section className="panel">
      <h2>Hourly forecast</h2>
      <div className="hour-row" role="list">
        {hours.map((hour) => {
          const { icon, label } = getWeatherVisuals(hour.weatherCode)
          return (
            <article key={hour.time} className="hour-card" role="listitem">
              <p>{hour.label}</p>
              <img src={icon} alt={label} width="30" height="30" />
              <p>{Math.round(hour.temperature)}{tempUnit}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function WeatherApp() {
  const {
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
  } = useWeatherApp()

  return (
    <main className="weather-layout">
      <div className="top-bar">
        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          searchLoading={searchLoading}
        />
        <UnitToggle unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
      </div>

      {searchResults.length > 0 && (
        <section className="panel search-results" aria-label="Search results">
          {searchResults.map((location) => (
            <button
              key={`${location.id}-${location.latitude}-${location.longitude}`}
              type="button"
              className="result-item"
              onClick={() => handleLocationSelect(location)}
            >
              {getLocationLabel(location)}
            </button>
          ))}
        </section>
      )}

      {error && <p className="status error">{error}</p>}
      {loading && <p className="status">Loading weather...</p>}

      {!loading && forecast && (
        <>
          <div className="summary-grid">
            <CurrentWeather
              forecast={forecast}
              selectedLocation={selectedLocation}
              getLocationLabel={getLocationLabel}
              unitSystem={unitSystem}
            />
            <DailyForecast
              days={dailyForecast}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              unitSystem={unitSystem}
            />
          </div>
          <HourlyForecast hours={hourlyForecast} unitSystem={unitSystem} />

          <footer className="attribution">
            Challenge by{' '}
            <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by{' '}
            <a href="#">Codex</a>.
          </footer>
          <CurrentWeather
            forecast={forecast}
            selectedLocation={selectedLocation}
            getLocationLabel={getLocationLabel}
            unitSystem={unitSystem}
          />
          <DailyForecast
            days={dailyForecast}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            unitSystem={unitSystem}
          />
          <HourlyForecast hours={hourlyForecast} unitSystem={unitSystem} />

      <footer className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by{' '}
        <a href="#">Codex</a>.
      </footer>
        </>
      )}
    </main>
  )
}
