import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { typeDefs } from './schemas'
import { resolvers } from './resolvers'

const cors = Cors()
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

const handler = server.createHandler({ path: '/api' })

export default cors(handler)
