const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const { user, users } = require('./userSchema')

const { applications, application } = require('./applicationSchema')

const { bootcamps, bootcamp } = require('./bootcampSchema')

const { event, events } = require('./eventSchema')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    // User
    user: user,
    users: users,

    // Application
    applications,
    application,

    // Bootcamps
    bootcamps,
    bootcamp,

    // Events
    event: event,
    events: events

    // Admin
  }
})

exports.query = RootQuery
