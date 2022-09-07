const searchForm = document.querySelector("#search")
const BASE_URL = `http://wttr.in/${document.querySelector("#location").value}?format=j1`
const heading = document.querySelector(".main_location")
const article = document.querySelector("article")
const main = document.querySelector("main")
const tempP = document.querySelector(".temp_p")
const sideBar = document.querySelector(".sidebar")
const ul = document.querySelector("ul")
const div = document.querySelector("div")
const widget = document.querySelector("#widget")
const toC = document.querySelector("#to-c")
const toF = document.querySelector("#to-f")
const tempH = document.querySelector("#temp")
const tempToConvert = document.querySelector("#temp-to-convert")


// ul.addEventListener("click", (event) => {
//     event.preventDefault()
//     makeFetchCall()
// })

function createWeatherInfo(location, results) {
    const weatherSection = document.createElement("section")
    const searchLocationH = document.createElement("h2")
    const region = document.createElement("p")
    const area = document.createElement("p")
    const country = document.createElement("p")
    const currently = document.createElement("p")
    const search = document.querySelector("#location").value
    const sunChance = document.createElement("p")
    const rainChance = document.createElement("p")
    const snowChance = document.createElement("p")

    searchLocationH.innerHTML = location
    if (results.nearest_area[0].areaName[0].value != location) {
        area.innerHTML = `Nearest Area: ${results.nearest_area[0].areaName[0].value}`
    } else {
        area.innerHTML = `Area: ${results.nearest_area[0].areaName[0].value}`
    }
    
    
    region.innerHTML = `Region: ${results.nearest_area[0].region[0].value}`
   
    country.innerHTML = `Country: ${results.nearest_area[0].country[0].value}`
   
    currently.innerHTML = `Currently: Feels Like ${results.current_condition[0].FeelsLikeF}°F`

   sunChance.innerHTML = `Chance of Sunshine:${results.weather[0].hourly[0].chanceofsunshine}`

   rainChance.innerHTML = `Chance of Rain:${results.weather[0].hourly[0].chanceofrain}`

   snowChance.innerHTML = `Chance of Snow:${results.weather[0].hourly[0].chanceofsnow}`
  
      
    weatherSection.append(
        searchLocationH,
        area,
        region, 
        country, 
        currently,
        sunChance, 
        rainChance,
        snowChance,
    )
    return weatherSection
}

function clearPage() {
    while(article.children.length > 0) {
        article.children[0].remove()
       }
       while(div.children.length > 0) {
        div.children[0].remove()
       }
    if (document.querySelector("img")) {
        document.querySelector("img").remove()
    }
}
function createIcons(results) {
    const gif = document.createElement("img")
    if (results.weather[0].hourly[0].chanceofsnow > 50) {
        gif.src = "./assets/icons8-light-snow.gif"
        gif.alt = "snow"
    }
    else if (results.weather[0].hourly[0].chanceofrain > 50) {
        gif.src = "./assets/icons8-torrential-rain.gif"
        gif.alt = "rain"
    }
    else if (results.weather[0].hourly[0].chanceofsunshine > 50) {
        gif.src = "./assets/icons8-summer.gif"
        gif.alt = "sun"
    }
    return gif
}
function createPrevSearches(location, results) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerHTML = `${location}`
    a.setAttribute("href", "#")
    const degrees = document.createElement("p")
    degrees.innerHTML = ` - ${results.current_condition[0].FeelsLikeF}°F`
    li.append(a, degrees)
    
    a.addEventListener("click", (event) => {
        event.preventDefault()
        clearPage()
        fetch(`http://wttr.in/${location}?format=j1`)
    .then((res) => res.json())
    .then((res) => {   
        article.append(createWeatherInfo(location, res) )
        div.append(createForecastInfo(res))
        main.prepend(createIcons(res))
    })
    })
    return li
}

function createForecastInfo(results) {
    const forecastArticle = document.createElement("article")
    for(let i = 0;i < results.weather.length; i++) {
        // console.log(results.weather)
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
        article.append(createWeatherInfo(location, res) )
        div.append(createForecastInfo(res))
        ul.append(createPrevSearches(location, res))
        main.prepend(createIcons(res))
    })
}


searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    tempP.remove()
    heading.remove()
    clearPage()
    const search = document.querySelector("#location").value

    makeFetchCall(search)

    document.querySelector("#location").value = ""
})

widget.addEventListener("submit", (event) => {
    event.preventDefault()
    if (toC.checked) {
        tempH.innerHTML = (((tempToConvert.value - 32) * (5/9))).toFixed(2)
    }
    if (toF.checked) {
        tempH.innerHTML = ((tempToConvert.value * (9/5) + 32)).toFixed(2)
    }
})