import { ApolloServer } from 'apollo-server-lambda'

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

export default server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
