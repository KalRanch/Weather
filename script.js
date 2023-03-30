import { apiKey } from "./config.js";

const weatherContainer = document.getElementById("weather-container");
const locationContainer = document.getElementById("location-container");

function displayWeather(city, country, temperature, description) {
  weatherContainer.innerHTML = `
    <p>${description}</p>
    <p>${temperature} &#8451;</p>
  `;
  locationContainer.innerHTML = `
    <h2>${city}, ${country}</h2>
  `;
}

function displayError(error) {
  weatherContainer.innerHTML = `
    <p>Unable to fetch weather data. Please try again later.</p>
  `;
  console.error(error);
}

function getWeather(latitude, longitude) {
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const city = data.name;
      const country = data.sys.country;
      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      displayWeather(city, country, temperature, description);
    })
    .catch((error) => displayError(error));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      (error) => {
        displayError(error);
      }
    );
  } else {
    displayError("Geolocation is not supported by your browser.");
  }
}

getLocation();
