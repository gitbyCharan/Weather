// api attributes
const API_KEY = '4fe844bb0c53946f08cfc3e7773e6299';

function kelvinToCelcius(kelvin) {
    return Math.floor(kelvin - 273.15);
}

// This sets content to ui
async function setContentToUi(data) {

    var date = new Date();

    document.getElementById('main-temp').innerHTML = `${kelvinToCelcius(data.main.temp)} <sup>o</sup>C`;
    document.getElementById('wind-speed').innerHTML = `💨 ${data.wind.speed} <sub style="font-weight: 400;">mph</sub>`;
    document.getElementById('min-temp').innerHTML = `🌡${kelvinToCelcius(data.main.temp_min)} <sup style="font-weight: 400;">o</sup>C`;
    document.getElementById('max-temp').innerHTML = `🌡${kelvinToCelcius(data.main.temp_max)} <sup style="font-weight: 400;">o</sup>C`;
    document.getElementById('date-w').innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    document.getElementById('coun-city').textContent = `${data.name},${data.sys.country}`;
    document.getElementById('weather-img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('status').textContent = ` ,is ${data.weather[0].main}`;
}

// Calls OPEN WEATHER API for data based on city name
async function loadWeatherDataFromApiAndSetToUi(cityName) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    const response = await fetch(API_URL, {
        'origin': 'cros'
    });

    const weatherJsonMap = await response.json();

    if (weatherJsonMap.cod == '200') {
        await setContentToUi(weatherJsonMap);
    }
    else {
        alert('No city found 🙄');
    }

}

window.onload = async function () {
    await loadWeatherDataFromApiAndSetToUi('amritsar');
}

$(document).ready(function () {
    $('#search-bar').change(async function (e) {
        var cityName = $(this).val();

        if (cityName.length != 0) {
            await loadWeatherDataFromApiAndSetToUi(cityName);
        }
        else{
            alert('City name required 🙂');
        }
    });
});