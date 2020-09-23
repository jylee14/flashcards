const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type FlashCard {
    id: ID!
    term: String!
    definition: String!
  }

  type Deck {
    id: ID!
    name: String!
    description: String
    cards: [FlashCard!]!
  }

  type Query {
    allFlashCards(deck: String): [FlashCard!]!
    allDecks: [Deck!]!
    getDeck(name: String!, id: ID): Deck!
  }

  type Mutation {
    newFlashCard(term: String!, definition: String!): FlashCard

    createDeck(name: String!, public: Boolean!, description: String, cards: [String!]!): Deck!
}`

module.exports = typeDefs