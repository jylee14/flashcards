const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/', async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).end()
  }

  const username = body.username
  const user = await User.findOne({ username })

  const validPassword = user ? await bcrypt.compare(body.password, user.passwordHash) : false
  if (!user || !validPassword) {
    return res.status(401)
      .send({
        error: 'invalid username or password'
      })
  }

  const tokenUser = { 
    id: user._id,
    username 
  }
  const token = jwt.sign(tokenUser, process.env.SECRET_KEY)

  res.status(200).send({
    token,
    username
  })
})

module.exports = router