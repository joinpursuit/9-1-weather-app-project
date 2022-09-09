const green = document.querySelector("green")
const form = document.querySelector("form")
const BASE = "https://wttr.in/"
const mainP = document.querySelector("main p")
const ul = document.querySelector("ul")
let loc = ""
let i = 0
let main = document.querySelector("main")
let mainLoc = ""
const day1 = document.querySelector("#day1")
const day2 = document.querySelector("#day2")
const day3 = document.querySelector("#day3")
const threeday = document.querySelector("threeDay")
const current = document.querySelector(".current")
let his = []
//add date to list on side after search

function addInitData(data){
    
    // access temp data
    let temp = data["current_condition"][0]["temp_F"]
    // create li element for results
    let li = document.createElement('li')
    // create anchor element
    let a =  document.createElement("a")
    a.setAttribute("href","#")
   

    a.addEventListener("click",(event)=>{
    event.preventDefault()
   // console.log(a)
    const searched = `${BASE}${a.textContent}?format=j1`
    
    
    fetch(searched)
        .then((res)=> res.json())
        .then((res) => {
            mainLoc = a.textContent
            dataInMain(res)
            addDay1(res)
            addDay2(res)
            addDay3(res)
        })
        .catch((error)=>{
        
            console.log(error)
        })
})
    
    // a.setAttribute()
    
    a.textContent = loc
    mainLoc = loc
    his.push (mainLoc)
    
    //console.log(a.textContent)
    // create p tag for the temp
  
console.log (his)
console.log(loc)


    li.append(a)
    // a.insertAdjacentText('afterend',` - ${temp}⁰F`)
    a.insertAdjacentHTML('afterend',` - ${temp}⁰F`)
    ul.append(li)
    // console.log(ul)
    

}

function dataInMain(data){
if(i === 1){
        mainP.innerHTML = ""
        i++
    }else if(i >=2){
        current.innerHTML = ""
    }


let searched = document.createElement('h2')
console.log(mainLoc)

searched.innerText = mainLoc
let area = document.createElement("p")
area.innerHTML = ( `<strong> Area:</strong>  ${data["nearest_area"][0]["areaName"][0]["value"]}`)
let region = document.createElement("p")
region.innerHTML = (`<strong>Region:</strong> ${data["nearest_area"][0]["region"][0]["value"]}`)
let country= document.createElement("p")
country.innerHTML = (`<strong> Country:</strong>  ${data["nearest_area"][0]["country"][0]["value"]}`)
let currently = document.createElement("p")
currently.innerHTML = (`<strong> Currently:</strong>  Feels Like ${data["current_condition"][0]["FeelsLikeF"]}⁰F`)


current.append(searched)
current.append(area)

current.append(region)

current.append(country)

current.append(currently)


}

function addDay1 (data){
    if(i > 0){
        
        day1.innerHTML = ""
    }
let today = document.createElement('h2')
today.innerText = "Today"
let avg = document.createElement("p")
avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][0]["avgtempF"]}⁰F`)
let maxT = document.createElement("p")
maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][0]["maxtempF"]}⁰F`)
let minT= document.createElement("p")
minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][0]["mintempF"]}⁰F`)


day1.append(today,avg,maxT,minT)

//console.log("data: ", data)
}


function addDay2 (data){
    if(i > 0){
        
        day2.innerHTML = ""
    }
    let tomm = document.createElement('h2')
    tomm.innerText = "Tomorrow"
    let avg = document.createElement("p")
    avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][1]["avgtempF"]}⁰F`)
    let maxT = document.createElement("p")
    maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][1]["maxtempF"]}⁰F`)
    let minT= document.createElement("p")
    minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][1]["mintempF"]}⁰F`)
    
    
    day2.append(tomm,avg,maxT,minT)
    }


function addDay3 (data){
    if(i > 0){
        
        day3.innerHTML = ""
    }
    let dAft = document.createElement('h2')
    dAft.innerText = "Day After Tomorrow"
    let avg = document.createElement("p")
    avg.innerHTML = ( `<strong> Average Temperature: </strong>  ${data["weather"][2]["avgtempF"]}⁰F`)
    let maxT = document.createElement("p")
    maxT.innerHTML = (`<strong>Max Temperature: </strong> ${data["weather"][2]["maxtempF"]}⁰F`)
    let minT= document.createElement("p")
    minT.innerHTML = (`<strong> Min Temperature :</strong>  ${data["weather"][2]["mintempF"]}⁰F`)
    
    
    day3.append(dAft,avg,maxT,minT)
    }

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let input = document.querySelector("#location").value
    const searched = `${BASE}${input}?format=j1`
    loc = input
    form.reset()
    if(i === 0){
        ul.innerHTML = ''
        i++
    }


    

    fetch(searched)
        .then((res)=> res.json())
        .then((res) => {
            
            //console.log (input)
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