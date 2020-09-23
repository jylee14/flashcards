const logger = require('./logger')

const requestLogger = (req, _res, next) => {
  logger.info(`Method: ${req.method}`)
  logger.info(`Token: ${req.token}`)
  logger.info(`Path: ${req.path}`)
  logger.info(`Body: ${req.body}`)
  next()
}

const tokenExtractor = (req, _res, next) => {
  const authToken = req.get('authorization')
  if (authToken && authToken.toLowerCase().startsWith('bearer ')) {
    req.token = authToken.substring(7)
  }
  next()
}

const errorHandler = (err, _req, res, next) => {
  logger.err(err.message)

  if ('CastError' === err.name && 'ObjectId' === err.kind) {
    return res.status(400).send({
      error: 'Invalid ID'
    })
  }
  if ('ValidationError' === err.name) {
    return res.status(400).send({
      error: 'invalid field found'
    })
  }
  next()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler
}