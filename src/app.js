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

const schema = new GraphQLSchema({
  query,
  mutation
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: { headerEditorEnabled: true }
  })
)

module.exports = app
