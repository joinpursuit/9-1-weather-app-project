//! Conversion outside of first event
//? if the temp is in celscius apply the conversion formula to change to F((TEMPERATURE°F − 32) × 5/9 = 0°C), vice versa(F--> (TEMPERATURE°C × 9/5) + 32 = 89.6°F).
//*Created an event listener.. submit was resting page
const conversionType = document.querySelector(".left-aside");
console.log(conversionType);
conversionType.addEventListener("submit", (event) => {
  event.preventDefault();

  let input = document.querySelector("#temp-to-convert"); // temp input search bar.. always changing
  let input2 = event.target.input.value;

  // // console.log(input);
  let tempInput = document.querySelector("h4"); // store results for converion
  // console.log(tempInput)
  //* select radio button
  const celButton = document.querySelector("#to-c");
  // console.log(celButton)
  const fahButton = document.querySelector("#to-f");
  // console.log(fahButton)

  if (celButton.checked) {
    input2 = (input2 - 32) * (5 / 9);
    console.log();
    tempInput.innerText = `${input2.toFixed(2)}`;
  } else if (fahButton.checked) {
    input2 = input2 * (9 / 5) + 32;
    tempInput.innerText = `${input2.toFixed(2)}`;
  }
});
