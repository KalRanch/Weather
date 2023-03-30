const config = require("./config");

const api_key = config.api_key;
let lat;
let lon;

const weather_info = document.getElementById("weather-info");
const city_name = document.getElementById("city-name");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    weather_info.innerText = "Geolocation is not supported by this browser.";
  }
}

async function getWeather(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );
    const data = await response.json();
    const weather = data.weather[0];
    weather_info.innerHTML = `
      Weather: ${weather.main}<br>
      Description: ${weather.description}<br>
      Temperature: ${Math.round(data.main.temp)}&deg;C<br>
      Humidity: ${data.main.humidity}%<br>
      Wind Speed: ${Math.round(data.wind.speed)} m/s`;
    city_name.innerText = data.name;
  } catch (error) {
    console.log(error);
    weather_info.innerText = "Unable to retrieve weather data";
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      weather_info.innerText = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      weather_info.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      weather_info.innerText = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      weather_info.innerText = "An unknown error occurred.";
      break;
  }
}

getLocation();
