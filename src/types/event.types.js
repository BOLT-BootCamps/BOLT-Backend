const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql

const eventType = new GraphQLObjectType({
  name: 'event',
  type: 'Mutation',
  fields: {
    pkiEventID: { type: GraphQLInt },
    sEventName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLString },
    dtEndDate: { type: GraphQLString },
    sImageUrl: { type: GraphQLString },
    sZoomUrl: { type: GraphQLString },
    fkiBootcampID: { type: GraphQLInt }
  }
})

const eventInput = new GraphQLInputObjectType({
  name: 'eventInput',
  type: 'Input',
  fields: {
    sEventName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLString },
    dtEndDate: { type: GraphQLString },
    sImageUrl: { type: GraphQLString },
    sZoomUrl: { type: GraphQLString },
    fkiBootcampID: { type: GraphQLInt }
  }
})

const eventsType = new GraphQLList(eventType)

exports.eventType = eventType
exports.eventInput = eventInput
exports.eventsType = eventsType
