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
      areaP.innerHTML = `<strong>Nearest Area: </strong> ${areaName}`;
      const location = document.querySelector(".hidden");
      location.append(areaP);

      const areaRegion = resJson.nearest_area[0].region[0].value;
      const regionP = document.createElement("p");
      regionP.innerHTML = `<strong>Region: </strong> ${areaRegion}`;
      location.append(regionP);

      const areaCountry = resJson.nearest_area[0].country[0].value;
      const countryP = document.createElement("p");
      countryP.innerHTML = `<strong>Country: </strong> ${areaCountry}`;
      location.append(countryP);

      const feelslike = resJson.current_condition[0].FeelsLikeF;
      const feelslikeFP = document.createElement("p");
      feelslikeFP.innerHTML = `<strong>Currently: </strong> Feels Like ${feelslike}°F`;
      location.append(feelslikeFP);

      const sunny = resJson.weather[0].hourly[0].chanceofsunshine;
      const sunnyP = document.createElement("p");
      sunnyP.innerHTML = `<strong>Chance of Sunshine: </strong> ${sunny}`;
      location.append(sunnyP);

      const rainny = resJson.weather[0].hourly[0].chanceofrain;
      const rainnyP = document.createElement("p");
      rainnyP.innerHTML = `<strong>Chance of Rain: </strong> ${rainny}`;
      location.append(rainnyP);

      const snowy = resJson.weather[0].hourly[0].chanceofsnow;
      const snowyP = document.createElement("p");
      snowyP.innerHTML = `<strong>Chance of Snow: </strong> ${snowy}`;
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

      // grab the 3 article inside "aside" inside "main"
      const toDay = document.querySelector(".today");
      const todayAvgP = document.createElement("p");
      const todayMaxP = document.createElement("p");
      const todayMinP = document.createElement("p");
      toDay.innerHTML = `<h2>Today</h2>`;

      // this is for "Today average temperature"
      const todayAvg = resJson.weather[0].avgtempF;
      todayAvgP.innerHTML = `<strong>Average Temperature: </strong>${todayAvg}°F`;
      // this is for "Today Max temperature"
      const todayMax = resJson.weather[0].maxtempF;
      todayMaxP.innerHTML = `<strong>Max Temperature: </strong>${todayMax}°F`;
      // this is for "Today Min temperature"
      const todayMin = resJson.weather[0].mintempF;
      todayMinP.innerHTML = `<strong>Min Temperature: </strong>${todayMin}°F`;
      toDay.append(todayAvgP, todayMaxP, todayMinP);
      // Today done

      const tomorrow = document.querySelector(".tomorrow");
      const tomorrowAvgP = document.createElement("p");
      const tomorrowMaxP = document.createElement("p");
      const tomorrowMinP = document.createElement("p");
      tomorrow.innerHTML = `<h2>Tomorrow</h2>`;

      // this is for "tomorrow average temperature"
      const tomorrowAvg = resJson.weather[1].avgtempF;
      tomorrowAvgP.innerHTML = `<strong>Average Temperature: </strong>${tomorrowAvg}°F`;
      // this is for "tomorrow Max temperature"
      const tomorrowMax = resJson.weather[1].maxtempF;
      tomorrowMaxP.innerHTML = `<strong>Max Temperature: </strong>${tomorrowMax}°F`;
      // this is for "tomorrow Min temperature"
      const tomorrowMin = resJson.weather[1].mintempF;
      tomorrowMinP.innerHTML = `<strong>Min Temperature: </strong>${tomorrowMin}°F`;
      tomorrow.append(tomorrowAvgP, tomorrowMaxP, tomorrowMinP);
      // tomorrow done

      const afterTomorrow = document.querySelector(".afterTomorrow");
      const afterTomorrowAvgP = document.createElement("p");
      const afterTomorrowMaxP = document.createElement("p");
      const afterTomorrowMinP = document.createElement("p");
      afterTomorrow.innerHTML = `<h2>After Tomorrow</h2>`;

      // this is for "after tomorrow average temperature"
      const afterTomorrowAvg = resJson.weather[2].avgtempF;
      afterTomorrowAvgP.innerHTML = `<strong>Average Temperature: </strong>${afterTomorrowAvg}°F`;
      // this is for "after tomorrow Max temperature"
      const afterTomorrowMax = resJson.weather[2].maxtempF;
      afterTomorrowMaxP.innerHTML = `<strong>Max Temperature: </strong>${afterTomorrowMax}°F`;
      // this is for "after tomorrow Min temperature"
      const afterTomorrowMin = resJson.weather[2].mintempF;
      afterTomorrowMinP.innerHTML = `<strong>Min Temperature: </strong>${afterTomorrowMin}°F`;
      afterTomorrow.append(
        afterTomorrowAvgP,
        afterTomorrowMaxP,
        afterTomorrowMinP
      );

      // SEARCH HISTORY
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const a = document.createElement("a");
      // console.log(ul);
      ul.append(li);
      //   console.log(li);
      a.innerHTML = `${input}`;
      a.setAttribute("href", `#`);
      li.innerHTML = `- ${feelslike}°F`;
      li.prepend(a);
      const hideP = document.querySelector("section p");
      const comingUp = document.querySelector(".upComing");
      hideP.innerHTML = "";
      hideP.remove();
      li.addEventListener("click", () => {
        location.innerHTML = "";
        location.innerHTML = `<h2>${input}</h2>`;
        // toDay.innerHTML = "";
        // tomorrow.innerHTML = "";
        // afterTomorrow.innerHTML = "";
        location.prepend(img);
        location.append(
          areaP,
          areaRegion,
          areaCountry,
          feelslikeFP,
          sunnyP,
          rainnyP,
          snowyP
        );
        comingUp.append(toDay, tomorrow, afterTomorrow);
      });
    })
    .catch((err) => console.log(err));
});

// CONVERSION
convert.addEventListener("submit", (event) => {
  event.preventDefault();

  let userInput = event.target.temp.value;
  console.log(userInput);
  let converted = 0;

  if (document.querySelector("#to-c").checked) {
    converted = (userInput - 32) * (5 / 9);
    document.querySelector("#result").innerHTML = `${converted.toFixed(2)}°C`;
  } else if (document.querySelector("#to-f").checked) {
    converted = userInput * (9 / 5) + 32;
    document.querySelector("#result").innerHTML = `${converted.toFixed(2)}°F`;
  }
});
