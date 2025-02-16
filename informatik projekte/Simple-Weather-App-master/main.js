const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
  ipBase: "https://ipapi.co/json/"
};

const weatherContainer = document.querySelector('.app-wrap');


function getWeatherByIP() {
  fetch(api.ipBase)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der IP-Daten.');
      }
      return response.json();
    })
    .then(data => {
      const { city, country } = data;
      const url = `${api.base}weather?q=${city},${country}&units=metric&APPID=${api.key}`;
      fetchWeather(url);
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der IP-Daten:', error);
      weatherContainer.innerHTML = '<div class="error">Wetterdaten konnten nicht abgerufen werden.</div>';
    });
}


function getWeatherByCity(query) {
  const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
  fetchWeather(url);
}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', function(evt) {
  if (evt.keyCode === 13) {
    const query = searchbox.value.trim();
    if (query) {
      getWeatherByCity(query);
    } else {
      getWeatherByIP();
    }
  }
});


function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Wetterdaten.');
      }
      return response.json();
    })
    .then(weather => {
      displayResults(weather);
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      weatherContainer.innerHTML = '<div class="error">Wetterdaten konnten nicht abgerufen werden.</div>';
    });
}


function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = translateWeather(weather.weather[0].main);

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}


function dateBuilder(d) {
  let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function translateWeather(weather) {
  const weatherTranslations = {
    "Clear": "Sonnig",
    "Clouds": "Wolkig",
    "Rain": "Regen",
    "Snow": "Schnee",
    "Thunderstorm": "Gewitter",
    "Drizzle": "Nieselregen",
    "Mist": "Nebel"
  };
  return weatherTranslations[weather] || weather;
}



document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentLocation) {
      link.classList.add('active');
    }
  });
});




getWeatherByIP();
