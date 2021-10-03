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
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    console.log(decoded['https://apibolt.zhehaizhang.com/roles'])
    if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin' && decoded.email !== obj.email) {
      throw new Error('Not Authorized.')
    } else {
      return eventDB.getEvent(obj.id);
    }
    return null
  }
}

const events = {
  name: 'Events',
  type: eventsType,
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
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
    try {
      await eventDB.updateEvent(obj);
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

exports.event = event
exports.events = events
exports.updateEvent = updateEvent
