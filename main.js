const form = document.querySelector("form");
const placeholder = document.querySelector(".placeholder");
const cityInput = document.querySelector(".cityInput");
const submit = document.querySelector(".toSubmit");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const dayAfter = document.querySelector(".day-after");
// const value = cityInput.value.split(" ").join("+");
// const URL = "http://wttr.in";
// console.log(cityInput.value);

form.addEventListener("submit", (e) => {
  let value = cityInput.value.split(" ").join("+");
  let URL = `http://wttr.in/${value}?format=j1`;
  console.log(cityInput.value);
  e.preventDefault();
  fetch(`${URL}`)
    .then((data) => data.json())
    .then((data) => {
      let cityName = data.nearest_area[0].areaName[0].value;

      if (data) {
        placeholder.innerHTML = `<h3><b>${cityName}</b></h3>`;
      }
      const area = document.createElement("p");
      area.innerHTML = `<b>Area:</b> ${cityName}`;
      placeholder.append(area);
      console.log(data);
      const region = document.createElement("p");
      region.innerHTML = `<b>Region:</b> ${data.nearest_area[0].region[0].value}`;
      placeholder.append(region);
      const country = document.createElement("p");
      country.innerHTML = `<b>Country:</b> ${data.nearest_area[0].country[0].value}`;
      placeholder.append(country);
      const currently = document.createElement("p");
      currently.innerHTML = `<b>Currently:</b> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;
      placeholder.append(currently);

      const h5_1 = document.createElement("h5");
      h5_1.innerText = "Today";
      today.append(h5_1);
      const h5_2 = document.createElement("h5");
      h5_2.innerText = "Tomorrow";
      tomorrow.append(h5_2);
      const h5_3 = document.createElement("h5");
      h5_3.innerText = "Day After Tomorrow";
      dayAfter.append(h5_3);
      form.reset();
    });
});
