// Define variable for ul element to hold previous search list
const previousSearch = document.querySelector(`ul`);

//create array to store past search location values
const previousSearchArr = [];

// *********CAME BACK CREATE FETCHINFO VARIABLE => FUNCTION TO RUN FETCH IN MULTIPLE EVENT LISTENERS

const fetchInfo = (input) => {
  // GUARD CLAUSE TO SHOW MESSAGE IF NO LOCATION IS INPUTTED
  if (!input) {
    document.querySelector(
      `div.defaultdisplay`
    ).innerText = `Please Type In A Location`;
  } else {
    // FETCH for API and store neccessary values (sub in location)
    fetch(`https://wttr.in/${input}?format=j1`)
      .then((resp) => resp.json())
      .then((json) => {
        // create variables for and populate elements for div.todaysWeather and aside.upcomingStats
        const todaysWeather = document.querySelector(`.todaysWeather`);
        const todaysStats = document.querySelector(`#todayStats`);
        const tomStats = document.querySelector(`#tomorrowStats`);
        const dayAfterStats = document.querySelector(`#dayAfterStats`);
        let todayF = null;
        let todayC = null;
        let feelsLikeF = null

        const today = json[`current_condition`];
        today.forEach(({ FeelsLikeF, temp_C, temp_F }) => {
          todayF = temp_F;
          todayC = temp_C;
          feelsLikeF = FeelsLikeF
          todaysWeather.innerHTML = `
        <h2>${input}</h2>
        <p><strong>Currently:</strong> Feels Like ${FeelsLikeF}°F</p>`;
        });
        
        // LOOP FOR INFO ABOUT AREA
        const area = json[`nearest_area`];
        area.forEach(({ areaName, country, region }) => {
          areaName.forEach(({ value }) => {
            todaysWeather.innerHTML += `<p class="area"><strong>Area:</strong> ${value}</p>`;
            // NEAREST AREA IF APPLICABLE
            if (value !== input) {
              const removeArea = document.querySelector(`.area`);
              removeArea.remove();
              const nearArea = document.createElement(`p`);
              nearArea.innerHTML = `<strong>Nearest Area:</strong> ${value}`;
              document.querySelector(`h2`).after(nearArea);
            }
          });
          region.forEach(
            ({ value }) =>
              (todaysWeather.innerHTML += `<p><strong>Region:</strong> ${value}</p>`)
          );
          country.forEach(
            ({ value }) =>
              (todaysWeather.innerHTML += `<p><strong>Country:</strong> ${value}</p>`)
          );
        });
        //LOOP FOR WEATHER INFO FOR ALL THREE DAYS
        const weather = json[`weather`];
        weather.forEach(({ avgtempF, maxtempF, mintempF, hourly }, i) => {
          if (i === 0) {
            todaysStats.innerHTML = `
        <h3>Today</h3>
        <p><strong>Average Temperature:</strong> ${avgtempF}°F</p>
        <p><strong>Max Temperature:</strong> ${maxtempF}°F</p>
        <p><strong>Min Temperature:</strong>${mintempF}°F</p>`;

            hourly.forEach(
              ({ chanceofrain, chanceofsnow, chanceofsunshine }, i) => {
                if (i === 0) {
                  todaysWeather.innerHTML += `
                  <p><strong>Chance of Sunshine:</strong> ${chanceofsunshine}</p>
                  <p><strong>Chance of Rain:</strong> ${chanceofrain}</p>
                  <p><strong>Chance of Snow:</strong> ${chanceofsnow}</p>`;
                  //CONDITIONALS FOR ICON PLACEMENT
                  const iconImg = document.createElement(`img`);
                  if (+chanceofsunshine > 50) {
                    iconImg.src = `./assets/icons8-summer.gif`;
                    iconImg.alt = `sun`;
                    document.querySelector(`h2`).before(iconImg);
                  } else if (+chanceofrain > 50) {
                    iconImg.src = `./assets/icons8-torrential-rain.gif`;
                    iconImg.alt = `rain`;
                    document.querySelector(`h2`).before(iconImg);
                  } else if (+chanceofsnow > 50) {
                    iconImg.src = `./assets/icons8-light-snow.gif`;
                    iconImg.alt = `snow`;
                    document.querySelector(`h2`).before(iconImg);
                  }
                  //IF NO ICON CAN BE CHOSEN, DISPLAY OVERSIZED TEMP INSTEAD
                  else {
                    const tempDisplay = document.createElement(`p`);
                    tempDisplay.style.fontSize = `60px`;
                    tempDisplay.innerHTML = `<strong>${feelsLikeF}°F</strong>`;
                    document.querySelector(`h2`).before(tempDisplay);
                  }
                }
              }
            );
          }
          if (i === 1) {
            tomStats.innerHTML = `
            <h3>Tomorrow</h3>
            <p><strong>Average Temperature:</strong> ${avgtempF}°F</p>
            <p><strong>Max Temperature:</strong> ${maxtempF}°F</p>
            <p><strong>Min Temperature</strong> ${mintempF}°F</p>`;
          }
          if (i === 2) {
            dayAfterStats.innerHTML = `
            <h3>Day After Tomorrow</h3>
            <p><strong>Average Temperature:</strong> ${avgtempF}°F</p>
            <p><strong>Max Temperature:</strong>${maxtempF}°F</p>
            <p><strong>Min Temperature:</strong>${mintempF}°F</p>`;
          }
        });

        // ADD TODAYS TEMPF AND TEMPC TO CONVERTER ASIDE
        document.querySelector(
          `p.tempFC`
        ).innerHTML = `Today's Temperatures<br>${todayF}°F <br> ${todayC}°C`;

        //TOGGLE HIDDEN ELEMENTS
        const hide = document.querySelectorAll(`.defaultdisplay, .hidden`);
        hide.forEach((x) => {
          if (x === document.querySelector(`article.getshidden`))
            x.classList.toggle(`greybackground`);
          x.classList.toggle(`hidden`);
        });
        //REMOVE ASIDE ELEMENTS
        const previousPlaceholder = document.querySelector(`p.indent`);
        if (previousPlaceholder) previousPlaceholder.remove();
        const defaultDisplay = document.querySelector(`div.defaultdisplay`);
        if (defaultDisplay) defaultDisplay.remove();

        //UPDATE HIDDEN ELEMENTS STYLING
        document.querySelector(
          `article.getshidden`
        ).style.backgroundColor = `rgba(10, 3, 85, 0.47)`;
        document.querySelector(
          `aside.converter`
        ).style.backgroundColor = `rgba(0, 14, 84, 0.634)`;
        document.body.style.backgroundImage = `url("./assets/weatherbackgroundimage.jpeg")`;
        document.querySelector(
          `header`
        ).style.backgroundColor = `rgba(18, 48, 198, 0.582)`;
        document.querySelector(
          `aside.list`
        ).style.backgroundColor = `rgba(0, 14, 84, 0.634)`;
        document.querySelector(`aside.list`).style.color = `white`;
        document.querySelector(
          `footer`
        ).style.backgroundColor = `rgba(18, 48, 198, 0.582)`;

        // Create li elements for each search and assign innerHTML value
        const searchLink = document.createElement(`li`);
        searchLink.classList.add(`previousSearch`);
        searchLink.innerHTML = `<a href="http://">${input}</a> - ${feelsLikeF}°F`;

        // check previousSearchArr for previous search values, if current (input) search value isn't in ul (previousSearhArr), append li to ul
        if (!previousSearchArr.includes(input)) {
          previousSearchArr.push(input);
          previousSearch.append(searchLink);
        }

        // ADD EVENT LISTENERS TO LI (LINK) ELEMENTS ON PAGE (RE-FETCH). When clicked will show info for that city without adding to list
        searchLink.addEventListener(`click`, (event) => {
          event.preventDefault();
          const linkName = event.target.innerText;
          fetchInfo(linkName);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// FUNCTION FOR CONVERTING INPUTTED LOCATION TO CAPITAL LETTER FORMAT
const locationName = (x) => {
  let arr = x.split(` `);
  arr.forEach((y, i) => {
    arr[i] = `${y.charAt(0).toUpperCase()}${y.slice(1).toLowerCase()}`;
  });
  return arr.join(` `);
};
// ADD EVENT LISTENER TO FORM TO FETCH API DATA WHEN SUBMITTED
// *****Came back and used fetchInfo variable to be called in event listener*****
const form = document.querySelector(`form`);
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  // const location = locationName(form.location.value);
  const location = form.location.value
  fetchInfo(location);
  form.reset();
});

// EVENT LISTENERS AND TEMP CONVERTER FUNCTION FOR BONUS FUNCTIONS
//declare variables for converter form, radio buttons,submit button, and h4 output element
const converterForm = document.querySelector(`form.converter`);
const fareinheit = document.querySelector(`#to-f`);
const celsius = document.querySelector(`#to-c`);
const convertButton = document.querySelector(`.convertButton`);
const converterOutput = document.querySelector(".output");

function tempConversion(x) {
  if (celsius.checked) {
    converterOutput.innerText = ` ${((x - 32) * (5 / 9)).toFixed(2)}°C`;
  }
  if (fareinheit.checked) {
    converterOutput.innerText = `${((x * 9) / 5 + 32).toFixed(2)}°F`;
  }
}
converterForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const tempInput = converterForm.converter.value;
  tempConversion(tempInput);
  converterForm.reset();
});

// *************ADDITIONAL FEATURES*************
//  ADD CLOCK (W3SCHOOLS)
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.querySelector(".clock").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//Date
const date = document.querySelector(`.date`);
date.innerText = `${dateConverter(Date())}`;
function dateConverter(x) {
  let arr = x.split(` `);
  return arr.slice(0, 4).join(` `);
}

//ADD RANDOM FACT DIV TO PAGE (ADDITIONAL FEATURE/ NEW FETCH) ->random fact api : https://uselessfacts.jsph.pl//random.json?language=en

fetch(`https://uselessfacts.jsph.pl//random.json?language=en`)
  .then((resp) => resp.json())
  .then((json) => {
    const funFact = json.text;
    document.querySelector(`p.funFact`).innerText = funFact;
  });

  //ALSO ADDED A FOOTER TO PAGE (SEE HTML) WITH LINKS TO MY OTHER MEDIA PAGES AND ADDED A MEDIA QUERY IN MY CSS FOR COLLAPSING THE PAGE WHEN WIDTH IS DECREASED
