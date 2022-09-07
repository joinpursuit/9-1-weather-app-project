const green = document.querySelector("green")
const form = document.querySelector("form")
const BASE = "https://wttr.in/"

const ul = document.querySelector("ul")
let loc = ""
let i = 0
let main = document.querySelector("main")
let mainP = document.querySelector("main p")



//add date to list on side after search

function addInitData(data){
    // access temp data
    let temp = data["current_condition"][0]["temp_F"]
    // create li element for results
    let li = document.createElement('li')
    // create anchor element
    let a =  document.createElement("a")
    a.setAttribute("href",`${BASE}${loc}?format=j1`)
    a.setAttribute("class","button")
    a.textContent = loc
    
    // create p tag for the temp
    let place = document.createTextNode( ` -${temp}⁰F`)
    
    a.appendChild(place)

    li.append(a)
    ul.append(li)
    console.log(ul)
}

function dataInMain(data){
mainP.remove()
const brk = document.createElement('br')
let mLoc = document.createElement("p")
let area = document.createTextNode(`Area: ${data["nearest_area"][0]["areaName"][0]["value"]}`)
let region = document.createTextNode(`Region: ${data["nearest_area"][0]["region"][0]["value"]}`)
let country = document.createTextNode(`Country: ${data["nearest_area"][0]["country"][0]["value"]}`)
let currently = document.createTextNode(`Currently: ${data["current_condition"][0]["FeelsLikeC"]}`)


mLoc.appendChild(area)
mLoc.appendChild(brk)
mLoc.appendChild(brk)

mLoc.append(region)
mLoc.appendChild(brk)
mLoc.appendChild(brk)

mLoc.append(country)
mLoc.appendChild(brk)
mLoc.appendChild(brk)

mLoc.append(currently)


main.appendChild(mLoc)
}








form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let input = document.querySelector("#location").value
    const searched = `${BASE}${input}?format=j1`
    loc = input
    
    if(i === 0){
        ul.innerHTML = ''
        i++
    }

    fetch(searched)
        .then((res)=> res.json())
        .then((res) => {
            //console.log (res)
            console.log (input)
            addInitData(res)
            dataInMain(res)
            
        })
        .catch((error)=>{
        
            console.log(error)
        })
})