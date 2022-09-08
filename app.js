const div = document.querySelector(".content")

const widget = document.querySelector(".widget")
div.prepend(widget)


const main = document.querySelector("main")


const aside = document.querySelector(".search")

const section = document.createElement("section")
section.setAttribute("class","history")
aside.append(section)

const h4 = document.createElement("h4")

h4.textContent = "Previous Searches"
section.append(h4)

const ul = document.createElement("ul")
section.append(ul)


const li = document.createElement("li")
ul.append(li)


// const BASE_URL = `https://wttr.in/Detroit?format=j1`

const form = document.querySelector("form");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event)

if (event.target.location.value === "") {
    const p = document.createElement("p")
    p.textContent = "Choose a location to view the weather"
    main.append(p)
}

const location = event.target.location.value
console.log(location)

const BASE_URL =`https://wttr.in/${location}?format=j1`

fetch(`${BASE_URL}`)
.then((res) => res.json())
.then((resJson) => {
    console.log(resJson.current_condition)
    console.log(resJson)
const main = document.querySelector("main")
const article = document.createElement("article")
main.append(article)

const h2 = document.createElement("h2")
h2.textContent = location[0].toUpperCase() + location.slice(1)
article.append(h2)


 
const p1 = document.createElement("p")
const p2 = document.createElement("p")
const p3 = document.createElement("p")
const p4 = document.createElement("p")


p1.textContent = `Area: ${resJson.nearest_area[0].areaName[0].value}`
main.append(p1) 
p2.textContent =`Region: ${resJson.nearest_area[0].region[0].value}`
main.append(p2)
p3.textContent = `Country: ${resJson.nearest_area[0].country[0].value}`
main.append(p3)
p4.textContent = `Currently: ${resJson.current_condition[0].FeelsLikeF}°F`
main.append(p4)

// section above is declared
const aside = document.createElement("aside")
main.append(aside)
aside.setAttribute("class", "three")

const article1 = document.createElement("article")
article1.setAttribute("class", "today")
aside.append(article1)

const article2 = document.createElement("article")
article2.setAttribute("class", "tomorrow")
aside.append(article2)

const article3 = document.createElement("article")
article3.setAttribute("class", "day-after-tommorow")
aside.append(article3)

article1.textContent = `Average Temprature:${resJson.weather[0].avgtempF}°F Max Temperature: ${resJson.weather[0].maxtempF}°F Min Temperature: ${resJson.weather[0].maxtempF}°F`

article2.textContent = `Average Temprature:${resJson.weather[1].avgtempF}°F Max Temperature: ${resJson.weather[1].maxtempF}°F Min Temperature: ${resJson.weather[1].maxtempF}°F`

article3.textContent = `Average Temprature:${resJson.weather[2].avgtempF}°F Max Temperature: ${resJson.weather[2].maxtempF}°F Min Temperature: ${resJson.weather[2].maxtempF}°F`

})
.catch((err) => 
    console.log(err)
)
 
form.reset()
});



















