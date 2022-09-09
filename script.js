const BASE_URL = "https://wttr.in/";
const json_format = "?format=j1";
const form = document.querySelector("form");
const locationValue = document.getElementById("location__value");
const currentWeather = document.getElementById("current__weather");
const dailyForcast = document.querySelectorAll(".weather__day");
const searchHistory = document.getElementById("#search__history");
const background__img = document.querySelector("body");
const tempConversion = document.querySelector(".temp__conversion");
let p = document.querySelector("#search__history section p");


    form.addEventListener("submit", (e) => {
            e.preventDefault();
           
            let location = locationValue.value;
            let url = `${BASE_URL}${location}${json_format}`;
            form.reset();
            tempConversion.hidden = false;
            p.hidden = true;
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
              
                let weatherData = getWeatherData
                (data);
                
                displayWeather(location, currentWeather, weatherData)

                generateDailyForcast(dailyForcast, weatherData);

                displaySearchHistory(location,
                    searchHistory,
                    currentWeather,
                    dailyForcast,
                    weatherData,
                    url);
            })

            .catch((err) => console.log(err));
    });
