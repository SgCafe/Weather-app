//Variable and elements selection
const apiKey = "143eb49867f301ac207f8076a21a9935";

const inputTxt = document.querySelector("#inputText");
const Btnsearch = document.querySelector("#searchBtn");

const tempMinElement = document.querySelector("#min-temp");
const tempNormalElement = document.querySelector("#normal-temp");
const tempMaxElement = document.querySelector("#max-temp");
const descriptionElement = document.querySelector("#description span");
const imgDescriptionElement = document.querySelector("#icon-description");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const cityElement = document.querySelector("#city span");
const dateElement = document.querySelector("#date");

const weatherContainer = document.querySelector("#weather-app");

//Date
// const date = new Date()

//functions

//Função para pegar os dados da API
const getWeatherData = async (cityInput) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}&lang=pt_br`
  );

  const data = await response.json();
  return data;
};

//Função para mostrar dados da API
const showWeatherData = async (cityInput) => {
  const data = await getWeatherData(cityInput);

  cityElement.innerText = data.name;
  tempMinElement.innerText = parseInt(data.main.temp_min);
  tempNormalElement.innerText = parseInt(data.main.temp);
  tempMaxElement.innerText = parseInt(data.main.temp_max);
  descriptionElement.innerText = data.weather[0].description;
  imgDescriptionElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  humidityElement.innerText = data.main.humidity + "%";
  windElement.innerText = data.wind.speed + " km/h";

  weatherContainer.classList.remove("hide");
};

//Events
Btnsearch.addEventListener("click", (e) => {
  e.preventDefault;

  const cityInput = inputTxt.value;
  showWeatherData(cityInput);
});

inputTxt.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const cityInput = e.target.value;
    showWeatherData(cityInput);
  }
});
