const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const statusMessage = document.getElementById("statusMessage");
const weatherResult = document.getElementById("weatherResult");

const weatherIcon = document.getElementById("weatherIcon");

const locationName = document.getElementById("locationName");
const locationDetails = document.getElementById("locationDetails");

const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const coordinates = document.getElementById("coordinates");

// Convert Open-Meteo weather codes into readable descriptions
function getWeatherDescription(code) {
  const weatherCodes = {
    0: ["Clear sky", "☀️"],
    1: ["Mainly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Moderate drizzle", "🌦️"],
    55: ["Dense drizzle", "🌧️"],
    56: ["Light freezing drizzle", "🌨️"],
    57: ["Dense freezing drizzle", "🌨️"],
    61: ["Slight rain", "🌧️"],
    63: ["Moderate rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Light freezing rain", "🌨️"],
    67: ["Heavy freezing rain", "🌨️"],
    71: ["Slight snow", "🌨️"],
    73: ["Moderate snow", "❄️"],
    75: ["Heavy snow", "❄️"],
    77: ["Snow grains", "❄️"],
    80: ["Slight rain showers", "🌦️"],
    81: ["Moderate rain showers", "🌦️"],
    82: ["Violent rain showers", "⛈️"],
    85: ["Slight snow showers", "🌨️"],
    86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with slight hail", "⛈️"],
    99: ["Thunderstorm with heavy hail", "⛈️"]
  };

  return weatherCodes[code] || ["Unknown weather", "🌍"];
}

// Search city and get coordinates
async function getLocation(city) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(city)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to find location.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Please try another city.");
  }

  return data.results[0];
}

// Get weather from coordinates
async function getWeather(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&temperature_unit=celsius` +
    `&wind_speed_unit=kmh` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  return response.json();
}

// Display weather data
function displayWeather(location, weather) {
  const current = weather.current;

  const [description, icon] = getWeatherDescription(
    current.weather_code
  );

  locationName.textContent = location.name;

  locationDetails.textContent =
    `${location.admin1 || ""}${location.admin1 ? ", " : ""}${location.country}`;

  temperature.textContent =
    Math.round(current.temperature_2m);

  weatherDescription.textContent = description;

  weatherIcon.textContent = icon;

  feelsLike.textContent =
    `${Math.round(current.apparent_temperature)}°C`;

  humidity.textContent =
    `${current.relative_humidity_2m}%`;

  windSpeed.textContent =
    `${Math.round(current.wind_speed_10m)} km/h`;

  coordinates.textContent =
    `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`;

  weatherResult.classList.remove("hidden");
}

// Handle search
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    statusMessage.textContent = "Please enter a city.";
    return;
  }

  statusMessage.textContent = "Loading weather data...";
  weatherResult.classList.add("hidden");

  try {
    const location = await getLocation(city);

    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    displayWeather(location, weather);

    statusMessage.textContent =
      `Weather information for ${location.name}`;
  } catch (error) {
    statusMessage.textContent = error.message;
  }
});

// Load a default city when the page opens
async function loadDefaultWeather() {
  try {
    const location = await getLocation("Lagos");

    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    displayWeather(location, weather);

    statusMessage.textContent = "Showing weather for Lagos";
  } catch (error) {
    statusMessage.textContent = error.message;
  }
}

loadDefaultWeather();