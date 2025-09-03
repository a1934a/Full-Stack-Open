const express = require("express")
const morgan = require('morgan')
const app = express()

app.use(express.json())

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

    const now = new Date()

    res.send(
        `
        <p>${data.length} people in the phonebook.</p>
        <p>${now.toString()}</p>
        `
    )
})

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.post('/api/persons', (req, res) => {

    const body = req.body

    const generateId = () => {
        return Math.floor(Math.random() * 5000)
    }

    if (!(body.name.trim() && body.number.trim())) {
        return res.status(400).json({'error':'content missing'})
    }

    if (data.some((person)=>person.name === body.name)){
        return res.status(400).json({'error':'name already existed'})
    }

    const object = {
        "id": generateId().toString(),
        "name": body.name,
        "number": body.number
    }

    data = data.concat(object)

    res.json(object)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find((person) => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    data = data.filter((person) => person.id !== id)

    res.status(204).end()

})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})