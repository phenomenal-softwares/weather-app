import React from "react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};

const WeatherDisplay = ({ weather, forecast }) => {
  if (!weather) {
    return <p>No weather data available. Please search for a city.</p>;
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <div className="weather-icon">
        <img src={weatherIcon} alt={weather.weather[0].description} />
      </div>
      <h3>{weather.weather[0].main}</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>

      {/* Display the 5-day forecast */}
      {forecast && (
  <div className="forecast">
    <h3>5-Day Forecast</h3>
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-item">
          <p>{formatDate(day.dt)}</p> {/* Apply the formatDate function here */}
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
          <p>{day.weather[0].main}</p>
          <p>{day.main.temp}°C</p>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default WeatherDisplay;
