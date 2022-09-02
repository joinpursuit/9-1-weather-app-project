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
  h2AreaSearched.innerHTML = `<strong>${mainName}</strong>`;

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
  noSearches.style.display = `none`;
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
      })
      .catch((err) => console.log(err));
  });
};

// Event Listeners
form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  locationName = locationInput.value;
  createURL(locationName);

  areaSearched = locationName.split(` `);
  areaSearched = areaSearched
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
    .join(` `);

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      editMain(res, areaSearched);
      if (!searchesArray.includes(areaSearched)) {
        editSearches(areaSearched);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  form.reset();
});
