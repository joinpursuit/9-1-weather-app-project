const BASE_URL = 'wttr.in/Detroit?format=j1'
const url = 'wttr.in'
const id = document.querySelector('#location')
const weatherButton = document.querySelector('#weather-button')


weatherButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(id.value)

    fetch(`${url}/${id.value}?format=j1`)
        .then((res) => res.json())
        .then((resJson) => {
            const results = resJson.results
            console.log(results)
        })
        .catch((error) => {
            console.log(error)
        })

})