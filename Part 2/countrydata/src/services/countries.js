import axios from "axios";

const getAllCountries = () => {
    return axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => {
            return response.data.map(country => { return { name: country.name.common } })
        })
}

const getCountry = (name) => {
    return axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => response.data)
}

const getWeather = (lat,lon) => {
    const API_key = import.meta.env.VITE_SOME_KEY
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
        .then(response => response.data)
}

export default { getAllCountries, getCountry,getWeather }