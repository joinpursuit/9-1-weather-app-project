const green = document.querySelector("green")
const form = document.querySelector("form")
const BASE = "https://wttr.in/"

const ul = document.querySelector("ul")
let loc = ""
let i = 0



//add date to list on side after search

function addData(data){
    // access temp data
    let temp = data["current_condition"][0]["temp_F"]
    // create li element for results
    let li = document.createElement('li')
    // clear ul
    let a =  document.createElement("a")
    a.setAttribute("href",`${BASE}${loc}?format=j1`)
    a.text = location
   
    li = `${a} - ${temp}⁰F`
    ul.append(li)
    console.log(ul)
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
            addData(res)
            
        })
        .catch((error)=>{
        
            console.log(error)
        })
})