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
let searched = document.createElement('h2')
searched.innerText = loc
let area = document.createElement("p")
area.innerHTML = ( `<strong> Area:</strong>  ${data["nearest_area"][0]["areaName"][0]["value"]}`)
let region = document.createElement("p")
region.innerHTML = (`<strong>Region:</strong> ${data["nearest_area"][0]["region"][0]["value"]}`)
let country= document.createElement("p")
country.innerHTML = (`<strong> Country:</strong>  ${data["nearest_area"][0]["country"][0]["value"]}`)
let currently = document.createElement("p")
currently.innerHTML = (`<strong> Currently:</strong>  Feels Like ${data["current_condition"][0]["FeelsLikeF"]}⁰F`)


main.append(searched)
main.append(area)

main.append(region)

main.append(country)

main.append(currently)


}

function addDay1 (data){
let today = document.createElement('h2')
today.innerText = "Today"
let avg = document.createElement("p")
avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][0]["avgtempF"]}⁰F`)
let maxT = document.createElement("p")
maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][0]["maxtempF"]}⁰F`)
let minT= document.createElement("p")
minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][0]["mintempF"]}⁰F`)

const day1 = document.querySelector("#day1")
day1.append(today,avg,maxT,minT)
}


function addDay2 (data){
    let tomm = document.createElement('h2')
    tomm.innerText = "Tomorrow"
    let avg = document.createElement("p")
    avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][1]["avgtempF"]}⁰F`)
    let maxT = document.createElement("p")
    maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][1]["maxtempF"]}⁰F`)
    let minT= document.createElement("p")
    minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][1]["mintempF"]}⁰F`)
    
    const day2 = document.querySelector("#day2")
    day2.append(tomm,avg,maxT,minT)
    }


function addDay3 (data){
    let dAft = document.createElement('h2')
    dAft.innerText = "Day After Tomorrow"
    let avg = document.createElement("p")
    avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][2]["avgtempF"]}⁰F`)
    let maxT = document.createElement("p")
    maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][2]["maxtempF"]}⁰F`)
    let minT= document.createElement("p")
    minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][2]["mintempF"]}⁰F`)
    
    const day3 = document.querySelector("#day3")
    day3.append(dAft,avg,maxT,minT)
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
    if(i > 0){
        main.innerHTML = ""
    }

    fetch(searched)
        .then((res)=> res.json())
        .then((res) => {
            //console.log (res)
            console.log (input)
            addInitData(res)
            dataInMain(res)
            addDay1(res)
            addDay2(res)
            addDay3(res)
        })
        .catch((error)=>{
        
            console.log(error)
        })
})