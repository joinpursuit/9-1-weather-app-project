const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const today = document.querySelector("#Today")
const tomorrow = document.querySelector("#Tomorrow")
const dayAfter= document.querySelector("#Day After Tomotrrow")
const current = document.querySelector(".current-weather")
const ul = document.querySelector("ul")
// console.log(form1)
//search bar
// console.log(searchBar)
form.addEventListener("submit", (event) => {
  event.preventDefault();
    form.reset();
  const city = bar.value.split(" ").join("+"); //?
//   console.log(city);
  let Base_URL = `http://wttr.in/${city}?format=j1`;

  fetch(Base_URL)
    .then((res) => res.json())
    .then((resJson) => {
        console.log(resJson)
        const areaP = document.createElement("p")
        let area = resJson.nearest_area[0].areaName[0].value
        areaP.textContent= `${area}`
        console.log(areaP);
current.append(areaP)

        const regionP = document.createElement("p")
        let region = resJson.nearest_area[0].region[0].value
        regionP.textContent=`${region}`
        current.append(regionP)

     const countryP = document.createElement("p")
    const country = resJson.nearest_area[0].country[0].value
    current.append(countryP)

    const currentlyP = document.createElement("p")
        const currently = resJson.current_condition[0].FeelsLikeF
        console.log(currentlyP)
    current.append(currently)
  
    })
    .catch((err) => err);
});
//!
// form1.addEventListener("submit", (event)=>{
//     event.preventDefault()
// searchBar.addEventListener("submit", (e)=>{
//     searchBar.textContent
// })

// })
