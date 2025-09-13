const express = require("express")
const morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('content', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let data = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (req, res) => {

    Person.find({}).then(people => {
        const now = new Date()

        res.send(`
        <p>${people.length} people in the phonebook.</p>
        <p>${now.toString()}</p>
        `)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.post('/api/persons', (req, res, next) => {

    const body = req.body

    // const generateId = () => {
    //     return Math.floor(Math.random() * 5000)
    // }

    if (!(body.name.trim() && body.number.trim())) {
        return res.status(400).json({ 'error': 'content missing' })
    }

    // if (data.some((person) => person.name === body.name)) {
    //     return res.status(400).json({ 'error': 'name already existed' })
    // }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            next(error)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body

    Person.findByIdAndUpdate(id, { number: body.number }, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)