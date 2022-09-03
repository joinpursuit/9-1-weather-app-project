// URL Set-Up
const BASE_URL = `https://wttr.in/`;
let locationURL = ``;
const formatURL = `?format=j1`;
let URL = ``;

// Select HTML elements
const form = document.querySelector(`form`);
const locationInput = document.querySelector(`#pick-location`);
const main = document.querySelector(`main`);
const widget = document.querySelector(`#widget`);
const noSearches = document.querySelector(`#no-searches`);
const previousSearches = document.querySelector(`h4`);
const list = document.querySelector(`ul`);
const widgetForm = document.querySelector(`#widget-form`);
const converterInput = document.querySelector(`#temp-to-convert`)

// Needed Variables
let locationName = ``;
let areaSearched = ``;
let feelsLikeF = ``;
const searchesArray = [];

// Helper functions
const createURL = (locationValue) => {
  locationURL = locationValue.split(` `).join(`+`);
  URL = BASE_URL + locationURL + formatURL;
};

const editMain = (place, mainName) => {
  main.innerHTML = ``;
  main.classList.remove(`main-initial`);

  const article = document.createElement(`article`);
  article.setAttribute(`id`, `main-article`);
  const threeDays = document.createElement(`article`);
  threeDays.setAttribute(`id`, `three-days`);
  main.append(article, threeDays);
  // test code
  threeDays.textContent = `test`;

  const areaPath = place.nearest_area[0];

  const h2AreaSearched = document.createElement(`h2`);
  h2AreaSearched.innerText = `${mainName}`;

  const areaValReturn = areaPath.areaName[0].value;
  const pArea = document.createElement(`p`);

  if (areaValReturn === areaSearched) {
    pArea.innerHTML = `<strong>Area:</strong> ${areaValReturn}`;
  } else {
    pArea.innerHTML = `<strong>Nearest Area:</strong> ${areaValReturn}`;
  }

  const region = document.createElement(`p`);
  region.innerHTML = `<strong>Region:</strong> ${areaPath.region[0].value}`;

  const country = document.createElement(`p`);
  country.innerHTML = `<strong>Country:</strong> ${areaPath.country[0].value}`;

  const currentTemp = document.createElement(`p`);
  feelsLikeF = place.current_condition[0].FeelsLikeF;
  currentTemp.innerHTML = `<strong>Currently:</strong> Feels Like ${feelsLikeF}°F`;

  article.append(h2AreaSearched, pArea, region, country, currentTemp);
};

const editSearches = (element) => {
  noSearches.remove();
  const li = document.createElement(`li`);
  const aTag = document.createElement(`a`);
  aTag.setAttribute(`href`, ``);
  list.append(li);
  aTag.innerText = areaSearched;
  li.innerText = ` - ${feelsLikeF}°F`;
  li.prepend(aTag);
  searchesArray.push(element);
  aTag.addEventListener(`click`, (event) => {
    event.preventDefault();
    createURL(aTag.innerText);
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        editMain(res, aTag.innerText);

        const threeDayData = res.weather;
        createThreeDay(threeDayData);
      })
      .catch((err) => console.log(err));
  });
};

const createThreeDay = (data) => {
  const editThreeDay = document.querySelector(`#three-days`);
  editThreeDay.innerHTML = ``;
  const dayTitle = [`Today`, `Tomorrow`, `Day After Tomorrow`];
  let dayIndex = 0;
  data.forEach((el) => {
    const dayData = document.createElement(`article`);
    dayData.innerHTML = `<h3>${dayTitle[dayIndex]}</h3>`;
    const avgTemp = document.createElement(`p`);
    avgTemp.innerHTML = `<strong>Average Temperature:</strong></br>${el.avgtempF}°F`;
    const maxTemp = document.createElement(`p`);
    maxTemp.innerHTML = `<strong>Max Temperature:</strong></br>${el.maxtempF}°F`;
    const minTemp = document.createElement(`p`);
    minTemp.innerHTML = `<strong>Min Temperature:</strong></br>${el.mintempF}°F`;

    editThreeDay.append(dayData);
    dayData.append(avgTemp, maxTemp, minTemp);
    dayIndex += 1;
  });
};

// Event Listeners
form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  locationName = locationInput.value;
  createURL(locationName);

  areaSearched = locationName.split(` `);

  // will break one test that is case sensitive
  areaSearched = areaSearched
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
    .join(` `);

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      editMain(res, areaSearched);

      const threeDayData = res.weather;
      createThreeDay(threeDayData);

      if (!searchesArray.includes(areaSearched)) {
        editSearches(areaSearched);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  form.reset();
});

widgetForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  console.log(converterInput.value)
  // get c or f value functionality
});
