const BASE_URL = "https://wttr.in/"
const JSON_URL = '?format=j1'

const form = document.querySelector('form');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userLocationInput = event.target.location.value;
    event.target.location.value = "";

    fetch('${BASE_URL}${userLocationInput}${JASON_URL}')
    .then((res) => res.json())
    .then((res2) => {

    })
    // .catch()

})
