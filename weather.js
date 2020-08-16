const COORDS = "coords";
const API_KEY = '8a467298cd6083db54245128b4ff13e3';
const weather = document.querySelector('.js-weather');

function getWeather (lat,lng){
fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
.then(function(response){
    return response.json();
}).then(function(json){
    const temprature = json.main.temp;
    const place = json.name;
  weather.innerText = `${temprature} in ${place}`;
});
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError() {
  console.log("Failed to get the location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
