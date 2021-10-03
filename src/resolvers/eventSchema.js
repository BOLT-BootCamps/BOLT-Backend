const graphql = require('graphql')

const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { eventType, eventsType, eventInput } = require('../types/event')

const { eventDB } = require('../services/database')

const event = {
  name: 'Event',
  type: eventType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return eventDB.getEvent(obj.id)
  }
}

const events = {
  name: 'Events',
  type: eventsType,
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return eventDB.getEvents()
  }
}

const updateEvent = {
  name: 'Update Event',
  type: GraphQLString,
  args: {
    user: { type: eventInput }
  },
  async resolve (_, obj, context) {
    const { token, decoded } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin') {
      throw new Error('Not Authorized.')
    }
    try {
      await eventDB.updateEvent(obj)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

const addEvent = {
  name: 'Add Event',
  type: GraphQLString,
  args: {
    user: { type: eventInput }
  },
  async resolve (_, obj, context) {
    const { token, decoded } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin') {
      throw new Error('Not Authorized.')
    }

    try {
      await eventDB.addEvent(obj)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

const deleteEvent = {
  name: 'Delete Event',
  type: GraphQLString,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    console.log(decoded['https://apibolt.zhehaizhang.com/roles'])
    if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin') {
      throw new Error('Not Authorized.')
    }
    try {
      await eventDB.deleteEvent(obj.id)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}
exports.event = event
exports.events = events
exports.updateEvent = updateEvent
exports.addEvent = addEvent
exports.deleteEvent = deleteEvent
