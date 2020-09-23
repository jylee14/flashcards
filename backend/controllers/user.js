const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

if ('test' === process.env.NODE_ENV || 'dev' === process.env.NODE_ENV) {
  router.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
}

router.get('/:id', async (req, res) => {
  const _id = req.params.id
  const user = await User
    .findOne({ _id })
    .populate({
      path: 'coffeeNotes',
      populate: {
        path: 'bean',
        model: 'Bean'
      }
    })
    .select({
      coffeeNotes: 1,
      username: 1
    })
  
  res.json(user)
})

router.post('/', async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400)
      .send({
        error: 'missing body in request'
      })
  }

  const username = body.username
  const password = body.password
  if (!username || !password) {
    return res.status(400)
      .send({
        error: 'missing username or password'
      })
  }

  const rounds = 10
  const passwordHash = await bcrypt.hash(password, rounds)
  const newUser = new User({ username, passwordHash })
  const savedUser = await newUser.save()

  const tokenUser = { 
    id: savedUser._id,
    username 
  }
  const token = jwt.sign(tokenUser, process.env.SECRET_KEY)
  res.status(201).json({
    token,
    username
  })
})

module.exports = router