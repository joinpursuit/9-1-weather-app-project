const form = document.querySelector("form");
const main = document.querySelector("main");
let prevSearchLocation = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchLocation = event.target.search.value;
  const Base_URL = `https://wttr.in/${searchLocation}?format=j1`;

  fetch(`${Base_URL}`)
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);

      document.querySelector("article.location").innerHTML = `
     <h2>${searchLocation}</h2>
     <p>Nearest Area: ${resJson.nearest_area[0].areaName[0].value}</p>
     <p>Region: ${resJson.nearest_area[0].region[0].value}</p> 
     <p>Country: ${resJson.nearest_area[0].country[0].value}</p>
     <p>Currently:Feels Like ${resJson.current_condition[0].FeelsLikeF}°F</p>
     <p>Chance of Sunshine: ${resJson.weather[0].hourly[0].chanceofsunshine}</p>
     <p>Chance of Rain: ${resJson.weather[0].hourly[0].chanceofrain}</p>
     <p>Chance of Snow: ${resJson.weather[0].hourly[0].chanceofsnow}</p>`;

      // listing today weather average, max and min temperature
      document.querySelector("article.Today").innerHTML = `
      <h3>Today</h3>
      <p>Average Temperature: ${resJson.weather[0].avgtempF}°F</p>
      <p>Max Temperature: ${resJson.weather[0].maxtempF}°F</p>
      <p>Min Temperature: ${resJson.weather[0].mintempF}°F</p>`;

      // listing tomorrow weather average, max and min temperature
      document.querySelector("article.Tomorrow").innerHTML = `
      <h3>Tomorrow</h3>
      <p>Average Temperature: ${resJson.weather[1].avgtempF}°F</p>
      <p>Max Temperature: ${resJson.weather[1].maxtempF}°F</p>
      <p>Min Temperature: ${resJson.weather[1].mintempF}°F</p>`;

      // listing Day after tomorrow average, max and min temperature
      document.querySelector("article.AfterTomorrow").innerHTML = `
      <h3>Day After Tomorrow</h3>
      <p>Average Temperature: ${resJson.weather[2].avgtempF}°F</p>
      <p>Max Temperature: ${resJson.weather[2].maxtempF}°F</p>
      <p>Min Temperature: ${resJson.weather[2].mintempF}°F</p>`;

      aside1.location.append(
        article.Today,
        article.tomorrow,
        article.AfterTomrrow
      );

      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.textContent = searchLocation;
      anchor.setAttribute("href", "#");

      if (!prevSearchLocation.includes(searchLocation)) {
        li.append(anchor);
        ul.append(li);
        prevSearchLocation.push(searchLocation);
      }

      anchor.addEventListener("click", (event) => {
        event.preventDefault();

        anchor + `${anchor.current_condition[0].FeelsLikeF}°F`;
      });

      //  ICON based on data changes
      const img = document.createElement("img");
      const chanceOfSunshine = resJson.weather[0].hourly[0].chanceofsunshine;
      if (chanceOfSunshine > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
      }

      const chanceOfRain = resJson.weather[0].hourly[0].chanceofrain;
      if (chanceOfRain > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
      }
      const chanceOfSnow = resJson.weather[0].hourly[0].chanceofsnow;
      if (chanceOfSnow > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
      }

      main.append(img);

      // WIDGET - Temperature conversion

      const aside1 = document.querySelector("aside.Conversion");
      const label1 = document.createElement("label");
      aside1.append(label1);
      const form1 = document.createElement("form");
      label1.append(form1);

      // form1.addEventListener("submit", (event) => {
      //   event.preventDefault();
      // });

      //   const a1 = doucment.querySelector("article");
      //   a1.innerText = "Today";
    })
    .catch((error) => console.log(error));

  form.reset();
});
