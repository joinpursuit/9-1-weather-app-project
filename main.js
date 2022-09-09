//Selecting and creating elements for current search window
const form = document.querySelector(`form`)
const current = document.querySelector(`#current`)
const search = document.createElement(`h2`)
const area = document.createElement(`p`)
const region = document.createElement(`p`)
const country = document.createElement(`p`)
const realFeel = document.createElement(`p`)

//Creating elements for Today of 3 day forecast
const today = document.querySelector(`#today`)
const weatherToday = document.createElement(`p`)
const maxToday = document.createElement(`p`)
const minToday = document.createElement(`p`)

//Creating elements for Tomorrow of 3 day forcast
const tomorrow = document.querySelector(`#tomorrow`)
const weatherTmrw = document.createElement(`p`)
const maxTmrw = document.createElement(`p`)
const minTmrw = document.createElement(`p`)

//Creating elements for Next Day of 3 day forcast
const next = document.querySelector(`#next_day`)
const weatherNext = document.createElement(`p`)
const maxNext = document.createElement(`p`)
const minNext = document.createElement(`p`)

//Defining URL data for API
const BASE_URL = `https://wttr.in/`
const json = `?format=j1`
let locationId = ``

//Creating function for current weather and 3 day forecast layout
function weatherLayout(document){

    //Creating main section for current search
    current.append(search)
    current.append(area)
    current.append(region)
    current.append(country)
    current.append(realFeel)

    //Creating Today of 3 day forcast
    today.append(weatherToday)
    today.append(maxToday)
    today.append(minToday)

    //Creating Tomorrow of 3 day forcast
    tomorrow.append(weatherTmrw)
    tomorrow.append(maxTmrw)
    tomorrow.append(minTmrw)

    //Creating Next Day of 3 day forcast
    next.append(weatherNext)
    next.append(maxNext)
    next.append(minNext)
}

//Creating function to add data to document elements
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
    
    today.classList.remove(`hidden`)
    
    //Adding weather for tomorrow
    weatherTmrw.innerHTML = `<span>Average Temperature:</span> ${res.weather[1].avgtempF}°F`
    maxTmrw.innerHTML = `<span>Max Temperature:</span> ${res.weather[1].maxtempF}°F`
    minTmrw.innerHTML = `<span>Min Temperature:</span> ${res.weather[1].mintempF}°F`
    
    tomorrow.classList.remove(`hidden`)
    
    //Adding weather for next day
    weatherNext.innerHTML = `<span>Average Temperature:</span> ${res.weather[2].avgtempF}°F`
    maxNext.innerHTML = `<span>Max Temperature:</span> ${res.weather[2].maxtempF}°F`
    minNext.innerHTML = `<span>Min Temperature:</span> ${res.weather[2].mintempF}°F`
    
    next.classList.remove(`hidden`)
    }

//Add event listener for submit
 form.addEventListener(`submit`, (event) => {
    event.preventDefault()

    locationId = `${event.target.search.value}`

    fetch(`${BASE_URL}${locationId}${json}`)
    .then(res => res.json())
    .then(res => {
        weatherLayout(document)
        getWeather(res)
        
        const ul = document.querySelector(`ul`)
        // const li = document.querySelector(`li`)
        const li = document.createElement(`li`)
        const prev = document.createElement(`a`)
        prev.setAttribute(`href`, `#`)
        prev.innerHTML = `${res.nearest_area[0].areaName[0].value}<span> - ${res.current_condition[0].FeelsLikeF}°F</span>`
        prev.classList.add = `${locationId}`
        ul.append(li, prev)

        prev.addEventListener(`click`, (event) => {
        // const main = document.querySelector(`main`)
        getWeather(res)
        
        let lis = document.querySelectorAll(`li`)
        for(let li of lis){
            if(li.classList.contains(`${event.target.search.value}`)){
                li.remove()
            }
        }


        // const lis

        // let count = 0
        // for(li of ul){
        //     if(locationId === ul.li.innerHTML.substring(0, indexOf(`<`))){
        //         count++
        //         if(count >= 1){
        //             li.innerHTML = ``
        //         }
        //     }
        // }
        // console.log(ul)

        

        // for(li of lis){
        //     let count = 0
        //     if(li === locationId){
        //         count++
        //         if(count === 0){
        //             const li = document.createElement(`li`)
        //             const prev = document.createElement(`a`)
        //             prev.setAttribute(`href`, `#`)
        //             prev.innerHTML = `${res.nearest_area[0].areaName[0].value}<span> - ${res.current_condition[0].FeelsLikeF}°F</span>`
        //             ul.append(li,prev)

        //             prev.addEventListener(`click`, (event) => {
        //             // const main = document.querySelector(`main`)
        //             getWeather(res)
                // })
            // })
        // })
    })

        ul.classList.remove(`hidden`)
    
        const noPrev = document.querySelector(`.searches p`)
        noPrev.classList.add(`hidden`)

        form.reset()
    })

    .catch(err => console.log(err))
    })
   