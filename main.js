const form = document.querySelector('form')

const main = document.querySelector('main')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const city = event.target['city'].value
    
    weather(city)
    
})
function weather (city) {
    fetch(`https://wttr.in/${city}?format=j1`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
    
    const nArea = document.createElement('p')
    nArea.innerHTML = res.nearest_area[0].areaName[0].value
    nArea.append(nArea)
    
    const region = document.createElement('p')
    region.innerHTML = res.nearest_area[0].region[0].value
    region.append(region)
    
    const country = document.createElement('p')
    country.innerHTML = res.nearest_area[0].country[0].value
    country.append(country)
    
    const feelsLike = document.createElement('p')
    feelsLike.innerHTML = res.current_condtition[0].feelsLikeF
    feelsLike.append(feelsLike)

    const sunny = document.createElement('p')
    sunny.innerHTML = res.weather[0].hourly[0].chanceofsunshine
    sunny.append(sunny)

    const rain = document.createElement('p')
    rain.innerHTML = res.weather[0].hourly[0].chanceofrain
    rain.append(rain)

    const snow = document.createElement('p')
    snow.innerHTML = res.weather[0].hourly[0].chanceofsnow
    snow.append(snow)
    })
    .catch((err) => {console.log(err)
})
}
// *****MUST MAKE CONST "" = document.createElement FOR CITY, NEAREST AREA, REGION, COUNTRY, CURRENTLY "FEELS LIKE", AND WEATHER PATTENS... APPEND... USE .innerHTML...



    
    
    
    
    
    
    // *****SET CURRENT DAY AND NEXT TWO DAYS
