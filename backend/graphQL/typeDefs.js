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
    cards: [FlashCard!]!
  }

  type Query {
    allFlashCards(deck: String): [FlashCard!]!
    allDecks: [Deck!]!
    getDeck(deck: String, id: ID): Deck!
  }

  type Mutation {
    newFlashCard(term: String!, definition: String!): FlashCard

    createDeck(name: String!, cards: [String!]!): Deck!
  }
`

module.exports = typeDefs