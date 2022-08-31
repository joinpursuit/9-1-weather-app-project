const Base_URL = 'https://wttr.in/London'
const form1 = document.querySelector("#search-bar")
// console.log(form1)
//search bar
const searchBar= document.querySelector(".enter-location")
// console.log(searchBar)
form1.addEventListener("submit", (event)=>{
 event.preventDefault()  
 form1.reset()
console.log("I have been reset")
// let location = event.target.location.value
// console.log(location)
fetch("https://wttr.in/London")
.then((res)=>res.json)
.then((resJson)=>{
    console.log(resJson.results)
    let results = resJson.results
})
.catch((err)=> err)
})
//!
// form1.addEventListener("submit", (event)=>{
//     event.preventDefault()
// searchBar.addEventListener("submit", (e)=>{
//     searchBar.textContent
// })

// })