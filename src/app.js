const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// GraphQL endpoints
const { query } = require('./resolvers/query')
const { mutation } = require('./resolvers/mutation')

const context = req => {
  const token = req.headers.authorization || 'null'

  // Perform authentication here. Should return token and the type of user.

  return { token }
}

const schema = new GraphQLSchema({
  query,
  mutation
})

app.use(
  '/graphql',
  graphqlHTTP(req => ({
    schema,
    context: () => context(req),
    graphiql: { headerEditorEnabled: true }
  }))
)

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

module.exports = app
