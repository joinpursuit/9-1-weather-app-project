const weatherButton = document.querySelector('#weather-button')
const main = document.querySelector('main')
const content2 = document.getElementsByClassName('content-2')


weatherButton.addEventListener('click', (event) => {

    event.preventDefault();

    let id = document.getElementById('location-id');
    let inputID = id.value.trim().split(' ').join('+')
    // console.log(inputID)
    let BASE_URL = `https://wttr.in/${inputID}?format=j1`;
    console.log('base url: ', BASE_URL);
    console.log('location value: ', id);

    fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            // console.log(data.current_condition[0].FeelsLikeF)

            const current = data.current_condition[0].FeelsLikeF
            // console.log(current)

            const areaName = data.nearest_area[0].areaName[0].value
            // console.log(areaName)

            const region = data.nearest_area[0].region[0].value
            // console.log(region)

            const country = data.nearest_area[0].country[0].value
            // console.log(country)

            const maxTempToday = data.weather[0].maxtempF
            const minTempToday = data.weather[0].mintempF
            const avgTempToday = data.weather[0].avgtempF

            // console.log('today forecast:' , maxTempToday, minTempToday, avgTempToday)

            const maxTempTomorrow = data.weather[1].maxtempF
            const minTempTomorrow = data.weather[1].mintempF
            const avgTempTomorrow = data.weather[1].avgtempF

            // console.log('tomorrow forecast:' , maxTempTomorrow, minTempTomorrow, avgTempTomorrow)

            const maxTemp2Days = data.weather[2].maxtempF
            const minTemp2Days = data.weather[2].mintempF
            const avgTemp2Days = data.weather[2].avgtempF

            // console.log('2days forecast:' , maxTemp2Days, minTemp2Days, avgTemp2Days)

            if(id.value !== '') {
                main.innerHTML = `<h2>${id.value}</h2>\n
                <p><strong>Area:</strong> ${areaName}</p>\n
                <p><strong>Region:</strong> ${region}</p>\n
                <p><strong>Country:</strong> ${country}</p>\n
                <p><strong>Currently:</strong> Feels Like ${current}°F</p>`

                content2.innerHTML = `<h2>Today</h2>`
            }
        
            

        })
        .catch((error) => {
            console.log(error)
        })
    
})