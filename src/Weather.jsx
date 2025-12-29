import React, { useState, useEffect } from "react";
import './App.css'
import axios from 'axios'

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const CACHE_KEY = "lastWeather";

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setWeather(JSON.parse(cached));
      setCity(JSON.parse(cached).name);
    }
  }, []);

  const handleFocus = () => {
    setCity("");
  };

  const disableButton = () => {
        setButtonDisabled(true);
    }

  const enableButton = () => {
        setButtonDisabled(false);
    }
  
    const getWeather = async () => {
    if (!city.trim()) {
        alert("Please enter a city name");
        return;
    }

    try {
        disableButton();
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(url);
        setWeather(response.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
    } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);

        if (!error.response) {
        // No response from server: API down or no internet
        alert("Cannot reach the weather service. Check your internet connection or try again later.");
        } else if (error.response.status === 404) {
        // City not found
        alert("City not found. Try another.");
        } else {
        // Other errors
        alert("Something went wrong. Please try again.");
        }
    } finally {
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
              onFocus={handleFocus}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isButtonDisabled}>Get Weather</button>
        </form>
      </div>
        {weather && (
        <div
            className={`weather-dashboard ${
            weather.weather[0].main.toLowerCase().includes("cloud") ? "cloudy" :
            weather.weather[0].main.toLowerCase().includes("rain") ? "rainy" :
            weather.weather[0].main.toLowerCase().includes("snow") ? "snowy" :
            weather.weather[0].main.toLowerCase().includes("clear") ? "sunny" : "default"
            }`}
        >
            {/* City Header */}
            <div className="city-header">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            </div>

            {/* Weather Grid */}
            <div className="grid">
            <div>
                <p><strong>Temperature</strong>{weather.main.temp}°C</p>
                <p>Feels like {weather.main.feels_like}°C</p>
            </div>
            <div>
                <p><strong>Weather</strong>{weather.weather[0].main} - {weather.weather[0].description}</p>
            </div>
            <div>
                <p><strong>Humidity</strong>{weather.main.humidity}%</p>
            </div>
            <div>
                <p><strong>Pressure</strong>{weather.main.pressure} hPa</p>
            </div>
            <div>
                <p><strong>Wind</strong>{weather.wind.speed} m/s, {weather.wind.deg}°</p>
            </div>
            <div>
                <p><strong>Visibility</strong>{(weather.visibility/1000).toFixed(1)} km</p>
            </div>
            <div>
                <p><strong>Cloudiness</strong>{weather.clouds.all}%</p>
            </div>
            <div>
                <p><strong>Sunrise</strong>{new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</p>
                <p><strong>Sunset</strong>{new Date(weather.sys.sunset*1000).toLocaleTimeString()}</p>
            </div>
            </div>
        </div>
        )}
    </>
  )
}

export default Weather