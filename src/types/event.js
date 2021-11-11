const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLDate, GraphQLList, GraphQLInputObjectType } = graphql

const eventType = new GraphQLObjectType({
  name: 'event',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLDate }
  }
})

const eventInput = new GraphQLInputObjectType({
  name: 'eventInput',
  type: 'Input',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLDate }
  }
})

const eventsType = new GraphQLList(eventType)

exports.eventType = eventType
exports.eventInput = eventInput
exports.eventsType = eventsType
