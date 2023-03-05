const ERRORS_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'Id used is malformed' }),
  ValidationError: (res, error) => res.status(409).send({ error: error.message }),
  JsonWebTokenError: res => res.status(401).json({ error: 'Token invalid' }),
  TokenExpirerError: res => res.status(401).json({ error: 'Token expired' }),
  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)
  const handler = ERRORS_HANDLERS[error.name] || ERRORS_HANDLERS.defaultError // Using errors in library errors
  handler(response, error)
}
