require('dotenv').config()
require('./mongo') // require directly because this is executed in in mongo.js

// import express from 'express' -> Js modules imports
const express = require('express')
const cors = require('cors')
const Note = require('./models/Note')
const User = require('./models/User')

const logger = require('./loggerMiddleware')
const notFoud = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const userExtractor = require('./middleware/userExtractor')

const usersRouters = require('./controllers/users')
const loginRouter = require('./controllers/login')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
// app.use(express.static('../ListNotes/dist'))
app.use(express.static('./dist'))

Sentry.init({
  dsn: 'https://d1edbcbf6de64824975e9687fc0f1666@o1372405.ingest.sentry.io/6677298',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

// GET ALL NOTES
app.get('/api/notes', async (request, response, next) => {
  const notes = await Note.find({}).populate('user', { // populate is equal to join, get information from note ref
    username: 1, // 1 = true, 0 = false
    name: 1
  })

  response.json(notes)
})

// GET NOTE
app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id).then(note => {
    if (note) return response.json(note)
    else response.status(404).end()
  }).catch(next)
})

// CHANGE NOTE
app.put('/api/notes/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body
  // response.json(note)

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }) // { new: true } see to new update
    .then(result => {
      response.json(result)
    })
    .catch(next)
})

// DELETE NOTE
app.delete('/api/notes/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  try {
    const res = await Note.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// ADD NEW NOTE
app.post('/api/notes', userExtractor, async (request, response, next) => {
  const { content, description = '...', important = false } = request.body

  // User Id from request
  const { userId } = request
  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'Title is missing!'
    })
  }

  const newNote = new Note({
    content,
    description,
    date: new Date(),
    color: Math.floor(Math.random() * 5).toString(),
    important,
    user: user._id // _id because is not json
  })

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id) // _id because is not json
    await user.save()

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

// USER
app.use('/api/users', usersRouters)
app.use('/api/login', loginRouter)

// anyone dont use this route
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// ERRORS
app.use(Sentry.Handlers.errorHandler())
app.use(notFoud)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
