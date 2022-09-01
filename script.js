const BASE_URL = 'https://wttr.in/city?format=j1'

 const form = document.querySelector("form")
 const aside = document.querySelector("#area")
 const article = document.querySelector("main article")
 
 
 form.addEventListener('submit', (event) => {
     event.preventDefault()
     
     fetch(`${BASE_URL}`)
     .then((res) => res.json())
     .then((res) => {
         const weather = res.nearest_area
         // console.log(weather)
         weather.forEach(location => {
        article.innerText = `${location.areaName[0].value}
        Area: ${location.areaName[0].value}
        Region: ${location.region[0].value}
        Country: ${location.country[0].value}`
        // console.log(article)
        
    });
        const days = res.weather
        console.log(days[0])
        const today = document.createElement('article')
        today.innerText = `Today
        Average Temperature: ${days[0].avgtempF}
        Max Temperature: ${days[0].maxtempF}
        Min Temperature: ${days[0].mintempF}`
    
    const tomorrow = document.createElement('article')
    tomorrow.innerText = `Tomorrow
    Average Temperature: ${days[1].avgtempF}
    Max Temperature: ${days[1].maxtempF}
    Min Temperature: ${days[1].mintempF}`
    
    
    const dayAfter = document.createElement('article')
    dayAfter.innerText = `Day After Tomorrow
    Average Temperature: ${days[2].avgtempF}
    Max Temperature: ${days[2].maxtempF}
    Min Temperature: ${days[2].mintempF}`
    aside.append(today, tomorrow, dayAfter)
   
        
            // console.log(day.astronomy[0])
            // const tomorrow = document.createElement('article')
            // region.innerText = `
            
            // const dayAfter = document.createElement('article')
            // country.innerText = `
            
            // aside.append(areaName , region, country)
            // console.log(country)
        

        
        

    
    // const currently = document.createElement('article')

    })
    .catch()
})