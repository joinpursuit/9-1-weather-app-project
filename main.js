const form = document.querySelector("form");

form.addEventListener("submit", (e) => {

  e.preventDefault();
  
  let userInput = e.target["input"].value

  cityInfo(userInput, true);

  e.target.reset();
});

function addToPreviousSearch(city, temp) {

  const previousSearch = document.querySelector("ul");
  const p = document.querySelector("aside p");
  const a = document.createElement("a");
  let previousSearch1 = document.createElement("li");

  a.setAttribute("href", "#");
  a.textContent = city;
  previousSearch1.textContent += `-${temp}°F`;
  previousSearch1.prepend(a);

  if (p) {
    p.remove();
  }

  previousSearch.append(previousSearch1);

  a.addEventListener("click", (e) => {
    cityInfo(e.target.textContent, false);
  });
}

function cityInfo(userInput, AddOrNot) {
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((res) => res.json())
    .then((data) => {
      
      // if(userInput.charAt(0) !== userInput.charAt(0).toUpperCase()){
      //   //Only works for one word city
      //   userInput = userInput.charAt(0).toUpperCase()+userInput.slice(1);
      // }

      //userInput main data
      let areaVal = data.nearest_area[0].areaName[0]["value"];
      let regionVal = data.nearest_area[0].region[0]["value"];
      let countryVal = data.nearest_area[0].country[0]["value"];
      let currentlyVal = data.current_condition[0]["FeelsLikeF"];

      //Today Forcast
      let todayAvg = data.weather[0]["avgtempF"];
      let todayMax = data.weather[0]["maxtempF"];
      let todayMin = data.weather[0]["mintempF"];

      //Tomorrow Forcast
      let tomorrowAvg = data.weather[1]["avgtempF"];
      let tomorrowMax = data.weather[1]["maxtempF"];
      let tomorrowMin = data.weather[1]["mintempF"];

      //Day After
      let dayAfterTAvg = data.weather[2]["avgtempF"];
      let dayAfterTMax = data.weather[2]["maxtempF"];
      let dayAfterTMin = data.weather[2]["mintempF"];

      let mainData = document.querySelector("#main-data");
    
      let areaOrNearest = ''

      if(userInput !== areaVal){
        areaOrNearest = "Nearest Area"
      } else {
        areaOrNearest = "Area"
      }

      mainData.innerHTML = `
       <h2>${userInput}</h2>
       <p><strong>${areaOrNearest}:</strong> ${areaVal}</p>
       <p><strong>Region:</strong> ${regionVal}</p>
       <p><strong>Country:</strong> ${countryVal}</p>
       <p><strong>Currently:</strong> ${currentlyVal}°F</p>
       `;

      let futureForcast = document.querySelector("#future-forcast");
      futureForcast.innerHTML = `
      <article>
      <h3>Today</h3>
      <div><strong>Average Temperature:</strong> ${todayAvg}°F</div>
      <div><strong>Max Temparture:</strong> ${todayMax}°F</div>
      <div><strong>Min Temparture:</strong> ${todayMin}°F</div>
      </article>
      <article>
      <h3>Tomorrow</h3>
      <div><strong>Average Temperature:</strong> ${tomorrowAvg}°F</div>
      <div><strong>Max Temparture:</strong> ${tomorrowMax}°F</div>
      <div><strong>Min Temparture:</strong> ${tomorrowMin}°F</div>
      </article>
      <article>
      <h3>Day After Tomorrow</h3>
      <div><strong>Average Temperature:</strong> ${dayAfterTAvg}°F</div>
      <div><strong>Max Temparture:</strong> ${dayAfterTMax}°F</div>
      <div><strong>Min Temparture:</strong> ${dayAfterTMin}°F</div>
      </article>
       `;
       
      if (AddOrNot) {
        addToPreviousSearch(userInput, currentlyVal);
      }
    })
    .catch((err) => console.log(err));
}
