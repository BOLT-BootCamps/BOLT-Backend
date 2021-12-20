const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInputObjectType } = graphql

const userType = new GraphQLObjectType({
  name: 'user',
  type: 'Mutation',
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    type: { type: GraphQLString }
  }
})

const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  type: 'Input',
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    type: { type: GraphQLString }
  }
})

const usersType = new GraphQLList(userType)

exports.userType = userType
exports.userInput = userInput
exports.usersType = usersType
