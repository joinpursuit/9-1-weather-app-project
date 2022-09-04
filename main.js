const form = document.querySelector("form");
const placeholder = document.querySelector(".placeholder");
const cityInput = document.querySelector(".cityInput");
const submit = document.querySelector(".toSubmit");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const dayAfter = document.querySelector(".day-after");
const weatherInfo = document.querySelector(".weatherInfo");
const tempStats = document.querySelectorAll(".weatherInfo article");
const history = document.querySelector(".history");
const p = document.querySelector("section p");
const ul = document.querySelector("ul");
// const value = cityInput.value.split(" ").join("+");
// const URL = "http://wttr.in";
// console.log(cityInput.value);

form.addEventListener("submit", (e) => {
  let value = cityInput.value;
  let URL = `http://wttr.in/${value}?format=j1`;
  //   console.log(cityInput.value);
  e.preventDefault();
  form.reset();
  fetch(`${URL}`)
    .then((data) => data.json())
    .then((data) => {
      let cityName = data.nearest_area[0].areaName[0].value;
      if (data) {
        placeholder.innerHTML = `<h2>${value}</h2>`;
        weatherInfo.style.visibility = "visible";
      }

      const area = document.createElement("p");
      area.innerHTML = `<b>Nearest Area:</b> ${cityName}`;
      //   placeholder.append(area);

      const region = document.createElement("p");
      region.innerHTML = `<b>Region:</b> ${data.nearest_area[0].region[0].value}`;
      //   placeholder.append(region);

      const country = document.createElement("p");
      country.innerHTML = `<b>Country:</b> ${data.nearest_area[0].country[0].value}`;
      //   placeholder.append(country);

      const currently = document.createElement("p");
      currently.innerHTML = `<b>Currently:</b> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;
      //   placeholder.append(currently);

      const sunshine = document.createElement("p");
      sunshine.innerHTML = `<b>Chance of Sunshine:</b> ${data.weather[0].hourly[0].chanceofsunshine}`;
      //   placeholder.append(sunshine);

      const rain = document.createElement("p");
      rain.innerHTML = `<b>Chance of Rain:</b> ${data.weather[0].hourly[0].chanceofrain}`;
      //   placeholder.append(rain);

      const snow = document.createElement("p");
      snow.innerHTML = `<b>Chance of Snow:</b> ${data.weather[0].hourly[0].chanceofsnow}`;
      //   placeholder.append(snow);

      const icon = document.createElement("img");
      if (data.weather[0].hourly[0].chanceofsunshine > 50) {
        icon.setAttribute("src", "./assets/icons8-summer.gif");
        icon.setAttribute("alt", "sun");
      }
      if (data.weather[0].hourly[0].chanceofrain > 50) {
        icon.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        icon.setAttribute("alt", "rain");
      }
      if (data.weather[0].hourly[0].chanceofsnow > 50) {
        icon.setAttribute("src", "./assets/icons8-light-snow.gif");
        icon.setAttribute("alt", "snow");
      }

      placeholder.prepend(icon);

      placeholder.append(
        area,
        region,
        country,
        currently,
        sunshine,
        rain,
        snow
      );

      let dayValues = ["Today", "Tomorrow", "Day After Tomorrow"];

      tempStats.forEach((day, i) => {
        day.innerHTML = "";
        day.textContent = dayValues[i];
        const av = document.createElement("p");
        av.innerHTML = `<b>Average Temperature:</b> ${data.weather[i].avgtempF}`;
        day.append(av);

        const max = document.createElement("p");
        max.innerHTML = `<b>Max Temperature:</b> ${data.weather[i].maxtempF}`;
        day.append(max);

        const min = document.createElement("p");
        min.innerHTML = `<b>Min Temperature:</b> ${data.weather[i].mintempF}`;
        day.append(min);
      });

      //   let avgTempF = data.weather[0].avgtempF;
      //   console.log(avgTempF);
      //   let minTempF = data.weather[0].mintempF;
      //   console.log(minTempF);

      //! previous searches

      p.innerHTML = "";

      const li = document.createElement("li");
      li.innerHTML = `${cityName}- ${data.current_condition[0].FeelsLikeF}°F`;
      ul.append(li);
      const a = document.createElement("a");

      let text = document.createTextNode(cityName);
      a.append.text;
      a.href = ``;
    });
});
