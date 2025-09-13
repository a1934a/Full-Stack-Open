import { useState } from 'react'
import personService from '../services/persons.js'

import Notification from './Notification.jsx'

const Create = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState("green")

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id;
        personService.update(id, personObject)
          .then((updatedPerson) => {
            setPersons(persons.map(person =>
              person.id === id ? updatedPerson : person
            ));
          }
          )
        setMessage(`Updated ${newName}'s number`)
      }
    } else {
      personService.create(personObject)
        .then((newObject) => {
          console.log("Created person:", newObject)
          setPersons(persons.concat(newObject))
          setMessage(`Added ${newName}`)
          setColor('green')
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setColor('red')
        })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Notification message={message} setMessage={setMessage} color={color} />
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Create