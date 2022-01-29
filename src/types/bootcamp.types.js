const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql
const GraphQLDate = require('graphql-date')

const bootcampType = new GraphQLObjectType({
  name: 'bootcamp',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLDate },
    end_date: { type: GraphQLDate },
    image_url: { type: GraphQLString },
    default_zoom_url: { type: GraphQLString }
  }
})

const bootcampInput = new GraphQLInputObjectType({
  name: 'bootcampInput',
  type: 'Input',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLInt },
    end_date: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    default_zoom_url: { type: GraphQLString }
  }
})

const bootcampsType = new GraphQLList(bootcampType)

exports.bootcampType = bootcampType
exports.bootcampInput = bootcampInput
exports.bootcampsType = bootcampsType
