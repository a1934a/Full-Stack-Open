import { useState, useEffect } from "react"
import countryService from "../services/countries"

import Weather from "./Weather"

const Detail = ({ countryName }) => {

    const [countryObject, setCountryObject] = useState(null)

    useEffect(() => {
        countryService.getCountry(countryName)
            .then(data => {
                console.log(data)
                setCountryObject({ ...data })
            })
    }, [countryName])

    if (countryObject === null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{countryObject.name.common}</h1>
            <p>capital: {countryObject.capital[0]}</p>
            <p>area: {countryObject.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.entries(countryObject.languages).map(([key, value]) => <li key={key}>{value}</li>)}
            </ul>
            <img src={countryObject.flags.png} alt="flag" />
            <h2>Weather in {countryObject.capital[0]}</h2>
            <Weather lat={countryObject.capitalInfo.latlng[0]} lon={countryObject.capitalInfo.latlng[1]} />
        </div>
    )
}

export default Detail