const graphql = require('graphql')

const { GraphQLObjectType } = graphql

// const { loginSchema, registerSchema } = require('./auth')

const { user, users } = require('./userSchema')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    user: user,
    users: users
  }
})

exports.query = RootQuery
