const searchForm = document.querySelector("#search")
const BASE_URL = `http://wttr.in/${document.querySelector("#location").value}?format=j1`
const heading = document.querySelector(".main_location")
const article = document.querySelector("article")
const main = document.querySelector("main")
const tempP = document.querySelector(".temp_p")
const sideBar = document.querySelector(".sidebar")
const ul = document.querySelector("ul")
const div = document.querySelector("#forecast")
const widget = document.querySelector("#widget")
const toC = document.querySelector("#to-c")
const toF = document.querySelector("#to-f")
const tempH = document.querySelector("#temp")
const tempToConvert = document.querySelector("#temp-to-convert")


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
    const areaSpan = document.createElement("span")
    const regionSpan = document.createElement("span")
    const countrySpan = document.createElement("span")
    const currentlySpan = document.createElement("span")
    const sunSpan = document.createElement("span")
    const rainSpan = document.createElement("span")
    const snowSpan = document.createElement("span")

    searchLocationH.innerHTML = location
    if (results.nearest_area[0].areaName[0].value != location) {
        areaSpan.innerHTML = "Nearest Area: "
        area.innerHTML = results.nearest_area[0].areaName[0].value
        area.prepend(areaSpan)
    } else {
        areaSpan.innerHTML = "Area: "
        area.innerHTML = results.nearest_area[0].areaName[0].value
        area.prepend(areaSpan)
    }
    
    regionSpan.innerHTML = "Region: "
    region.innerHTML = results.nearest_area[0].region[0].value
    region.prepend(regionSpan)
   
    countrySpan.innerHTML = "Country: "
    country.innerHTML = results.nearest_area[0].country[0].value
    country.prepend(countrySpan)
   
    currentlySpan.innerHTML = "Currently: "
    currently.innerHTML = `Feels Like ${results.current_condition[0].FeelsLikeF}°F`
    currently.prepend(currentlySpan)
    
    sunSpan.innerHTML = "Chance of Sunshine: "
    sunChance.innerHTML = `${results.weather[0].hourly[0].chanceofsunshine}%`
    sunChance.prepend(sunSpan)

    rainSpan.innerHTML = "Chance of Rain: "
    rainChance.innerHTML = `${results.weather[0].hourly[0].chanceofrain}%`
    rainChance.prepend(rainSpan)
    
    snowSpan.innerHTML = "Chance of Snow: "
    snowChance.innerHTML = `${results.weather[0].hourly[0].chanceofsnow}%`
    snowChance.prepend(snowSpan)
      
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
    forecastArticle.setAttribute("id","forecast_info")
    for(let i = 0;i < results.weather.length; i++) {

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
        article.prepend(createIcons(res))
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
        tempH.innerHTML = `Converted to ${((tempToConvert.value - 32) * (5/9)).toFixed(2)} °C`
    }
    if (toF.checked) {
        tempH.innerHTML = `Converted to ${((tempToConvert.value * (9/5) + 32)).toFixed(2)} °F`
    }
})