const { ApolloServer } = require('apollo-server-express')
const app = require('./app')
const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
})