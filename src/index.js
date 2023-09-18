let now = new Date();

let today = document.querySelector(".date-time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 0) {
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

today.innerHTML = `${day} ${month} ${date} ${year}, ${hours}:${minutes} `;

let apiKey = "44748b483f94fdf59996aa7a8c3e93ab";

function updateWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let temperaturePlaceholder = document.querySelector(
      "#temperature-placeholder"
    );
    temperaturePlaceholder.textContent = temperature;
    let iconElement = document.querySelector("#icon");

    let description = document.querySelector("#temperature-description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    windElement.innerHTML = `Wind speed of ${response.data.wind.speed} m/s`;
    humidityElement.innerHTML = `Humidity of ${response.data.main.humidity}%`;
    description.innerHTML = response.data.weather[0].description;
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
  let temperatureElement = document.querySelector("#temperature");

  let temperatureCelsius = parseFloat(temperatureElement.innerHTML);
  let temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(temperatureFahrenheit)}°F`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  let temperatureFahrenheit = parseFloat(temperatureElement.innerHTML);
  let temperatureCelsius = ((temperatureFahrenheit - 32) * 5) / 9;
  temperatureElement.innerHTML = `${Math.round(temperatureCelsius)}°C`;
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);
