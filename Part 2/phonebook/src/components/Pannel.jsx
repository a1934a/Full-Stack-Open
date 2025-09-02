import { useState } from 'react'
import personService from '../services/persons.js'

import Notification from './Notification.jsx'

const Display = ({ filteredPersons, handleDelete }) => {
    console.log("Displaying persons:", filteredPersons.length);

    return (
        <div>
            {filteredPersons.map(person =>
                <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
            )}
        </div>
    )
}

const Search = ({ filter, setFilter }) => {
    // set and manage filter state in this component

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <p>search: <input value={filter} onChange={handleFilterChange} /></p>
    )

}

const Pannel = ({ persons, setPersons }) => {

    const [message, setMessage] = useState(null)
    const [color, setColor] = useState("green")
    const [filter, setFilter] = useState('')

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleDelete = (id) => {
        personService.deletePerson(id)
            .then((data) => {
                setMessage(`successfully deleted`)
                setColor("green")
                setPersons(persons.filter(person => person.id !== data.id))
            })
            .catch((error) => {
                setMessage("person already deleted")
                setColor("red")
                setPersons(persons.filter(person => person.id !== id))
            })
    }

    return (
        <div>
            <Search filter={filter} setFilter={setFilter} />
            <Notification message={message} setMessage={setMessage} color={color} />
            <Display filteredPersons={filteredPersons} handleDelete={handleDelete} />
        </div>
    )
}

export default Pannel