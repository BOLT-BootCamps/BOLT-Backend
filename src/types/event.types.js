const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = graphql
const GraphQLDate = require('graphql-date')

const eventType = new GraphQLObjectType({
  name: 'event',
  type: 'Mutation',
  fields: {
    pkiEventID: { type: GraphQLInt },
    sEventName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    // Start and End date are big integers due to epoch time, hence they become ISO Time
    dtStartDate: { type: GraphQLDate },
    dtEndDate: { type: GraphQLDate },
    sImageUrl: { type: GraphQLString },
    sZoomUrl: { type: GraphQLString },
    fkiBootcampID: { type: GraphQLInt }
  }
})

const eventInput = new GraphQLInputObjectType({
  name: 'eventInput',
  type: 'Input',
  fields: {
    sEventName: { type: GraphQLNonNull(GraphQLString) },
    sDescription: { type: GraphQLNonNull(GraphQLString) },
    dtStartDate: { type: GraphQLNonNull(GraphQLString) },
    dtEndDate: { type: GraphQLNonNull(GraphQLString) },
    sImageUrl: { type: GraphQLNonNull(GraphQLString) },
    sZoomUrl: { type: GraphQLNonNull(GraphQLString) },
    fkiBootcampID: { type: GraphQLNonNull(GraphQLInt) }
  }
})

const eventsType = new GraphQLList(eventType)

exports.eventType = eventType
exports.eventInput = eventInput
exports.eventsType = eventsType
