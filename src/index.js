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
  let celsiusTemperature = parseFloat(
    document.querySelector("#temperature-placeholder").textContent
  );
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-placeholder");
  temperatureElement.textContent = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
