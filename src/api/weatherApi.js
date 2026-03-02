export const weatherApi = {
  searchLocation: async (query) => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
    );
    if (!res.ok) throw new Error("Search service unavailable");
    return res.json();
  },
  getForecast: async (lat, lon) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
    );
    if (!res.ok) throw new Error("Failed to load weather data");
    return res.json();
  },
};
