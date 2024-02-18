// FIRST STEP:
// Targeting the search form so that we can say whatever is typed in there and then submitted will trigger the action which will
// send that typed value i.e. the requested city into the API
// which will return data relevant to that city which we can choose to populate the screen
let searchFormElement = document.querySelector("#search-form");
// checing selected correrct element
// console.log(searchFormElement);

searchFormElement.addEventListener("submit", getSearchValue);

// FUNCTION TO SEE WHAT CITY WAS SEARCHED FOR SO THIS CAN BE USED IN THE API SEARCH QUERY:
// Getting what the user has typed in the search input once the 'submit' has happened and then putting it into another function 'getCityData'
function getSearchValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //   console.log(searchInput.value);
  getCityData(searchInput.value);
}

// Making it so the default is London when you load the page
getCityData("London");

// FUNCTION TO GET THE API DATA:
// get the API data which uses the user's inputted city as the query and then call the populateScreen function
function getCityData(city) {
  let apiKey = "145at3bd88ddc4bf6od1483d03f4ef43";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(populateScreen);
}

// FUNCTION TO TAKE THE POPULATE THE SCREEN WITH THE DATA RETURNED FROM API:
function populateScreen(response) {
  // to see all the data returned for that city
  console.log(response.data);

  // to populate the city name with the one from the API to avoid uppercase errors etc
  let cityElement = document.querySelector("#city");
  city.innerHTML = response.data.city;

  // populating the temperature
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°c`;

  // populating the weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`;

  // populating the weather description
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  // populating the wind speed
  let windElement = document.querySelector("#wind");
  console.log(response.data.wind.speed);

  windElement.innerHTML = `Wind speed: <strong>${response.data.wind.speed}km/h</strong>`;

  // populating the date
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  // checking the date time has been parsed correctly
  console.log(date);
  dateElement.innerHTML = formatDate(date);

  // Now we need to make sure the getForecast function is called from this point so it all happens together
  // this will take in the city name from the response and return the forecast data for this
  getForecast(response.data.city);
}

// FUNCTION TO FORMAT THE DATE:
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[day]}, <strong>${hours}:${minutes}</strong>`;
}

// FUNCTION TO GET THE FORECAST DATA FROM THE API
function getForecast(city) {
  let apiKey = "145at3bd88ddc4bf6od1483d03f4ef43";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  // use axios to get results of the api URL and then this will be used in a displayForecast function
  axios(apiUrl).then(displayForecast);
}

// FUNCTION WHICH POPULATES THE FORECAST DATA FROM THE API RESPONSE
function displayForecast(response) {
  console.log(response);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index <= 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon"/>
              </div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${Math.round(day.temperature.maximum)}º</strong>
                </div>
                <div class="weather-forecast-temperature">${Math.round(
                  day.temperature.minimum
                )}º</div>
              </div>
            </div>
  `;

      let forecastElement = document.querySelector("#forecast");
      forecastElement.innerHTML = forecastHtml;
    }
  });
}

// function to format the date from the API
function formatDay(timestamp) {
  // we have to multiply by 1000 as the time stamp is in milliseconds
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  // remember that getDay() will be a value between 0 and 6
  return days[date.getDay()];
}

// FUNCTION TO CHANGE THE THEME
// CHANGE THEME BUTTON:
let themeButton = document.querySelector("#change-theme-button");
themeButton.addEventListener("click", changeTheme);

function changeTheme() {
  let body = document.querySelector("body");

  // Toggle the 'light' class on the body
  body.classList.toggle("light");

  // Change the inner html of the button based on the class on the body
  if (body.classList.contains("light")) {
    themeButton.innerHTML = "Dark Theme";
  } else {
    themeButton.innerHTML = "Light Theme";
  }
}
