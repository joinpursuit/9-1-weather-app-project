// User Input Box, Header Form, Main
const cityInputBox = document.querySelector(`.cityInputBox`);
const headerForm = document.querySelector(`.headerForm`);
const chooseWeatherMain = document.querySelector(`.chooseWeather`);

// Previous Searches UL

//grabs the previous searches ul
const previousSearches = document.querySelector(`.previousSearches`);

//grabs the p tag with the id noPreviousSearches
const noPreviousSearchesP = document.querySelector(`#noPreviousSearches`);


// 3 Day Forcast

// grabs the 3 day forcast articles with the classlist of hidden
const forcastAside = document.querySelector(`.forcastAside`);

let day1AvgTemp = document.querySelector(`#day1AvgTemp`);
let day1MaxTemp = document.querySelector(` #day1MaxTemp`);
let day1MinTemp = document.querySelector(`#day1MinTemp`);


let day2AvgTemp = document.querySelector(`#day2AvgTemp`);
let day2MaxTemp = document.querySelector(`#day2MaxTemp`);
let day2MinTemp = document.querySelector(`#day2MinTemp`);


let day3AvgTemp = document.querySelector(`#day3AvgTemp`);
let day3MaxTemp = document.querySelector(`#day3MaxTemp`);
let day3MinTemp = document.querySelector(`#day3MinTemp`);


//grbs individual days
// const forcastAside = document.querySelector(`.forcastAside`)
// const day1 = document.querySelector(`#day1`);
// const day2 = document.querySelector(`#day2`);
// const day3 = document.querySelector(`#day3`);


//Add submit event listener to headerForm
headerForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  
    
    //turns input.value into a variable, trims it, and removes spaces and adds + char to make it URL-ready
  const cityInputVal = cityInputBox.value.trim().split(" ").join("+");

// Fetch request city
  let previousSearchedCity = cityInputBox.value.trim(); //--> New York
  
      
    //inserts user input string into the URL to complete a fetch call
    let URL = `https://wttr.in/${cityInputVal}?format=j1`; //--> "New+York"
    
    //FETCH
  fetch(URL)
    .then((res) => res.json())
    .then((resJson) => {

          
        
      
          //Weather Conditions
          let current = resJson.current_condition[0];
          //Areas
          let area = resJson.nearest_area[0];
          //Weather -- for 3 Day Forcast Aside
          let day1 = resJson.weather[0]; 
          let day2 = resJson.weather[1];
          let day3 = resJson.weather[2];
          
      

      let areaName = area.areaName[0].value; //--> area.areaName
      let region = area.region[0].value; //--> area.region
      let country = area.country[0].value; //--> area.country
          let feels_LikeF = current.FeelsLikeF; //--> currentcurrent_condition
    
    
            // IF Statement that fires via submit event IF Input Box has information it. Displays output for weather and regional info.
      if (cityInputBox.value !== "" && resJson !== undefined) {
        chooseWeatherMain.innerHTML = `<h2>${cityInputBox.value}</h2>\n<strong>Area:</strong><p>${areaName}</p>\n<strong>Region:</strong><p>${region}</p>\n<strong>Country:<p>${country}</p></strong>\n<strong>Currently:</strong> <p>Feels Like ${feels_LikeF} F</p>`;

        // sets 3 day forcast variables to values from resJson

        day1AvgTemp.innerText = `${day1.avgtempF}`;
        day1MaxTemp.innerText = `${day1.maxtempF}`;
        day1MinTemp.innerText = `${day1.mintempF}`;
        

        day2AvgTemp.innerText = `${day2.avgtempF}`;
        day2MaxTemp.innerText = `${day2.maxtempF}`;
        day2MinTemp.innerText = `${day2.mintempF}`;
       

        day3AvgTemp.innerText  = `${day3.mintempF}`;
        day3MaxTemp.innerText  = `${day3.mintempF}`;
        day3MinTemp.innerText = `${day3.mintempF}`;
        
        //unhides the 3 day forcast articles
        forcastAside.classList.remove(`hidden`);

        noPreviousSearchesP.classList.add(`hidden`)


        //create list items for previous searches
        const previousSearchItem = document.createElement(`li`);
        previousSearchLink = document.createElement(`a`)
        // previousSearchLink.innerText = ${}
        










      } 
    })
    .catch((err) => {
      console.error(err);
    });
});


 


    







//first time u click form u need input.value, but for subsequent searches (REFERRING TO PREVIOUS SEARCHED CITIES-- means u have store this somewhere/how) u have the base url, instead of using .value u the url of that city. u need to save the name from .value

//add event listener to new york so that it clears out the info from previous fetch call, and so that it does the current fetch 

// prevent default for form e

