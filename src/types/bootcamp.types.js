const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql
const GraphQLDate = require('graphql-date')

const bootcampType = new GraphQLObjectType({
  name: 'bootcamp',
  type: 'Mutation',
  fields: {
    pkiBootcampID: { type: GraphQLInt },
    sBootcampName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLDate },
    dtEndDate: { type: GraphQLDate },
    sImageUrl: { type: GraphQLString },
    sDefaultZoomUrl: { type: GraphQLString }
  }
})

const bootcampInput = new GraphQLInputObjectType({
  name: 'bootcampInput',
  type: 'Input',
  fields: {
    sBootcampName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLInt },
    dtEndDate: { type: GraphQLInt },
    sImageUrl: { type: GraphQLString },
    default_zoom_url: { type: GraphQLString }
  }
})

const bootcampsType = new GraphQLList(bootcampType)

exports.bootcampType = bootcampType
exports.bootcampInput = bootcampInput
exports.bootcampsType = bootcampsType
