# City Weather Dashboard

## What the App Does

City Weather Dashboard is a **responsive web application** that lets users:

- **Search for any city’s weather**
- View **current weather conditions**
- Check details like **temperature, humidity, wind speed, and weather description**

It uses real weather data to help users quickly see the current conditions for any city.

---

## Tech Stack

- **React** — UI framework
- **Vite** — Frontend tooling
- **HTML5 & CSS3** — Structure & styling
- **JavaScript (ES6+)** — Logic & API interactions
- **OpenWeatherMap API** — Weather data source ([openweathermap.org](https://openweathermap.org/api))

---

## API Used

This app uses the **OpenWeatherMap API** to fetch:

- Current weather
- Forecast data
- Weather icon sets

You’ll need a free API key from OpenWeather to get started. ([openweathermap.org](https://openweathermap.org/api))

---

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shobhan1000/City-Weather-Dashboard.git
   cd City-Weather-Dashboard
   ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Create a .env file**
    ```bash
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

4. **Start the development server**
    ```bash
    npm run dev
    ```

5. **Open in your browser**
    ```bash
    http://localhost:5173
    ```

---

## Future Improvements

- Add 5-day / hourly forecast cards
- Favorite cities list with local storage
- Geolocation — detect user location automatically
- Theme toggle (light/dark mode)
- Visual weather charts (wind, temp trends)
- Progressive Web App (PWA) support for offline use