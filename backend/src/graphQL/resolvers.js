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
    allDecks: async (_root, _args, context) => {
      const publicDecks = await Deck.find({ public: true }).populate('cards')
      const userDecks = (await User.findById(context.user.id)
        .populate({
          path: 'decks',
          populate: {
            path: 'cards',
            ref: 'Flashcard'
          }
        })
      ).decks

      const deckIdSet = new Set()
      const uniqueDecks = new Array()
      const decks = publicDecks.concat(userDecks)

      for (const deck of decks) {
        if (!deckIdSet.has(deck._id.toString())) {
          uniqueDecks.push(deck)
          deckIdSet.add(deck._id.toString())
        }
      }

      return uniqueDecks
    },
    getDeck: (_root, args) => {
      if (args.name) {
        return Deck.findOne({
          name: args.name
        }).populate('cards')
      } else if (args.id) {
        return Deck.findById(args.id).populate('cards')
      }
      throw new UserInputError('Missing deck name or id!')
    },
    myDecks: async (_root, _args, context) => {
      const user = await User.findById(context.user.id).populate('decks')
      const userDecks = user.decks

      return Deck.populate(userDecks, {
        path: 'cards',
        ref: 'Flashcard'
      })
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
      const user = await User.findById(context.user.id)

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
      user.decks = user.decks.concat(deck)

      await user.save()
      await deck.save()
      return Deck.populate(deck, {
        path: 'cards'
      })
    },
    deleteDeck: async (_root, args, context) => {
      if (!args.id) {
        throw new UserInputError('Missing Deck ID!')
      }

      const userDeck = await User.findById(context.user.id)
        .populate({
          path: 'decks',
          populate: {
            path: 'cards',
            ref: 'Flashcard'
          }
        })

      const targetDeck = userDeck.decks.filter(deck => deck._id == args.id)
      const cardsInDeck = targetDeck[0].cards
      for (const { _id } of cardsInDeck) {
        await FlashCard.findByIdAndRemove(_id)
      }
      await Deck.findByIdAndRemove(args.id)
    }
  }
}

module.exports = resolver