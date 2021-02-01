const cors = require('micro-cors')()
import { ApolloServer } from 'apollo-server-micro'

import { typeDefs } from './schemas'
import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => ({
    authScope: req.headers.authorization == process.env.AUTH ? true : false
  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = server.createHandler() // highlight-line
module.exports = cors((req, res) => (req.method === 'OPTIONS' ? res.end() : handler(req, res)))
