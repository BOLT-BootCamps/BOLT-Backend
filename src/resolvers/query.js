const graphql = require('graphql')

const { GraphQLObjectType } = graphql

const { user, users } = require('./userSchema')

const { applications, application } = require('./applicationSchema')

const { bootcamps, bootcamp } = require('./bootcampSchema')

const { event, events } = require('./eventSchema')

const { zoom, zooms } = require('./zoomSchema')

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
    events: events,

    // Admin

    // Zoom
    zoom: zoom,
    zooms: zooms
  }
})

exports.query = RootQuery
