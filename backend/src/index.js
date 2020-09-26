const { ApolloServer } = require('apollo-server-express')

const jwt = require('jsonwebtoken')
const app = require('./app')
const User = require('./models/user')
const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET_KEY)
        const user = await User.findById(decodedToken.id)
        return { user }
      } catch (e) {
        return {
          user: null,
          message: e.message
        }
      }
    }
  }
})
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
})