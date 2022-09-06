const form = document.querySelector("form")
// const searchLocation = document.querySelector("#location").value
const BASE_URL = `http://wttr.in/${document.querySelector("#location").value}?format=j1`
const heading = document.querySelector(".main_location")
const article = document.querySelector("article")
const main = document.querySelector("main")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch(`http://wttr.in/${document.querySelector("#location").value}?format=j1`)
    .then((res) => res.json())
    .then((res) => {
        const searchLocationH = document.createElement("h3")
        searchLocationH.innerHTML = res.nearest_area[0].areaName[0].value
        const area = document.createElement("p")
        area.innerHTML = `Area: ${res.nearest_area[0].areaName[0].value}`
        const region = document.createElement("p")
        region.innerHTML = `Region: ${res.nearest_area[0].region[0].value}`
        // console.log(region.innerHTML)
        const country = document.createElement("p")
        country.innerHTML = `Country: ${res.nearest_area[0].country[0].value}`
        const currently = document.createElement("p")
        currently.innerHTML = `Currently: Feels Like ${res.current_condition[0].FeelsLikeF}°F`
        heading.remove()
        article.prepend(currently)
        article.prepend(country)
        article.prepend(area)
        main.prepend(searchLocationH)


    })
})