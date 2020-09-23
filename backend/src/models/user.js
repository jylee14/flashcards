const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  decks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck'
  }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  }
})

module.exports = new mongoose.model('User', userSchema)