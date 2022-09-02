const form = document.querySelector("form");
// console.log(form);
const main = document.querySelector("main");
// console.log(main);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = document.querySelector("#city");

  //assign the value of what's entered in text field to a variable
  let input = searchValue.value.split(" ").join(" ");

  const url = `http://wttr.in/${input}?format=j1`;
  form.reset();
  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);

      const hiddenP = document.querySelector(".hidden");
      hiddenP.innerHTML = `<h2>${input}</h2>`;

      const areaName = resJson.nearest_area[0].areaName[0].value;
      //   console.log(areaName);
      const areaP = document.createElement("p");
      areaP.innerHTML = `<strong>Nearest Area: </strong>${areaName}`;
      const location = document.querySelector(".hidden");
      location.append(areaP);

      const areaRegion = resJson.nearest_area[0].region[0].value;
      const regionP = document.createElement("p");
      regionP.innerHTML = `<strong>Region: </strong>${areaRegion}`;
      location.append(regionP);

      const areaCountry = resJson.nearest_area[0].country[0].value;
      const countryP = document.createElement("p");
      countryP.innerHTML = `<strong>Country: </strong>${areaCountry}`;
      location.append(countryP);

      const feelslike = resJson.current_condition[0].FeelsLikeF;
      const feelslikeFP = document.createElement("p");
      feelslikeFP.innerHTML = `<strong>Currently: </strong>Feels Like ${feelslike}°F`;
      location.append(feelslikeFP);

      const sunny = resJson.weather[0].hourly[0].chanceofsunshine;
      const sunnyP = document.createElement("p");
      sunnyP.innerHTML = `<strong>Chance of Sunshine: </strong>${sunny}`;
      location.append(sunnyP);

      const rainny = resJson.weather[0].hourly[0].chanceofrain;
      const rainnyP = document.createElement("p");
      rainnyP.innerHTML = `<strong>Chance of Rain: </strong>${rainny}`;
      location.append(rainnyP);

      const snowy = resJson.weather[0].hourly[0].chanceofsnow;
      const snowyP = document.createElement("p");
      snowyP.innerHTML = `<strong>Chance of Snow: </strong>${snowy}`;
      location.append(snowyP);

      const img = document.createElement("img");
      if (sunny > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
        hiddenP.prepend(img);
      } else if (rainny > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
        hiddenP.prepend(img);
      } else if (snowy > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
        hiddenP.prepend(img);
      }
    })
    .catch((err) => console.log(err));
});
