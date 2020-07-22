var apiKey = "8f5c037e998eb1a633f713248b583ac4";

//get weather data from the weather API
const getWeatherData = async (cityName) => {
    
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, {mode: 'cors'});
        let simplifiedData = await weatherData.json();
        return simplifiedData;
    
}

//processes the json file from the weather API and returns the relevant data in an object
const processWeatherData = (weatherData) => {
    console.log(weatherData);
    let weather = {
        "Clouds": weatherData.weather[0].description,
        "Current Temperature": Math.round(weatherData.main.temp - 273.15),
        "Minimum Temperature": Math.round(weatherData.main.temp_min - 273.15),
        "Maximum Temperature": Math.round(weatherData.main.temp_max - 273.15),
        "Pressure": weatherData.main.pressure,
        "Humidity": weatherData.main.humidity,
        "Visibility": weatherData.visibility,
        "Wind": weatherData.wind.speed
    }
    //convert the data into
    return weather;
}

//get the current time
const getTime = () => {
    let d = new Date();
    let time = d.toLocaleTimeString();
    return time;
}

//takes location input from form and then calls getWeatherData to get info
const weatherHandler = async (location) => {
        let timeRequested = getTime();
        let weatherData = await getWeatherData(location);
        let processedData = processWeatherData(weatherData);
        let timeReceived = getTime();
        return [processedData, timeRequested, timeReceived];
}


export default weatherHandler;
