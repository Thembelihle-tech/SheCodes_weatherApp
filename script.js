// current date

        let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function currentCityTemp(response) {
let temperature = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  let temp = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  temp.innerHTML = `${temperature}`;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let h1 = document.querySelector("#city");
  let apiKey = "8996f75184bcbfcbfcfa4bbcf5db2324";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  h1.innerHTML = `${cityInput.value}`;
  axios.get(url).then(currentCityTemp);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

let fahrenheitLink = document.querySelector("#fahreheit-link");
fahrenheitLink.addEventListener("click, displayFahrenheitTemperature");

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click, displayCelsiusTemperature");

function changeHeader(response) {
  let h1 = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humid = Math.round(response.data.main.humidity);
  let windy = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  h1.innerHTML = `${city}`;
  temperature.innerHTML = `${temp}`;
  humidity.innerHTML = `${humid}`;
  wind.innerHTML = `${windy}`;
  description.innerHTML = `${condition}`;
}

function myLocation(position) {
  let apiKey = "8996f75184bcbfcbfcfa4bbcf5db2324";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeHeader);
}
function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", clickButton);

 