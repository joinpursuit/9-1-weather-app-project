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
      // if (resJson.nearest_area[0].areaName[0].value !== searchLocation) {
      //   `<p>nearest_area: ${resJson.nearest_area[0].areaName[0].value}</p>`;
      // }

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

      //  ICON based on data changes
      const img = document.createElement("img");
      const sunShine = resJson.weather[0].hourly[0].chanceofsunshine;
      const rainFall = resJson.weather[0].hourly[0].chanceofrain;
      if (document.querySelector("img")) {
        document.querySelector("img").remove();
      }
      if (sunShine > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
        main.prepend(img);
      }

      if (rainFall > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
        main.prepend(img);
      }

      const snowFall = resJson.weather[0].hourly[0].chanceofsnow;
      if (snowFall > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
        main.prepend(img);
      }

      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.innerHTML += searchLocation;
      // + `${anchor.current_condition[0].FeelsLikeF°F`;
      anchor.setAttribute("href", "#");

      if (!prevSearchLocation.includes(searchLocation)) {
        li.append(anchor);
        ul.append(li);
        prevSearchLocation.push(searchLocation);
      }

      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const newsearchLocation = anchor.innerText;
        fetch(`https://wttr.in/${newsearchLocation}?format=j1`)
          .then((response) => response.json())
          .then((resJson) => {
            console.log(resJson);

            document.querySelector("article.location").innerHTML = `
     <h2>${newsearchLocation}</h2>
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

            //  ICON based on data changes
            const img = document.createElement("img");
            const sunShine = resJson.weather[0].hourly[0].chanceofsunshine;
            const rainFall = resJson.weather[0].hourly[0].chanceofrain;
            if (document.querySelector("img")) {
              document.querySelector("img").remove();
            }
            if (sunShine > 50) {
              img.setAttribute("src", "./assets/icons8-summer.gif");
              img.setAttribute("alt", "sun");
              main.prepend(img);
            }

            if (rainFall > 50) {
              img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
              img.setAttribute("alt", "rain");
              main.prepend(img);
            }

            const snowFall = resJson.weather[0].hourly[0].chanceofsnow;
            if (snowFall > 50) {
              img.setAttribute("src", "./assets/icons8-light-snow.gif");
              img.setAttribute("alt", "snow");
              main.prepend(img);
            }

            const ul = document.querySelector("ul");
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.innerHTML = newsearchLocation;
            // `feels like ${anchor.current_condition[0].FeelsLikeF}°F`;
            anchor.setAttribute("href", "#");

            if (!prevSearchLocation.includes(newsearchLocation)) {
              li.append(anchor);
              ul.append(li);
              prevSearchLocation.push(newsearchLocation);
            }
          })
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => console.log(error));
  form.reset();
});

const aside = document.querySelector(".Conversion");
const input = document.querySelector(".temp-to-convert");
const form1 = document.querySelector(".widget");
const Celsius = document.getElementById("to-c");
const Fahrenheit = document.getElementById("to-f");
const results = document.querySelector(".results");

let conversion = 0;

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);

  if (Celsius.checked) {
    conversion = (event.target.temp.value - 32) * (5 / 9);
  } else if (Fahrenheit.checked) {
    conversion = event.target.temp.value * (9 / 5) + 32;
  }
  conversion = conversion.toFixed(2);
  results.innerHTML = conversion;
});
