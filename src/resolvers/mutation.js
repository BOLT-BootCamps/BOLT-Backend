const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const { loginSchema, registerSchema } = require('./auth')

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  type: 'Mutation',
  fields: {
    login: loginSchema,
    register: registerSchema
  }
})

exports.mutation = RootMutation
