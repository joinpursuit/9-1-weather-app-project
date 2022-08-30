const cityInputBox = document.querySelector(`.cityInputBox`);
const headerForm = document.querySelector(`.headerForm`);
const chooseWeatherMain = document.querySelector(`.chooseWeather`);


//Add submit event listener to headerForm
headerForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    //turns input.value into a variable, trims it, and removes spaces and adds + char to make it URL-ready
    const cityInputVal = cityInputBox.value.trim().split(" ").join("+");
        
    //inserts user input string into the URL to complete a fetch call
    let URL = `https://wttr.in/${cityInputVal}?format=j1`; //--> "New+York"
    
    //FETCH
  fetch(URL)
    .then((res) => res.json())
    .then((resJson) => {
      const current = resJson.current_condition[0];
      const area = resJson.nearest_area[0];
      console.log(area); // works, not sure why it wont print in statement

      const areaName = area.areaName[0].value; //--> area.areaName
      const region = area.region[0].value; //--> area.region
      const country = area.country[0].value; //--> area.country
        const feels_LikeF = current.FeelsLikeF; //--> currentcurrent_condition
        
    //   console.log(country)

      if (cityInputBox.value !== "") {
        chooseWeatherMain.innerHTML = `<h2>${cityInputBox.value}</h2>\n<strong>Area:</strong><p>${areaName}</p>\n<strong>Region:</strong><p>${region}</p>\n<strong>Country:<p>${country}</p></strong>\n<strong>Currently:</strong> <p>Feels Like ${feels_LikeF} F</p>`;
      }
        
   
        
        
        
    })
    .catch((err) => {
      console.error(err);
    });
});


 


    







//first time u click form u need input.value, but for subsequent searches (REFERRING TO PREVIOUS SEARCHED CITIES-- means u have store this somewhere/how) u have the base url, instead of using .value u the url of that city. u need to save the name from .value

//add event listener to new york so that it clears out the info from previous fetch call, and so that it does the current fetch 

// prevent default for form e

