const weatherButton = document.querySelector('#weather-button')
const main = document.querySelector('main')
const content1 = document.getElementById('content1')
const content2 = document.getElementById('content2')
const content3 = document.getElementById('content3')
const content4 = document.getElementById('content4')
const sidebar = document.getElementById('sidebar-list')
const ul = document.querySelector('ul') 
const searched = [];
const searchedMap = {};
// const liArr = []


weatherButton.addEventListener('click', (event) => {
   // sidebar.innerText = 'Previous Searches';

    event.preventDefault();    

    let id = document.getElementById('location-id');
    let inputID = id.value.trim().split(' ').join('+')

    searched.push(id.value)
    if (searchedMap[id.value]) {
        searchedMap[id.value] +=1
    } else {    searchedMap[id.value] = 1;


    }

    console.log('searched map', searchedMap);
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
                content1.innerHTML = `<h2>${id.value}</h2>\n
                <p><strong>Nearest Area:</strong> ${areaName}</p>\n
                <p><strong>Region:</strong> ${region}</p>\n
                <p><strong>Country:</strong> ${country}</p>\n
                <p><strong>Currently:</strong> Feels Like ${current}°F</p>`

                content2.innerHTML = `<h2>Today</h2>\n
                <p><strong>Average Temperature:</strong> ${avgTempToday}°F</p>\n
                <p><strong>Max Temperature:</strong> ${maxTempToday}°F</p>\n
                <p><strong>Min Temperature:</strong> ${minTempToday}°F</p>`

                content3.innerHTML = `<h2>Tomorrow</h2>\n
                <p><strong>Average Temperature:</strong> ${avgTempTomorrow}°F</p>\n
                <p><strong>Max Temperature:</strong> ${maxTempTomorrow}°F</p>\n
                <p><strong>Min Temperature:</strong> ${minTempTomorrow}°F</p>`

                content4.innerHTML = `<h2>Day After Tomorrow</h2>\n
                <p><strong>Average Temperature:</strong> ${avgTemp2Days}°F</p>\n
                <p><strong>Max Temperature:</strong> ${maxTemp2Days}°F</p>\n
                <p><strong>Min Temperature:</strong> ${minTemp2Days}°F</p>`

        
                    //console.log('true or false: ', searched.includes(id.value));
                    console.log('searched: ', searched);
                    console.log('maths', searchedMap[id.value] > 1);
                    
                if (searchedMap[id.value] < 2) {
                    const li = document.createElement('li');
                    li.innerHTML = `<a>${id.value}</a>  - ${current}°F`;
                    li.data = id.value;
                    ul.append(li);

                    li.addEventListener('click', () => {
                        let BASE_URL = `https://wttr.in/${id.value}?format=j1`;
                        let trim = BASE_URL.trim().split(' ').join('+')
                        fetch(trim)
                            .then((res) => res.json())
                            .then((liData) => {
                                console.log(li.data)
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
                    
                                    content1.innerHTML = `<h2>${li.data}</h2>\n
                                    <p><strong>Area:</strong> ${areaName}</p>\n
                                    <p><strong>Region:</strong> ${region}</p>\n
                                    <p><strong>Country:</strong> ${country}</p>\n
                                    <p><strong>Currently:</strong> Feels Like ${current}°F</p>`
                    
                                    content2.innerHTML = `<h2>Today</h2>\n
                                    <p><strong>Average Temperature:</strong> ${avgTempToday}°F</p>\n
                                    <p><strong>Max Temperature:</strong> ${maxTempToday}°F</p>\n
                                    <p><strong>Min Temperature:</strong> ${minTempToday}°F</p>`
                    
                                    content3.innerHTML = `<h2>Tomorrow</h2>\n
                                    <p><strong>Average Temperature:</strong> ${avgTempTomorrow}°F</p>\n
                                    <p><strong>Max Temperature:</strong> ${maxTempTomorrow}°F</p>\n
                                    <p><strong>Min Temperature:</strong> ${minTempTomorrow}°F</p>`
                    
                                    content4.innerHTML = `<h2>Day After Tomorrow</h2>\n
                                    <p><strong>Average Temperature:</strong> ${avgTemp2Days}°F</p>\n
                                    <p><strong>Max Temperature:</strong> ${maxTemp2Days}°F</p>\n
                                    <p><strong>Min Temperature:</strong> ${minTemp2Days}°F</p>`
                
                // liArr.push(li)

                    
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }) //end of event listener
                }//end of if
           
                // for (elem of searched) {
                //     if (liArr.includes(elem)) {
                //         li.remove()
                //     }
                // }
                // if (searched.includes(li.data)) {
                // // li doesn't get appended
                // // li.remove()
                //  }
        

                sidebar.innerText = ''
                id.value = ''
        }
                
            })
        .catch((error) => {
            console.log(error)
        })
    })