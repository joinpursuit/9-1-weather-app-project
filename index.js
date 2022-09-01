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
div.append(main, aside)

const h4 = document.createElement("h4")
h4.textContent = "Previous Searches"

const ul = document.createElement("ul")

aside.append(h4, ul)

const h2 = document.createElement("h2")
h2.textContent = `Choose a location to view the weather`

const h3 = document.createElement("h3")

const p1 = document.createElement("p")

const p2 = document.createElement("p")

const p3 = document.createElement("p")



const section = document.createElement("section")
section.setAttribute("id", "current")

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

const p4 = document.createElement("p")
main.append(section, aside2)
section.append(h2, h3, p1, p2, p3, p4)
aside2.append(div2, div3, div4)



input2.addEventListener("click", (event) => {
 event.preventDefault();
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



            if(input2.textContent = area){
                h3.textContent = area
                p1.textContent = `Area: ${area}`
                p2.textContent = `Country: ${country}`
                p3.textContent = `Region: ${region}`
                p4.textContent = `Currently feels like ${temp}`

                pg1.textContent = `Avg Temp: ${avgTemp1}`
                pg2.textContent = `Max Temp: ${maxTemp1}`
                pg3.textContent = `Min Temp: ${minTemp1}`

                page1.textContent = `Avg Temp: ${avgTemp2}`
                page2.textContent = `Max Temp: ${maxTemp2}`
                page3.textContent = `Min Temp: ${minTemp2}`

                pa1.textContent = `Avg Temp: ${avgTemp3}`
                pa2.textContent = `Max Temp: ${maxTemp3}`
                pa3.textContent = `Min Temp: ${minTemp3}`
            }

            const anchor = document.createElement("a")
            anchor.setAttribute("href", url)
            anchor.textContent = `${area} - ${temp}`

            const notes = anchor
            generateList(notes)


            
            form.reset()

         })
    .catch((error) => console.log(error))
})



function addList(notes){
    const li = document.createElement("li")
    li.textContent
    if(notes){
        li.append(notes)
    }
    return li
}


function generateList(notes){
    const li = addList(notes);
   const ul = document.querySelector("ul");
    ul.append(li);
}

