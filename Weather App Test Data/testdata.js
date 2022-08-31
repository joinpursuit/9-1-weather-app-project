// fetch url wttr.in/Detroit?format=j1

// Prevent Button from refreshing page
const submit = document.querySelector(`.submitButton`);
// console.log(submit)
submit.addEventListener(`click`, (e) => {
  // e.preventDefault()
});

//         //populate all sub aside.upcomingStats using loop
// const mainSubArticles = document.querySelectorAll(`.upcomingStats article`)
// console.log(mainSubArticles)
// mainSubArticles.forEach(a => {
//     const paragraphTag1 = document.createElement(`p`)
//     paragraphTag1.classList.add(`0`)
//     const paragraphTag2 = document.createElement(`p`)
//     paragraphTag2.classList.add(`1`)
//     const paragraphTag3 = document.createElement(`p`)
//     paragraphTag3.classList.add(`2`)
//     const subMainHeading = document.createElement(`h3`)
//     a.append(subMainHeading)
//     a.append(paragraphTag1)
//     a.append(paragraphTag2)
//     a.append(paragraphTag3)
// }

//         )

// ADD EVENT LISTENER TO FORM TO FETCH API DATA WHEN SUBMITTED
const form = document.querySelector(`form`);
// console.log(form)
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const location = form.location.value;
  // console.log(form.location.value)

  // fetch for API and store neccessary values (sub in location)
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

      // create and populate elements for div.todaysWeather
      const todaysWeather = document.querySelector(`.todaysWeather`);
      // console.log(todaysWeather)

      //POPULATE ELEMENTS IN aside.upcomingStats articles on page
      //populate all sub aside.upcomingStats using loop
      const mainSubArticles = document.querySelectorAll(
        `.upcomingStats article`
      );
      console.log(mainSubArticles);
      mainSubArticles.forEach((a) => {
        const paragraphTag1 = document.createElement(`p`);
        // paragraphTag1.innerText =
        const paragraphTag2 = document.createElement(`p`);
        paragraphTag2.classList.add(`1`);
        const paragraphTag3 = document.createElement(`p`);
        paragraphTag3.classList.add(`2`);
        const subMainHeading = document.createElement(`h3`);
        a.append(subMainHeading);
        a.append(paragraphTag1);
        a.append(paragraphTag2);
        a.append(paragraphTag3);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//test for commit tracker code track
