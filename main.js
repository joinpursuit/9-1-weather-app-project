const BASE_URL = "https://wttr.in/";
const form = document.querySelector("#locationForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { location } = event.target;
  console.log(location);
  getNewWeatherSearch(location.value);
});

let searchInfo = {};

function getNewWeatherSearch(location) {
  fetch(`${BASE_URL}${location}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(`${json}`);

      searchInfo["location"] = json.nearest_area[0].areaName[0].value;
      searchInfo["Region"] = json.nearest_area[0].region[0].value;
      searchInfo["Country"] = json.nearest_area[0].country[0].value;
      searchInfo["Currently"] = json.current_condition[0].FeelsLikeF;
      searchInfo["Chance-of-sun"] = json.weather[0].hourly[0].chanceofsunshine;
      searchInfo["Chance-of-rain"] = json.weather[0].hourly[0].chanceofrain;
      searchInfo["Chance-of-snow"] = json.weather[0].hourly[0].chanceofsnow;
      getObjectData(searchInfo);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getObjectData(searchInfo) {
  const searchSection = document.getElementById("searchSection");
  for (const [key, value] of Object.entries(searchInfo)) {
    console.log(`${key}: ${value}`);
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `${key}: ${value}`;
    searchSection.append(paragraph);
  }
}

for (let i = 0; i < json.weather[0].hourly.length; i++) {
  if (Number(json.weather[0].hourly[i].chanceofsunshine) > 50) {
    icon.src = './assets/icons8-summer.gif';
    icon.alt = 'sun';
  }

  if (Number(json.weather[0].hourly[i].chanceofrain) > 50) {
    icon.src = './assets/icons8-torrential-rain.gif';
    icon.alt = 'rain';
  }

  if (Number(json.weather[0].hourly[i].chanceofsnow) > 50) {
    icon.src = './assets/icons8-light-snow.gif';
    icon.alt = 'snow';
  }
}

let unorderedList = document.querySelector("ul");
let previousSearchList = document.createElement("li");

unorderedList.append(previousSearchList);

function addSearchToList(searchInfo, previosSearchList, getWeatherButton) {

  const link = document.createElement("a");
}