import { useState, useEffect, use } from 'react'
import countryService from './services/countries'

import Display from './components/Display'
import Search from './components/Search'

function App() {


  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(countries => {
        setCountries(countries)
      }
      )
  }, [])

  if (countries.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Search filter={filter} setFilter={setFilter} />
      <Display filteredCountries={filteredCountries} />
    </>
  )
}

export default App
