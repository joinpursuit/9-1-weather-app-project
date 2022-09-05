const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const threeDays = document.querySelectorAll("aside article");
const title = document.querySelector("main article");
const ul = document.querySelector("ul");
const current = document.querySelector(".current-weather");
const previousP = document.querySelector("section p");

// console.log(form1)
//search bar
// console.log(searchBar)
const project = form.addEventListener("submit", (event) => {
  const city = bar.value; //? searchbar user input
  let Base_URL = `https://wttr.in/${city}?format=j1`;
  event.preventDefault();
  form.reset();

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
      }
      if (snow > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
        current.prepend(img);
      }
      if (rain > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
        current.prepend(img);
      }
      //!Previous Searches
      //* Query select right-aside
      //* QuerySelect p tag
      //* QuerySelect ul tag
      //* Create a li to update ul
      //* Create an <a> to create hyperlink
      // const ulSearch = document.querySelector("ul");
      // console.log(ulSearch);
      const li = document.createElement("li");
      ul.append(li); //? for some reason, this had to be here. #controlFlowIssue
      const link = document.createElement("a"); //? created a tag element
      previousP.innerHTML = ""; //? To clear message in <p> when click submit
      link.innerHTML = `${area}`; //? AKA user input
      console.log(link.innerHTML);
      // const userInput = `${link.innerHTML}`;
      link.href = "#";
      li.textContent = `- ${currently}°F`; //? feels like input
      li.prepend(link); //? means link first, then temp
      // link.addEventListener("click", project);
      //?Created an event listener for the click action. It erases the values in the main and replaces it with the link inputs.
      link.addEventListener("click", () => {
        current.innerHTML = ""; //? to clear old data and replace with new one
        previousP.remove(); 
        // const area2 = document.createElement("h2"); //* created h2 to display city heading
        current.innerHTML = `<h2>${area}</h2>`; //? Main heading is user input
        current.prepend(img);
        current.append(
          // area2,
          areaP,
          regionP,
          countryP,
          currentlyP,
          sunShineP,
          rainP,
          snowP
        );
        // link.innerText = `${currentLink}`
        // current.append(currentLink);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
