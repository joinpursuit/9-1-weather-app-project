const searchBar = document.querySelector(".enter-location");
const bar = document.querySelector("#enter-location");
// console.log(bar.value);
const form = document.querySelector("form");
const today = document.querySelector("#Today")
const tomorrow = document.querySelector("#Tomorrow")
const dayAfter= document.querySelector("#Day After Tomotrrow")
const ul = document.querySelector("ul")
// console.log(form1)
//search bar
// console.log(searchBar)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   form.reset();
  const city = bar.value.split(" ").join("+"); //?
  console.log(city);
  let Base_URL = `http://wttr.in/${city}?format=j1`;

  fetch(Base_URL)
    .then((res) => res.json())

    .then((resJson) => {
      console.log(resJson);
    //   let results = resJson.results;
      console.log(resJson.current_condition[0].FeelsLikeF);
    })
    .catch((err) => err);
});
//!
// form1.addEventListener("submit", (event)=>{
//     event.preventDefault()
// searchBar.addEventListener("submit", (e)=>{
//     searchBar.textContent
// })

// })
