
//select form and assign to variable
const formHeader = document.querySelector(".pickLocation")

//create and initialize array to capture previous searches, in order to check for detect duplicate
let searchCheck = ["initialValue1", "initialValue2"];


//create event listener for Search Form

formHeader.addEventListener(('submit'), (event) => {
    event.preventDefault()
    //console.log(event)


    //assign input entered in Get Weather form by user into a variable

    const searchInput = event.target.search.value
    console.log("Search input", searchInput)


    //assign wttr.in API url to variable 

    let Base_URL = `http://wttr.in/${searchInput}?format=j1`

 
   //fetch data, select elements, assign them to variables and assign data points to variables
    fetch(`${Base_URL}`) 
        .then(response => response.json())
        .then((data) => {
        //console.log("Fetched data", data)
        //console.log(data.nearest_area[0].areaName[0].value)
        const weather_app_header = document.querySelector('.weather_App_Header')
        const city = document.createElement('h2')
        const nArea = document.createElement('p')
        const region = document.createElement('p')
        const country = document.createElement('p')
        const currently = document.createElement('p')
        const sun = document.createElement('p')
        const rain = document.createElement('p')
        const snow = document.createElement('p')
        const weatherBox = document.querySelector('article')
        const img = document.createElement('img')
        const showSun =  parseInt(data.weather[0].hourly[0].chanceofsunshine)
        const showRain = parseInt(data.weather[0].hourly[0].chanceofrain)
        const showSnow = parseInt(data.weather[0].hourly[0].chanceofsnow)
        const showFrost =  parseInt(data.weather[0].hourly[0].chanceoffrost)
        const showFog = parseInt(data.weather[0].hourly[0].chanceoffog)
        const showWindy = parseInt(data.weather[0].hourly[0].chanceofwindy)
        const showThunder =  parseInt(data.weather[0].hourly[0].chanceofthunder)
  


        //clear old search results from weather box (article element in HTML doc)

        weatherBox.innerHTML = ""


        
        //set size of weather gif

        img.setAttribute('height', 100)
        img.setAttribute('width', 100)

       
        //Determine which whether gif should display based on fetched data: Currently

        if(showSun > 50){
            img.setAttribute('src', "./assets/icons8-summer.gif")
            img.setAttribute('alt',"sun")
        }

        if(showRain > 50){
            img.setAttribute('src', "./assets/icons8-torrential-rain.gif")
            img.setAttribute('alt',"rain")
        }

        if(showSnow > 50){
            img.setAttribute('src', "./assets/icons8-light-snow.gif")
            img.setAttribute('alt',"snow")
        }

        // this one interefered with test results
        // if(showFrost > 50){
        //     img.setAttribute('src', "./assets/icons8-icy.gif")
        //     img.setAttribute('alt',"icy")
        // }

        if(showFog> 50){
            img.setAttribute('src', "./assets/icons8-fog.gif")
            img.setAttribute('alt',"fog")
        }

        if(showWindy> 50){
            img.setAttribute('src', "./assets/icons8-wind.gif")
            img.setAttribute('alt',"windy")
        }
        if(showThunder> 50){
            img.setAttribute('src', "./assets/icons8-storm.gif")
            img.setAttribute('alt',"storm")
        }


        //attach weather gif to weatherBox (article element in HTML doc)

        weatherBox.appendChild(img)



        //attach weather results to weatherBox and set add the fetched data to their textContent property

        city.textContent = searchInput
        weatherBox.append(city)
    
        nArea.textContent = "Nearest Area: " + data.nearest_area[0].areaName[0].value
        weatherBox.append(nArea)
       
        region.textContent =  "Region: " + data.nearest_area[0].region[0].value
        weatherBox.append(region)
       
        country.textContent =  "Country: " + data.nearest_area[0].country[0].value
        weatherBox.append(country)
       
        currently.textContent =  "Currently Feels Like: " + data.current_condition[0].FeelsLikeF + "°F"
        weatherBox.append(currently)
       
        sun.textContent = "Chance of Sunshine: "+ data.weather[0].hourly[0].chanceofsunshine + "%"
        weatherBox.append(sun)
        
        rain.textContent =  "Chance of Rain: " + data.weather[0].hourly[0].chanceofrain + "%"
        weatherBox.append(rain)
   
        snow.textContent =  "Chance of Snow: " + data.weather[0].hourly[0].chanceofsnow + "%"
        weatherBox.append(snow)
       

        const tempConvertForm = document.querySelector('.tempConvert')
        const toC = document.getElementById('to-c')
        const toF = document.getElementById('to-f')
        const tempResult = document.querySelector('.tempResult')
        let answer = 0;
        console.log(toC)
        console.log(toF)

        
        //Calculate conversion based on user selection and display in h4 element

        tempConvertForm.addEventListener('submit', (event)=> {
            event.preventDefault()
            console.log(event)
            if((toC).checked){
                answer = (event.target.tempNum.value - 32) * (5/9) 
             } else if((toF).checked){
                answer = ((event.target.tempNum.value * 9/5) + 32)
             }
             answer = answer.toFixed(2)   
            tempResult.textContent = answer;
        })



        //create elements to populate empty weather box with search results from fetched data

        const avgToday = document.createElement('p')
        avgToday .classList.add("avgToday");
        const maxToday = document.createElement('p')
        maxToday.classList.add("maxToday");
        const minToday = document.createElement('p')
        minToday.classList.add("minToday");

        const avgTomorrow = document.createElement('p')
        avgTomorrow.classList.add("avgTomorrow");
        const maxTomorrow = document.createElement('p')
        maxTomorrow.classList.add("maxTomorrow");
        const minTomorrow = document.createElement('p')
        minTomorrow.classList.add("minTomorrow");

        const avgDayAfter = document.createElement('p')
        avgDayAfter.classList.add("avgDayAfter");
        const maxDayAfter = document.createElement('p')
        maxDayAfter.classList.add("maxDayAfter");
        const minDayAfter = document.createElement('p')
        minDayAfter.classList.add("minDayAfter");

        // the empty UL = searchList, each line item = searchItem, the hyperlinked serach = prevSearchLink
        const searchList = document.querySelector('.searchList')
        const searchItem = document.createElement('li')
        const prevSearchLink = document.createElement('a')

        //-- ---------- Previous Searches List (Search History) -hyperlinks with no duplicatins----------- 

       // searchItem is the list item (li) that will populate the unordered list element that exists in the HTML Document
        
      

        //remove noPrevSearch to eliminate initial placeholder text once searches begin
        const noPrevSearch = document.querySelector('.noPrevSearch')
        if(noPrevSearch){noPrevSearch.remove()}
       
        //console.log("prev-searchLink = ", prevSearchLink) - checking if link structure is correct


       //searchCheck is an array, intialized on line 6 with two initial values outside of this event handler.
   
        //Check for Duplicates in Search
        if(searchCheck.includes(searchInput)=== false) {
            searchList.append(searchItem)  //attach this li (searchItem)  to the ul (searchList)

            prevSearchLink.setAttribute('href', '#') //add the hyperlink attribute to the a tag (prevSearchLink)
            prevSearchLink.innerHTML = searchInput //assign the search value (searchInput) as textContent of the hyperlink (prevSearchLink)
            searchItem.append(prevSearchLink) //attach hyperlinked search (prevSearchLink) to the line item (searchItem)

            console.log("presearchLink = ", prevSearchLink) 
            searchItem.innerHTML += " - " + data.current_condition[0].FeelsLikeF + "°F"
            searchList.appendChild(searchItem)
        }
        searchCheck.push(searchInput)

        //old test statements
        //console.log("searchItem2=", searchItem)
        //console.log("presearchLink = ", prevSearchLink) - checking if link appears successfully        
        //console.log("search list = ", searchList)
     
       //assign variables to fetched data values

        const todayTemp = document.querySelector('.todayTemp')
     
        avgToday.textContent = "Average Temperature " + data.weather[0].avgtempF + "°F"
        maxToday.textContent =  "Max Temperature " + data.weather[0].maxtempF + "°F"
        minToday.textContent =  "Min Temperature " + data.weather[0].mintempF + "°F"
        todayTemp.append(avgToday)
        avgToday.after(maxToday)
        maxToday.after(minToday)

        const tomorrowTemp = document.querySelector('.tomorrowTemp')
  
        avgTomorrow.textContent =  "Average Temperature " + data.weather[1].avgtempF + "°F"
        maxTomorrow.textContent =  "Max Temperature " + data.weather[1].maxtempF + "°F"
        minTomorrow.textContent =   "Min Temperature " + data.weather[1].mintempF + "°F"
        tomorrowTemp.append(avgTomorrow)
        avgTomorrow.after(maxTomorrow)
        maxTomorrow.after(minTomorrow)

        const dayAfterTemp = document.querySelector('.dayAfterTemp')

        avgDayAfter.textContent =  "Average Temperature " + data.weather[2].avgtempF + "°F"
        maxDayAfter.textContent =  "Max Temperature " + data.weather[2].maxtempF + "°F"
        minDayAfter.textContent =   "Min Temperature " + data.weather[2].mintempF + "°F"

        dayAfterTemp.append(avgDayAfter)
        avgDayAfter.after(maxDayAfter)
        maxDayAfter.after(minDayAfter)

        //console.log(maxTomorrow.textContent)

        formHeader.reset()     
   })
// })

     .catch((err) => console.log(err))

})


// NOTES

// Temperature Widget Conversion formula s
// c to f:              (user input× 9/5) + 32  (formatted to 2 decimals)
// f to c:              (user input - 32 * 5/9  (formatted to 2 decimals)
// To display result:    h4 class: tempResult
// Aside class:         tempConversions     
// form class:          tempConvert
// input id:            temp-to-convert
// Celcius input id:    to-c
// Farenheit input id:  to-f


  






