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
const button = document.createElement("button")
button.setAttribute("type", "submit")
button.textContent = "Get Weather"
form.append(label, input, button)

const div = document.createElement("div")
body.append(div)
div.setAttribute("class", "info")
const main = document.createElement("main")
const aside = document.createElement("aside")
div.append(main, aside)

const h4 = document.createElement("h4")
h4.textContent = "Previous Searches"

const ul = document.createElement("ul")

aside.append(h4, ul)

 const aside2 = document.createElement("aside")
 main.append(aside2)

 aside2.setAttribute("class", "weatherInfo")

const h3 = document.createElement("h3")
h3.textContent = "Choose a Location View the Weather"

aside2.append(h3)
