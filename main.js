const form = document.querySelector('form')
console.log(form)

const id = document.querySelector('#location')
console.log(id)

const prevSearch = document.querySelector('.prevSearch')

const title = document.querySelector('.title')

const prospectives = document.querySelectorAll(" .prospective article")





form.addEventListener("submit", (event) => {

        const userInput = id.value
        const BASE_URL = `https://wttr.in/${userInput}?format=j1`
        console.log(BASE_URL)
            // prevents default behavior (page will not refresh)
        event.preventDefault()
        form.reset()

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((result) => {
                // console.log(res)
                // append everything 

                title.innerHTML = `<h2>${userInput}</h2>`


                let nearestArea = result.nearest_area[0].areaName[0].value
                console.log(nearestArea)
                let region = result.nearest_area[0].region[0].value
                let country = result.nearest_area[0].country[0].value
                let currently = result.current_condition[0].FeelsLikeF

                const area = document.createElement("p")
                area.innerHTML = `<strong>Nearest Area</strong>:${nearestArea}`

                const regionp = document.createElement("p")
                regionp.innerHTML = `<strong>Region</strong>:${region}`

                const countryp = document.createElement("p")
                countryp.innerHTML = `<strong>Country</strong>:${country}`

                const currentTemp = document.createElement("p")
                currentTemp.innerHTML = `<strong>Currently</strong>:Feels Like ${currently}°F`


                title.append(area, regionp, countryp, currentTemp)
                console.log(currentTemp, regionp)

                let days = ["Today", "Tomorrow", "Day After Tomorrow"]
                prospectives.forEach((day, i) => {
                    day.innerHTML = ""
                    day.textContent = days[i]

                    const average = document.createElement("p")
                    average.innerHTML = `<strong>Average Temperature</strong>: ${result.weather[i].avgtempF}°F`

                    const max = document.createElement("p")
                    max.innerHTML = `<strong>Max Temperature</strong>: ${result.weather[i].maxtempF}°F`

                    const min = document.createElement("p")
                    min.innerHTML = `<strong>Min Temperature</strong>: ${result.weather[i].mintempF}°F`

                    day.append(average, max, min)




                })
                const link = document.createElement("a")
                link.setAttribute("href", "#")
                link.innerHTML = `${userInput}`

                const list = document.createElement("li")
                list.textContent = ` ${currently}°F`

                const ul = document.querySelector("ul")
                ul.append(list)
                list.prepend(link)

                const p = document.querySelector("section p")
                p.innerHTML = ""
                link.addEventListener("click", (event) => {
                    p.remove()
                    title.innerHTML = `<h2>${nearestArea}</h2>` // this is allowing the text to be dynamic 
                    title.append(area, regionp, countryp, currentTemp)

                })


            })
            .catch((error) => {
                console.log(error)
            })
    })
    // step 1 create hyper link
    // a.setattribute ("href","#" ) // tells the browser the address of the link
    // give it an innerhtml of the userInput
    // step 2 create an Li store the feels like temp aka currentTemp
    // ul append li to it'll make the link next to the temp
    //prepend the li to the link 
    // step 2 cont. use .innertext to get the list
    // step 3 need a new eventlistener so that they can click on it to get that information
    // move step 1 and 2 inside of eventlistener 

const searches = document.querySelector(".prevSearch")
const list2 = document.querySelector("ul")




if (currentTemp > 80) {
    console.log(img = "")
}