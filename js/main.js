const cloudInfo = document.getElementById('cloudInfo');
const humidityInfo = document.getElementById('humidityInfo');
const windInfo = document.getElementById('windInfo');
const visibleInfo = document.getElementById('visibilityInfo');
const pressureInfo = document.getElementById('pressureInfo');
const weatherSearch = document.querySelector('.weather__search');
const form = document.querySelector('.weather__form');
const weatherInfo = document.querySelector('.weather__information');

fetch("https://api.openweathermap.org/data/2.5/weather?q=New york&units=metric&appid=33dedde6287575d237be2e1c44271762")
  .then((res) => res.json())
  .then((data) =>{
    
    let div = document.createElement('div');
    div.className = 'd-flex weather__information align-items-center';
    div.innerHTML = `
    <span class="weather__degree text-white" id="mainDegree">${Math.floor(data.main.temp)}</span>
    <h3 class="m-0 text-white weather__name me-4" id="countryName">${data.name}</h3>
    <div>
    <i class='bx weather__avatar text-white bx-cloud' id='weather__icon'></i>
    <p class="m-0 text-white" id="infoWeather">${data.weather[0].main}</p>
    </div>
    `;

    cloudInfo.textContent = data.clouds.all + '%';
    humidityInfo.textContent = data.main.humidity+'%';
    windInfo.textContent = data.wind.speed+' km/h';
    visibleInfo.textContent = data.visibility;
    pressureInfo.textContent = data.main.pressure;
    weatherInfo.appendChild(div);

})


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let value = weatherSearch.value;
  weatherInfo.innerHTML = '';
 
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=33dedde6287575d237be2e1c44271762`)
  .then((res) => res.json())
  .then((data) =>{

    let div = document.createElement('div');
    div.className = 'd-flex weather__information align-items-center';
    div.innerHTML = `
    <span class="weather__degree text-white" id="mainDegree">${Math.floor(data.main.temp)}</span>
    <h3 class="m-0 text-white weather__name me-4" id="countryName">${data.name}</h3>
    <div>
    <i class='bx weather__avatar text-white bx-cloud-rain'></i>
    <p class="m-0 text-white" id="infoWeather">${data.weather[0].main}</p>
    </div>
    `;

    let condition = data.weather[0].main;
    const weatherMain = document.querySelector('.weather');

    if(condition == 'Clouds'){
      weatherMain.style.backgroundImage = "url('../img/cloud.jpg')"
    }
    if(condition == 'Clear'){
      weatherMain.style.backgroundImage = "url('../img/sunny.jpg')"
    }
    if(condition == 'Snow'){
      weatherMain.style.backgroundImage = "url('../img/snow.jpg')"
    }
    if(condition == 'Rain'){
      weatherMain.style.backgroundImage = "url('../img/rain.jpg')"
    }
    if(condition == 'Mist'){
      weatherMain.style.backgroundImage = "url('../img/mist.avif')"
    }

    cloudInfo.textContent = data.clouds.all + '%';
    humidityInfo.textContent = data.main.humidity+'%';
    windInfo.textContent = data.wind.speed+' km/h';
    visibleInfo.textContent = data.visibility;
    pressureInfo.textContent = data.main.pressure;
    weatherInfo.appendChild(div);
    weatherSearch.value = '';
  })
})