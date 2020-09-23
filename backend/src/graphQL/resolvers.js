const mongoose = require('mongoose')
const Deck = require('../models/deck')
const FlashCard = require('../models/flashcard')

const resolver = {
  Query: {
    allFlashCards: async () => {
      const allCards = await FlashCard.find({})
      return allCards
    },
    allDecks: async () => await Deck.find({}).populate('cards'),
    getDeck: async (_root, args) => {
      const deck = await Deck.findOne({
        name: args.name
      }).populate('cards')

      return deck
    }
  },

  Mutation: {
    newFlashCard: async (_root, args) => {
      const newFlashCard = new FlashCard({
        term: args.term,
        definition: args.definition
      })
      await newFlashCard.save()
      return newFlashCard
    },
    createDeck: async (_root, args) => { // createDeck(name: String!, cards: [String!]!): Deck!
      const name = args.name
      const cards = args.cards.map(card => mongoose.Types.ObjectId(card))
      const deck = new Deck({ name, cards })
      await deck.save()
      return Deck.populate(deck, {
        path: 'cards'
      })
    }
  }
}

module.exports = resolver