const form = document.querySelector("form");
const cityInput = document.querySelector(".cityInput");
const submit = document.querySelector(".toSubmit");
const today = document.querySelector(".today");
const tomorrow = document.querySelector(".tomorrow");
const dayAfter = document.querySelector(".day-after");
const URL = "wttr.in";
const value = cityInput.value.joinn("");

form.addEventListener("submit", (e) => {
  fetch(`${URL}/${cvalue}?format=j1`)
    .then((data) => data.json())
    .then((data) => {
      const h31 = document.createElement("h3");
      h31.innerText = "Today";
      today.append(h31);
    });
});
