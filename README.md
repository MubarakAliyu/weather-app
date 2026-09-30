# Weather App

A responsive weather application built with HTML, CSS, and JavaScript that fetches weather information using the Fetch API and Open-Meteo services.

## Project Overview

Users can search for a city and view its current weather information.

The app displays:
- City and country
- Current temperature
- Weather condition
- Feels-like temperature
- Humidity
- Wind speed
- Latitude and longitude

Lagos is loaded as the default city when the page opens.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Project Structure

```text
weather-app/
├── index.html
├── styles.css
└── script.js
```

## How It Works

The application uses two API requests:

1. The Open-Meteo Geocoding API searches for the city entered by the user and returns its coordinates.
2. The Open-Meteo Forecast API uses those coordinates to retrieve current weather data.

JavaScript then uses the JSON responses to update the interface dynamically.

## Features

### City Search
Enter a city name and click Search to retrieve its weather information.

### Weather Information
The app displays:
- Temperature in °C
- Weather description
- Weather icon
- Feels-like temperature
- Relative humidity
- Wind speed in km/h
- Coordinates

### Error Handling
Failed requests and invalid city searches are handled with user-friendly messages.

### Responsive Design
The interface adapts to smaller screens using CSS media queries.

## Running the App

No package installation is required.

Using VS Code Live Server:

1. Open the project folder in Visual Studio Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.
4. Search for different cities.

Example searches:

```text
Lagos
Kano
Abuja
Sokoto
London
Dubai
Tokyo
New York
```

## Testing

The app was tested successfully by searching for **Kano, Nigeria** and displaying weather information including temperature, weather condition, humidity, wind speed, and coordinates.

## Learning Objectives Achieved

This project demonstrates:
- HTTP requests with `fetch()`
- Promises
- `async/await`
- JSON response handling
- Asynchronous programming
- API error handling
- Dynamic DOM updates
- Working with external APIs
- Responsive web design

## Data Source

Weather data is provided by Open-Meteo:

https://open-meteo.com/

## Author

**Aliyu Mubarak**

Network Requests in JavaScript Checkpoint
