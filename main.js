console.log('main.js successfully linked')
const BASE_URL = 'wttr.in'
const JSON = '?format=j1'
const form = document.querySelector('form')
const artStor = document.querySelector('main aside')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    console.log('form has been submitted successfully!')
    console.log(event.value)
})

console.log(`${BASE_URL}${JSON}`)
console.log(form)
console.log(artStor)


// LOG
// 154 finished HTML exo earlier today, pushing: 'HTML skeleton completed'
// getting api base url | line 2,3
// printing to console, success !
// select the header form | line 4
// printing to console, success !
// select the article storage ( in main ) | line 5
// printing to console, success!
// added event listener to header form, preventing default | line 7-8
// printing to console on form submission, no success :( could not find variable that stores data of form entry
// saving input to variable (UNFINISHED)
// looking for where event variable stores input (UNFINISHED)
