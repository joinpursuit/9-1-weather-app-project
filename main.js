console.log('main.js successfully linked')
const BASE_URL = 'https://wttr.in'
const JSON = '?format=j1'
const form = document.querySelector('form')
const artStor = document.querySelector('main article')
artStor.id = 'artStor'
const formInput = document.querySelector('input')
const main = document.querySelector('main')
const searchStor = document.querySelector('aside section')
const cityArr = []
console.log(searchStor)
console.log(artStor)

// const todayStor = document.querySelector('#Today')
// const tmmStor =  document.querySelector('#Tommorow')
// const dayTmmStore = document.querySelector('#DsearchStorayAfterTmm')
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
    cityArr.push(input)
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
        const current3Day = document.querySelector('.UpcomingWeather')
        console.log(current3Day)
        if(current3Day){
            console.log('current3day true')
            current3Day.remove()
        } else {console.log('current3day false')}
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

        // creating the 3 day ==
        // creating the articles
        // creating upcoming weather aside
        const upcomingWeather = document.createElement('aside')
        upcomingWeather.id = 'Upcoming-Weather'
        upcomingWeather.classList.add('UpcomingWeather')
        console.log(upcomingWeather)

        // creating the 3 articles with classes of Today, Tommorow, DayAfterTmm
        // first the elements
        const todayStor = document.createElement('article')
        const tmmStor = document.createElement('article')
        const dayTmmStore = document.createElement('article')
        // now the ids
        todayStor.id = 'Today'
        tmmStor.id = 'Tommorow'
        dayTmmStore.id = 'DayAfterTmm'

        // inner html of articles
        // adding h2s
        const h2Today = document.createElement('h2')
        const h2Tmm = document.createElement('h2')
        const h2DayTmm = document.createElement('h2')

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

        h2Today.textContent = 'Today'
        h2Tmm.textContent = 'Tommorow'
        h2DayTmm.textContent = 'Day After Tommorow'

        // creaitng chance of sunshine article entry
        const currentChanceOfSun = document.createElement ('p')
        currentChanceOfSun.textContent = `Chance of Sunshine: ${res.weather[0].hourly[0].chanceofsunshine
        }`
        console.log(currentChanceOfSun)
        
        // creating chance of rain article entry
        const currentChanceOfRain = document.createElement ('p')
        currentChanceOfRain.textContent = `Chance of Rain: ${res.weather[0].hourly[0].chanceofrain}`
        console.log(currentChanceOfRain)

        const currentChanceOfSnow = document.createElement('p')
        currentChanceOfSnow.textContent = `Chance of Snow ${res.weather[0].hourly[0].chanceofsnow}`


        // adding previous search function
        // on form submission, create li `area-value and feel- like-temp`
        const prevSearch = document.createElement('li')
        const prevSearchA = document.createElement('a')

        console.log(prevSearch)
        // populating with data
        prevSearch.textContent = `${res.nearest_area[0].areaName[0].value} - ${res.current_condition[0].FeelsLikeF}°F`
        console.log(prevSearch)
         // append to li to appopriate location ( sidebar )
         if(cityArr.includes(document.querySelector('input').value)){
            prevSearch.remove()
         } else {
            searchStor.append(prevSearch)
         }
         const checkPreSearch = document.querySelector('.prevS')
         if(checkPreSearch){checkPreSearch.remove()}
         prevSearchA.setAttribute('href', '#')
         prevSearchA.textContent = input
         prevSearch.append(prevSearchA)
         searchStor.append(prevSearch)



        // OLD appending elements to appopriate position
        todayStor.append(h2Today,averageToday, maxToday, minToday)
        tmmStor.append(h2Tmm,averageTmm, maxTmm, minTmm)
        dayTmmStore.append(h2DayTmm,averageDayTmm, maxDayTmm, minDayTmm)

        article.append(header,area,region,country,currently,currentChanceOfSun,currentChanceOfRain,currentChanceOfSnow)
        artStor.append(article)
        // apppending 3 day classed elements to current weather aside
        upcomingWeather.append(todayStor,tmmStor,dayTmmStore)
        // appending 3 day article to artStor
        artStor.append(upcomingWeather)

       

        console.log(article)
        console.log(res.nearest_area[0].areaName[0].value)
        formInput.value = ""
        console.log(res)

    })
}) 
 //adding click functionality to previous search aside
        // selecting the whole UL first
        search = document.querySelector('.search')
        search.addEventListener('click', (event)=>{
            let clicked = event.path[0].textContent
            console.log(clicked)
            console.log(clicked.split('-')[0])
            let clickedSplit = clicked.split('-')[0]
            console.log(clickedSplit)
            let clickedSplitTrim = clickedSplit.trim()
            console.log(clickedSplitTrim)
            const noWClickedSplitTrim = clickedSplitTrim.split(' ').join('+')
            console.log(noWClickedSplitTrim)
            console.log(event.path[0])
            const URL = `${BASE_URL}/${noWClickedSplitTrim}${JSON}`
        
    console.log(URL)
    console.log('link has been clicked successfully!')
    fetch(URL)
    .then((res) => res.json())
    .then((res) => { 
        console.log(artStor)
        const currentArt = document.querySelector('.CurrentCity')
        if(currentArt){
            currentArt.remove()
        }
        const current3Day = document.querySelector('.UpcomingWeather')
        console.log(current3Day)
        if(current3Day){
            console.log('current3day true')
            current3Day.remove()
        } else {console.log('current3day false')} 
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

        // creating the 3 day ==
        // creating the articles
        // creating upcoming weather aside
        const upcomingWeather = document.createElement('aside')
        upcomingWeather.id = 'Upcoming-Weather'
        upcomingWeather.classList.add('UpcomingWeather')
        console.log(upcomingWeather)

        // creating the 3 articles with classes of Today, Tommorow, DayAfterTmm
        // first the elements
        const todayStor = document.createElement('article')
        const tmmStor = document.createElement('article')
        const dayTmmStore = document.createElement('article')
        // now the ids
        todayStor.id = 'Today'
        tmmStor.id = 'Tommorow'
        dayTmmStore.id = 'DayAfterTmm'

        // inner html of articles
        // adding h2s
        const h2Today = document.createElement('h2')
        const h2Tmm = document.createElement('h2')
        const h2DayTmm = document.createElement('h2')

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

        h2Today.textContent = 'Today'
        h2Tmm.textContent = 'Tommorow'
        h2DayTmm.textContent = 'Day After Tommorow'

        // adding previous search function
        // on form submission, create li `area-value and feel- like-temp`
        
        
        const prevSearch = document.createElement('li')
        console.log(prevSearch)
        // populating with data
        prevSearch.textContent = `${res.nearest_area[0].areaName[0].value} - ${res.current_condition[0].FeelsLikeF}°F`
        console.log(prevSearch)
         // append to li to appopriate location ( sidebar )
         console.log(cityArr)
        
        //  for (let index = 0; index < cityArr.length; index++) {
        //     const city = cityArr[index];
        //     if(city === input){
        //         console.log('there was an match!, removing created element!')
        //         prevSearch.remove()
        //     } else { 
        //         searchStor.append(prevSearch)
        //     }
        // }
        




        // OLD appending elements to appopriate position
        todayStor.append(h2Today,averageToday, maxToday, minToday)
        tmmStor.append(h2Tmm,averageTmm, maxTmm, minTmm)
        dayTmmStore.append(h2DayTmm,averageDayTmm, maxDayTmm, minDayTmm)

        article.append(header,area,region,country,currently)
        artStor.append(article)
        // apppending 3 day classed elements to current weather aside
        upcomingWeather.append(todayStor,tmmStor,dayTmmStore)
        // appending 3 day article to artStor
        artStor.append(upcomingWeather)

       

        console.log(article)
        console.log(res.nearest_area[0].areaName[0].value)
        formInput.value = ""
        console.log(res)

    })

        })
console.log(`${BASE_URL}${JSON}`)
console.log(form)
console.log(artStor)