
const formHeader = document.querySelector(".pickLocation")
    // let searchCounter = 0;

formHeader.addEventListener(('submit'), (event) => {
    event.preventDefault()
    //console.log(event)
    //assign input entered in Get Weather form by user into a variable
    const searchInput = event.target.search.value
    //console.log("Search input", searchInput)

    let Base_URL = `http://wttr.in/${searchInput}?format=j1`
    // searchCounter ++
    // console.log("Number of Searches: ", searchCounter)
    fetch(`${Base_URL}`) 
        .then(response => response.json())
        .then((data) => {
       console.log("Fetched data", data)
       // console.log("nearest_area ", data.nearest_area[0].areaName[0].value)
     // formHeader.reset();
          // Variables for Initial Single Search 
        // const weatherResults = document.querySelector('.weatherResults')
        // const area = document.querySelector('.city')
        // const region1 = document.querySelector('.region')
        // const country1 = document.querySelector('.country')
        // const currently1 = document.querySelector('.currently')
        
        
        //Variables for 4+ searches
        const weather_app_header = document.querySelector('.weather_App_Header')
        const city = document.querySelector('.city')
        const nArea = document.querySelector('.nearest')
        const region = document.querySelector('.region')
        const country = document.querySelector('.country')
        const currently = document.querySelector('.currently')
        const sun = document.querySelector('.sun')
        const rain = document.querySelector('.rain')
        const snow = document.querySelector('.snow')





           const avgToday = document.createElement('span')
           span.classList.add("avgToday");
           const maxToday = document.createElement('span')
           span.classList.add("maxToday");
           const minToday = document.createElement('span')
           span.classList.add("minToday");


           const avgTomorrow = document.createElement('span')
           span.classList.add("avgTomorrow");
           const maxTomorrow = document.createElement('span')
           span.classList.add("maxTomorrow");
           const minTomorrow = document.createElement('span')
           span.classList.add("minTomorrow");

           const avgDayAfter = document.createElement('span')
           span.classList.add("avgDayAfter");
           const maxDayAfter = document.createElement('span')
           span.classList.add("maxDayAfter");
           const minDayAfter = document.createElement('span')
           span.classList.add("minDayAfter");

  
        // area.textContent = searchInput
        // region1.textContent = "Region: " + data.nearest_area[0].region[0].value
        // country1.textContent = "Country: " + data.nearest_area[0].country[0].value
        // currently1.textContent = "Currently: " +  data.current_condition[0].FeelsLikeF
        
    
        // Data for 4+ searches - larger layout hidden until after 3 searches

        weather_app_header.textContent = searchInput
        nArea.textContent = data.nearest_area[0].areaName[0].value
        region.textContent = data.nearest_area[0].region[0].value
        country.textContent = data.nearest_area[0].country[0].value
        currently.textContent = data.current_condition[0].FeelsLikeF
        sun.textContent = data.weather[0].hourly[0].chanceofsunshine
        rain.textContent = data.weather[0].hourly[0].chanceofrain
        snow.textContent = data.weather[0].hourly[0].chanceofsnow

        avgToday.textContent = data.weather[0].avgtempF
        maxToday.textContent = data.weather[0].maxtempF
        minToday.textContent = data.weather[0].mintempF

        avgTomorrow.textContent = data.weather[1].avgtempF
        maxTomorrow.textContent = data.weather[1].maxtempF
        minTomorrow.textContent = data.weather[1].maxtempF

        avgDayAfter.textContent = data.weather[2].maxtempF
        maxDayAfter.textContent = data.weather[2].maxtempF
        minDayAfter.textContent = data.weather[2].maxtempF

        noPrevSearch.remove()
        searchList.style.display = "block"
        const li = document.createElement('li')
        searchList.append(li)
        
        // tried formHeader.reset, searchInput.textContent =""
        
        
      
  
        
    })


//     <form oninput="fTemp.value=parseInt(a.value)+parseInt(b.value)">
//     <label for="tempSelect"><strong>Convert the temperature:</strong> </label><br>
//     <input type ="number" id="tempSelect" name="tempSelect" size ="50" min ="-50" max ="130" step="1" value="100"><br>

//     <label for="celcius">To Celcius:     </label>
//     <input type="radio" id="celcius"
//     name="celcius" value="celcius"> <br>
//     <label for="farenheit">To Farenheit:</label>
//     <input type="radio" id="farenheit"
//     name="farenheit" value="farenheit"><br><br>

//     <button type="submit">Submit</button><br><br>
//     <p class="convertedTemp"></p>

// </form>  

//     // <img src="./assets/icons8-summer.gif" alt="picture of sun" width = "75vw" height = "75vh" >
//     // <span class="city"></span><br><br>
//     //     <span class="nearest"></span><br><br>
//     // <span class="region"> </span>
//     // <br><br>
//     //     <span class="country">Country:</span><br><br>
//     //     <span class="currently">Currently: Feels like </span><br><br>
//     //     <span class="sun">Chance of Sunshine:</span><br><br>
//     //     <span class="rain">Chance of Rain:</span><br><br>
//     //     <span class="snow">Chance of Snow:</span>   
//     // <br></br>





// // Then, write some logic to display the correct icon (see the `assets` folder)

// // - if there is more than a 50% chance of sunshine, show the `summer` icon with `alt` text `sun`
// // - if there is more than a 50% chance of rain, show the `torrential-rain` icon with `alt` text `rain`
// // - if there is more than a 50% chance of snow, show the `light-snow` icon with `alt` text `snow`
        
//         .catch((err) => console.log(err))

 
// })

// // const div = document.createElement("div");
// //   div.classList.add("cell");
// //   main.append(div);