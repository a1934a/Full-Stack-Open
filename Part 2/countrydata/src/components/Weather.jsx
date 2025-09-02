import { useState, useEffect, use } from 'react'
import countryService from '../services/countries'

const Weather = ({ lat, lon }) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        countryService.getWeather(lat, lon)
            .then(data => setWeatherData(data))
    },[])

    if (weatherData === null) {
        return <div>Loading weather...</div>
    }

    return (
        <div>
            <p>Weather: {weatherData.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default Weather