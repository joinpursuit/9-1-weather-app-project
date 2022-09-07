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
const section = document.querySelector("section p");
const ul = document.querySelector("ul");
// const value = cityInput.value.split(" ").join("+");
// const URL = "http://wttr.in";
// console.log(cityInput.value);

let mainSubmit = form.addEventListener("submit", (e) => {
  let value = cityInput.value;
  let URL = `http://wttr.in/${value}?format=j1`;

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

      const region = document.createElement("p");
      region.innerHTML = `<b>Region:</b> ${data.nearest_area[0].region[0].value}`;

      const country = document.createElement("p");
      country.innerHTML = `<b>Country:</b> ${data.nearest_area[0].country[0].value}`;

      const currently = document.createElement("p");
      currently.innerHTML = `<b>Currently:</b> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;

      const sunshine = document.createElement("p");
      sunshine.innerHTML = `<b>Chance of Sunshine:</b> ${data.weather[0].hourly[0].chanceofsunshine}`;

      const rain = document.createElement("p");
      rain.innerHTML = `<b>Chance of Rain:</b> ${data.weather[0].hourly[0].chanceofrain}`;

      const snow = document.createElement("p");
      snow.innerHTML = `<b>Chance of Snow:</b> ${data.weather[0].hourly[0].chanceofsnow}`;

      //! Conditionals to Set icons
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

      //! loop to add the Days Information
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

      //! previous searches

      section.innerHTML = "";

      const li = document.createElement("li");
      ul.prepend(li);

      const a = document.createElement("a");

      a.innerText = `${cityName}`;
      let nombre = a.innerText;
      a.setAttribute("href", "#");
      li.innerText = ` - ${data.current_condition[0].FeelsLikeF}°F`;

      li.prepend(a);

      a.addEventListener("click", () => {
        placeholder.innerHTML = ``;
        placeholder.innerHTML = `<h2>${nombre}</h2>`;

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
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
