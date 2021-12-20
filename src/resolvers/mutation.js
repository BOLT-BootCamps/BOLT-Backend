const graphql = require('graphql')
const { GraphQLObjectType } = graphql

const { updateEvent, addEvent, deleteEvent } = require('./eventSchema')
const { updateApplication, addApplication, deleteApplication } = require('./applicationSchema')
const { updateUser } = require('./userSchema')

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  type: 'Mutation',
  fields: {
    user: updateUser,

    updateEvent: updateEvent,
    addEvent: addEvent,
    deleteEvent: deleteEvent,

    updateApplication: updateApplication,
    addApplication: addApplication,
    deleteApplication: deleteApplication
  }
})

exports.mutation = RootMutation
