const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  public: {
    type: Boolean,
    required: true
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard'
  }]
})

schema.set('toJSON', {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = new mongoose.model('Deck', schema)