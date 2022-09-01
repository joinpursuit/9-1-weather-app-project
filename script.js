const search = document.querySelector('#searchBar');
const forecast = document.querySelector('#ThreeDayForecast');

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
      console.log(data);
      const hideLocation = document.querySelector('#chooseLocation');
      // hideLocation.classList.remove('hidden');

      // const nearest = data.nearest_area
      const nearestArea = data.nearest_area[0].areaName[0].value;
      const nearestArea1 = document.createElement('p');
      nearestArea1.innerHTML = `<strong>Nearest Area: </strong> ${nearestArea}`;

      const state = data.nearest_area[0].region[0].value;
      const stateP = document.createElement('p');

      stateP.innerHTML = `<strong>Region: </strong>${state}`
      hideLocation.innerHTML = `<h2>${initialInput}</h2>`;

     

      const country = data.nearest_area[0].country[0].value;
      const countryP = document.createElement('p');
      countryP.innerHTML = `<strong>Country: </strong>${country}`;

      const currently = data.current_condition[0].FeelsLikeF;
      const feelslike = document.createElement('p');
      feelslike.innerHTML = `<strong>Currently:</strong>Feels Like ${currently}°F`;

      const sunshine = data.weather[0].hourly[0].chanceofsunshine;
      const iGotSunshine = document.createElement('p');
      iGotSunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${sunshine}`;

      const rain = data.weather[0].hourly[0].chanceofrain;
      const itsRainingImSad = document.createElement('p');
      itsRainingImSad.innerHTML = `<strong>Chance of Rain: </strong>${rain}`;

      const snow = data.weather[0].hourly[0].chanceofsnow;
      const santaIsComing = document.createElement('p');
      santaIsComing.innerHTML = `<strong>Chance of Snow: </strong>${snow}`;

      // const location = document.querySelector('#chooseLocation');
      // location.classList.toggle('location-hidden');

      // console.log(city);
      // console.log(state);
      // console.log(country);

      // initialInput.style.textAlign = 'left';

      hideLocation.append(nearestArea1);
      // nearestArea1.append(initialInput);
      hideLocation.append(
        stateP,
        countryP,
        feelslike,
        iGotSunshine,
        itsRainingImSad,
        santaIsComing
      );

      const today = document.querySelector('#today');
      const todayP1 = document.createElement('p');
      todayP1.setAttribute('class', 'avgtemp');
      todayP1.innerHTML = data.weather[0].avgtempf;
      today.append(todayP1, todayP2, todayP3);

      const todayP2 = document.createElement('p');
      todayP2;
    })
    .catch((error) => {
      console.log(error);
    });
});
