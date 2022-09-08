const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  

const location = event.target.location.value

const noSearch = document.querySelector(".search")
const p = document.createElement("p")
noSearch.append(p)
if (location === "") {
    p.textContent = "No previous searches"
}


const BASE_URL =`https://wttr.in/${location}?format=j1`

fetch(`${BASE_URL}`)
.then((res) => res.json())
.then((resJson) => {

    const area = resJson.nearest_area[0].areaName[0].value
    
    
    const region = resJson.nearest_area[0].region[0].value
    

    const country = resJson.nearest_area[0].country[0].value
  

    const currently = resJson.current_condition[0].FeelsLikeF
  


    const today = {
        avgTempF: resJson.weather[0].avgtempF,
        maxTempF: resJson.weather[0].maxtempF,
        minTempF: resJson.weather[0].mintempF,
    }
    

    const tomorrow = {
        avgTempF: resJson.weather[1].avgtempF,
        maxTempF: resJson.weather[1].maxtempF,
        minTempF: resJson.weather[1].mintempF,
    }
    

    const dayAfterTomorrow = {
        avgTempF: resJson.weather[2].avgtempF,
        maxTempF: resJson.weather[2].maxtempF,
        minTempF: resJson.weather[2].mintempF,
    }
   


const article = document.querySelector(".main-article")
article.innerHTML =""
const h2 = document.createElement("h2")
h2.textContent = location
article.append(h2)


const p1 = document.createElement("p")
if (location.toLowerCase() === area.toLowerCase()) {
    p1.innerHTML = `<strong>Area:</strong> ${location}`
    article.append(p1)
}
else {
    p1.innerHTML = `<strong>Nearest Area:</strong> ${area}`
article.append(p1)
}

const p2 = document.createElement("p")
p2.innerHTML = `<strong>Region:</strong> ${region}`; 
article.append(p2)

const p3 = document.createElement("p")
p3.innerHTML = `<strong>Country:</strong> ${country}`
article.append(p3)

const p4 = document.createElement("p")
p4.innerHTML = `<strong>Country:</strong> ${currently}°F`
article.append(p4)


const currentDay = document.querySelector("#today")
currentDay.innerHTML = ""
currentDay.append(`Average Temperature:${today.avgTempF}°F \n Max Temperature: ${today.maxTempF}°F \n Min Temperature${today.minTempF}°F`)

const todayHeading = document.createElement("h3")
todayHeading.textContent = "Today"
currentDay.prepend(todayHeading)

const nextDay = document.querySelector("#tomorrow")
nextDay.innerHTML = ""
nextDay.append(`Average Temperature:${tomorrow.avgTempF}°F \n Max Temperature: ${tomorrow.maxTempF}°F \n Min Temperature${tomorrow.minTempF}°F`)

const tomorrowHeading = document.createElement("h3")
tomorrowHeading.textContent = "Tomorrow"
nextDay.prepend(tomorrowHeading)

const dayAfterNextDay = document.querySelector("#day-after-tomorrow")
dayAfterNextDay.innerHTML = ""
dayAfterNextDay.append(`Average Temperature:${dayAfterTomorrow.avgTempF}°F \n Max Temperature: ${dayAfterTomorrow.maxTempF}°F \n Min Temperature${dayAfterTomorrow.minTempF}°F`)

const thirdDayHeading = document.createElement("h3")
thirdDayHeading.textContent = "Day After Tomorrow"
dayAfterNextDay.prepend(thirdDayHeading)

const li = document.createElement("li");
const a = document.createElement("a");
a.textContent = location;
a.href = `${BASE_URL}`

li.textContent = ` - ${currently}°F `;
li.prepend(a);

const search = document.querySelector("ul");
search.append(li);

a.addEventListener("click" , (e) => {
    e.preventDefault()
    console.log(e)
  
})







})
.catch((err) => 
    console.log(err)
)

form.reset()
});