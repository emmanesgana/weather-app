const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const weatherContainer = document.querySelector('#weather-container');
const notFoundContainer = document.querySelector('#location-not-found');
const notFoundLabel = document.querySelector('.not-found');
const temperature = document.querySelector('.temperature');
const feelInfo = document.querySelector('.feels-like');
const humidityInfo = document.querySelector('.humidity');
const windInfo = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.weather-description');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = input.value;

    if (inputValue === '') return;
    weatherData(inputValue);
})

async function weatherData(cityName) {
    try {
        const APIKey = 'a9cce5917b6fa3cf534068863d9d42e8';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            renderError(weatherData);
        } else {
            renderWeatherData(weatherData);
        }
    } catch (error) {
        alert(error);
    }
}

function renderWeatherData(obj) {
    const { main: { temp, humidity, feels_like }, wind: { speed } } = obj;

    notFoundContainer.style.display = 'none';
    weatherContainer.style.display = 'block';

    weatherIcon.src = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
    temperature.innerHTML = `${temp.toFixed()}<span class="celsius">°C</span>`;
    weatherDescription.textContent = `${obj.weather[0].description}`;
    feelInfo.textContent = `${feels_like.toFixed()}°C`;
    windInfo.textContent = `${speed} km/h`
    humidityInfo.textContent = `${humidity}%`;
}

function renderError(obj) {
    const error = obj.message;

    weatherContainer.style.display = 'none';
    notFoundContainer.style.display = 'block';
    notFoundLabel.textContent = error[0].toUpperCase() + error.slice(1);
}