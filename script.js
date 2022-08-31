// USER INPUT, HEADER, MAIN, TODAY'S WEATHER
const cityInputBox = document.querySelector(`.cityInputBox`);
const headerForm = document.querySelector(`.headerForm`);
const chooseWeatherMain = document.querySelector(`.chooseWeather`);
const mainTodaysWeather = document.querySelector(`#mainTodaysWeather`);

// PREVIOUS SEARCHES UL ASIDE

//grabs the previous searches ul
const previousSearches = document.querySelector(`.previousSearches`);

//grabs the p tag with the id noPreviousSearches
const noPreviousSearches = document.querySelector(`#noPreviousSearches`);

//grabs p tag in main that contains placeholder text
const mainPlaceHolderText = document.querySelector(`#mainPlaceHolderText`);




// 3 DAY FORCAST ASIDE

// grabs the 3 day forcast articles with the classlist of hidden
const forcastAside = document.querySelector(`.forcastAside`);
//Day1
let day1AvgTemp = document.querySelector(`#day1AvgTemp`);
let day1MaxTemp = document.querySelector(` #day1MaxTemp`);
let day1MinTemp = document.querySelector(`#day1MinTemp`);
//Day2
let day2AvgTemp = document.querySelector(`#day2AvgTemp`);
let day2MaxTemp = document.querySelector(`#day2MaxTemp`);
let day2MinTemp = document.querySelector(`#day2MinTemp`);
//Day3
let day3AvgTemp = document.querySelector(`#day3AvgTemp`);
let day3MaxTemp = document.querySelector(`#day3MaxTemp`);
let day3MinTemp = document.querySelector(`#day3MinTemp`);

// MAIN ARTICLE TAG
let mainCityName = document.querySelector(`#mainCityName`);
let mainAreaName = document.querySelector(`#mainAreaName`);
let mainRegionName = document.querySelector(`#mainRegionName`);
let mainCountryName = document.querySelector(`#mainCountryName`);
let mainFeelsLike = document.querySelector(`#mainFeelsLike`);

// console.log(
//   mainCityName,
//   mainAreaName,
//   mainRegionName,
//   mainCountryName,
//   mainFeelsLike
// );

//EVENT LISTENER
headerForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

   //URL VARIABLES
    
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

        mainCityName.innerText = `${cityInputBox.value}`;
        mainAreaName.innerText = `${areaName}`;
        mainRegionName.innerText = `${region}`;
        mainCountryName.innerText = `${country}`;
        mainFeelsLike.innerText = `Feels Like ${feels_LikeF} F`;

        // sets 3 day forcast variables to values from resJson

        //Day 1
        day1AvgTemp.innerText = `${day1.avgtempF}`;
        day1MaxTemp.innerText = `${day1.maxtempF}`;
        day1MinTemp.innerText = `${day1.mintempF}`;
        //Day 2
        day2AvgTemp.innerText = `${day2.avgtempF}`;
        day2MaxTemp.innerText = `${day2.maxtempF}`;
        day2MinTemp.innerText = `${day2.mintempF}`;
       //Day 3
        day3AvgTemp.innerText  = `${day3.mintempF}`;
        day3MaxTemp.innerText  = `${day3.mintempF}`;
        day3MinTemp.innerText = `${day3.mintempF}`;
        
        //unhides/hides the 3 day forcast articles, the previous searches and main article placeholder text
        
        noPreviousSearches.classList.add(`hidden`);
        mainPlaceHolderText.classList.add(`hidden`);
        noPreviousSearches.classList.add(`hidden`);
        mainTodaysWeather.classList.remove(`hidden`);
        forcastAside.classList.remove(`hidden`);

      //PREVIOUS SEARCHES SIDEBAR

        //create list items for previous searches
        const previousSearchItem = document.createElement(`li`);

        // Previous Search Link
        previousSearchLink = document.createElement(`a`);
        previousSearchLink.innerText = cityInputBox.value;
        previousSearchLink.setAttribute(`href`, `URL`);
        
        const feelsLikePreviousSearches = document.createElement(`p`)
        feelsLikePreviousSearches.innerText = ` - ${feels_LikeF} F`;

         feelsLikePreviousSearches.prepend(previousSearchLink);
        previousSearches.append(feelsLikePreviousSearches);
       


        










      } 
    })
    .catch((err) => {
      console.error(err);
    });
});


 


    







//first time u click form u need input.value, but for subsequent searches (REFERRING TO PREVIOUS SEARCHED CITIES-- means u have store this somewhere/how) u have the base url, instead of using .value u the url of that city. u need to save the name from .value

//add event listener to new york so that it clears out the info from previous fetch call, and so that it does the current fetch 

// prevent default for form e

