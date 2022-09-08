const form = document.querySelector("form") 
// Variable for entire page.

const id = document.querySelector("#location")
// Variable to pick out location from HTML.

const previousSearch = document.querySelector(".previousSearches")
// Variable to pick out previous searches section from HTML. 
const upcomingWeather = document.querySelectorAll(".upcomingWeather article")
// Variable to pick out all articles in the upcomingWeather class.
const title = document.querySelector(".searches")
// Variable to pick out the searches class.

// Creating event listener for submit button.
form.addEventListener("submit", (event) => {
    
    const locationInput = id.value 
    // Variable to pick out the value of the location entered.
    const BASE_URL = `https://wttr.in/${locationInput}?format=j1` 
    // Variable for API link.
    
    event.preventDefault() // Prevents page from refreshing after clicking submit.
    form.reset() // Resets the form after clicking submit.

    fetch(BASE_URL) // Fetching info from API.
    .then((res) => res.json())
    .then((result) => {

        title.innerHTML = `<h2>${locationInput}</h2>` 
        // Displays the inputted city as an h2.

        let nearestArea = result.nearest_area[0].areaName[0].value
        // Variable to represent the result of the nearest area to the inputted location.
        let region = result.nearest_area[0].region[0].value
        // Variable to represent the result of the region of the inputted location.
        let country = result.nearest_area[0].country[0].value
        // Variable to represent the country the inputted location is in.
        let currentWeather = result.current_condition[0].FeelsLikeF
        // Variable to represent the current temperature in Fahrenheit of the inputted location.

        const area = document.createElement("p")
        area.innerHTML = `<strong>Nearest Area</strong>: ${nearestArea}`
        // Creates a p element and inputs the value of the nearestArea variable based on the inputted location.

        const regionVar = document.createElement("p")
        regionVar.innerHTML = `<strong>Region</strong>: ${region}`
        // Creates a p element and inputs the value of the region variable based on the inputted location.

        const countryVar = document.createElement("p")
        countryVar.innerHTML = `<strong>Country</strong>: ${country}`
        // Creates a p element and inputs the value of the country variable based on the inputted location.

        const currentTemp = document.createElement("p")
        currentTemp.innerHTML = `<strong>Currently</strong>: Feels Like ${currentWeather}°F`
        // Creates a p element and inputs the value of the currentWeather variable based on the inputted location.

        title.append(area, regionVar, countryVar, currentTemp)
        // Appends all values of the above variables to the h2 along with the name of the inputted location to finish off the header.

        
        let allDays = ["Today", "Tomorrow", "Day After Tomorrow"] 
        // Creating an array to loop through the articles in the class of upcomingWeather.
        upcomingWeather.forEach((dayEl, i) => {
            dayEl.innerHTML = "" // Placeholder to store values after looping.
            dayEl.innerText = allDays[i] // Takes values from each index and creates text.

            const avgTemp = document.createElement("p")
            avgTemp.innerHTML = `<strong>Average Temperature</strong>: ${result.weather[i].avgtempF}°F`
            // Creates p variable and inserts the avgTemp based on the value of the avgtempF in the data.

            const highTemp = document.createElement("p")
            highTemp.innerHTML = `<strong>Max Temperature</strong>: ${result.weather[i].maxtempF}°F`
            // Creates p variable and inserts the highTemp based on the value of the maxtempF in the data.

            const lowTemp = document.createElement("p")
            lowTemp.innerHTML = `<strong>Min Temperature</strong>: ${result.weather[i].mintempF}°F`
            // Creates p variable and inserts the lowTemp based on the value of the mintempF in the data.

            dayEl.append(avgTemp, highTemp, lowTemp)
            // Appends all values to dayEl to display the values in the upcomingWeather aside.
        })
        
        const hyperLink = document.createElement("a")
        hyperLink.setAttribute("href", "#")
        // Creating a hyperlink to attach to the previous locations searched.
        hyperLink.innerHTML = `${locationInput}`
        // Attaching said link to the previous locations.

        const list = document.createElement("li")
        // Creating a list element to display the previous locations searched in a list.
        list.textContent = ` - ${currentWeather}°F`
        // Adding in formatting to correctly display the weather in the previousSearches section.

        const unorderedList = document.querySelector("ul")
        // Creating an unordered list variable.
        unorderedList.append(list)
        // Appends the content from the list variable to the unordered list.
        list.prepend(hyperLink)
        // Prepends the hyperlink to the content of the list variable.

        const p = document.querySelector("section p")
        p.innerHTML = ""
        // Variable to display the value of section p ("No previous searches.") when nothing has been searched before.

        // Creating an event listener to the hyperlink that will display the information from the previous location that was clicked.
        hyperLink.addEventListener("click", (event) => {
            p.remove() // Removes the value of the p variable upon clicking.
            title.innerHTML = `<h2>${nearestArea}</h2>`
            // Displays the value of the nearestArea variable as an h2.
            title.append(area, regionVar, countryVar, currentTemp)
            // Appends the data from before to said variable.
        })
    })
        // Added in case of error or non-existent location.
        .catch((error) => {
            console.log(error)
        })
})