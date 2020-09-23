require('dotenv').config()

module.exports = {
  apollo: {
    introspection: true,
    playground: true
  },
  port: process.env.PORT || 4000,
  mongo_uri:  process.env.MONGO_URI || ''
}