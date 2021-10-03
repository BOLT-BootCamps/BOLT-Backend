const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const { user, users } = require('./userSchema')

const { event, events } = require('./eventSchema')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    user: user,
    users: users,
    event: event,
    events: events,
  }
})

exports.query = RootQuery
