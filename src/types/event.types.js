const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql
const GraphQLDate = require('graphql-date')

const eventType = new GraphQLObjectType({
  name: 'event',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLDate },
    end_date: { type: GraphQLDate },
    image_url: { type: GraphQLString },
    zoom_url: { type: GraphQLString },
    bootcamp: { type: GraphQLInt }
  }
})

const eventInput = new GraphQLInputObjectType({
  name: 'eventInput',
  type: 'Input',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLInt },
    end_date: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    zoom_url: { type: GraphQLString },
    bootcamp: { type: GraphQLInt }
  }
})

const eventsType = new GraphQLList(eventType)

exports.eventType = eventType
exports.eventInput = eventInput
exports.eventsType = eventsType
