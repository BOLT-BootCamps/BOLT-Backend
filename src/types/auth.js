const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const loginType = new GraphQLObjectType({
  name: 'login',
  type: 'Mutation',
  fields: {
    login: { type: GraphQLString }, // can be email or username
    token: { type: GraphQLString }
  }
})

const registerType = new GraphQLObjectType({
  name: 'register',
  type: 'Mutation',
  fields: { // can add more fields here.
    email: { type: GraphQLString },
    token: { type: GraphQLString }
  }
})

exports.loginType = loginType
exports.registerType = registerType
