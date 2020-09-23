const mongoose = require("mongoose")
const Deck = require('../models/deck')
const FlashCard = require('../models/flashcard')

const resolvers = {
  Query: {
    allFlashCards: async (root, args) => {
      // args => (deck: String)
      const allCards = await FlashCard.find({})
      return allCards
    },
    allDecks: () => [],
    getDeck: (root, args) => [] //(deck: String, id: ID):
  },

  Mutation: {
    newFlashCard: async (root, args) => {
      const newFlashCard = new FlashCard({
        term: args.term,
        definition: args.definition
      })
      await newFlashCard.save()
      return newFlashCard
    },
    createDeck: async (root, args) => { // createDeck(name: String!, cards: [String!]!): Deck!
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

module.exports = resolvers