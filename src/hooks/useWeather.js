import { useState, useEffect } from "react";
import { weatherApi } from "../api/weatherApi";

export function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getForecast(location.lat, location.lon);
      setWeather(data);
    } catch (err) {
      setError("Unable to connect to weather service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return { weather, isLoading, error, refetch: fetchWeather };
}
