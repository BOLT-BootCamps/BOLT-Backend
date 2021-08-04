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
const { auth } = require('./schemas/auth')

const schema = new GraphQLSchema({
  auth
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: { headerEditorEnabled: true }
  })
)

module.exports = app
