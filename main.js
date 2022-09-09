//Selecting form from document 
const form = document.querySelector(`form`)

//Defining URL data for API
const BASE_URL = `https://wttr.in/`
const json = `?format=j1`
let locationId = ``

//Creating function for current weather and 3 day forecast layout
function weatherLayout(document){
const current = document.querySelector(`#current`)
const search = document.createElement(`h3`)
search.classList.add = `search`
current.append(search)

const area = document.createElement(`p`)
area.classList.add = `area`
current.append(area)

const region = document.createElement(`p`)
region.classList.add =`region`
current.append(region)

const country = document.createElement(`p`)
country.classList.add =`country`
current.append(country)

const realFeel = document.createElement(`p`)
realFeel.classList.add = `realFeel`
current.append(realFeel)

//Creating Today of 3 day forcast
const today = document.querySelector(`#today`)
const weatherToday = document.createElement(`p`)
weatherToday.classList.add = `weatherToday`
today.append(weatherToday)

const maxToday = document.createElement(`p`)
maxToday.classList.add = `maxToday`
today.append(maxToday)

const minToday = document.createElement(`p`)
minToday.classList.add = `minToday`
today.append(minToday)

//Creating Tomorrow of 3 day forcast
const tomorrow = document.querySelector(`#tomorrow`)
const weatherTmrw = document.createElement(`p`)
tomorrow.append(weatherTmrw)

const maxTmrw = document.createElement(`p`)
tomorrow.append(maxTmrw)

const minTmrw = document.createElement(`p`)
tomorrow.append(minTmrw)

//Creating Next Day of 3 day forcast
const next = document.querySelector(`#next_day`)
const weatherNext = document.createElement(`p`)
next.append(weatherNext)
const maxNext = document.createElement(`p`)
next.append(maxNext)
const minNext = document.createElement(`p`)
next.append(minNext)


function getWeather(res){

    //Adding current search loaction information
    search.textContent = `${res.nearest_area[0].areaName[0].value}`
    area.innerHTML = `<span>Area:<span> ${res.nearest_area[0].areaName[0].value}`
    region.innerHTML = `<span>Region:<span> ${res.nearest_area[0].region[0].value}`
    country.innerHTML = `<span>Country:<span> ${res.nearest_area[0].country[0].value}`
    realFeel.innerHTML = `<span>Currently:<span> Feels like ${res.current_condition[0].FeelsLikeF}°F`
    
    const h4 = document.querySelector(`h4`)
    h4.classList.add(`hidden`)
    
    //Adding weather for today
    weatherToday.innerHTML = `<span>Average Temperature:</span> ${res.weather[0].avgtempF}°F`
    maxToday.innerHTML = `<span>Max Temperature:</span> ${res.weather[0].maxtempF}°F`
    minToday.innerHTML = `<span>Min Temperature:</span> ${res.weather[0].mintempF}°F`
    
    today.classList.toggle(`hidden`)
    
    //Adding weather for tomorrow
    weatherTmrw.innerHTML = `<span>Average Temperature:</span> ${res.weather[1].avgtempF}°F`
    maxTmrw.innerHTML = `<span>Max Temperature:</span> ${res.weather[1].maxtempF}°F`
    minTmrw.innerHTML = `<span>Min Temperature:</span> ${res.weather[1].mintempF}°F`
    
    tomorrow.classList.toggle(`hidden`)
    
    //Adding weather for next day
    weatherNext.innerHTML = `<span>Average Temperature:</span> ${res.weather[2].avgtempF}°F`
    maxNext.innerHTML = `<span>Max Temperature:</span> ${res.weather[2].maxtempF}°F`
    minNext.innerHTML = `<span>Min Temperature:</span> ${res.weather[2].mintempF}°F`
    
    next.classList.toggle(`hidden`)
    }
}




//Add event listener for submit
 form.addEventListener(`submit`, (event) => {
    event.preventDefault()

    locationId = `${event.target.search.value}`

    fetch(`${BASE_URL}${locationId}${json}`)
    .then(res => res.json())
    .then(res => {
        weatherLayout(document)(res)
        // getWeather(res)

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
   