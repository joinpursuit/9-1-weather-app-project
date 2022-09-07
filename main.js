// main features
const weatherForm = document.querySelector("form");
const postTitle = document.querySelector("#post-title");
const mainContent = document.querySelector("main");
const h2 = document.querySelector("h2");
weatherForm.addEventListener("submit", (eve) => {
  eve.preventDefault();
  // weatherForm.textContent
  const url = `https://wttr.in/${postTitle.value}?format=j1`;

  console.log(url);
  //   console.log(postTitle.value);
  // mainWeather = document.createElement("p");
  mainContent.innerHTML = `<h2 style="color: blue">${postTitle.value}</h2>`;
  //   mainContent.style.fontSize = "30px";
  mainContent.style.fontWeight = "700";
  //   mainContent.style.verticalAlign = "bottom";

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
