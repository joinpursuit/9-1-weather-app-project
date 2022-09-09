//Adding event listener to `submit` event
const form = document.querySelector(`form`)

//Defining URL data for API
const BASE_URL = `https://wttr.in/`
const json = `?format=j1`
let locationId = ``

//Creating function for current weather and 3 day forecast
function getWeather(res){
//Adding current search loaction information
const current = document.querySelector(`#current`)
const search = document.createElement(`h3`)
search.textContent = `${res.nearest_area[0].areaName[0].value}`
current.append(search)

const area = document.createElement(`p`)
area.innerHTML = `<span>Area:<span> ${res.nearest_area[0].areaName[0].value}`
current.append(area)

const region = document.createElement(`p`)
region.innerHTML = `<span>Region:<span> ${res.nearest_area[0].region[0].value}`
current.append(region)

const country = document.createElement(`p`)
country.innerHTML = `<span>Country:<span> ${res.nearest_area[0].country[0].value}`
current.append(country)

const realFeel = document.createElement(`p`)
realFeel.innerHTML = `<span>Currently:<span> Feels like ${res.current_condition[0].FeelsLikeF}°F`
current.append(realFeel)

const h4 = document.querySelector(`h4`)
h4.classList.add(`hidden`)

//Adding weather for today
const today = document.querySelector(`#today`)
const weatherToday = document.createElement(`p`)
weatherToday.innerHTML = `<span>Average Temperature:</span> ${res.weather[0].avgtempF}°F`
today.append(weatherToday)

const maxToday = document.createElement(`p`)
maxToday.innerHTML = `<span>Max Temperature:</span> ${res.weather[0].maxtempF}°F`
today.append(maxToday)

const minToday = document.createElement(`p`)
minToday.innerHTML = `<span>Min Temperature:</span> ${res.weather[0].mintempF}°F`
today.append(minToday)

today.classList.toggle(`hidden`)

//Adding weather for tomorrow
const tomorrow = document.querySelector(`#tomorrow`)
const weatherTmrw = document.createElement(`p`)
weatherTmrw.innerHTML = `<span>Average Temperature:</span> ${res.weather[1].avgtempF}°F`
tomorrow.append(weatherTmrw)

const maxTmrw = document.createElement(`p`)
maxTmrw.innerHTML = `<span>Max Temperature:</span> ${res.weather[1].maxtempF}°F`
tomorrow.append(maxTmrw)

const minTmrw = document.createElement(`p`)
minTmrw.innerHTML = `<span>Min Temperature:</span> ${res.weather[1].mintempF}°F`
tomorrow.append(minTmrw)

tomorrow.classList.toggle(`hidden`)

//Adding weather for next day
const next = document.querySelector(`#next_day`)
const weatherNext = document.createElement(`p`)
weatherNext.innerHTML = `<span>Average Temperature:</span> ${res.weather[2].avgtempF}°F`
next.append(weatherNext)

const maxNext = document.createElement(`p`)
maxNext.innerHTML = `<span>Max Temperature:</span> ${res.weather[2].maxtempF}°F`
next.append(maxNext)

const minNext = document.createElement(`p`)
minNext.innerHTML = `<span>Min Temperature:</span> ${res.weather[2].mintempF}°F`
next.append(minNext)

next.classList.toggle(`hidden`)
}


//Add event listener for submit
 form.addEventListener(`submit`, (event) => {
    event.preventDefault()

    locationId = `${event.target.search.value}`

    fetch(`${BASE_URL}${locationId}${json}`)
    .then(res => res.json())
    .then(res => {
        getWeather(res)

        const ul = document.querySelector(`ul`)
        const li = document.createElement(`li`)
        const prev = document.createElement(`a`)
        prev.setAttribute(`href`, `#`)
        prev.innerHTML = `${res.nearest_area[0].areaName[0].value}<span> - ${res.current_condition[0].FeelsLikeF}°F</span>`
        ul.append(li,prev)

        prev.addEventListener(`click`, (event) => {
            const main = document.querySelector(`main`)
            getWeather(res)
        })

        ul.classList.remove(`hidden`)
    
        const noPrev = document.querySelector(`.searches p`)
        noPrev.classList.add(`hidden`)

    })

        
        
        
        // prev.forEach((li) => {
        //     li.addEventListener(`click`, (event) => {
        //         locationId = `${event.target.search.value.substring(0, event.target.search.value.indexOf(` - `))}`
        //         console.log(locationId)
        //     })
        // })
         .catch(err => console.log(err))
        })
   