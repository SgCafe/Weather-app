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
const dateElement = document.querySelector(".date p");
const dayElement = document.querySelector("#dia");

const weatherContainer = document.querySelector("#weather-app");

const changeImageBg = document.querySelector("#changeimg");

//Teste GeoLocation

const btnLocation = document.querySelector("#btnGeoLocation");
const TxtTeste = document.querySelector("#testeGeo");

//Function Date and Time
const dateTime = () => {
  const dateElement = new Date();
  const dayAndMonth = dateElement.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });

  const getTime = () => {
    const hourElement = dateElement.getHours();
    const minuteElement = dateElement.getMinutes();

    return `  |  ${hourElement}h${minuteElement}`;
  };

  return dayAndMonth + getTime();
};

//Function GeoLocation
const getlocation = async () => {
  const responseLocation = await fetch("https://ipapi.co/json/");
  const data = await responseLocation.json();
  return data.city;
};

//functions API
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
  dayElement.innerText = dateTime();

  weatherContainer.classList.remove("hide");

  const imagesToBg = {
    cloudSky: "../assets/clouds_sky.png",
    clearSky: "../assets/clear_sky.png",
    atmosphereSky: "../assets/atmosphere_sky.png",
    snowSky: "../assets/snow_sky.png",
    rainSky: "../assets/rain_sky.png",
    drizzleSky: "../assets/drizzle_sky.png",
    stormSky: "../assets/storm_sky.png",
  };

  let DescriptionClima = data.weather[0].main;

  switch (DescriptionClima) {
    case "Clouds":
      document.body.style.backgroundImage = `url(${imagesToBg.cloudSky})`;
      break;
    case "Clear":
      document.body.style.backgroundImage = `url(${imagesToBg.clearSky})`;
      break;
    case "Atmosphere":
      document.body.style.backgroundImage = `url(${imagesToBg.atmosphereSky})`;
      break;
    case "Snow":
      document.body.style.backgroundImage = `url(${imagesToBg.snowSky})`;
      break;
    case "Rain":
      document.body.style.backgroundImage = `url(${imagesToBg.rainSky})`;
      break;
    case "Drizzle":
      document.body.style.backgroundImage = `url(${imagesToBg.drizzleSky})`;
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = `url(${imagesToBg.stormSky})`;
      break;

    default:
      console.log("teste");
  }
};

//Events
Btnsearch.addEventListener("click", (e) => {
  e.preventDefault();

  const cityInput = inputTxt.value;
  showWeatherData(cityInput);
});

inputTxt.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const cityInput = e.target.value;
    showWeatherData(cityInput);
  }
});

btnLocation.addEventListener("click", async () => {
  const cityInput = await getlocation();
  showWeatherData(cityInput);
});
