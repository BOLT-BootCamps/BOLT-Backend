const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const { loginSchema, registerSchema } = require('./auth')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    login: loginSchema,
    register: registerSchema
  }
})

exports.query = RootQuery
