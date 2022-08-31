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

const aside2 = document.createElement("aside")


const p4 = document.createElement("p")
main.append(h2, h3, p1, p2, p3, p4)




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

