import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
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

const cors = Cors()

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = server.createHandler()

export default cors(handler)
