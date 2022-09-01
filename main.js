const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const today = document.querySelector("#Today");
const tomorrow = document.querySelector("#Tomorrow");
const dayAfter = document.querySelector("#Day After Tomotrrow");
const current = document.querySelector(".history");
const ul = document.querySelector("ul");
const curWeather = document.querySelector(".current-weather")
// console.log(form1)
//search bar
// console.log(searchBar)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  const city = bar.value //?
  //   console.log(city);
  let Base_URL = `https://wttr.in/${city}?format=j1`;
// let Base_URL2= 'http://wttr.in/Melbourne?format=j1'
  fetch(Base_URL)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      const weatherBut = document.querySelector("get-weather")
      
      const areaP = document.createElement("p");
      let area = resJson.nearest_area[0].areaName[0].value;
      areaP.innerHTML = `<b>Area:</b>${area}`;
    //   console.log(areaP);
      current.append(areaP);

      const regionP = document.createElement("p");
      let region = resJson.nearest_area[0].region[0].value;
      regionP.innerHTML = `<b>Region:</b>  ${region}`;
      current.append(regionP);

      const countryP = document.createElement("p");
      const country = resJson.nearest_area[0].country[0].value;
      countryP.innerHTML = `<b>Country:</b> ${country}`;
      current.append(countryP);

      const currentlyP = document.createElement("p");
      const currently = resJson.current_condition[0].FeelsLikeF;
      currentlyP.innerHTML = `<b>Currently:</b>Feels Like ${currently}°F`;
    //   console.log(currentlyP);
      current.append(currentlyP);
if(resJson){
    curWeather.innerHTML = `<h2><b>${area}</b></h2>`
}
//  const today   
    
    })
    .catch((err) => err);
});

