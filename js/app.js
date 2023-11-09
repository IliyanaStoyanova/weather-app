const btnLocation = document.querySelector('.location');
const inputInfo = document.querySelector('.info');
const sectionWeather = document.querySelector('.weather-part');
const inputCity = document.querySelector('.city');
const container = document.querySelector('.main');
const inputPart = document.querySelector('.input-part');
const arrowBack = container.querySelector('header i');

const displayInfo = (field) => {
  field.classList.add('error');
}
const hideInfo = (field) => {
  field.innerText = '';
  field.classList.remove('error');
}

const weatherDetails = (result) => {
  if(result.cod === "404") {
    inputInfo.innerText = "City name isn't a valid!";
    displayInfo(inputInfo);
    return false;
  }
  hideInfo(inputInfo);
  const city = result.name;
  const country = result.sys.country;
  const {description, id} = result.weather[0];
  const {temp, feels_like, humidity} = result.main;

  sectionWeather.querySelector(".temp .numb").innerText = Math.floor(temp);
  sectionWeather.querySelector(".weather").innerText = description;
  sectionWeather.querySelector(".place span").innerText = `${city}, ${country}`;
  sectionWeather.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
  sectionWeather.querySelector(".humidity span").innerText = `${humidity}%`;
  inputInfo.innerText = "";
  inputCity.value = ""
  sectionWeather.classList.add("active");
}

const requestApi = (city) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(api)
  .then(res => res.json())
  .then(result => weatherDetails(result));
}

const getWeather = () => {
  const city = inputCity.value;
  if(!city) {    
    inputInfo.innerText = "Please fill in a city.";
    displayInfo(inputInfo);
    return false;
  }
  requestApi(city);
}

btnLocation.addEventListener('click', getWeather);

arrowBack.addEventListener("click", () => {
  container.classList.remove("active");
});