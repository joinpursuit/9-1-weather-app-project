// URL Set Up
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

// Helper functions
const createURL = (locationValue) => {
  locationURL = locationValue.split(` `).join(`+`);
  URL = BASE_URL + locationURL + formatURL;
};

// Event Listeners
form.addEventListener(`submit`, (event) => {
  event.preventDefault();

  const location = locationInput.value;
  createURL(location);
  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      // update searches aside
      noSearches.style.display = `none`;
      const li = document.createElement(`li`);
      const aTag = document.createElement(`a`);
      li.append(aTag);
      noSearches.before(li);
      aTag.innerText = location;

      // edit main
      main.innerText = ``;
    })
    .catch((err) => {
      console.log(err);
    });
});
