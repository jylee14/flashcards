const resolvers = { 
  Query: {
    allFlashCards: (root, args) => [], //(deck: String!)
    allDecks: () => [],
    getDeck: (root, args) => [] //(deck: String, id: ID):
  }
}

module.exports = resolvers