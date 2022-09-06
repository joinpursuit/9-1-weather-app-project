console.log('main.js successfully linked')
const BASE_URL = 'https://wttr.in'
const JSON = '?format=j1'
const form = document.querySelector('form')
const artStor = document.querySelector('main article')
const formInput = document.querySelector('input')
console.log(artStor)
// const todayStor = document.querySelector('#Today')
// const tmmStor =  document.querySelector('#Tommorow')
// const dayTmmStore = document.querySelector('#DayAfterTmm')
// artStor.innerHTML = ''
// todayStor.innerHTML = ''
// tmmStor.innerHTML = ''
// dayTmmStore.innerHTML = ''
// console.log(tmmStor, todayStor, dayTmmStore)
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
        console.log(artStor)
        const currentArt = document.querySelector('.CurrentCity')
        if(currentArt){
            currentArt.remove()
        }
        const daysPs = document.querySelectorAll('.Today p')
        console.log(daysPs)
        // check for the children of the today, tommorow and day after tommorow articles inside of upcoming weather aside
        // grab all the ps, remove the ps via querySelectorAll syntax, figure out how to syntaxily grab it.
        // if that doesnt work, create elements with javascript and not HTML
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

        // creating the 3 day
        const averageToday = document.createElement('p')
        const maxToday = document.createElement('p')
        const minToday = document.createElement('p')

        const averageTmm = document.createElement('p')
        const maxTmm = document.createElement('p')
        const minTmm = document.createElement('p')

        const averageDayTmm = document.createElement('p')
        const maxDayTmm = document.createElement('p')
        const minDayTmm = document.createElement('p')

        // populating the 3 day elements with corrosponding data
        averageToday.textContent = `Average Temperature: ${res.weather[0].avgtempF}`
        maxToday.textContent = `Max Temperature: ${res.weather[0].maxtempF}`
        minToday.textContent = `Min Temperature: ${res.weather[0].mintempF}`

        averageTmm.textContent = `Average Temperature: ${res.weather[1].avgtempF}`
        maxTmm.textContent = `Max Temperature: ${res.weather[1].maxtempF}`
        minTmm.textContent = `Min Temperature: ${res.weather[1].mintempF}`

        averageDayTmm.textContent = `Average Temperature: ${res.weather[2].avgtempF}`
        maxDayTmm.textContent = `Max Temperature: ${res.weather[2].maxtempF}`
        minDayTmm.textContent = `Min Temperature: ${res.weather[2].mintempF}`

        // OLD appending elements to appopriate position
        // todayStor.append(averageToday, maxToday, minToday)
        // tmmStor.append(averageTmm, maxTmm, minTmm)
        // dayTmmStore.append(averageDayTmm, maxDayTmm, minDayTmm)


    article.append(header,area,region,country,currently)
    artStor.append(article)

        console.log(article)
        console.log(res.nearest_area[0].areaName[0].value)
        formInput.value = ""
        console.log(res)

    })
}) 

console.log(`${BASE_URL}${JSON}`)
console.log(form)
console.log(artStor)