const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  //console.log('This button has been cicked.')

  e.preventDefault();

  let userInput = e.target["input"].value;

  cityInfo(userInput);

  e.target.reset();
});

function cityInfo(userInput) {
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);

      //userInput main data 
      let areaVal = data.nearest_area[0].areaName[0]["value"];
      let regionVal = data.nearest_area[0].region[0]["value"];
      let countryVal = data.nearest_area[0].country[0]["value"];
      let currentlyVal = data.current_condition[0]["FeelsLikeF"];

      //Today Forcast
      let todayAvg = data.weather[0]["avgtempF"];
      let todayMax = data.weather[0]["maxtempF"];
      let todayMin = data.weather[0]["mintempF"];

      //Tomorrow Forcast
      let tomorrowAvg = data.weather[1]["avgtempF"];
      let tomorrowMax = data.weather[1]["maxtempF"];
      let tomorrowMin = data.weather[1]["mintempF"];

      //Day After
      let dayAfterTAvg = data.weather[2]["avgtempF"];
      let dayAfterTMax = data.weather[2]["maxtempF"];
      let dayAfterTMin = data.weather[2]["mintempF"];

      let fullDisplay = document.querySelector("#full-display");
      fullDisplay.innerHTML = `
       <h2>${userInput}</h2>
       <div><strong>Area: </strong>${areaVal}</div>
       <div><strong>Region: </strong>${regionVal}</div>
       <div><strong>Country: </strong>${countryVal}</div>
       <div><strong>Currently: </strong>${currentlyVal}</div>
       `;

      let futureForcast = document.querySelector("#future-forcast");
      futureForcast.innerHTML = `
            <article>
            <h3>Today</h3>
            <div><strong>Average Temperature: </strong>${todayAvg}</div>
            <div><strong>Max Temparture: </strong>${todayMax}</div>
            <div><strong>Min Temparture: </strong>${todayMin}</div>
            </article>
            <article>
            <h3>Tomorrow</h3>
            <div><strong>Average Temperature: </strong>${tomorrowAvg}</div>
            <div><strong>Max Temparture: </strong>${tomorrowMax}</div>
            <div><strong>Min Temparture: </strong>${tomorrowMax}</div>
            </article>
            <article>
            <h3>Day After Tomorrow</h3>
            <div><strong>Average Temperature: </strong>${dayAfterTAvg}</div>
            <div><strong>Max Temparture: </strong>${dayAfterTMax}</div>
            <div><strong>Min Temparture: </strong>${dayAfterTMin}</div>
            </article>
       `;
        //when a user inputs a city we want that data to save to the city name and
    //    let previousInput = document.querySelector('#previous-input')
    //    previousInput.innerHTML = `
    //         <h4>Previous Searches</h4>
    //         <ul></ul>
    //    ` 


    })
    .catch((err) => console.log(err));
}
