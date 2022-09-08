// HTML Elements
const input = document.querySelector("input[name='location']");
const inputButton = document.querySelector("input[name='button']");
const currentLocation = document.querySelector(".main main article");
const prevSearchesP = document.querySelector(
  ".sidebar_right aside section h4:first-of-type"
);
const noPrevSearchesP = document.querySelector(
  ".sidebar_right aside section p:last-of-type"
);

// Helper functions
const getWeather = async (location) => {
  let weatherData = await fetch(`https://wttr.in/${location}?format=j1`);
  let weatherJson = await weatherData.json();
  console.log(weatherJson);
  displayWeather(weatherJson, location);
  displayDays(weatherJson, location);
  prevSearches(weatherJson, location);
};

//Main- current search
const displayWeather = (weatherData, location) => {
  currentLocation.innerHTML = "";
  input.value = "";

  const newDiv = document.createElement("div");
  newDiv.classList.add("current-weather");

  const h1 = document.createElement("h1");
  h1.innerText = weatherData.nearest_area[0].region[0].value;

  const area = document.createElement("p");
	if (location.toLowerCase() !== weatherData.nearest_area[0].areaName[0].value.toLowerCase()) {
		area.innerText = `Nearest Area: ${weatherData.nearest_area[0].areaName[0].value}`;
	} else {
		area.innerText = `Area: ${weatherData.nearest_area[0].areaName[0].value}`;
	}
  

  const region = document.createElement("p");
  region.innerText = `Region: ${weatherData.nearest_area[0].region[0].value}`;

  const country = document.createElement("p");
  country.innerText = `Country: ${weatherData.nearest_area[0].country[0].value}`;

  const currently = document.createElement("p");
  currently.innerText = `Currently: Feels Like ${weatherData.current_condition[0].FeelsLikeF}°F`;

  newDiv.append(h1);
  newDiv.append(area);
  newDiv.append(region);
  newDiv.append(country);
  newDiv.append(currently);

  currentLocation.appendChild(newDiv);
};

// Today Tomorrow Day after tomorrow

const displayDays = (weatherData, location) => {
	const today = document.querySelector(".today");
	const tomorrow = document.querySelector(".tomorrow");
	const dayaftomo = document.querySelector(".dayaftomo");

  const areaNameTo = document.createElement("h2");
  areaNameTo.innerText = location;

	const areaNameTom = document.createElement("h2");
	areaNameTom.innerText = location;

  const areaNameDat = document.createElement("h2");
  areaNameDat.innerText = location;
 
	// today

  

  const todayP = document.createElement("p");
  todayP.innerText = `Average Temperature: ${weatherData.weather[0].avgtempF} °F 
	Max Temperature: ${weatherData.weather[0].maxtempF} °F 
	Min Temperature: ${weatherData.weather[0].mintempF} °F`;


	
  // tomorrow
	
  
	
  const tomorrowP = document.createElement("p");
  tomorrowP.innerText = `Average Temperature: ${weatherData.weather[1].avgtempF} °F 
	Max Temperature: ${weatherData.weather[1].maxtempF} °F
	Min Temperature: ${weatherData.weather[1].mintempF} °F`;
	

	
	// Day After Tomorrow

  
	
  const dayaftomoP = document.createElement("p");
  dayaftomoP.innerText = `Average Temperature: ${weatherData.weather[2].avgtempF} °F 
	Max Temperature: ${weatherData.weather[2].maxtempF} °F
	Min Temperature: ${weatherData.weather[2].mintempF} °F`;
	

	// append
  today.appendChild(areaNameTo);
  tomorrow.appendChild(areaNameTom);
  dayaftomo.appendChild(areaNameDat);
  today.appendChild(todayP);
  tomorrow.appendChild(tomorrowP);
  dayaftomo.appendChild(dayaftomoP);
};

// previous search element
const prevSearches = (weatherData, location) => {
  //css elm
  prevSearchesP.style.display = "block";
  noPrevSearchesP.style.display = "none";
  //css elm

  const prevSearchList = document.querySelector(".searchList");
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.onclick = () => {
    displayWeather(weatherData, location);
  };

  a.innerText = `${weatherData.nearest_area[0].areaName[0].value}- ${weatherData.current_condition[0].FeelsLikeF} °F`;
  li.appendChild(a);
  prevSearchList.appendChild(li);
};

// Event listeners
inputButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(input.value);
});


