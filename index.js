const header = document.createElement("header")
const form = document.createElement("form")
const h1 = document.createElement("h1")
h1.textContent = "Weather App"
header.append(form)
form.append(h1)
const body = document.querySelector("body")
body.append(header)
const input = document.createElement("input")
input.setAttribute("type", "text")
input.setAttribute("id", "text")

input.setAttribute("name", "text")
const label = document.createElement("label")
label.setAttribute("for", "text")
label.textContent = "Pick a Location "
const input2 = document.createElement("input")
input2.setAttribute("type", "submit")
input2.textContent = "Get Weather"
form.append(label, input, input2)

const div = document.createElement("div")
body.append(div)
div.setAttribute("class", "info")
const main = document.createElement("main")
main.setAttribute("id", "city")
const aside = document.createElement("aside")
aside.setAttribute("id", "previous")
const previous = document.getElementById('#previous')
div.append(main, aside)

const section = document.createElement("section")


const h4 = document.createElement("h4")
h4.textContent = "Previous Searches"

const ul = document.createElement("ul")

const paragraph = document.createElement("p")
paragraph.textContent = `No previous searches`
aside.append(section)
section.append(h4, paragraph, ul)
// paragraph.setAttribute("class", "hidden")


const h2 = document.createElement("h2")
h2.textContent = `Choose a location to view the weather`

const h3 = document.createElement("h3")

const p1 = document.createElement("p")

const p2 = document.createElement("p")

const p3 = document.createElement("p")

const p4 = document.createElement("p")

const p5 = document.createElement("p")

const p6 = document.createElement("p")

const p7 = document.createElement("p")

const img = document.createElement("img")
img.setAttribute("class", "hidden")
img.setAttribute("alt", "snow")
img.classList.add("icon")
img.setAttribute("src", "./assets/icons8-light-snow.gif")

const img2 = document.createElement("img")
img2.setAttribute("class", "hidden")
img2.setAttribute("alt", "sun")
img2.classList.add("icon")
img2.setAttribute("src", "./assets/icons8-summer.gif")

const img3 = document.createElement("img")
img3.setAttribute("class", "hidden")
img3.setAttribute("alt", "rain")
img3.classList.add("icon")
img3.setAttribute("src", "./assets/icons8-torrential-rain.gif")


const section2 = document.createElement("section")
section2.setAttribute("id", "current")

const aside2 = document.createElement("aside")
aside2.setAttribute("id", "forecast")

const div2 = document.createElement("div")
div2.setAttribute("class", "readings")
const head3 = document.createElement("h3")
head3.textContent = `Today`

const pg1 = document.createElement("p")

const pg2 = document.createElement("p")

const pg3 = document.createElement("p")
div2.append(head3, pg1, pg2, pg3)

const div3 = document.createElement("div")
div3.setAttribute("class", "readings")
const header3 = document.createElement("h3")
header3.textContent = `Tomorrow`
const page1 = document.createElement("p")

const page2 = document.createElement("p")

const page3 = document.createElement("p")
div3.append(header3, page1, page2, page3)
const div4 = document.createElement("div")
div4.setAttribute("class", "readings")
const anotherh3 = document.createElement("h3")
anotherh3.textContent = `Day After Tomorrow`

const pa1 = document.createElement("p")

const pa2 = document.createElement("p")

const pa3 = document.createElement("p")
div4.append(anotherh3, pa1, pa2, pa3)

main.append(section2, aside2)
section2.append(img, img2, img3, h2, p1, p2, p3, p4, p5, p6, p7, )
aside2.append(div2, div3, div4)



const getInfo = () => {
    let id = document.getElementById('text');
    let city = id.value.trim().split(' ').join('+')
    let url = `https://wttr.in/${city}?format=j1`;
    
    fetch(url)
    .then((response) => response.json())
    .then((resJson) => {
        const nearArea = resJson.nearest_area[0]
        const condition = resJson.current_condition[0]
        const weather = resJson.weather[0]
        const avgTemp1 = weather.avgtempF
        // console.log(avgTemp1)
        const maxTemp1 = weather.maxtempF
        // console.log(maxTemp1)
        const minTemp1 = weather.mintempF
        // console.log(minTemp1)
        const rain = weather.hourly[0].chanceofrain
        // console.log(sunshine1)
        const sun = weather.hourly[0].chanceofsunshine
        const snow = weather.hourly[0].chanceofsnow
        const weather2 = resJson.weather[1]
        const avgTemp2 = weather2.avgtempF
        const maxTemp2 = weather2.maxtempF
        const minTemp2 = weather2.mintempF
        const weather3 = resJson.weather[2]
        const avgTemp3 = weather3.avgtempF
        const maxTemp3 = weather3.maxtempF
        const minTemp3 = weather3.mintempF
        const area = nearArea.areaName[0].value
        const country = nearArea.country[0].value 
        const region = nearArea.region[0].value
        const temp = condition.FeelsLikeF
        
        
        
        // h3.textContent = area
        p1.textContent = `Area: ${area}`
        p2.textContent = `Country: ${country}`
        p3.textContent = `Region: ${region}`
        p4.textContent = `Currently feels like ${temp}\u00B0F`
        p5.textContent = `Chance of Sunshine: ${sun}`
        p6.textContent = `Chance of Rain: ${rain}`
        p7.textContent = `Chance of Snow: ${snow}`
        
        pg1.textContent = `Avg Temp: ${avgTemp1}\u00B0F`
        pg2.textContent = `Max Temp: ${maxTemp1}\u00B0F`
        pg3.textContent = `Min Temp: ${minTemp1}\u00B0F`
        
        page1.textContent = `Avg Temp: ${avgTemp2}\u00B0F`
        page2.textContent = `Max Temp: ${maxTemp2}\u00B0F`
        page3.textContent = `Min Temp: ${minTemp2}\u00B0F`
        
        pa1.textContent = `Avg Temp: ${avgTemp3}\u00B0F`
        pa2.textContent = `Max Temp: ${maxTemp3}\u00B0F`
        pa3.textContent = `Min Temp: ${minTemp3}\u00B0F`
        
        paragraph.classList.add("hidden")
        h2.classList.add("hidden");

        if(sun >= 50){
            img2.classList.remove("hidden")
        }
        else{
            img2.classList.add("hidden")
        }
        if(snow >= 50){
            img.classList.remove("hidden")
        }
        else{
            img.classList.add("hidden")
        }
        if(rain >= 50){
            img3.classList.remove("hidden")
        }
        else{
            img3.classList.add("hidden")
        }
        
        
        const anchor = document.createElement("a")
        
        anchor.setAttribute("href", "" )
          anchor.textContent = `${area} - ${temp}`
        
         const notes = anchor
          generateList(notes)
        
        
        form.reset()
        
        
    })
    
    .catch((error) => console.log(error))
}



input2.addEventListener("click", (event) => {
    event.preventDefault()
    getInfo()


    
})

 ul.addEventListener("click", () => {
  getInfo()
 })


function addList(notes){
    const li = document.createElement("li")
    li.textContent
    if(notes){
        li.append( notes)
    }
    
    return li
}


function generateList(notes){
    const li = addList(notes);
    const ul = document.querySelector("ul");
    
    ul.append(li)
    
    
}


