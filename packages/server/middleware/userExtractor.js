const jwt = require('jsonwebtoken')

// Middleware reusable for get id token (jsonwebtoken)
module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) { // Validate if authorization start whit template bearer
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET) // veryfi token user whit token in db

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next() // return userId
}
