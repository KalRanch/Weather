// Import API key from config.js file
import { API_KEY } from "./config.js";

// Get weather data from OpenWeatherMap API
function getWeather(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Unable to retrieve weather data.");
      }
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Display weather data in HTML
function displayWeather(data) {
  const cityName = data.name;
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  const cityNameElement = document.getElementById("city-name");
  cityNameElement.innerHTML = cityName;

  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  weatherDescriptionElement.innerHTML = weatherDescription;

  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  const humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  const windSpeedElement = document.getElementById("wind-speed");
  windSpeedElement.innerHTML = `Wind: ${windSpeed} m/s`;

  const weatherIconElement = document.getElementById("weather-icon");
  weatherIconElement.src = weatherIconUrl;
}

// Get user's location and display weather data
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
  });
} else {
  console.error("Geolocation is not supported by this browser.");
}
