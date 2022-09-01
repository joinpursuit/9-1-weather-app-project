// URL Set Up
const BASE_URL = `wttr.in/`;
let locationURL = ``;
const formatURL = `?format=j1`;
let URL = ``;

// Select HTML elements
const form = document.querySelector(`form`);
const locationInput = document.querySelector(`#pick-location`);
const main = document.querySelector(`main`)



form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  locationURL = locationInput.value.split(` `).join(`+`);
  URL = BASE_URL + locationURL + formatURL;

  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
