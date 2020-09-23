const cors = require('cors')
// const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('express-async-errors')

mongoose.connect(config.mongo_uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch(err => {
    logger.err(`failed to connect to mongoDB: ${err}`)
  })
mongoose.set('useFindAndModify', false)

const app = express()
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use(cors())
// app.use(helmet())
app.use(express.json())
app.use(middleware.errorHandler)

module.exports = app