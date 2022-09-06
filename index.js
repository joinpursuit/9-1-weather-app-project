const form = document.querySelector("form")
// const searchLocation = document.querySelector("#location").value
const BASE_URL = `http://wttr.in/${document.querySelector("#location").value}?format=j1`
const heading = document.querySelector(".main_location")
const article = document.querySelector("article")
const main = document.querySelector("main")
const tempP = document.querySelector(".temp_p")
const sideBar = document.querySelector(".sidebar")
const ul = document.querySelector("ul")


function createWeatherInfo(results) {
    const weatherSection = document.createElement("section")
    const searchLocationH = document.createElement("h3")
    const region = document.createElement("p")
    const area = document.createElement("p")
    const country = document.createElement("p")
    const currently = document.createElement("p")
    const li = document.createElement("li")


    searchLocationH.innerHTML = results.nearest_area[0].areaName[0].value
        
    area.innerHTML = `Area: ${results.nearest_area[0].areaName[0].value}`
    
    region.innerHTML = `Region: ${results.nearest_area[0].region[0].value}`
   
    country.innerHTML = `Country: ${results.nearest_area[0].country[0].value}`
   
    currently.innerHTML = `Currently: Feels Like ${results.current_condition[0].FeelsLikeF}°F`

    li.innerHTML = `${results.nearest_area[0].areaName[0].value} - ${results.current_condition[0].FeelsLikeF}°F`

    weatherSection.append(
        searchLocationH,
        region,
        area, 
        country, 
        currently, 
        li
    )
    return weatherSection
}

function createForecastInfo(results) {
    const forecastArticle = document.createElement("article")
    for(let i = 0;i < results.weather.length; i++) {
        console.log(results.weather)
        const forecastSection = document.createElement("section")
        const forecastHeading = document.createElement("h4")
        if (i === 0) {
            forecastHeading.innerHTML = "Today"
        }
        else if (i === 1) {
            forecastHeading.innerHTML = "Tomorrow"
        }
        else {
            forecastHeading.innerHTML = "Day After Tomorrow"
        }
        const averageTemp = document.createElement("p")
        averageTemp.innerHTML = `Average Temperature: ${results.weather[i].avgtempF}°F`
        const maxTemp = document.createElement("p")
        maxTemp.innerHTML = `Max Temperature: ${results.weather[i].maxtempF}°F`
        const minTemp = document.createElement("p")
        minTemp.innerHTML = `Min Temperature: ${results.weather[i].mintempF}°F`
        forecastSection.append(
            forecastHeading,
            averageTemp,
            maxTemp,
            minTemp
        )
        forecastArticle.append(forecastSection)
    };
    return forecastArticle
}


function makeFetchCall(location) {
    fetch(`http://wttr.in/${location}?format=j1`)
    .then((res) => res.json())
    .then((res) => {
        article.append(createWeatherInfo(res) )
        main.append(createForecastInfo(res))
        


    })
}


form.addEventListener("submit", (event) => {
    event.preventDefault()
    tempP.remove()
    heading.remove()
    
    
    makeFetchCall(document.querySelector("#location").value)
    

})