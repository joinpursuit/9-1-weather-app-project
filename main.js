const form = document.querySelector('form')
const main = document.querySelector('main')
const mainA = document.querySelector('main article')
const aside = document.querySelector('.forecast')
const today = document.querySelector('.today')
const tomorrow = document.querySelector('.tomorrow')
const dayAfter = document.querySelector('.dayAfter')
const srch = document.querySelector('.searches')
const preSearches = document.querySelector('.preSearches')

form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    
    const city = event.target['city'].value
    console.log(city)
    
    // places(city)
    form.reset()
    
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        
        if (res) {
            mainA.innerHTML = `<h2> ${city} <h2>`
        }
        // // *****MUST MAKE CONST "" = document.createElement FOR CITY, NEAREST AREA, REGION, COUNTRY, CURRENTLY "FEELS LIKE"... APPEND... USE .innerHTML...
        const nArea = document.createElement('p')
        nArea.innerHTML =`Nearest Area: ${res.nearest_area[0].areaName[0].value}` 
        srch.append(nArea)
        
        const region = document.createElement('p')
        region.innerHTML =`Region: ${res.nearest_area[0].region[0].value}` 
        srch.append(region)
        
        const country = document.createElement('p')
        country.innerHTML =`Country: ${res.nearest_area[0].country[0].value}`
        srch.append(country)
        
        let current = res.current_condition[0].FeelsLikeF

        const feelsLike = document.createElement('p')
        feelsLike.innerHTML =`<strong>currently:</strong> Feels Like ${current}` 
        // console.log(feelsLike)
        srch.append(feelsLike)
        
        const ps = document.querySelector('.ps')
            if (ps){
                ps.remove()
            }
        
        // // *****SET CURRENT DAY AND NEXT TWO DAYS
        today.innerText = `Today
        Average Temperature: ${res.weather[0].avgtempF}
        Max Temperature: ${res.weather[0].maxtempF}
        Min Temperature: ${res.weather[0].mintempF}`
        aside.append(today)
        
        tomorrow.innerText = `Tomorrow
        Average Temperature: ${res.weather[1].avgtempF}
        Max Temperature: ${res.weather[1].maxtempF}
        Min Temperature: ${res.weather[1].mintempF}`
        aside.append(tomorrow)
        
        dayAfter.innerText = `Day After
        Average Temperature: ${res.weather[2].avgtempF}
        Max Temperature: ${res.weather[2].maxtempF}
        Min Temperature: ${res.weather[2].mintempF}`
        aside.append(dayAfter)
        
        
        
        console.log(feelsLike)
        
        
        const li = document.createElement('li')
        const ul = document.querySelector('ul')
        ul.append(li)
        let input = document.createElement('a')
        
        input.innerHTML = `${city}`; 
        input.setAttribute('href', '#');
        li.textContent += `- ${current}°F`; 
        li.prepend(input); 
        // const p = document.querySelector('p')
        input.addEventListener('click', () => {
            // searches.innerHTML = ""
            // preSearches.remove()
            let location = document.createElement("h2"); 
        location.innerHTML = `<h2>${city}</h2>`;
        srch.append(location) 
        })
    })    
    .catch ((err) => {
        console.log(err)
    })
})
    
    // function places(city){
        
        
        
        

// const sunny = document.createElement('p')
// sunny.innerHTML = res.weather[0].hourly[0].chanceofsunshine
// srch.append(sunny)

// const rain = document.createElement('p')
// rain.innerHTML = res.weather[0].hourly[0].chanceofrain
// srch.append(rain)

// const snow = document.createElement('p')
// snow.innerHTML = res.weather[0].hourly[0].chanceofsnow
// srch.append(snow)