import React from "react";

export default function WeatherDetails({
  weather,
  convertTemp,
  convertWind,
  tempUnit,
  windUnit,
}) {
  if (!weather) return null;
  return (
    <div className="panel">
      <h2 className="panel-title">Current Details</h2>
      <div className="details-grid">
        <div className="detail-card">
          <p className="detail-label">Feels Like</p>
          <p className="detail-value">
            {convertTemp(weather.current.apparent_temperature)}
            <span className="detail-unit">{tempUnit}</span>
          </p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Wind</p>
          <p className="detail-value">
            {convertWind(weather.current.wind_speed_10m)}{" "}
            <span className="detail-unit">{windUnit}</span>
          </p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">
            {weather.current.relative_humidity_2m}
            <span className="detail-unit">%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

