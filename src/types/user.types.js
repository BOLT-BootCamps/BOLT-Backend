const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLInt } = graphql

const userType = new GraphQLObjectType({
  name: 'user',
  type: 'Mutation',
  fields: {
    pkiEventID: { type: GraphQLInt },
    sFirstName: { type: GraphQLString },
    sLastName: { type: GraphQLString },
    sEmail: { type: GraphQLString },
    sSchool: { type: GraphQLString },
    sProgram: { type: GraphQLString },
    sYearOfStudy: { type: GraphQLString },
  }
})

const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  type: 'Input',
  fields: {
    sFirstName: { type: GraphQLString },
    sLastName: { type: GraphQLString },
    sEmail: { type: GraphQLString },
    sSchool: { type: GraphQLString },
    sProgram: { type: GraphQLString },
    sYearOfStudy: { type: GraphQLString },
  }
})

const usersType = new GraphQLList(userType)

exports.userType = userType
exports.userInput = userInput
exports.usersType = usersType
