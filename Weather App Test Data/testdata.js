// fetch url wttr.in/Detroit?format=j1

// Prevent Button from refreshing page
const submit = document.querySelector(`.submitButton`);
// console.log(submit)
submit.addEventListener(`click`, (e) => {
  // e.preventDefault()
})

// ADD EVENT LISTENER TO FORM TO FETCH API DATA WHEN SUBMITTED
const form = document.querySelector(`form`);
// console.log(form)
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const location = form.location.value;
  // console.log(form.location.value)

  // FETCH for API and store neccessary values (sub in location)
  fetch(`https://wttr.in/${location}?format=j1`)
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
      const weather = json[`weather`];
      weather.forEach(({ avgtempF, maxtempF, mintempF }, i) => {
        if (i === 0) {
          todayObj[`avgtemp`] = avgtempF;
          todayObj[`maxtemp`] = maxtempF;
          todayObj[`mintemp`] = mintempF;
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
      console.log(todaysForecast);

      // create and populate elements for div.todaysWeather and aside.upcomingStats
      const todaysWeather = document.querySelector(`.todaysWeather`);
      const todaysStats = document.querySelector(`#todayStats`)
      const tomStats = document.querySelector(`#tomorrowStats`)
      const dayAfterStats = document.querySelector(`#dayAfterStats`)
      
      //LOOP INTO todaysForecast arr and apply values to page elements
      todaysForecast.forEach((day,i) =>{
        if(i === 0){
            todaysWeather.innerHTML = `
            <h2>${day.Location}</h2>
            <p><strong>Area:</strong> ${day.Location}</p>
            <p><strong>Region:</strong> ${day.Region}</p>
            <p><strong>Country:</strong> ${day.Country}</p>
            <p><strong>Currently:</strong> Feels Like ${day.FeelsLike}°F`
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
      

    })
    .catch((err) => {
      console.log(err);
    });
});

