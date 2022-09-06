const form = document.querySelector("form");
const main = document.querySelector("main");

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
     <p>Nearest Area::${resJson.nearest_area[0].areaName[0].value}</p>
     <p>Region:${resJson.nearest_area[0].region[0].value}</p> 
     <p>Country:${resJson.nearest_area[0].country[0].value}</p>
     <p>Currently:Feels Like${resJson.current_condition[0].FeelsLikeF}°F</p>
     <p>Chance of Sunshine:${resJson.weather[0].hourly[0].chanceofsunshine}</p>
     <p>Chance of Rain:${resJson.weather[0].hourly[0].chanceofrain}</p>
     <p>Chance of Snow:${resJson.weather[0].hourly[0].chanceofsnow}</p>`;

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

      // WIDGET - Temperature conversion

      const aside1 = document.querySelector("aside");
      aside1.after(a);
      //   const a1 = doucment.querySelector("article");
      //   a1.innerText = "Today";
    })
    .catch((error) => console.log(error));

  form.reset();
});
