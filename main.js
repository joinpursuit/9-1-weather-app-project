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
        title.innerHTML = `<h2><b>${city}</b></h2>`; //!
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

      //!Previous Searches
      //* Query select right-aside
      //* QuerySelect p tag
      //* QuerySelect ul tag
      //* Create a li to update ul 
      //* Create an <a> to create hyperlink
      const history = document.querySelector('.right-aside')
      // console.log(history)
      const previousP = document.querySelector('section p')
      console.log(previousP)
       previousP.innerHTML="" // To clear message when submit
     console.log(ul)
     let li = document.createElement('li')

     let link = document.createElement("a")
     link.href = "#"  
     console.log(link)
     link.textContent = `${area}`
li.innerHTML =`${link} - ${currently}°F`
li.prepend(link)
ul.append(li)
 
link.addEventListener("click", (project)
)

// link.addEventListener("click", (event)=>{
//   event.preventDefault()
// })



 //! Conversion
//       //? if the temp is in celscius apply the conversion formula to change to F((TEMPERATURE°F − 32) × 5/9 = 0°C), vice versa(F--> (TEMPERATURE°C × 9/5) + 32 = 89.6°F).
//       //*Created an event listener.. submit was resting page
//       conversionType.addEventListener("submit", (event)=>{
//         event.preventDefault()
      
//       const conversionType = document.querySelector(".left-aside")
//       console.log(conversionType)
//       let input = document.querySelector("#temp-to-convert"); // temp input search bar.. always changing
//       // console.log(input);
//       let tempInput = document.querySelector("h4"); // store results for converion
//       // console.log(tempInput)
//       //* select radio button
//       const celButton = document.querySelector("#to-c");
//       // console.log(celButton)
//       const fahButton = document.querySelector("#to-f");
//       // console.log(fahButton)

//       if(celButton.checked = true){
// tempInput.innerText=((input * 9/5) + 32)
// console.log() 
//       }
//     })

      // let searchValue =`${city}`
      // // style.textAlign ="Right"
      // const searchV = document.createElement("h3")
      // searchV.innerHTML=`${city}`
      // areaP.prepend(searchV)
    })
    .catch((err) => err);
  

});
