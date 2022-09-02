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
        const areas = document.createElement('p');
        areas.innerHTML = `<strong>Nearest Area: <strong/>${area}`;
        current.append(areas);

        const region = res2.nearest_area[0].region[0].value;
        const regions = document.createElement('p');
        regions.innerHTML = `<strong>Region: <strong/>${region}`;
        current.append(regions);

        const country = res2.nearest_area[0].country[0].value;
        const countries = document.createElement('p');
        countries.innerHTML = `<strong>Country: <strong/>${country}`;
        current.append(countries);

        const feelsLike = res2.current_condition[0].FeelsLikeF;
        const feelsLikeP = document.createElement('p');
        feelsLikeP.innerHTML = `<strong>Currently: <strong/>Feels Like ${feelsLike}°F`;
        current.append(feelsLikeP);

        const sun = res2.weather[0].hourly[0].chanceofsunshine;
        const sunny = document.createElement('p');
        sunny.innerHTML = `<strong>Chance of Sunshine: <strong/>${sun}`;
        current.append(sunny);

        const rain = res2.weather[0].hourly[0].chanceofrain;
        const rainy = document.createElement('p');
        rainy.innerHTML = `<strong>Chance of Rain: <strong/>${rain}`;
        current.append(rainy);

        const snow = res2.weather[0].hourly[0].chanceofsnow;
        const snowy = document.createElement('p');
        snowy.innerHTML = `<strong>Chance of Snow: <strong/>${snow}`;
        current.append(snowy);

        const image = document.createElement('img');
        if(sun > 50) {
            image.setAttribute("src", './assets/icons8-summer.gif')
            image.setAttribute("alt", "sun")
            hiddenLocation.prepend(image);
        } else if (rain > 50){
            image.setAttribute("src", './assets/icons8-torrential-rain.gif')
            image.setAttribute("alt", "rain")
            hiddenLocation.prepend(image);
        } else if (snow > 50) {
            image.setAttribute("src", './assets/icons8-light-snow.gif')
            image.setAttribute("alt", "snow")
            hiddenLocation.prepend(image);
        }

    })
    .catch((err) => console.log(err))

})
