const URL = "https://wttr.in/city?format=j1"


let form = document.querySelector("form")
//might need to use history and main

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    onSubmit()
})

function onSubmit(){
    //The onsubmit event is an event that occurs when you try to submit a form.
    fetch(URL)
    .then(res => res.json())
    .then(res => {res.results.forEach(City=> {

        //TRYING TO TAKE API INFO AND FOR EACH RESULT GIVE ME THE WEATHER FOR 3 ARTICLES PER CITY. 

        //CREATE 4 ARTICLES INSIDE HERE

        //SET NEEDED ATTRIBUTES
       
       //INNER TEXT 
       
       //APPEND

        // submit.addEventListener("click", () => {
        //     .removeAttribute("")
        // })
    })
    })
    .catch((error) => {
        console.log(error)
    })
}