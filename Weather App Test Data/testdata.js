
// fetch url wttr.in/Detroit?format=j1

// Prevent Button from refreshing page
const submit = document.querySelector(`.submitButton`)
// console.log(submit)
submit.addEventListener( `click`, (e) =>{
    // e.preventDefault()
})

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
const form = document.querySelector(`form`)
// console.log(form)
form.addEventListener(`submit`, (e) => {
    e.preventDefault()
    const location = form.location.value
    // console.log(form.location.value)

    // fetch for API and store neccessary values (sub in location)
    fetch(`https://wttr.in/${location}?format=j1`)
    .then((resp) => resp.json())
    .then((json) => {
        // console.log(json)
    
        //declare variables and grab values from json object
        //FOR TODAY'S [0] VARIABLES
        const area = json[`nearest_area`][0][`areaName`][0].value
        // ForEach doesn't RETURN anything
        // const area = json[`nearest_area`].forEach(({areaName}) => {
        //     console.log(areaName)
        //     areaName.forEach(({value}) => {
        //         console.log(value)})
        // })
        const region = json[`nearest_area`][0][`region`][0].value
        const country = json[`nearest_area`][0][`country`][0].value
        const currently = json[`current_condition`][0][`FeelsLikeF`]
        console.log(area, region, country, currently)
        const todayAvg = json[`weather`][0][`avgtempF`]
        const todayMax = json[`weather`][0][`maxtempF`]
        const todayMin = json[`weather`][0][`mintempF`]
        console.log(todayAvg,todayMax,todayMin)

        // FOR TOMORROW [1] AND DAY AFTER[2] (last) (AVG,MIN,MAX)
        const tomAvg = json[`weather`][1][`avgtempF`]
        const tomMax = json[`weather`][1][`maxtempF`]
        const tomMin = json[`weather`][1][`mintempF`]
        const lastAvg = json[`weather`][2][`avgtempF`]
        const lastMax = json[`weather`][2][`maxtempF`]
        const lastMin = json[`weather`][2][`mintempF`]
        


        /******** FOR BONUES C AND F TEMPS **********/
        const fahrenheit = json[`current_condition`][0][`temp_F`]
        const celsius = json[`current_condition`][0][`temp_C`]
        // console.log(fahrenheit, celsius)

        // create and populate elements for div.todaysWeather
        const todaysWeather = document.querySelector(`.todaysWeather`)
        // console.log(todaysWeather)

        //POPULATE ELEMENTS IN aside.upcomingStats articles on page
                //populate all sub aside.upcomingStats using loop
        const mainSubArticles = document.querySelectorAll(`.upcomingStats article`)
        console.log(mainSubArticles)
        mainSubArticles.forEach(a => {
        const paragraphTag1 = document.createElement(`p`)
        // paragraphTag1.innerText = 
        const paragraphTag2 = document.createElement(`p`) 
        paragraphTag2.classList.add(`1`)
        const paragraphTag3 = document.createElement(`p`)
        paragraphTag3.classList.add(`2`)
        const subMainHeading = document.createElement(`h3`)
        a.append(subMainHeading)
        a.append(paragraphTag1)
        a.append(paragraphTag2)
        a.append(paragraphTag3)
}
            
        )
       



    })
    .catch((err) => {console.log(err)})
})