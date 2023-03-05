const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username }) // Find user by username
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) // comparing password and passwordhash in db

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 }) // expires session in 7 days

  response.send({ // sendding json
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
