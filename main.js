const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const threeDays = document.querySelector("#threeDays");
const title = document.querySelector("main article");

const ul = document.querySelector("ul");
const current = document.querySelector(".current-weather");
// console.log(form1)
//search bar
// console.log(searchBar)
form.addEventListener("submit", (event) => {
  const city = bar.value.split(" ").join("+"); //?
  let Base_URL = `https://wttr.in/${city}?format=j1`;
  event.preventDefault();
  form.reset();
  //   console.log(city);
  fetch(Base_URL)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      let area = resJson.nearest_area[0].areaName[0].value;
      //   console.log(areaP);
      if (resJson) {
        title.innerHTML = `<h2><b>${area}</b></h2>`; //!
      }
      // const weatherBut = document.querySelector("get-weather");

      const areaP = document.createElement("p");
      areaP.innerHTML = `<b>Area:</b>${area}`;
      current.append(areaP);

      const regionP = document.createElement("p");
      let region = resJson.nearest_area[0].region[0].value;
      regionP.innerHTML = `<b>Region:</b>  ${region}`;
      current.append(regionP);

      const countryP = document.createElement("p");
      const country = resJson.nearest_area[0].country[0].value;
      countryP.innerHTML = `<strong>Country:</strong> ${country}`;
      current.append(countryP);

      const currentlyP = document.createElement("p");
      const currently = resJson.current_condition[0].FeelsLikeF;
      currentlyP.innerHTML = `<b>Currently:</b>Feels Like ${currently}°F`;
      //   console.log(currentlyP);
      current.append(currentlyP);

      const today = document.querySelector("#Today");
      // today.innerText = "TODAY";
      const tomorrow = document.querySelector("#Tomorrow");
      const dayAfter = document.querySelector("#Day After Tomorrow");
      
//!THREDAYS
      threeDays.append(today, tomorrow, dayAfter);
      let avgTempF = resJson.weather[0].avgtempF;
      console.log(avgTempF);
      // let minTempF = resJson.weather[0].hourly[0].minTempF;
      // console.log(minTempF);

      //! Chance of rain, sunshine, snow
      //sunshine
      const sunShineP = document.createElement("p")
      const sunShine = resJson.weather[0].hourly[0].chanceofsunshine
      // console.log(sunShine)
      sunShineP.innerHTML=`<strong>Chance Of Sunshine:</strong>${sunShine}`
      current.append(sunShineP)
//rain
      const rainP = document.createElement("p")
      const rain = resJson.weather[0].hourly[0].chanceofrain
      rainP.innerHTML=`<strong>Chane Of Rain:</strong>${rain}`
      console.log(rain)
      current.append(rainP)
//snow
      const snowP = document.createElement("p")
      const snow = resJson.weather[0].chanceofsnow
      snowP.innerHTML=`<b>Chance of Rain:</b>${snow}`
      //!
    })
    .catch((err) => err);
});
