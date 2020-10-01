const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Deck = require('../models/deck')
const FlashCard = require('../models/flashcard')
const { UserInputError, AuthenticationError } = require('apollo-server-express')

const resolver = {
  Query: {
    allFlashCards: async () => {
      const allCards = await FlashCard.find({})
      return allCards
    },
    allDecks: (_root, _args) => {
      return Deck.find({
        // public: true
        // TODO: Warning remove this later
      }).populate('cards')
    },
    getDeck: (_root, args) => {
      return Deck.findOne({
        name: args.name
      }).populate('cards')
    }
  },

  Mutation: {
    login: async (_root, args) => {
      const username = args.username
      const password = args.password
      if (!username || !password) {
        throw new UserInputError('Missing username or password')
      }

      const user = await User.findOne({ username })
      if (!user) {
        throw new AuthenticationError('Incorrect username or password')
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash)
      if (!validPassword) {
        throw new AuthenticationError('Incorrect username or password')
      }

      const userToken = {
        id: user._id,
        username
      }
      const token = jwt.sign(userToken, process.env.SECRET_KEY)
      return {
        value: token,
        username
      }
    },
    createUser: async (_root, args) => {
      const username = args.username
      const password = args.password

      const user = await User.findOne({ username })
      if (user) { throw new UserInputError('username already taken!') }

      const passwordHash = await bcrypt.hash(password, 5)
      const newUser = new User({
        username,
        passwordHash
      })
      await newUser.save()
      return true
    },
    newFlashCard: async (_root, args) => {
      const newFlashCard = new FlashCard({
        term: args.term,
        definition: args.definition
      })
      await newFlashCard.save()
      return newFlashCard
    },
    createDeck: async (_root, args, context) => {
      console.log(context.user)

      const promiseCards = args.cards.map(async card => {
        const newCard = new FlashCard({
          term: card.term,
          definition: card.definition
        })
        await newCard.save()
        return newCard._id
      })
      const cards = await Promise.all(promiseCards)

      const deck = new Deck({
        name: args.name,
        public: args.public,
        description: args.description || '',
        cards
      })
      
      await deck.save()
      return Deck.populate(deck, {
        path: 'cards'
      })
    }
  }
}

module.exports = resolver