const graphql = require('graphql')

const { GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { zoomType, zoomsType } = require('../types/zoom.types')

const { getAllZoomDetails, getZoomDetails } = require('../services/zoom.service')

const { isRole } = require('../services/auth.service')

const zoom = {
  name: 'zoom',
  type: zoomType,
  args: { meeting_id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    if (!isRole(decoded, 'Admin') && decoded.email !== obj.email) {
      throw new Error('Not Authorized.')
    } else {
      return getZoomDetails(obj.meeting_id)
    }
  }
}

const zooms = {
  name: 'zooms',
  type: zoomsType,
  // args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    } else if (decoded) {
      if (!isRole(decoded, 'Admin')) {
        throw new Error('Not Authorized.')
      } else {
        return getAllZoomDetails()
      }
    }

    return null
  }
}

exports.zoom = zoom
exports.zooms = zooms
