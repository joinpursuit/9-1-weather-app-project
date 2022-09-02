const form = document.querySelector(`form`)
 form.addEventListener(`submit`, (event) => {
    event.preventDefault()
    console.log(event)

    const BASE_URL = `wttr.in/`
    const json = `?format=j1`
    const locationId = `${event.target.search.value.replaceAll(` `, `+`)}`
    console.log(locationId)

    fetch(`${BASE_URL}${locationId}${json}`)
    .then(res => res.json)
    .then(res => {
        const current = document.querySelector(`#current`)
        current. console.log(res)
    })
    .catch(err => console.log(err))
 })
