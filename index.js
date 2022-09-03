// fetch url wttr.in/Detroit?format=j1

// Prevent Button from refreshing page
const submit = document.querySelector(`.submitButton`);
// console.log(submit)
submit.addEventListener(`click`, (e) => {
  // e.preventDefault()
})

// FUNCTION FOR CONVERTING INPUTTED LOCATION TO CAPITAL LETTER FORMAT
const locationName = (x) => {
    let arr = x.split(` `)
    arr.forEach((y,i) => {
     arr[i] = `${y.charAt(0).toUpperCase()}${y.slice(1).toLowerCase()}` 
     })
     return arr.join(` `)
    }

// Define variable for ul element to hold previous search list
const previousSearch = document.querySelector(`ul`)
// console.log(previousSearch)

//create array to store past search location values
const previousSearchArr = []

// *********CAME BACK CREATE FETCHINFO VARIABLE => FUNCTION TO RUN FETCH IN MULTIPLE EVENT LISTENERS

const fetchInfo = (input) => {
    // FETCH for API and store neccessary values (sub in location)
  fetch(`https://wttr.in/${input}?format=j1`)
  .then((resp) => resp.json())
  .then((json) => {
    // console.log(json)

    //declare variables and grab values from json object
    // create todaysForecast array to hold objects of today, tomorrow, and dayafter objects
    const todaysForecast = [];
    //create objects for today, tomorrow, and dayafter
    const todayObj = {};
    const tomObj = {};
    const dayAfterObj = {};
    
    // Create and LOOP into object returned from fetch (need access/variables for current_condition, nearest_area, weather)
    const today = json[`current_condition`];
    today.forEach(({ FeelsLikeF, temp_C, temp_F }) => {
      todayObj[`FeelsLike`] = FeelsLikeF;
      todayObj[`Fareinheit`] = temp_F;
      todayObj[`Celsius`] = temp_C;
    });
    
    // loop for info about area
    const area = json[`nearest_area`];
    area.forEach(({ areaName, country, region }) => {
      areaName.forEach(({ value }) => (todayObj[`Location`] = value));
      country.forEach(({ value }) => (todayObj[`Country`] = value));
      region.forEach(({ value }) => (todayObj[`Region`] = value));
    });
    
    //loop for info about weather for all 3 days/objects
    //CAME BACK TO GRAB ICON INFO {HOURLY}
    const weather = json[`weather`];
    weather.forEach(({ avgtempF, maxtempF, mintempF,hourly }, i) => {
      if (i === 0) {
        todayObj[`avgtemp`] = avgtempF;
        todayObj[`maxtemp`] = maxtempF;
        todayObj[`mintemp`] = mintempF;

        //came back for icon info
        hourly.forEach(({chanceofrain,chanceofsnow,chanceofsunshine},i) => {
          if(i === 0){
              todayObj[`Rain`] = chanceofrain
              todayObj[`Snow`] = chanceofsnow
              todayObj[`Sun`] = chanceofsunshine
          }
          
      })
      }
      if (i === 1) {
        tomObj[`avgtemp`] = avgtempF;
        tomObj[`maxtemp`] = maxtempF;
        tomObj[`mintemp`] = mintempF;
      }
      if (i === 2) {
        dayAfterObj[`avgtemp`] = avgtempF;
        dayAfterObj[`maxtemp`] = maxtempF;
        dayAfterObj[`mintemp`] = mintempF;
      }
    });

    // PUSH ALL OBJ'S TO TODAYFORCAST ARRAY (to be referenced to populate page)
    todaysForecast.push(todayObj, tomObj, dayAfterObj);
    //console.log(todaysForecast);

    // create variables for and populate elements for div.todaysWeather and aside.upcomingStats
    const todaysWeather = document.querySelector(`.todaysWeather`);
    const todaysStats = document.querySelector(`#todayStats`)
    const tomStats = document.querySelector(`#tomorrowStats`)
    const dayAfterStats = document.querySelector(`#dayAfterStats`)
    
    //LOOP INTO todaysForecast arr and apply values to page elements
    todaysForecast.forEach((day,i) =>{
      if(i === 0){
          todaysWeather.innerHTML = `
          <h2>${input}</h2>
          <p class = "area"><strong>Area:</strong> ${day.Location}</p>
          <p><strong>Region:</strong> ${day.Region}</p>
          <p><strong>Country:</strong> ${day.Country}</p>
          <p><strong>Currently:</strong> Feels Like ${day.FeelsLike}°F`
          // NEAREST AREA IF APPLICABLE
          if(day.Location !== input){
            const removeArea = document.querySelector(`.area`)
            removeArea.remove()
            const nearArea = document.createElement(`p`)
            nearArea.innerHTML = `<strong>Nearest Area:</strong> ${day.Location}`
            document.querySelector(`h2`).after(nearArea)
        }
        //CONDITIONALS FOR ICON PLACEMENT
          //img attr. src="" alt=""
          console.log(day.Rain,day.Snow,day.Sun)
          const iconImg = document.createElement(`img`)
          if(+day.Sun > 50 ){
              iconImg.src = `../assets/icons8-summer.gif`
              iconImg.alt = `sun`
              document.querySelector(`h2`).before(iconImg)
          }
          else if(+day.Rain > 50 ){
              iconImg.src = `../assets/icons8-torrential-rain.gif`
              iconImg.alt = `rain`
              document.querySelector(`h2`).before(iconImg)
          }
          else if(+day.Snow > 50 ){
              iconImg.src = `../assets/icons8-light-snow.gif`
              iconImg.alt = `snow`
              document.querySelector(`h2`).before(iconImg)
          }
  

          todaysStats.innerHTML =`
          <h3>Today</h3>
          <p><strong>Average Temperature:</strong> ${day.avgtemp}°F</p>
          <p><strong>Max Temperature:</strong> ${day.maxtemp}°F</p>
          <p><strong>Min Temperature:</strong>${day.mintemp}°F</p>`
      }
      if(i === 1){
          tomStats.innerHTML = `
          <h3>Tomorrow</h3>
          <p><strong>Average Temperature:</strong> ${day.avgtemp}°F</p>
          <p><strong>Max Temperature:</strong> ${day.maxtemp}°F</p>
          <p><strong>Min Temperature</strong> ${day.mintemp}°F</p>`
      }
      if(i === 2){
          dayAfterStats.innerHTML = `
          <h3>Day After Tomorrow</h3>
          <p><strong>Average Temperature:</strong> ${day.avgtemp}°F</p>
          <p><strong>Max Temperature:</strong>${day.maxtemp}°F</p>
          <p><strong>Min Temperature:</strong>${day.mintemp}°F</p>`
      }
    })
    
    //TOGGLE HIDDEN ELEMENTS 
    const hide = document.querySelectorAll(`.defaultdisplay, .hidden`)
    //console.log(hide)
    hide.forEach(x => {
      if( x === document.querySelector(`article.getshidden`)) x.classList.toggle(`greybackground`)
      x.classList.toggle(`hidden`)})
      //remove aside elements
      const previousPlaceholder = document.querySelector(`p.indent`)
      if(previousPlaceholder) previousPlaceholder.remove()
      const defaultDisplay = document.querySelector(`div.defaultdisplay`)
      if(defaultDisplay) defaultDisplay.remove()

      // Create li elements for each search and assign innerHTML value (link : <a href="http://"></a>, feels like temp)
      const searchLink = document.createElement(`li`)
      searchLink.classList.add(`previousSearch`)
      searchLink.innerHTML = `<a href="http://">${input}</a> -${todayObj[`FeelsLike`]}°F`
      
      // check previousSearchArr for previous search values, if current (input) search value isn't in ul (previousSearhArr), append li to ul
      //console.log(previousSearchArr)
      if(!previousSearchArr.includes(input)){
          previousSearchArr.push(input)
          previousSearch.append(searchLink)
      }
     
      // ADD EVENT LISTENERS TO LI (LINK) ELEMENTS ON PAGE (RE-FETCH). When clicked will show info for that city without adding to list
        searchLink.addEventListener(`click`, (event) => {
            event.preventDefault()
            const linkName = event.target.innerText
            fetchInfo(linkName)
        })

        // END OF FETCH, NEED TO ASSIGN TO A VARIABLE, AND CALL AS FUNCTION IN EVENT LISTENERS
  })
  .catch((err) => {
    console.log(err);
  });
}

// ADD EVENT LISTENER TO FORM TO FETCH API DATA WHEN SUBMITTED
// *****Came back and used fetchInfo variable to be called in event listener*****
const form = document.querySelector(`form`);
// console.log(form)
form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    // const location = locationName(form.location.value)
    // console.log(location)
    const location = form.location.value /*(<- switch to this for mamaroneck test)*/
    fetchInfo(location)
     form.reset()
    
    });



  

