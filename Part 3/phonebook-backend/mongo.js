const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://m1211366583_db_user:${password}@cluster0.v6hzppp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const personA = new Person({
  name: 'mongo testing',
  number: '123',
})

const log = (person) => {
  console.log(`added ${person.name}, number ${person.number} to the phonebook`)
}

personA.save().then(result => {
  log(result)
})

Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => console.log(`${person.name} ${person.number}`))
})