//  //!Previous Searches
//       //* Query select right-aside
//       //* QuerySelect p tag
//       //* QuerySelect ul tag
//       //* Create a li to update ul
//       //* Create an <a> to create hyperlink

//       const previousP = document.querySelector("section p");
//       const ulSearch = document.querySelector("#searches ul");
//       console.log(ulSearch);
//       const li = document.createElement("li");
//       ulSearch.append(li); //? for some reason, this had to be here. #controlFlowIssue

//       const link = document.createElement("a"); //? created a tag element
//       previousP.innerHTML = ""; //? To clear message in <p> when click submit
//       link.innerHTML = `${area}`; //? AKA user input
//       // const userInput = `${link.innerText}`;
//       link.href = "#";
//       li.textContent = `- ${currently}°F`; //? feels like input
//       li.prepend(link); //? means link first, then temp
//       // link.addEventListener("click", project);
//       //?Created an event listener for the click action. It erases the values in the main and replaces it with the link inputs.
//       link.addEventListener("click", () => {
//         // event.preventDefault();
//         current.innerHTML = ""; //? to clear old data and replace with new one
//         // link.reset()
//         const area2 = document.createElement("h2"); //* created h2 to display city heading
//         area2.innerHTML = `${area}`; //? Main heading is user input
//         current.prepend(img);
//         current.append(
//           area2,
//           areaP,
//           regionP,
//           countryP,
//           currentlyP,
//           sunShineP,
//           rainP,
//           snowP
//         );
//         // link.innerText = `${currentLink}`
//         // current.append(currentLink);
//       });