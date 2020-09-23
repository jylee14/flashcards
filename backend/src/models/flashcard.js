const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
})

schema.set('toJSON', {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = new mongoose.model('Flashcard', schema)