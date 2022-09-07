const form2 = document.querySelector(".converter-box");
const tempInput = document.querySelector("#temp-to-convert");
const cel = document.querySelector("#to-c");
const farh = document.querySelector("#to-f");
const answer = document.querySelector(".answer");

form2.addEventListener("submit", (e) => {
  e.preventDefault();

  let number = e.target.converter.value;
  console.log(number);
  if (cel.checked) {
    number = (number - 32) * (5 / 9);
    answer.innerHTML = `${number.toFixed(2)}°`;
  }

  if (farh.checked) {
    number = number * (9 / 5) + 32;
    answer.innerHTML = `${number.toFixed(2)}°`;
  }
});
