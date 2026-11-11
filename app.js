
// WEEK 06 - WEATHER DASHBOARD

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get HTML elements
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const recentSearches = document.getElementById("recent-searches");

// Show loading message
function showLoading() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weatherDisplay.classList.add("hidden");
}

// Show error message
function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

// Fetch weather data
async function getWeather(city) {
    showLoading();

    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                response.status === 404
                    ? "City not found. Please try another city."
                    : "Unable to get weather data. Please try again."
            );
        }

        const data = await response.json();

        displayWeather(data);
        saveSearch(data.name);

    } catch (err) {
        showError(err.message);

    } finally {
        loading.classList.add("hidden");
    }
}

// Display weather information
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
    error.classList.add("hidden");
}

// Save recent searches
function saveSearch(city) {
    let searches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
    );

    searches = searches.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
    );

    searches.unshift(city);

    searches = searches.slice(0, 5);

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(searches)
    );

    displayRecentSearches();
}

// Display recent searches
function displayRecentSearches() {
    const searches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
    );

    recentSearches.innerHTML = "";

    searches.forEach((city) => {
        const item = document.createElement("li");

        item.textContent = city;

        item.addEventListener("click", () => {
            getWeather(city);
        });

        recentSearches.appendChild(item);
    });
}

// Handle search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});

// Start the dashboard
displayRecentSearches();
  
