import { ASSETS } from "../utils/constants.js";

export const getWeatherAsset = (code) => {
  const { weather } = ASSETS;
  if (code === 0) return { desc: "Sunny", img: weather.sunny };
  if (code === 1 || code === 2)
    return { desc: "Partly Cloudy", img: weather.partlyCloudy };
  if (code === 3) return { desc: "Overcast", img: weather.overcast };
  if (code === 45 || code === 48) return { desc: "Fog", img: weather.fog };
  if (code >= 51 && code <= 57)
    return { desc: "Drizzle", img: weather.drizzle };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { desc: "Rain", img: weather.rain };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { desc: "Snow", img: weather.snow };
  if ([95, 96, 99].includes(code)) return { desc: "Storm", img: weather.storm };
  return { desc: "Unknown", img: weather.sunny };
};

export const formatFullDate = (dateString) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date(dateString || Date.now()));
};

export const formatShortDay = (dateString) => {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
    new Date(dateString),
  );
};
