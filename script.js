// USER INPUT, HEADER, MAIN, TODAY'S WEATHER
const cityInputBox = document.querySelector(`.cityInputBox`);
const headerForm = document.querySelector(`.headerForm`);
const chooseWeatherMain = document.querySelector(`.chooseWeather`);
const mainTodaysWeather = document.querySelector(`#mainTodaysWeather`);

 let cityNamesArr = [];

const main = document.querySelector(`main`)

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
let mainAreaStrong = document.querySelector(`#mainAreaStrong`);
let mainChanceOfSunshine = document.querySelector(`#mainChanceOfSunshine`);
let mainChanceOfRain = document.querySelector(`#mainChanceOfRain`);
let mainChanceOfSnow = document.querySelector(`#mainChanceOfSnow`);

//ICONS
const mainWeatherIcon = document.querySelector(`#mainWeatherIcon`);

//allows the submit form to grab the mainCityName from inputBox.value in the first fetch, but grab it from e.target.textContent in the second fetcch
let formSubmitBool = true; //--> True for 'submit' event / false for 'click' event

//allows the city names to be filtered and pushed into cityNamesArr in the submit event so that there atre no duplicates, and flitered in the click event
let eventListenerBool = false; //--> True for 'submit' event / false for 'click' event

//CITY SEARCH FUNCTION

function citySearch(URL, city) {

  //FETCH
  fetch(URL)
    .then((res) => res.json())
    .then((resJson) => {

      // console.log(resJson.weather[0].hourly[0]);

      //Weather Conditions
      let current = resJson.current_condition[0];
      //Areas
      let area = resJson.nearest_area[0];
      let chanceOfWeather = resJson.weather[0].hourly[0];
      //Weather -- for 3 Day Forcast Aside
      let day1 = resJson.weather[0]; 
      let day2 = resJson.weather[1];
      let day3 = resJson.weather[2];

      let areaName = area.areaName[0].value; //--> area.areaName
      let region = area.region[0].value; //--> area.region
      let country = area.country[0].value; //--> area.country
      let feels_LikeF = current.FeelsLikeF; //--> currentcurrent_condition
    
    
            // IF Statement that fires via submit event IF Input Box has information it. Displays output for weather and regional info.
      // cityInputBox.value !== "" &&
      if (resJson !== undefined) {
        if (formSubmitBool) {
          mainCityName.innerText = `${cityInputBox.value}`;
        } else {
          mainCityName.innerText = city;
        }

        mainAreaName.innerText = `${areaName}`;
        if (mainCityName.innerText === mainAreaName.innerText) {
          mainAreaStrong.innerText = `Area:`;
        } else {
          mainAreaStrong.innerText = `Nearest Area:`;
        }
        mainRegionName.innerText = `${region}`;
        mainCountryName.innerText = `${country}`;
        mainFeelsLike.innerText = `Feels Like ${feels_LikeF} °F`;
        mainChanceOfSunshine.innerText = `${chanceOfWeather.chanceofsunshine}`;
        mainChanceOfRain.innerText = `${chanceOfWeather.chanceofrain}`;
        mainChanceOfSnow.innerText = `${chanceOfWeather.chanceofsnow}`;

        //ICONS
        if (Number(chanceOfWeather.chanceofsunshine) > 50) {
          mainWeatherIcon.setAttribute(`src`, `./assets/icons8-summer.gif`);
          mainWeatherIcon.setAttribute(`alt`, `sun`);
        } else if (Number(chanceOfWeather.chanceofrain) > 50) {
          mainWeatherIcon.setAttribute(
            `src`,
            `./assets/icons8-torrential-rain.gif`
          );
          mainWeatherIcon.setAttribute(`alt`, `rain`);
        } else if (Number(chanceOfWeather.chanceofsnow) > 50) {
          mainWeatherIcon.setAttribute(`src`, `./assets/icons8-light-snow.gif`);
          mainWeatherIcon.setAttribute(`alt`, `snow`);
        }
        // sets 3 day forcast variables to values from resJson

        //Day 1
        day1AvgTemp.innerText = `${day1.avgtempF}°F`;
        day1MaxTemp.innerText = `${day1.maxtempF}°F`;
        day1MinTemp.innerText = `${day1.mintempF}°F`;
        //Day 2
        day2AvgTemp.innerText = `${day2.avgtempF}°F`;
        day2MaxTemp.innerText = `${day2.maxtempF}°F`;
        day2MinTemp.innerText = `${day2.mintempF}°F`;
        //Day 3
        day3AvgTemp.innerText = `${day3.avgtempF}°F`;
        day3MaxTemp.innerText = `${day3.maxtempF}°F`;
        day3MinTemp.innerText = `${day3.mintempF}°F`;

        //unhides/hides the 3 day forcast articles, the previous searches and main article placeholder text

        noPreviousSearches.classList.add(`hidden`);
        mainPlaceHolderText.classList.add(`hidden`);
        noPreviousSearches.classList.add(`hidden`);
        mainTodaysWeather.classList.remove(`hidden`);
        forcastAside.classList.remove(`hidden`);
        mainCityName.classList.remove(`hidden`);

        //PREVIOUS SEARCHES SIDEBAR

        //create list items for previous searches
        // Previous Search Link
        previousSearchLink = document.createElement(`a`);
       

        //*************** */


        if (!cityNamesArr.includes(cityInputBox.value.toLowerCase())) {
          cityNamesArr.push(cityInputBox.value.toLowerCase());
          eventListenerBool = true;
        }
        
        console.log(cityNamesArr);//--> pushes only unique names in

       
        //... cont previous searches

        //Spawns new list items for previous searches sidebar
       

        const feelsLikePreviousSearches = document.createElement(`li`);
        if (cityNamesArr.includes(cityInputBox.value.toLowerCase())) {
          if (eventListenerBool) {

            if (cityInputBox.value) {
              feelsLikePreviousSearches.innerText = ` - ${feels_LikeF} °F`;
              feelsLikePreviousSearches.prepend(previousSearchLink);
              previousSearches.append(feelsLikePreviousSearches);
              previousSearchLink.innerText = cityInputBox.value;
              // console.log(previousSearchLink)
              previousSearchLink.setAttribute(`href`, `#`);
              //previous searches cont...
            }
          }
        } 
       

         //  [CITY INPUT BOX RESET]
        cityInputBox.value = '';

        // PREVIOUS SEARCHES ASIDE EVENT LISTENER (CLICK)

        feelsLikePreviousSearches.addEventListener('click', (e) => {
          formSubmitBool = false;
          eventListenerBool = false;
          let PreviousSearchesURL = '';

          console.log(eventListenerBool);

          let PreviousSearchesURLCity = e.target.textContent
            .split(" ")
            .join("+"); //--> New+York

          mainCityName.innerText = e.target.textContent;

          console.log('e.target.textContent', e.target.textContent);
          // cityNamesArr.push(e.target.textContent);
          // console.log(cityNamesArr);

          //have to push these vars into an array for storing

          PreviousSearchesURL = `https://wttr.in/${PreviousSearchesURLCity}?format=j1`; //--> https://wttr.in/new+nork?format=j1
          console.log(PreviousSearchesURL);

          citySearch(PreviousSearchesURL, e.target.textContent);

            // if (cityNamesArr.includes(e.target.textContent.toLowerCase() && !eventListenerBool)) {
              
            // }
          
         

          // got to get the url
          // so i need only the city name from the side bar previous search
          //have to plug that city name into the url
          //then call city search( cuz now ill have a complete url)
        });
      } 
    })
    .catch((err) => {
      console.error(err);
    })
} 
  



//_________MAIN________________




//MAIN SECTION EVENT LISTENER (SUBMIT) 
headerForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  formSubmitBool = true
  eventListenerBool = false

  //URL VARIABLES

  //turns input.value into a variable, trims it, and removes spaces and adds + char to make it URL-ready
  const cityInputVal = cityInputBox.value.trim().split(" ").join("+"); //--> New+York

  // Fetch request city
  let previousSearchedCity = cityInputBox.value.trim(); //--> New York

  //inserts user input string into the URL to complete a fetch call
  let URL = `https://wttr.in/${cityInputVal}?format=j1`; //--> https://wttr.in/new+nork?format=j1

  citySearch(URL);
});

//  CONVERTER 

//converter form

const tempInputBox = document.querySelector(`#temp-to-convert`);

const converterForm = document.querySelector(`.converterForm`);

const celciusRadio = document.querySelector(`#to-c`);
const fahrenheitRadio = document.querySelector(`#to-f`);

let conversionOutput = document.querySelector(`#conversionOutput`);

let tempReturnVal = 0

// console.log(fahrenheitRadio.checked)
converterForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  if (celciusRadio.checked) {
    //to Celcius(n°F − 32) × 5/9
    tempReturnVal = (tempInputBox.value - 32) * 5 / 9;
    conversionOutput.innerText = tempReturnVal.toFixed(2);
  } else if (fahrenheitRadio.checked) {
    //to Fahrenheit (n°C × 9/5) + 32 = n°F
    tempReturnVal = (tempInputBox.value * 9) / 5 + 32;
    conversionOutput.innerText = tempReturnVal.toFixed(2);
  }
})









 


    







//first time u click form u need input.value, but for subsequent searches (REFERRING TO PREVIOUS SEARCHED CITIES-- means u have store this somewhere/how) u have the base url, instead of using .value u the url of that city. u need to save the name from .value

//add event listener to new york so that it clears out the info from previous fetch call, and so that it does the current fetch 

// prevent default for form e



//create  click event for the li itself --- you need the city variable that was used to complete the fetch request, 


