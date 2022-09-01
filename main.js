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

// location data
let locationData = {};
let locationName = ``;
let areaSearched = ``;

// Helper functions
const createURL = (locationValue) => {
  locationURL = locationValue.split(` `).join(`+`);
  URL = BASE_URL + locationURL + formatURL;
};

const fetchFunc = () => {};

const editSearches = () => {
  noSearches.style.display = `none`;
  const li = document.createElement(`li`);
  const aTag = document.createElement(`a`);
  li.append(aTag);
  noSearches.before(li);
  aTag.innerText = areaSearched;
  console.log();
};

const editMain = (place) => {
  main.innerHTML = ``;
  const areaPath = place.nearest_area[0];

  const h2AreaSearched = document.createElement(`h2`);
  h2AreaSearched.innerHTML = `<strong>${areaSearched}</strong>`;
  main.append(h2AreaSearched);

  const areaValReturn = areaPath.areaName[0].value;
  const pArea = document.createElement(`p`);
  main.append(pArea);
  if (areaValReturn === areaSearched) {
    pArea.innerHTML = `<strong>Area:</strong> ${areaValReturn}`;
  } else {
    pArea.innerHTML = `<strong>Nearest Area:</strong> ${areaValReturn}`;
  }

  const region = document.createElement(`p`);
  region.innerHTML = `<strong>Region:</strong> ${areaPath.region[0].value}`;
  main.append(region);

  const country = document.createElement(`p`);
  country.innerHTML = `<strong>Country:</strong> ${areaPath.country[0].value}`;
  main.append(country);
};

// Event Listeners
form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  locationName = locationInput.value;
  createURL(locationName);
  areaSearched = locationName.split(` `);
  areaSearched = areaSearched
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(` `);

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      locationData = res;
      editMain(res);
      editSearches();
    })
    .catch((err) => {
      console.log(err);
    });
});
