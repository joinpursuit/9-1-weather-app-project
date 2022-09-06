const form = document.querySelector("form")
// const searchLocation = document.querySelector("#location").value
const BASE_URL = `http://wttr.in/${document.querySelector("#location").value}?format=j1`
const heading = document.querySelector(".main_location")
const article = document.querySelector("article")
const main = document.querySelector("main")
const tempP = document.querySelector(".temp_p")
const sideBar = document.querySelector(".sidebar")
const ul = document.querySelector("ul")
const div = document.querySelector("div")


// ul.addEventListener("click", (event) => {
//     event.preventDefault()
//     makeFetchCall()
// })

function createWeatherInfo(results) {
    const weatherSection = document.createElement("section")
    const searchLocationH = document.createElement("h3")
    const region = document.createElement("p")
    const area = document.createElement("p")
    const country = document.createElement("p")
    const currently = document.createElement("p")
   // const li = document.createElement("li")
    const search = document.querySelector("#location").value


    searchLocationH.innerHTML = results.nearest_area[0].areaName[0].value
        
    area.innerHTML = `Area: ${results.nearest_area[0].areaName[0].value}`
    
    region.innerHTML = `Region: ${results.nearest_area[0].region[0].value}`
   
    country.innerHTML = `Country: ${results.nearest_area[0].country[0].value}`
   
    currently.innerHTML = `Currently: Feels Like ${results.current_condition[0].FeelsLikeF}°F`

   // li.innerHTML = `${search} - ${results.current_condition[0].FeelsLikeF}°F`

    // li.addEventListener("click", (event) => {
    //         event.preventDefault()
    //         makeFetchCall(search)
    //     })
    //     // if ((ul.length > 0) && (ul[ul.length - 1].value != document.querySelector("#location").value)) {
    //     //     ul.append(li)
    //     // }
    //      ul.append(li)
  
      
    weatherSection.append(
        searchLocationH,
        region,
        area, 
        country, 
        currently, 
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
        article.append(createWeatherInfo(res) )
        div.append(createForecastInfo(res))
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

// function makeListEvent(results) {
//     const listItem = document.createElement("li")
// }


function makeFetchCall(location) {
    fetch(`http://wttr.in/${location}?format=j1`)
    .then((res) => res.json())
    .then((res) => {   
        article.append(createWeatherInfo(res) )
        div.append(createForecastInfo(res))
        ul.append(createPrevSearches(location, res))
    })
}


form.addEventListener("submit", (event) => {
    event.preventDefault()
    tempP.remove()
    heading.remove()
    clearPage()
    const search = document.querySelector("#location").value

    makeFetchCall(search)

    document.querySelector("#location").value = ""
    

})