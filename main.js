const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const threeDays = document.querySelectorAll("aside article");
const title = document.querySelector("main article");

const ul = document.querySelector("ul");
const current = document.querySelector(".current-weather");
// console.log(form1)
//search bar
// console.log(searchBar)
const project = form.addEventListener("submit", (event) => {
  const city = bar.value; //?
  let Base_URL = `https://wttr.in/${city}?format=j1`;
  event.preventDefault();
  form.reset();
  //   console.log(city);
  fetch(Base_URL)
    .then((res) => res.json())
    .then((resJson) => {
      // console.log(resJson);
      let area = resJson.nearest_area[0].areaName[0].value;
      //   console.log(areaP);
      if (resJson) {
        title.innerHTML = `<h2>${city}</h2>`; //!
      }
      // const weatherBut = document.querySelector("get-weather");

      const areaP = document.createElement("p");
      areaP.innerHTML = `<b>Nearest Area:</b>${area}`;
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
      const dayAfter = document.querySelector("#Day-After-Tomorrow");

      //!THREEDAYS --> create a loop to go iterate and update the days.
      //? Use let instead of const because it needs to update after every loop.
      let days = ["Today", "Tomorrow", "Day After Tomorrow"];
      for (let i = 0; i < threeDays.length; i++) {
        threeDays[i].innerHTML = "";
        //* Create an element to hold the temp days
        let tempDays = document.createElement("p");

        //* temDays should be able to hold days
        tempDays.textContent = days[i];

        //avg -->
        let avgP = document.createElement("p");
        const avgTempF = resJson.weather[i].avgtempF;
        avgP.innerHTML = `<b>Average Temeprature:</b>${avgTempF}°F`;
        //min
        let minP = document.createElement("p");
        const minTempF = resJson.weather[i].mintempF;
        minP.innerHTML = `<strong>Min Temperature:</strong>${minTempF}°F`;
        // max
        let maxTempP = document.createElement("p");
        const maxTempF = resJson.weather[i].maxtempF;
        maxTempP.innerHTML = `<b>Max Temperature:</b>${maxTempF}°F`;
        threeDays[i].append(tempDays, avgP, maxTempP, minP);
      }

      //! Chance of rain, sunshine, snow
      const img = document.createElement("img");

      //sunshine
      const sunShineP = document.createElement("p");
      const sunShine = resJson.weather[0].hourly[0].chanceofsunshine;
      sunShineP.innerHTML = `<b>Chance of Sunshine:</b> ${sunShine}`;

      current.append(sunShineP);
      //rain
      const rainP = document.createElement("p");
      const rain = resJson.weather[0].hourly[0].chanceofrain;
      rainP.innerHTML = `<strong>Chance of Rain:</strong>${rain}`;

      current.append(rainP);
      //snow
      const snowP = document.createElement("p");
      const snow = resJson.weather[0].hourly[0].chanceofsnow;
      snowP.innerHTML = `<b>Chance of Snow:</b>${snow}`;

      current.append(snowP);
      // current.append(regionP, countryP, currentlyP, sunShine, rain, snow);
      // //! ICONS
      if (sunShine > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.alt = "sun";
        current.prepend(img);
      } else if (rain > 50) {
        img.src = "./assets/icons8-torrential-rain.gif";
        img.settAttribute("alt", "rain");
        current.prepend(img);
      } else if (snow > 50) {
        img.src = "./assets/icons8-light-snow.gif";
        img.settAttribute("alt", "snow");
        current.prepend(img);
      }
      //!Previous Searches
      //* Query select right-aside
      //* QuerySelect p tag
      //* QuerySelect ul tag
      //* Create a li to update ul
      //* Create an <a> to create hyperlink

      const previousP = document.querySelector("section p");
      // console.log(ul);
      const ul = document.querySelector("ul");
      let li = document.createElement("li");
      ul.append(li);

      let link = document.createElement("a");
      previousP.innerHTML = ""; //? To clear message in <p> when click submit
      link.innerText = `${area}`;//? AKA user input
      link.href = "#";
      li.textContent = `${currently}°F`;
      li.prepend(link);

      // link.addEventListener("click", project);
       link.addEventListener("click", (event) => {
        // event.preventDefault();
        current.innerHTML="" //? to clear old data and replace with new one
      // link.reset()
      let area2 = document.createElement("h2") // created h2 to display city heading
      area2.innerHTML = `${area}`; //city heading is user input
      
        let currentLink = current.append(
          img,
          area2,
          areaP,
          regionP,
          countryP,
          currentlyP,
          sunShine,
          rain,
          snow
        );
        // link.innerText = `${currentLink}`
        // current.append(cu);
      });

      // let searchValue =`${city}`
      // // style.textAlign ="Right"
      // const searchV = document.createElement("h3")
      // searchV.innerHTML=`${city}`
      // areaP.prepend(searchV)
    })
    .catch((err) => err);
});

