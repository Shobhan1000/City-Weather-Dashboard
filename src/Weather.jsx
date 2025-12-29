import React, { useState } from "react";
import './App.css'
import axios from 'axios'

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const disableButton = () => {
        setButtonDisabled(true);
    }

  const enableButton = () => {
        setButtonDisabled(false);
    }
  
  const getWeather = async () => {
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
      disableButton();
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
      enableButton();
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (error.response && error.response.status === 404) {
        alert("City not found. Please check the city name and try again.");
      }
      setWeather(null);
      enableButton();
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    getWeather();
  }

  return (
    <>
      <h1>City Weather Dashboard</h1>
      <div className="card px-4 py-5">
        <form onSubmit={handleSubmit}>
          <label>
            Enter the city name:
            <input
              type="text" 
              value={city}
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isButtonDisabled}>Get Weather</button>
        </form>
      </div>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </>
  )
}

export default Weather