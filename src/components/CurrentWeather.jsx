import React from "react";
import { ASSETS } from "../utils/constants";
import {
  getWeatherAsset,
  formatFullDate,
} from "../utils/helpers";

export default function CurrentWeather({
  location,
  weather,
  isLoading,
  convertTemp,
  tempUnit,
}) {
  const currentCode = weather?.current?.weather_code;
  const { desc: weatherDesc, img: currentWeatherImg } =
    getWeatherAsset(currentCode);

  return (
    <div className="today-card">
      <picture className="today-bg">
        <source media="(min-width: 768px)" srcSet={ASSETS.bgLarge} />
        <img src={ASSETS.bgSmall} alt="Background pattern" />
      </picture>

      {isLoading ? (
        <div className="loading-center">
          <img
            src={ASSETS.iconLoading}
            alt="Loading..."
            className="spinner white"
            style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
          />
          <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
            Loading local weather...
          </span>
        </div>
      ) : (
        <div className="today-content">
          <div className="today-header">
            <div>
              <h1 className="today-city">{location.name}</h1>
              <p className="today-country">{location.country}</p>
            </div>
            <p className="today-date">
              {formatFullDate(weather?.current?.time)}
            </p>
          </div>

          <div className="today-footer">
            <div className="temp-group">
              <span className="temp-value">
                {convertTemp(weather?.current?.temperature_2m)}
              </span>
              <span className="temp-unit">{tempUnit}</span>
            </div>
            <div className="weather-icon-group">
              <img
                src={currentWeatherImg}
                alt={weatherDesc}
                className="weather-icon-large"
              />
              <p className="weather-desc">{weatherDesc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
