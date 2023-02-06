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

//Date
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

//functions API
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
    nublado: "../assets/sky_with_clouds.png",
    ceuLimpo: "../assets/clear_skye.png",
    ceuNuvens: "../assets/sky_with_clouds.png",
    ceuPrevChuva: "../assets/sky_with_loaded_clouds.png",
    trovoada: "../assets/storm_morning.png",
    ceuManha: "../assets/sun_morgning.png",
    chuvaModerada: "",
  };

  let DescriptionClima = data.weather[0].description;

  switch (DescriptionClima) {
    case "nublado":
      document.body.style.backgroundImage = `url(${imagesToBg.nublado})`;
      break;
    case "céu limpo":
      document.body.style.backgroundImage = `url${imagesToBg.ceuLimpo}`;
      break;
    case "céu nuvens":
      document.body.style.backgroundImage = `url${imagesToBg.ceuNuvens}`;
      break;
    case "ceuPrevChuva":
      document.body.style.backgroundImage = `url${imagesToBg.ceuPrevChuva}`;
      break;
    case "trovoada":
      document.body.style.backgroundImage = `url${imagesToBg.trovoada}`;
      break;
    case "ceuManha":
      document.body.style.backgroundImage = `url${imagesToBg.ceuManha}`;
      break;
    case "chuva moderada":

    default:
      console.log("teste");
  }
  // let temperatura = parseInt(data.main.temp_min);
  // if (temperatura > 25) {
  //   console.log("calor");
  // } else {
  //   console.log("clima ta bao");
  // }
  // document.body.style.backgroundImage = `${imagesToBg.data.weather[0].description}`;
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
