import { useState, useEffect, use } from "react"

import Detail from "./Detail"

const Display = ({ filteredCountries }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const showDetail = (countryName) => {
        setSelectedCountry(countryName)
    }

    useEffect(() => {
        setSelectedCountry(null);
    },[filteredCountries])

    if (selectedCountry) {
        return <Detail countryName={selectedCountry} />
    }

    if (filteredCountries.length === 0) {
        return <div>not found</div>
    }
    else if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filteredCountries.length === 1) {

        const countryName = filteredCountries[0].name

        return (
            <Detail countryName={countryName} />
        )
    }

    return (
        <div>
            <ul>
                {filteredCountries.map(
                    country => (
                        <li key={country.name}>{country.name} <button onClick={() => showDetail(country.name)}>show</button></li>
                    )
                )}
            </ul>
        </div>
    )
}

export default Display