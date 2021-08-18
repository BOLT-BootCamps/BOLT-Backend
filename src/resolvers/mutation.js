const graphql = require('graphql')

const { GraphQLObjectType } = graphql

// const { loginSchema, registerSchema } = require('./auth')

const { updateUser } = require('./userSchema')

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  type: 'Mutation',
  fields: {
    user: updateUser
  }
})

exports.mutation = RootMutation
