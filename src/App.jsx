import React, { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import Header from "./components/Header";
import ErrorBanner from "./components/ErrorBanner";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import "./index.css";

export default function App() {
  const [isMetric, setIsMetric] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location, setLocation] = useState({
    name: "London",
    country: "United Kingdom",
    lat: 51.5085,
    lon: -0.1257,
  });

  const { weather, isLoading, error, refetch } = useWeather(location);

  const handleLocationSelect = (loc) => {
    setLocation({
      name: loc.name,
      country: loc.country || loc.admin1 || "",
      lat: loc.latitude,
      lon: loc.longitude,
    });
  };

  const convertTemp = (tempC) =>
    isMetric ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);
  const convertWind = (speedKmh) =>
    isMetric ? Math.round(speedKmh) : Math.round(speedKmh * 0.621371);
  const tempUnit = isMetric ? "°C" : "°F";
  const windUnit = isMetric ? "km/h" : "mph";

  return (
    <div
      className={`app-container ${isDarkMode ? "theme-dark" : "theme-light"}`}
    >
      <div className="content-wrapper">
        <Header
          isMetric={isMetric}
          toggleUnits={() => setIsMetric(!isMetric)}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          onSelectLocation={handleLocationSelect}
        />

        <ErrorBanner error={error} onRetry={refetch} />

        {!error && (
          <main className="main-grid">
            <div className="col-left">
              <CurrentWeather
                location={location}
                weather={weather}
                isLoading={isLoading}
                convertTemp={convertTemp}
                tempUnit={tempUnit}
              />
              {!isLoading && (
                <WeatherDetails
                  weather={weather}
                  convertTemp={convertTemp}
                  convertWind={convertWind}
                  tempUnit={tempUnit}
                  windUnit={windUnit}
                />
              )}
            </div>
            <div className="col-right">
              <Forecast
                weather={weather}
                isLoading={isLoading}
                convertTemp={convertTemp}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
