const BASE_URL = "https://wttr.in/"
const JSON_URL = '?format=j1'

const form = document.querySelector('#location');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const weather = document.querySelector('#inputText');
    const current = document.querySelector('#currentWeather')

    let userLocationInput = weather.value
    
    const url = `${BASE_URL}${userLocationInput}${JSON_URL}`
    form.reset();
    fetch(url)
    .then((res) => res.json())
    .then((res2) => {
        // console.log(res2)

        const hiddenLocation = document.querySelector('#currentWeather')
        hiddenLocation.innerHTML = `<h2>${userLocationInput}<h2/>`

        const area = res2.nearest_area[0].areaName[0].value;
        // console.log(area)
        const areaP = document.createElement('p');
        areaP.innerHTML = `<strong>Nearest Area: <strong/>${area}`;
        current.append(areaP);

        const region = res2.nearest_area[0].region[0].value;
        const regionP = document.createElement('p');
        regionP.innerHTML = `<strong>Region: <strong/>${region}`;
        current.append(regionP);

        const country = res2.nearest_area[0].country[0].value;
        const countryP = document.createElement('p');
        countryP.innerHTML = `<strong>Country: <strong/>${country}`;
        current.append(countryP);

        const feelsLike = res2.current_condition[0].FeelsLikeF;
        const feelsLikeP = document.createElement('p');
        feelsLikeP.innerHTML = `<strong>Currently: <strong/>Feels Like ${feelsLike}°F`;
        current.append(feelsLikeP);

        const sunny = res2.weather[0].hourly[0].chanceofsunshine;
        const sunnyP = document.createElement('p');
        sunnyP.innerHTML = `<strong>Chance of Sunshine: <strong/>${sunny}`;
        current.append(sunnyP);

        const rainy = res2.weather[0].hourly[0].chanceofrain;
        const rainyP = document.createElement('p');
        rainyP.innerHTML = `<strong>Chance of Rain: <strong/>${rainy}`;
        current.append(rainyP);

        const snowy = res2.weather[0].hourly[0].chanceofsnow;
        const snowyP = document.createElement('p');
        snowyP.innerHTML = `<strong>Chance of Snow: <strong/>${snowy}`;
        current.append(snowyP);

    })
    .catch((err) => console.log(err))

})
