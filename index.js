let form = document.querySelector("form");
let search = document.querySelector("#search");
let weekly = document.querySelectorAll("aside article");
let display = document.querySelector("main article");
let ul = document.querySelector("ul");
let current = document.querySelector(".current-weather");
let history = document.querySelector("section p");



form.addEventListener("submit", (event) => {
    //SEE WHY THE SUBMIT FUNCTION DIDN'T WORK
  let city = search.value; 
  let URL = `https://wttr.in/${city}?format=j1`;
  event.preventDefault();
  form.reset();
  

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        let area = data.nearest_area[0].areaName[0].value;
        let areaP = document.createElement("p");
        let region = data.nearest_area[0].region[0].value;
        let regionP = document.createElement("p");
        let country = data.nearest_area[0].country[0].value;
        let countryP = document.createElement("p");
        let currently = data.current_condition[0].FeelsLikeF;
        let currentlyP = document.createElement("p");
        let daily = document.createElement("p");
        let img = document.createElement("img");
        let sun = document.createElement("p");
        let rainP = document.createElement("p");
        let snowP = document.createElement("p");
        let today = ["Today"];
        let tomorrow = ["Tomorrow"]
        let dayAfter = ["Day After"]
        
      if (data) {
        display.innerHTML = `<h2>${city}</h2>`; 
      }

      areaP.innerHTML = `<strong>Nearest Area:</strong>${area}`;
      current.append(areaP);

     
      regionP.innerHTML = `<strong>Region:</strong>  ${region}`;
      current.append(regionP);

     
      countryP.innerHTML = `<strong>Country:</strong> ${country}`;
      current.append(countryP);

     
      currentlyP.innerHTML = `<strong>Currently:</strong>Feels Like ${currently}°F`;
     
      current.append(currentlyP);

      one.append(today)
      two.append(tomorrow)
      three.append(dayAfter)
      //THIS IS NOT WORKING AT ALL

      for (let i = 0; i < weekly.length; i++) {
        //MAYBE CHANGE TO FOREACH?
        weekly[i].innerHTML = "";


        daily.textContent = today[i],tomorrow[i], dayAfter[i]
        //THIS DOESNT DISPLAY COME BACK AND FIX
        
        let minP = document.createElement("p");
        let min = data.weather[i].mintempF;
        minP.innerHTML = `<strong>Min Temperature:</strong>${min}°F`;
       
        let maxTempP = document.createElement("p");
        let max = data.weather[i].maxtempF;
        maxTempP.innerHTML = `<strong>Max Temperature:</strong>${max}°F`;

        let avgP = document.createElement("p");
        let average = data.weather[i].avgtempF;
        avgP.innerHTML = `<strong>Average Temeprature:</strong>${average}°F`;
        weekly[i].append( daily, avgP, maxTempP, minP);
      }

     
      let sunShine = data.weather[0].hourly[0].chanceofsunshine;
      sun.innerHTML = `<strong>Chance of Sunshine:</strong> ${sunShine}`;
      current.append(sun);
    
      let rain = data.weather[0].hourly[0].chanceofrain;
      rainP.innerHTML = `<strong>Chance of Rain:</strong>${rain}`;
      current.append(rainP);
   
      let snow = data.weather[0].hourly[0].chanceofsnow;
      snowP.innerHTML = `<strong>Chance of Snow:</strong>${snow}`;
      current.append(snowP);

      
        if (sunShine > 50) {
            img.setAttribute("src","./assets/icons8-summer.gif");
            img.alt = "sun";
            current.prepend(img);
          }
        if (snow > 50) {
            img.setAttribute("src","./assets/icons8-light-snow.gif");
            img.setAttribute("alt","snow");
            current.prepend(img);
          }
        if (rain > 50) {
            img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
            img.setAttribute("alt", "rain");
            current.prepend(img);
          }
      
  
      let li = document.createElement("li");

      ul.append(li);

      let userInput = document.createElement("a"); 

      history.innerHTML = ""; 
      userInput.innerHTML = `${city}`; 
      userInput.href = "#";
      li.textContent = `- ${currently}°F`; 
      li.prepend(userInput); 

      userInput.addEventListener("click", () => {
        current.innerHTML = ""; 
        history.remove();
        let location = document.createElement("h2"); 
        location.innerHTML = `<h2>${city}</h2>`; 
        current.prepend(img);
        current.append(
          location,
          areaP,
          regionP,
          countryP,
          currentlyP,
          sun,
          rainP,
          snowP
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

