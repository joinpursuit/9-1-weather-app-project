const conversion = document.querySelector('#conversion');
conversion.addEventListener('submit', (e) => {
  e.preventDefault();
  let converter = e.target.convert.value;

  if (document.querySelector('#to-c').checked) {
    converter = (converter - 32) * (5 / 9);
    document.querySelector('#done').innerHTML = `${converter.toFixed(2)}°C`;
  } else if (document.querySelector('#to-f').checked) {
    converter = converter * (9 / 5) + 32;
    document.querySelector('#done').innerHTML = `${converter.toFixed(2)}°F`;
  }
});
