//Variable and elements selection
const apiKey = "143eb49867f301ac207f8076a21a9935";

const inputTxt = document.querySelector("#inputText");
const Btnsearch = document.querySelector("#searchBtn");

const tempMinElement = document.querySelector("#min-temp");
const tempNormalElement = document.querySelector("#normal-temp");
const tempMaxElement = document.querySelector("#max-temp");
const descriptionElement = document.querySelector("#description span");
const imgDescriptionElement = document.querySelector("#description i");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const cityElement = document.querySelector("#city span");
const dateElement = document.querySelector("#date");

//functions

//Função para pegar os dados da API
const getWeatherData = async (cityInput) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}&lang=pt_br`
  );

  const data = await response.json();
  console.log(data);
  return data;
};

//Função para mostrar dados da API
const showWeatherData = async (cityInput) => {};

//Events
Btnsearch.addEventListener("click", (event) => {
  event.preventDefault;

  const cityInput = inputTxt.value;
  showWeatherData(cityInput);
});
