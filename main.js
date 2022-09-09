// main features
const weatherForm = document.querySelector("form");
const postTitle = document.querySelector("#post-title");
const prevSearch = document.querySelector("#prev-search");
const mainContent = document.querySelector("main");
const h2 = document.querySelector("h2");
const searchHistory = document.querySelector(".history");

weatherForm.addEventListener("submit", (eve) => {
  eve.preventDefault();
  if (postTitle.value) {
    // weatherForm.textContent
    const url = `https://wttr.in/${postTitle.value}?format=j1`;

    console.log(url);
    //   console.log(postTitle.value);
    // mainWeather = document.createElement("p");
    mainContent.innerHTML = `<h2 style="color: blue">${postTitle.value}</h2>`;
    //   mainContent.style.fontSize = "30px";
    mainContent.style.fontWeight = "700";
    //   mainContent.style.verticalAlign = "bottom";

    //
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(`Feels Like ${res.current_condition[0]["FeelsLikeF"]}°F`);
        // code the web page repopulation
        console.log(res.nearest_area[0].areaName[0].value);
        console.log(res.nearest_area[0].region[0].value);
        console.log(res.nearest_area[0].country[0].value);
        asideMain = document.createElement("aside");
        mainContent.append(asideMain);
        articleArea = document.createElement("article");
        asideMain.append(articleArea);
        articleArea.innerText = `Area: ${res.nearest_area[0].areaName[0].value}`;

        articleRegion = document.createElement("article");
        asideMain.append(articleRegion);
        articleRegion.innerText = `Region: ${res.nearest_area[0].region[0].value}`;
        articleCountry = document.createElement("article");
        asideMain.append(articleCountry);
        articleCountry.innerText = `Country: ${res.nearest_area[0].country[0].value}`;
        articleCurrently = document.createElement("article");
        asideMain.append(articleCurrently);
        articleCurrently.innerText = `Currently: Feels Like ${res.current_condition[0]["FeelsLikeF"]}°F`;

        console.log(res);
        console.log(`${Object.keys(res.current_condition[0])[0]}`);
        //
        asideMainFuture = document.createElement("aside");
        // asideMainFuture.innerText = "Today ";
        asideMainFuture.style =
          "   display: grid; grid-template-columns: 1fr 1fr 1fr";
        // asideMainFuture.style = "grid-column: 1/2";
        mainContent.append(asideMainFuture);
        //
        asideMainToday = document.createElement("article");

        asideMainToday.innerHTML = `Today: <br> Average Temperature: ${res.weather[0]["avgtempF"]}°F <br> Max Temperature: ${res.weather[0]["maxtempF"]}°F <br> Min Temperature: ${res.weather[0]["mintempF"]}°F`;

        asideMainToday.style = "grid-column: 1/1; color: black";
        asideMainFuture.append(asideMainToday);
        //
        asideMainTomorrow = document.createElement("article");

        asideMainTomorrow.innerHTML = `Tomorrow: <br> Average Temperature: ${res.weather[1]["avgtempF"]}°F <br> Max Temperature: ${res.weather[1]["maxtempF"]}°F <br> Min Temperature: ${res.weather[1]["mintempF"]}°F`;

        asideMainTomorrow.style = "grid-column: 2/2; color: black";
        asideMainFuture.append(asideMainTomorrow);
        //
        asideMainDayAfter = document.createElement("article");

        asideMainDayAfter.innerHTML = `Day After Tomorrow: <br> Average Temperature: ${res.weather[2]["avgtempF"]}°F <br> Max Temperature: ${res.weather[2]["maxtempF"]}°F <br> Min Temperature: ${res.weather[2]["mintempF"]}°F`;

        asideMainDayAfter.style = "grid-column: 3/3; color: black";
        asideMainFuture.append(asideMainDayAfter);
      });

    prevSearch.innerText = "";
    prevSearchList = document.createElement("ul");
    searchHistory.append(prevSearchList);

    lastSearch = document.createElement("li");
    lastSearch.innerHTML = `<a href="#">${postTitle.value}</a>`;
    lastSearch.addEventListener("click", (eve) => {
      // hhheellpp
    });
    prevSearchList.appendChild(lastSearch);
    console.log(lastSearch.innerText);
    //

    //
  }

  postTitle.value = "";
});

// const weatherInput = document.querySelector("#post-title")

// weatherInput.addEventListener("submit",(eve) => {

// const url = `https://wttr.in/${weatherInput.target.search.value}?format=j1`;
// }
// )
// console.log(url);
// weatherForm.target.reset();

// think about hte event , think about
