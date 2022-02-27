const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = graphql

const GraphQLDate = require('graphql-date')

const applicationType = new GraphQLObjectType({
  name: 'application',
  type: 'Mutation',
  fields: {
    pkiApplicationID: { type: GraphQLInt },
    sApplicationName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLDate },
    dtEndDate: { type: GraphQLDate },
    sImageUrl: { type: GraphQLString },
    sFormUrl: { type: GraphQLString },
    fkiBootcampID: { type: GraphQLInt },
    iNumApplicants: { type: GraphQLInt }
  }
})

const applicationInput = new GraphQLInputObjectType({
  name: 'applicationInput',
  type: 'Input',
  fields: {
    sApplicationName: { type: GraphQLNonNull(GraphQLString) },
    sDescription: { type: GraphQLNonNull(GraphQLString) },
    dtStartDate: { type: GraphQLNonNull(GraphQLString) },
    dtEndDate: { type: GraphQLNonNull(GraphQLString) },
    sImageUrl: { type: GraphQLNonNull(GraphQLString) },
    sFormUrl: { type: GraphQLNonNull(GraphQLString) },
    fkiBootcampID: { type: GraphQLNonNull(GraphQLInt) }
  }
})

const applicationsType = new GraphQLList(applicationType)

exports.applicationType = applicationType
exports.applicationInput = applicationInput
exports.applicationsType = applicationsType
