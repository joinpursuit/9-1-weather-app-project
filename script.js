const BASE_URL = 'wttr.in/Detroit?format=j1'
const id = document.querySelector('#location')
const weatherButton = document.querySelector('#weather-button')


weatherButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(id.value)

    fetch(`https:wttr.in/${id.value.trim().split(' ').join('+')}?format=j1`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.current_condition[0])
        })
        .catch((error) => {
            console.log(error)
        })
    
})