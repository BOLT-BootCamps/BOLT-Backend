const graphql = require('graphql')
const { GraphQLObjectType } = graphql

const { updateEvent, addEvent } = require('./eventSchema')
const { updateUser } = require('./userSchema')

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  type: 'Mutation',
  fields: {
    user: updateUser,
    updateEvent: updateEvent,
    addEvent: addEvent
  }
})

exports.mutation = RootMutation
