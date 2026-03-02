import React from "react";
import { ASSETS } from "../utils/constants";
import {
  getWeatherAsset,
  formatShortDay,
} from "../utils/helpers";

export default function Forecast({ weather, isLoading, convertTemp }) {
  return (
    <div className="panel forecast-panel">
      <h2 className="panel-title">7-Day Forecast</h2>

      {isLoading ? (
        <div className="loading-center">
          <img
            src={ASSETS.iconLoading}
            alt="Loading..."
            className="spinner"
            style={{
              width: "2rem",
              height: "2rem",
              filter: "var(--icon-filter)",
              opacity: 0.5,
            }}
          />
        </div>
      ) : (
        <div className="forecast-list">
          {weather?.daily?.time.map((time, index) => {
            const maxTemp = convertTemp(
              weather.daily.temperature_2m_max[index],
            );
            const minTemp = convertTemp(
              weather.daily.temperature_2m_min[index],
            );
            const { img: dailyImg, desc: dailyDesc } = getWeatherAsset(
              weather.daily.weather_code[index],
            );
            const isToday = index === 0;

            return (
              <div
                key={time}
                className={`forecast-row ${isToday ? "is-today" : ""}`}
              >
                <span className="fc-day">
                  {isToday ? "Today" : formatShortDay(time)}
                </span>

                <div className="fc-center">
                  <img src={dailyImg} alt={dailyDesc} className="fc-icon" />
                  <span className="fc-desc">{dailyDesc}</span>
                </div>

                <div className="fc-temps">
                  <span className="fc-max">{maxTemp}°</span>
                  <span className="fc-min">{minTemp}°</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
