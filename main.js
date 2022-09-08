const BASE_URL = `https://wttr.in`

const form=document.querySelector('form')
const main=document.querySelector('main')
const search=document.querySelector('#location')
const fullForecast=document.querySelector('.fullForecast')
const inside = document.querySelector(`#chooseLocation`)
let prevSearch = document.querySelector("section p")
let sunP = document.createElement("p");
let rainP = document.createElement("p");
let snowP = document.createElement("p");

const p =document.createElement('p')



form.addEventListener("submit", (event)=>{
    event.preventDefault()
    
    const location =search.value

    newSearch(location)
    function newSearch(location){
        
    fetch(`${BASE_URL}/${location}?format=j1`)
    .then((res)=> res.json())
    .then((resJsn)=> {

        let currentTemp={}
        let tomorrowTemp={}
        let dayAfterTemp={}

        const main1 = document.querySelector(`.hidden`)
        main1.innerHTML=""

        let loc = document.createElement("h2"); 
        loc.innerHTML = `<h2>${location}</h2>`
        main1.prepend(loc)

        const area=resJsn.nearest_area[0].areaName[0].value
        const areaP= document.createElement("p")
        areaP.innerHTML = `<strong>Area: </strong> ${area}`
        main1.append(areaP)

        const region= resJsn.nearest_area[0].region[0].value
        const regionP = document.createElement("p")
        regionP.innerHTML = `<strong>Region: </strong> ${region}`
        main1.append(regionP)

        const country=resJsn.nearest_area[0].country[0].value
        const countryP = document.createElement("p")
        countryP.innerHTML = `<strong>Country: </strong> ${country}`
        main1.append(countryP)

        const feels = resJsn.current_condition[0].FeelsLikeF
        const feelsP = document.createElement("p")
        feelsP.innerHTML = `<strong>Currently: </strong>Feels Like ${feels}°F`
        main1.append(feelsP)
    
        const sun =resJsn.weather[0].hourly[0].chanceofsunshine
        const sunP = document.createElement("p")
        sunP.innerHTML = `<strong>Chance of Sunshine:</strong>${sun}`
        main1.append(sunP)

        const rain=resJsn.weather[0].hourly[0].chanceofrain
        const rainP = document.createElement("p")
        rainP.innerHTML = `<strong>Chance of Rain: </strong> ${rain}`
        main1.append(rainP)

        const snow=resJsn.weather[0].hourly[0].chanceofsnow
        const snowP = document.createElement("p")
        snowP.innerHTML = `<strong>Chance of Snow: </strong> ${snow}`
        main1.append(snowP)

        
      
       
        // 3 day forecast
        currentTemp['Average Temperature']=resJsn.weather[0].avgtempF
        currentTemp['Max Temperature']=resJsn.weather[0].maxtempF
        currentTemp['Min Temperature']=resJsn.weather[0].mintempF
        currentObj(currentTemp)

        tomorrowTemp['Average Temperature']=resJsn.weather[1].avgtempF
        tomorrowTemp['Max Temperature']=resJsn.weather[1].maxtempF
        tomorrowTemp['Min Temperature']=resJsn.weather[1].mintempF
        tomorrowObj(tomorrowTemp)

        dayAfterTemp['Average Temperature']=resJsn.weather[2].avgtempF
        dayAfterTemp['Max Temperature']=resJsn.weather[2].maxtempF
        dayAfterTemp['Min Temperature']=resJsn.weather[2].mintempF
        dayAfterObj(dayAfterTemp)

        const pSearch=document.querySelector('#noPrev')
        pSearch.innerHTML=""
        const pSearches= document.createElement('h3')
        pSearches.innerHTML='Previous Searches'
        pSearch.prepend(pSearches)

    


        // temp gifs/image
        const img = document.createElement("img")
      if (sun >50) {
        img.setAttribute("src","./assets/icons8-summer.gif")
        img.setAttribute("alt","sun")
        img.classList.add("icon")
        inside.prepend(img)
      }  if (rain > 50) {
        img.setAttribute("src","./assets/icons8-torrential-rain.gif")
        img.setAttribute("alt","rain")
        img.classList.add("icon")
        inside.prepend(img)
      }  if (snow>=50) {
        img.setAttribute("src","./assets/icons8-light-snow.gif")
        img.setAttribute("alt","snow")
        img.classList.add("icon")
        inside.prepend(img)
      }

    //   searches history
      const li = document.createElement("li")
      const a = document.createElement("a")
      const ul = document.querySelector("ul")

      const currentFeel=resJsn.current_condition[0].FeelsLikeF


      prevSearch.innerHTML = ""
      a.innerHTML = `${location}`
      a.href = "#"
      li.textContent = `- ${currentFeel}°F`
      li.prepend(a)
      ul.append(li)

    //   adding event listener to links
      li.addEventListener("click", () => {
        prevSearch.innerHTML = "" 
        prevSearch.remove()
        // inside.style.display = 'none';
        let loc = document.createElement("h2") 
        loc.innerHTML = `<h2>${location}</h2>` 
        // inside.prepend(img)
        // inside.append(loc)
        inside.append(
          loc,
          img,
          areaP,
          regionP,
          countryP,
          feelsP,
          sunP,
          rainP,
          snowP
        ); 
    });

    })
    .catch((err)=>console.log(err))


// 3 day forecast 

    function currentObj(currentTemp){
        const today=document.querySelector('#today')
        today.innerHTML=""
        const head1=document.createElement('h3')
       head1.innerHTML="Today"
         for(const [key, value] of Object.entries(currentTemp)){
        const p1=document.createElement('p')
        p1.innerHTML=`<strong>${key}</strong>: ${value}`
        today.append(p1)}
        today.prepend(head1)   
    }

    function tomorrowObj(tomorrowTemp){
        const tomorrow=document.querySelector('#tomorrow')
        tomorrow.innerHTML=""
       const head2=document.createElement('h3')
       head2.innerHTML="Tomorrow"
        for(const [key, value] of Object.entries(tomorrowTemp)){
       const p2=document.createElement('p')
       p2.innerHTML=`<strong>${key}</strong>: ${value}`
       tomorrow.append(p2)}
       tomorrow.prepend(head2)
    }

    function dayAfterObj(dayAfterTemp){
        const dayAfter=document.querySelector('#dayAfterTomorrow')
        dayAfter.innerHTML=""
       const head3=document.createElement('h3')
       head3.innerHTML="Day After Tomorrow"
        for(const [key, value] of Object.entries(dayAfterTemp)){
       const p3=document.createElement('p')
       p3.innerHTML=`<strong>${key}</strong>: ${value}` 
       dayAfter.append(p3)}
       dayAfter.prepend(head3)
    }
    
}
})



// converter F2C
conversion.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    let input=e.target.tempConvert.value
    console.log(input)
    let x=0
    if(document.querySelector("#to-c").checked){
        x= (input-32)*(5/9)
        document.querySelector("#convertResult").innerHTML= `${x.toFixed(2)}°C`
    }
    else if(document.querySelector("#to-f").checked){
        x= input * (9 / 5) + 32
        document.querySelector("#convertResult").innerHTML= `${x.toFixed(2)}°F`
    }
    
})



