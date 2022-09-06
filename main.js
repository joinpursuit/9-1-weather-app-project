console.log('main.js successfully linked')
const BASE_URL = 'https://wttr.in'
const JSON = '?format=j1'
const form = document.querySelector('form')
const artStor = document.querySelector('main aside')
const formInput = document.querySelector('input')
const todayStor = document.querySelector('#Today h4')
const tmmStor =  document.querySelector('#Tommorow h4')
const dayTmmStore = document.querySelector('#DayAfterTmm h4')
console.log(tmmStor, todayStor, dayTmmStore)
let count = 0
console.log(`form submissions: ${count}`)

form.addEventListener('submit', (event)=>{
    // document.querySelector('main').innerText = ''
    event.preventDefault()
    count += 1
    console.log(`form submissions: ${count}`)
    const input = formInput.value
    const URL = `${BASE_URL}/${input}${JSON}`
    console.log(URL)
    console.log('form has been submitted successfully!')
    console.log(formInput.value)
    fetch(URL)
    .then((res) => res.json())
    .then((res) => { 
        const article = document.createElement('article')
        article.classList.add('CurrentCity')
        const header = document.createElement('h2')
        const area  = document.createElement('p')
        const region  = document.createElement('p')
        const country  = document.createElement('p')
        const currently  = document.createElement('p')
        // header.textContent = `${res.}`
        header.textContent = res.nearest_area[0].areaName[0].value
        area.textContent = `Area: ${res.nearest_area[0].areaName[0].value}`
        region.textContent = `Region: ${res.nearest_area[0].region[0].value}`
        country.textContent = `Country: ${res.nearest_area[0].country[0].value}`
        currently.textContent = `Feels Like: ${res.current_condition[0].FeelsLikeF}°F`

    article.append(header,area,region,country,currently)
    artStor.append(article)

        console.log(article)
        console.log(res.nearest_area[0].areaName[0].value)
        formInput.value = ""

    })
}) 

console.log(`${BASE_URL}${JSON}`)
console.log(form)
console.log(artStor)