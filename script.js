document.addEventListener('DOMContentLoaded',() => {
    
    const API_KEY = "INSERT_API_KEY";
    
    const cityInput = document.getElementById("city-input");
    const errorMessage = document.getElementById("error-message");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const humidityDisplay = document.getElementById("humidity");
    const windSpeedDisplay = document.getElementById("wind-speed");
    const getWeatherBtn = document.getElementById("icon");
    const weatherInfo = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("clouds");
    
    const weatherImages = {
        clear: "images/clear.png",
        clouds: "images/clouds.png",
        rain: "images/rain.png",
        drizzle: "images/drizzle.png",
        thunderstorm: "images/thunder.png",
        snow: "images/snow.png",
        mist: "images/mist.png",
        haze: "images/haze.png",
        fog: "images/fog.png",
    };

    getWeatherBtn.addEventListener('click',async() => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchData(city);
            displayData(weatherData);
        } catch (error) {
            showError();
        };
    });

    async function fetchData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);
        if(!response.ok){
            throw new Error('city not found');
        }
        data = await response.json();
        return data;
    }

    function displayData(data){
        const {name,main,wind,weather} = data;
        console.log(data);
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `${(main.temp-273.15).toFixed(2)}°c`;
        humidityDisplay.textContent = `${main.humidity}%`;
        windSpeedDisplay.textContent = `${(wind.speed).toFixed(2)}m/s`;
        //images
        const condition = weather[0].main.toLowerCase();

        if (weatherImages[condition]){
            weatherIcon.src = weatherImages[condition];
        }
        else{
            weatherIcon.src = "images/default.png";  // fallback
        }
        //eo images
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(){
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }

})