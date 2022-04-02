const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLInt } = graphql

const zoomLogType = new GraphQLObjectType({
  name: 'zoomlog',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    user_email: { type: GraphQLString },
    join_time: { type: GraphQLString },
    leave_time: { type: GraphQLString },
    duration: { type: GraphQLInt },
    status: { type: GraphQLString }
  }
})

const zoomLogsType = new GraphQLList(zoomLogType)

const zoomType = new GraphQLObjectType({
  name: 'zoom',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLString },
    start_time: { type: GraphQLString },
    topic: { type: GraphQLString },
    duration: { type: GraphQLInt },
    total_minutes: { type: GraphQLString },
    participants_count: { type: GraphQLString },
    type: { type: GraphQLInt },
    logs: { type: zoomLogsType }
  }
})

const zoomInput = new GraphQLInputObjectType({
  name: 'zoomInput',
  type: 'Input',
  fields: {
    meetingId: { type: GraphQLString }
  }
})

const zoomsType = new GraphQLList(zoomType)

exports.zoomType = zoomType
exports.zoomInput = zoomInput
exports.zoomsType = zoomsType
