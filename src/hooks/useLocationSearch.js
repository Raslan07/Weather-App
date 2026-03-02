import { useState, useEffect } from "react";
import { weatherApi } from "../api/weatherApi";

export function useLocationSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const fetchLocations = async () => {
      setIsSearching(true);
      setError(null);
      try {
        const data = await weatherApi.searchLocation(searchQuery);
        setSearchResults(data.results || []);
      } catch (err) {
        setError("Failed to fetch location results.");
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(fetchLocations, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    error,
  };
}
