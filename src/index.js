let now = new Date();

let today = document.querySelector(".date-time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

today.innerHTML = `Last updated: ${day} ${month} ${date} ${year}, ${hours}:${minutes}`;

let apiKey = "44748b483f94fdf59996aa7a8c3e93ab";

function updateWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature-placeholder");
    temperatureElement.textContent = temperature;

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

    let forecastData = [
      { day: days[0], icon: "🌤️", high: 15, low: 9 },
      { day: days[1], icon: "🌦️", high: 18, low: 10 },
      { day: days[2], icon: "☁️", high: 20, low: 12 },
      { day: days[3], icon: "⛈️", high: 16, low: 8 },
      { day: days[4], icon: "🌧️", high: 14, low: 7 },
    ];

    displayForecast(forecastData);

    let iconElement = document.querySelector("#icon");
    let condition = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );

    windElement.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    condition.innerHTML = response.data.weather[0].description;
  });
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input").value;
  let cityElement = document.querySelector("#city");
  cityElement.textContent = cityInput;
  updateWeatherData(cityInput);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-placeholder");
  let currentTemperature = parseFloat(temperatureElement.textContent);

  if (temperatureElement.dataset.unit === "celsius") {
    let fahrenheitTemperature = (currentTemperature * 9) / 5 + 32;
    temperatureElement.textContent = Math.round(fahrenheitTemperature);
    temperatureElement.dataset.unit = "fahrenheit";
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-placeholder");
  let currentTemperature = parseFloat(temperatureElement.textContent);

  if (temperatureElement.dataset.unit === "fahrenheit") {
    let celsiusTemperature = ((currentTemperature - 32) * 5) / 9;
    temperatureElement.textContent = Math.round(celsiusTemperature);
    temperatureElement.dataset.unit = "celsius";
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

document.querySelector("#temperature-placeholder").dataset.unit = "celsius";
celsiusLink.classList.add("active");

function displayForecast(forecastData) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur"];
  let forecastHtml = "";

  forecastData.forEach(function (forecastDay) {
    forecastHtml += `
      <div class="col">
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${forecastDay.day}</div>
          <div class="weather-forecast-icon">${forecastDay.icon}</div>
          <div class="weather-forecast-temperature">
            <strong>${forecastDay.high}°</strong> | ${forecastDay.low}°
          </div>
        </div>
      </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
