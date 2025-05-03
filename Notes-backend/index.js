/*
require('dotenv').config()
const express = require('express')
const Note = require('./module/note')
const app = express()





const notes = []

const requestLogger = (request, response, next) => {
  console.log('Methode:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}


app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.get('/api/notes', (request, response, next) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
    .catch(error => next(error))
})



app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (notes)
    {
      response.json(note)
    } else {
      response.stutus(404).end()
    }
  })
    .catch(error => next(error))
})

//const generateId = () => {
//const maxId =
//notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0
//return String(maxId + 1)
//}

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(404).json({ error: error.massage } )
  }


  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
  console.log(`Server running on port ${PORT}`)
})
*/

const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})