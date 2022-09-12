const form = document.querySelector('form')

const forecast = document.querySelector('.forecast article')

const srch = document.querySelector('.searches')


form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    form.reset()
    
    const city = event.target['city'].value

    fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        
// *****MUST MAKE CONST "" = document.createElement FOR CITY, NEAREST AREA, REGION, COUNTRY, CURRENTLY "FEELS LIKE"... APPEND... USE .innerHTML...
    const nArea = document.createElement('p')
    nArea.innerHTML = res.nearest_area[0].areaName[0].value
    srch.append(nArea)
    
    const region = document.createElement('p')
    region.innerHTML = res.nearest_area[0].region[0].value
    srch.append(region)
    
    const country = document.createElement('p')
    country.innerHTML = res.nearest_area[0].country[0].value
    srch.append(country)
    
    const feelsLike = document.createElement('p')
    feelsLike.innerHTML = res.current_condition[0].feelsLikeF
    srch.append(feelsLike)

    const sunny = document.createElement('p')
    sunny.innerHTML = res.weather[0].hourly[0].chanceofsunshine
    srch.append(sunny)

    const rain = document.createElement('p')
    rain.innerHTML = res.weather[0].hourly[0].chanceofrain
    srch.append(rain)

    const snow = document.createElement('p')
    snow.innerHTML = res.weather[0].hourly[0].chanceofsnow
    srch.append(snow)
    
    
// *****SET CURRENT DAY AND NEXT TWO DAYS
    const temp = document.createElement('p')
    temp.innerHTML = res.weather[0].avgtempF
    forecast.append(temp) 

    const hiTemp = document.createElement('p')
    hiTemp.innerHTML = res.weather[0].maxtempF
    forecast.append(hiTemp)

    const loTemp = document.createElement('p')
    loTemp.innerHTML = res.weather[0].mintempF
    forecast.append(loTemp)

    const today = document.querySelector('.today')
    today.innerHTML = ""
    today.append(temp, hiTemp, loTemp)

    const tomorrow = document.querySelector('.tomorrow')
    tomorrow.innerHTML = ""
    tomorrow.append(temp, hiTemp, loTemp)

    const dayAfter = documnet.querySelector('.dayAfter')
    dayAfter.innerHTML = ""
    forecast.append(temp, hiTemp, loTemp)

    const li = document.createElement('li')
    const ul = document.querySelector('ul')
    ul.append(li)
    });
    
})
    .catch((err) => {console.log(err)

})   