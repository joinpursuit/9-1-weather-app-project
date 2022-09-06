const search = document.querySelector('#searchBar');

search.addEventListener('submit', (e) => {
  e.preventDefault();
  const textBox = document.querySelector('#typeCity');

  //assign the value of what's entered in text field to a variable
  let initialInput = textBox.value.split(' ').join(' ');

  const url = `http://wttr.in/${initialInput}?format=j1`;
  search.reset();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const hideLocation = document.querySelector('#chooseLocation');

      const nearestArea = data.nearest_area[0].areaName[0].value;
      const nearestArea1 = document.createElement('p');
      nearestArea1.innerHTML = `<strong>Nearest Area: </strong> ${nearestArea}`;

      const state = data.nearest_area[0].region[0].value;
      const stateP = document.createElement('p');

      stateP.innerHTML = `<strong>Region: </strong>${state}`;
      hideLocation.innerHTML = `<h2>${initialInput}</h2>`;

      const country = data.nearest_area[0].country[0].value;
      const countryP = document.createElement('p');
      countryP.innerHTML = `<strong>Country: </strong>${country}`;

      const currently = data.current_condition[0].FeelsLikeF;
      const feelsLike = document.createElement('p');
      feelsLike.innerHTML = `<strong>Currently:</strong>Feels Like ${currently}°F`;

      const sunshine = data.weather[0].hourly[0].chanceofsunshine;
      const iGotSunshine = document.createElement('p');
      iGotSunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${sunshine}`;

      const rain = data.weather[0].hourly[0].chanceofrain;
      const itsRainingImSad = document.createElement('p');
      itsRainingImSad.innerHTML = `<strong>Chance of Rain: </strong>${rain}`;

      const snow = data.weather[0].hourly[0].chanceofsnow;
      const santaIsComing = document.createElement('p');
      santaIsComing.innerHTML = `<strong>Chance of Snow: </strong>${snow}`;

      const image = document.createElement('img');
      if (rain > 50) {
        image.setAttribute('src', './assets/icons8-torrential-rain.gif');
        image.setAttribute('alt', 'rain');
      }
      if (snow > 50) {
        image.setAttribute('src', './assets/icons8-light-snow.gif');
        image.setAttribute('alt', 'snow');
      }
      if (sunshine > 50) {
        image.setAttribute('src', './assets/icons8-summer.gif');
        image.setAttribute('alt', 'sun');
      }
      hideLocation.append(nearestArea1);

      hideLocation.append(
        image,
        stateP,
        countryP,
        feelsLike,
        iGotSunshine,
        itsRainingImSad,
        santaIsComing
      );

      const today = document.querySelector('#today');
      const todayAvgTemp = document.createElement('p');
      const todayMinTemp = document.createElement('p');
      const todayMaxTemp = document.createElement('p');
      today.innerHTML = '<h2>Today</h2>';

      const avgTemp1 = data.weather[0].avgtempF;
      todayAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${avgTemp1}°F`;

      const minTemp1 = data.weather[0].mintempF;
      todayMinTemp.innerHTML = `<strong>Min Temperature: </strong>${minTemp1}°F`;

      const maxTemp1 = data.weather[0].maxtempF;
      todayMaxTemp.innerHTML = `<strong>Max Temperature: </strong>${maxTemp1}°F`;

      today.append(todayAvgTemp, todayMinTemp, todayMaxTemp);

      const tomorrow = document.querySelector('#tomorrow');
      const tomAvgTemp = document.createElement('p');
      const tomMinTemp = document.createElement('p');
      const tomMaxTemp = document.createElement('p');
      tomorrow.innerHTML = '<h2>Tomorrow</h2>';

      const avgTemp2 = data.weather[1].avgtempF;
      tomAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${avgTemp2}°F`;

      const minTemp2 = data.weather[1].mintempF;
      tomMinTemp.innerHTML = `<strong>Min Temperature: </strong>${minTemp2}°F`;

      const maxTemp2 = data.weather[1].maxtempF;
      tomMaxTemp.innerHTML = `<strong>Min Temperature: </strong>${maxTemp2}°F`;

      tomorrow.append(tomAvgTemp, tomMinTemp, tomMaxTemp);

      const dayAfter = document.getElementById('third-day');
      const dayAfterAvgTemp = document.createElement('p');
      const dayAfterMinTemp = document.createElement('p');
      const dayAfterMaxTemp = document.createElement('p');
      dayAfter.innerHTML = '<h2>Day After</h2>';

      const avgTemp3 = data.weather[2].avgtempF;
      dayAfterAvgTemp.innerHTML = `<strong>Average Temperature: </strong>${avgTemp3}°F`;

      const minTemp3 = data.weather[2].mintempF;
      dayAfterMinTemp.innerHTML = `<strong>Min Temperature: </strong>${minTemp3}°F`;

      const maxTemp3 = data.weather[2].maxtempF;
      dayAfterMaxTemp.innerHTML = `<strong>Min Temperature: </strong>${maxTemp3}°F`;

      dayAfter.append(dayAfterAvgTemp, dayAfterMinTemp, dayAfterMaxTemp);

      //! previous search

      const previousSearchUl = document.querySelector('#ul');
      const previousP = document.querySelector('section p');
      const forecast = document.querySelector('#threeDayForecast');

      previousP.style.display = 'none';

      const list = document.createElement('li');
      previousSearchUl.append(list);

      const a = document.createElement('a');
      a.innerHTML = `${initialInput}`;
      a.setAttribute('href', '#');

      list.innerHTML = ` - ${currently}°F`;

      list.prepend(a);

      list.addEventListener('click', () => {
        hideLocation.innerHTML = `<h2>${initialInput}</h2>`; //! this is breaking 1 test: has a sidebar section of the page that includes a 'Previous Searches' section

        hideLocation.append(
          image,
          stateP,
          countryP,
          feelsLike,
          iGotSunshine,
          itsRainingImSad,
          santaIsComing
        );

        forecast.append(today, tomorrow, dayAfter);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
