const graphql = require('graphql')

const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { eventType, eventsType, eventInput } = require('../types/event.types')

const { eventDB } = require('../services/database')

const { isRole } = require('../services/auth.service')

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
    event: { type: eventInput },
    id: { type: GraphQLInt }
  },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    if (!isRole(decoded, 'Admin')) {
      throw new Error('Not Authorized.')
    }
    try {
      await eventDB.updateEvent(obj.event, obj.id)
      return 'success'
    } catch (e) {
      return e.message
    }
  }
}

const addEvent = {
  name: 'Add Event',
  type: GraphQLString,
  args: {
    event: { type: eventInput }
  },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    if (!isRole(decoded, 'Admin')) {
      throw new Error('Not Authorized.')
    }

    try {
      await eventDB.addEvent(obj.event)
      return 'success'
    } catch (err) {
      return err.message
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
    if (!isRole(decoded, 'Admin')) {
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
