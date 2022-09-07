const form = document.querySelector("form")
const aside = document.querySelector("#area")
const article = document.querySelector("main article")
const previous = document.querySelector('h4')
const p = document.querySelector('aside section p')
const lists =document.querySelector('ul')
const click = document.querySelectorAll('aside section ul')
const main = document.querySelector('main')
const choose = document.querySelector('#choose')
const temperature = document.querySelector('#convert')
const submitTemp = document.querySelector('aside form input')
const submitWeather = document.querySelector('#getweather')
let answers = document.querySelector('h4')

const today = document.createElement('article')
const tomorrow = document.createElement('article')
const dayAfter = document.createElement('article')
const area = document.createElement('h2')
const p1 = document.createElement('p')
const sunShine = document.createElement('p')
const rain = document.createElement('p')
const snow = document.createElement('p')
const sunPic = document.createElement('img')
const rainPic = document.createElement('img')
const snowPic = document.createElement('img')




form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let user = event.target['location'].value
    
    city(user, true)
    
    
    event.target.reset()
})

temperature.addEventListener('submit', (event) => {
    event.preventDefault()
    let temps = submitTemp.value
    console.log(temps)
    let answer = 0
    let celsius = document.querySelector('#to-c')
    
        if(celsius.checked){
          answer = (temps - 32) * 5/9
          answer = (answer).toFixed(2) 
        }else{
            answer = (temps * 9/5) + 32
            answer = (answer).toFixed(2) 
        }
        answers.innerText = ''
        answers.append(answer)
       
        event.target.reset()
    })
    
    
    function city(user, previousSearches){
        
        fetch(`https://wttr.in/${user}?format=j1`)
        .then((res) => res.json())
        .then((res) => {
            const nearArea = res.nearest_area
            nearArea.forEach(location => {
                area.innerText = `${user}`
                
                p1.innerText = `
                Nearest Area: ${location.areaName[0].value}
                Region: ${location.region[0].value}
                Country: ${location.country[0].value}
                Currently: Feels Like ${res.current_condition[0].FeelsLikeF}°F`
                article.append(area, p1)
                if (res.weather[0].hourly[0].chanceofsunshine > 50){
                    sunPic.setAttribute('src', './assets/icons8-summer.gif')
                    sunPic.setAttribute('alt', 'sun')
                    article.prepend(sunPic)
                }else{
                    sunPic.remove()
                }
                if (res.weather[0].hourly[0].chanceofrain > 50){
                    rainPic.setAttribute('src', './assets/icons8-torrential-rain.gif')
                    rainPic.setAttribute('alt', 'rain')
                    article.prepend(rainPic)
                }
                if (res.weather[0].hourly[0].chanceofsnow > 50){
                    snowPic.setAttribute('src', './assets/icons8-light-snow.gif')
                    snowPic.setAttribute('alt', 'snow')
                    article.prepend(snowPic)
                }
                
                if (p){
                    p.remove()
                }
                
                choose.style.display = "none"


                if(previousSearches) {
                    addSideBar(user, `${res.current_condition[0].FeelsLikeF}°F`)
                }
                
                const days = res.weather
                today.innerText = `Today
                Average Temperature: ${days[0].avgtempF}°F
                Max Temperature: ${days[0].maxtempF}°F
                Min Temperature: ${days[0].mintempF}°F`
                
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
            sunShine.innerText =`Chance of Sunshine:${res.weather[0].hourly[0].chanceofsunshine}`
            rain.innerText =`Chance of Rain:${res.weather[0].hourly[0].chanceofrain}`
            snow.innerText =`Chance of Snow:${res.weather[0].hourly[0].chanceofsnow}`
            article.append(sunShine,rain,snow)
                })
        .catch((err) => {
         console.log(err)
        })
    })
}
