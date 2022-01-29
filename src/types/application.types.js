const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql
const GraphQLDate = require('graphql-date')

const applicationType = new GraphQLObjectType({
  name: 'application',
  type: 'Mutation',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLDate },
    end_date: { type: GraphQLDate },
    image_url: { type: GraphQLString },
    form_url: { type: GraphQLString },
    bootcamp: { type: GraphQLInt }
  }
})

const applicationInput = new GraphQLInputObjectType({
  name: 'applicationInput',
  type: 'Input',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    start_date: { type: GraphQLInt },
    end_date: { type: GraphQLInt },
    image_url: { type: GraphQLString },
    form_url: { type: GraphQLString },
    bootcamp: { type: GraphQLInt }
  }
})

const applicationsType = new GraphQLList(applicationType)

exports.applicationType = applicationType
exports.applicationInput = applicationInput
exports.applicationsType = applicationsType
