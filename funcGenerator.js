function getWeatherData(data) {
    const { nearest_area: [ { areaName: [ {value: area} ]  }  ] }  = data;

    const { nearest_area: [ { country: [ { value: country} ] } ] } = data;
    
    const { nearest_area: [ { region: [ { value: region} ] } ] } = data;
    
    const { current_condition: [ { FeelsLikeF: currentFeelsLikeF } ] } = data;
    
    const { weather: [ { hourly } ] } = data;
    
    let todayWeather = {
      currentDate: "Today",
      avgTempF: data.weather[0].avgtempF,
      maxTempF: data.weather[0].maxtempF,
      minTempF: data.weather[0].mintempF,
      };
    let tomorrowWeather = {
      currentDate: "Tomorrow",
      avgTempF: data.weather[1].avgtempF,
      maxTempF: data.weather[1].maxtempF,
      minTempF: data.weather[1].mintempF,
      };
    let threeDaysWeather = {
      currentDate: "Day After Tomorrow",
      avgTempF: data.weather[2].avgtempF,
      maxTempF: data.weather[2].maxtempF,
      minTempF: data.weather[2].mintempF,
      };

      return weatherData = {
        area,
        region,
        country,
        currentFeelsLikeF,
        hourly,
        threeDaysForcast: [
            todayWeather,
            tomorrowWeather,
            threeDaysWeather,
        ],
      };
  }


function displayWeather(userInput, currentWeather,weatherData) {
  currentWeather.innerHTML = "";

let location = document.createElement("h2");
location.innerHTML = userInput;
currentWeather.append(location);
location.style.cssText = "text-transform: capitalize; color: #eb4747; text-decoration: underline #e8aa42; text-underline-offset: 5px;"

let area = document.createElement("p");

  area.innerHTML =
  userInput.toLowerCase() === weatherData.area.toLowerCase() ?  `<strong>Area:</strong> ${(weatherData.area)}`
  : `<strong>Nearest Area:</strong> ${weatherData.area}`;
 
currentWeather.append(area);


let region = document.createElement("p");
region.innerHTML = `<strong>Region:</strong> ${weatherData.region}`;
currentWeather.append(region);

let country = document.createElement("p");
country.innerHTML = `<strong>Country:</strong> ${weatherData.country}`;
currentWeather.append(country);

let currentFeelsLikeF = document.createElement("p");
currentFeelsLikeF.innerHTML = `<strong>Currently:</strong> Feels Like ${weatherData.currentFeelsLikeF}°F `;
currentWeather.append(currentFeelsLikeF);

let chanceOfSunShineAvg =
  weatherData.hourly.reduce((acc, ele) => {
    return (acc += Number(ele.chanceofsunshine));
  }, 0) / weatherData.hourly.length;

let chanceOfRainAvg =
  weatherData.hourly.reduce((acc, ele) => {
    return (acc += Number(ele.chanceofrain));
  }, 0) / weatherData.hourly.length;

let chanceOfSnowAvg =
  weatherData.hourly.reduce((acc, ele) => {
    return (acc += Number(ele.chanceofsnow));
  }, 0) / weatherData.hourly.length;

let chanceOfSunShine = document.createElement("p");
chanceOfSunShine.innerHTML = `<strong>Chance of Sunshine</strong>${chanceOfSunShineAvg.toFixed(2)}`;
currentWeather.append(chanceOfSunShine);


let chanceOfRain = document.createElement("p");
chanceOfRain.innerHTML = `<strong>Chance of Rain</strong>${chanceOfRainAvg.toFixed(2)}`;
currentWeather.append(chanceOfRain);

let chanceOfSnow = document.createElement("p");
chanceOfSnow.innerHTML = `<strong>Chance of Snow</strong>${chanceOfSnowAvg.toFixed(2)}`;
currentWeather.append(chanceOfSnow);

let highestChanceOfSunshine = weatherData.hourly.reduce((acc, el) => {
  return acc > Number(el.chanceofsunshine)
    ? acc
    : (acc = Number(el.chanceofsunshine));
}, 0);

let highestChanceOfRain = weatherData.hourly.reduce((acc, el) => {
  return acc > Number(el.chanceofrain)
    ? acc
    : (acc = Number(el.chanceofrain));
}, 0); 

let highestChanceOfSnow = weatherData.hourly.reduce((acc, el) => {
  return acc > Number(el.chanceofsnow)
    ? acc
    : (acc = Number(el.chanceofsnow));
}, 0);

let icon = document.createElement("img");
if (highestChanceOfSunshine > 50) {
  icon.src = "./assets/icons8-summer.gif";
  icon.alt = "sun";
  background__img.style.backgroundImage = "url('./my-images/summer-day.jpeg')";
}
if (highestChanceOfRain > 50) {
  icon.src = "./assets/icons8-torrential-rain.gif";
  icon.alt = "rain";
  icon.style="width: 100px; margin-top: 20px;"
  background__img.style.backgroundImage = "url('./my-images/rainy-day.jpeg')";
}
if (highestChanceOfSnow > 50) {
  icon.alt = "snow";
  icon.src = "./assets/icons8-light-snow.gif";
  
  background__img.style.backgroundImage = "url('./my-images/snowy-day.jpeg')";
} else {
  background__img.backgroundImage = 'url("./my-images/blue-sky.jpg")';
}

currentWeather.prepend(icon);

}

  function generateDailyForcast(dailyForcast, weatherData) {
      for (let i = 0; i < dailyForcast.length; i++) {
          dailyForcast[i].innerHTML = "";
          let currentDate = document.createElement("p");
          currentDate.textContent = weatherData.threeDaysForcast[i].currentDate;
          let avgTempF = document.createElement("p");
          avgTempF.innerHTML = `<strong>Average Temperature:</strong> ${weatherData.threeDaysForcast[i].avgTempF}°F`;
          let maxTempF = document.createElement("p");
          maxTempF.innerHTML = `<strong>Max Temperature:</strong> ${weatherData.threeDaysForcast[i].maxTempF}°F`;
          let minTempF = document.createElement("p");
          minTempF.innerHTML = `<strong>Min Temperature:</strong> ${weatherData.threeDaysForcast[i].minTempF}°F`;
          dailyForcast[i].append(currentDate, avgTempF, maxTempF, minTempF);
          dailyForcast[i].hidden = false;
        }
      

  }

  function displaySearchHistory(
      location,
      searchHistory,
      currentWeather,
      dailyForcast,
      weatherData,
      url
    ) {

      
      let currentFeelsLikeF = weatherData.currentFeelsLikeF;
      
      let li = document.createElement("li");
      li.style = "list-style: none; font-size:12px;"
      let a = document.createElement("a");
      
      a.textContent = location;
      a.style="text-transform: capitalize;font-size:14px;"
      a.href = `${BASE_URL}${location}?format=j1`
      
      li.textContent = ` ${currentFeelsLikeF}°F `;
      li.prepend(a);
    
      let seachHistoryList = document.querySelector("ul");
      seachHistoryList.append(li);

      a.addEventListener("click", (event) => {
        event.preventDefault();
        
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
              let weatherData = getWeatherData
              (data);
              
              displayWeather(location, currentWeather, weatherData)

              generateDailyForcast(dailyForcast, weatherData);
           
          })
          .catch((error) => {
            console.log(error);
          });
      });
    
      let removeBtn = document.createElement("button");
      removeBtn.innerHTML = ` <i class="fa-solid fa-trash"></i>`
      li.append(removeBtn);
      removeBtn.style.cssText = "border-radius:5px; background-color:#EB5406; height: 25px; border: none;margin:5px;";
      removeBtn.addEventListener("click", () => {
        li.remove();
      });
    }
  
  const tempConverter = document.querySelector(".temp__conversion");

  tempConverter.addEventListener("submit", (event) => {
      event.preventDefault();
      let temperature = Number(document.querySelector("#temp-to-convert").value);
      let displayResult = document.querySelector("#display__result");
      
      let conversionTypes = document.querySelectorAll(".convert-temp");
      let conversionType = "";
      for (let type of conversionTypes) {
        if (type.checked) {
          conversionType = type.value;
          break;
        }
      }
    
      if (conversionType === "c") {
        displayResult.textContent = `${(
          ((temperature - 32) * 5) /
          9
        ).toFixed(2)} °C`;
      } else {
        displayResult.textContent = `${((temperature * 9) / 5 + 32).toFixed(
          2
        )} °F`;
      }
    });

