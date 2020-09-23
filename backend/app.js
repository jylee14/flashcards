const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
require('express-async-errors')

mongoose
  .connect(config.MONGO_URI, {
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
app.use(helmet())
app.use(express.json())

const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app