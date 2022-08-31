const BASE_URL = 'https://wttr.in/city?format=j1'

 const form = document.querySelector("form")
//  console.log(form)

 form.addEventListener('submit', (event) => {
    event.preventDefault()

    fetch(`${BASE_URL}`)
    .then((res) => res.json)
    .then((res) => {
        const weather = res.current_condition
        console.log(weather)
     
    })
    .catch()
})