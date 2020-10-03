const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input FlashCardData { 
    term: String!
    definition: String!
  }

  type FlashCard {
    id: ID!
    term: String!
    definition: String!
  }

  type Deck {
    id: ID!
    name: String!
    public: Boolean
    description: String
    cards: [FlashCard!]!
  }

  type User { 
    username: String!
    decks: [Deck!]!
    id: ID!
  }

  type Token {
    username: String!
    value: String!
  }

  type Query {
    allFlashCards(deck: String): [FlashCard!]!
    allDecks: [Deck!]!
    getDeck(name: String, id: String): Deck!
  }

  type Mutation {
    login(username: String!, password: String!): Token
    createUser(username: String!, password: String!): Boolean
    newFlashCard(term: String!, definition: String!): FlashCard
    createDeck(name: String!, public: Boolean!, description: String, cards: [FlashCardData!]!): Deck!
}`

module.exports = typeDefs