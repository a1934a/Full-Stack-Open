import { useState, useEffect } from 'react'
import personService from './services/persons.js'

import Create from './components/Create.jsx'
import Pannel from './components/Pannel.jsx'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log("Fetched persons:", initialPersons.length);
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Create persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Pannel persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
