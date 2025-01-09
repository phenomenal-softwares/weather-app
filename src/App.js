import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen"; // Import the new loading screen component

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(true);

  const fetchWeather = async (city) => {
    const API_KEY = "21acc3d9f78ad2a36de3934b588099c4";
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      setLoading(true);

      // Fetch current weather
      const weatherResponse = await fetch(WEATHER_URL);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        alert(weatherData.message || "Failed to fetch weather data.");
        return;
      }

      // Fetch 5-day forecast
      const forecastResponse = await fetch(FORECAST_URL);
      const forecastData = await forecastResponse.json();

      if (!forecastResponse.ok) {
        alert(forecastData.message || "Failed to fetch forecast data.");
        return;
      }

      setWeather(weatherData);
      setForecast(forecastData.list.filter((_, index) => index % 8 === 0)); // Get data for every 24 hours
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return "default-bg";

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) return "sunny-bg";
    if (condition.includes("cloud")) return "cloudy-bg";
    if (condition.includes("rain")) return "rainy-bg";
    if (condition.includes("snow")) return "snowy-bg";
    if (condition.includes("storm")) return "stormy-bg";
    return "default-bg";
  };

  // Handle loading screen visibility for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingScreenVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${getBackgroundClass()}`}>
      {isLoadingScreenVisible ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>SkyMoodz</h1>
          <SearchBar onSearch={fetchWeather} />
          {loading ? (
            <ClipLoader color="#ffffff" size={50} />
          ) : (
            weather && <WeatherDisplay weather={weather} forecast={forecast} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
