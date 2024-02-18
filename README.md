
# Weather Application with 5 Day Forecast

- I created this as part of my SheCodes Plus Final Project.
- This includes using their own Weather API to search for a city and bring back the current temperature
- The same API also has a forecast endpoint that is called in order to return forecast information for that searched city
- The next 5 days forecast are displayed
- The user can type in a city regardless of uppercase/lowercase and it will return the correct city's data and have it be displayed correctly
- For the current weather, it displays:
   - description of the weather
   - wind speed
   - an icon of the weather
- For the 5 day forecast, it displays:
   - the day of the week
   - the maximum and minimum temperatures
   - the icon of the weather for each day
 
Additionally, I have added a toggle button that allows the user to choose a 'Dark' or 'Light' mode design.
I have designed both views to be comforting to look at, yet minimalistic.


## Demo

You can view a demo of this on Netlifly: https://week8-weather-app-homework.netlify.app/

## API Reference

#### SheCodes Weather API
https://www.shecodes.io/learn/apis/weather

#### Get the weather data for a city
```http
https://api.shecodes.io/weather/v1/current?query={query}&key={key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `string` | **Required**.The name of a city |
| `api_key` | `string` | **Required**. Your API key |
| `units` | `string` | **Optional**. Either metric or imperial |

#### Get the forecast data for a city

```http
https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query` | `string` | **Required**.The name of a city |
| `api_key` | `string` | **Required**. Your API key |
| `units` | `string` | **Optional**. Either metric or imperial |



## Acknowledgements

 SheCodes Plus Workshop


## Features

- Light/dark mode toggle
- Current weather
- 5 day forecast
- Live data


## Tech Stack

- HTML, CSS, Javascript, API, Hosting, Github

