const form = document.querySelector("form")
const aside = document.querySelector("#area")
const article = document.querySelector("main article")
const previous = document.querySelector('h4')
const p = document.querySelector('aside section p')
const lists =document.querySelector('ul')
const click = document.querySelectorAll('aside section ul')
const main = document.querySelector('main')
const choose = document.querySelector('#choose')
console.log(aside)

const today = document.createElement('article')
const tomorrow = document.createElement('article')
const dayAfter = document.createElement('article')
const area = document.createElement('h2')
const p1 = document.createElement('p')
const sunShine = document.createElement('p')
const rain = document.createElement('p')
const snow = document.createElement('p')
// const previousSearch = document.querySelectorAll('ul li a')
// console.log(click.childNodes)
 
 
 
 form.addEventListener('submit', (event) => {
     event.preventDefault()

     let user = event.target['location'].value

     city(user, true)

     
     event.target.reset()
    })
    
    
    function city(user, previousSearches){
        
        fetch(`https://wttr.in/${user}?format=j1`)
        .then((res) => res.json())
        .then((res) => {
            // console.log(res)
            const nearArea = res.nearest_area
            // console.log(nearArea)
            nearArea.forEach(location => {
                
                area.innerText = `${user}`
                
                p1.innerText = `
                Nearest Area: ${location.areaName[0].value}
                Region: ${location.region[0].value}
                Country: ${location.country[0].value}
                Currently: Feels Like ${res.current_condition[0].FeelsLikeF}°F`
                article.append(area, p1)
                
                if (p){
                    p.remove()
                }
                
                choose.style.display = "none"

                // convert Temp
                const form = document.createElement('form')
                const convert = document.createElement('label')
                convert.innerText = 'Convert the temperature:'
                const input = document.createElement('input')
                input.setAttribute('type','number')
                input.setAttribute('id', 'temp-to-convert')
                aside.append(form)
                
                if(previousSearches) {
                    addSideBar(user, `${res.current_condition[0].FeelsLikeF}°F`)
                }
                
                const days = res.weather
                // console.log(days[0])
                today.innerText = `Today\nAverage Temperature: ${days[0].avgtempF}°F\n Max Temperature: ${days[0].maxtempF}°F\nMin Temperature: ${days[0].mintempF}°F`
                
                tomorrow.innerText = `Tomorrow
                Average Temperature: ${days[1].avgtempF}°F
                Max Temperature: ${days[1].maxtempF}°F
                Min Temperature: ${days[1].mintempF}°F`
                
                
                dayAfter.innerText = `Day After Tomorrow
                Average Temperature: ${days[2].avgtempF}°F
                Max Temperature: ${days[2].maxtempF}°F
                Min Temperature: ${days[2].mintempF}°F`
                aside.append(today, tomorrow, dayAfter)
                
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    function addSideBar(cityName,temp) {
        let list = document.createElement('li')
        const link = document.createElement('a')
        link.innerText = `${cityName} - ${temp}`
        lists.append(list)
        list.prepend(link)
        link.addEventListener('click', () => {  
            city(cityName)

            fetch(`https://wttr.in/${cityName}?format=j1`)
        .then((res) => res.json())
        .then((res) => {

            // console.log(res.weather[0].hourly[0].chanceofsunshine)
            sunShine.innerText =`Chance of Sunshine:${res.weather[0].hourly[0].chanceofsunshine}`
            rain.innerText =`Chance of Rain:${res.weather[0].hourly[0].chanceofrain}`
            snow.innerText =`Chance of Snow:${res.weather[0].hourly[0].chanceofsnow}`
            article.append(sunShine,rain,snow)

            console.log(res.weather[0].hourly[0].chanceofsunshine)
            if (res.weather[0].hourly[0].chanceofsunshine > 50){
                const sun = document.createElement('img')
                sun.setAttribute('src', './assets/icons8-summer.gif')
                sun.setAttribute('alt', 'sun')
                article.prepend(sun)
            }
            
            // if (res.weather[0].hourly[0].chanceofrain > 50){
            //     const rain = document.createElement('img')
            //     rain.setAttribute('src', './assets/icons8-torrential-rain.gif')
            //     rain.setAttribute('alt', 'rain')
            //     article.prepend(rain)
            // }
            
            // if (res.weather[0].hourly[0].chanceofsnow > 50){
            //     const snow = document.createElement('img')
            //     snow.setAttribute('src', './assets/icons8-light-snow.gif')
            //     snow.setAttribute('alt', 'snow')
            //     article.prepend(snow)

            // }


                })
        .catch((err) => {
         console.log(err)
        })
    })
}
    