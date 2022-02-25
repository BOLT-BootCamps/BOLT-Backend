const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType } = graphql

const applicationType = new GraphQLObjectType({
  name: 'application',
  type: 'Mutation',
  fields: {
    pkiApplicationID: { type: GraphQLInt },
    sApplicationName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLString },
    dtEndDate: { type: GraphQLString },
    sImageUrl: { type: GraphQLString },
    sFormUrl: { type: GraphQLString },
    fkiBootcampID: { type: GraphQLInt }
  }
})

const applicationInput = new GraphQLInputObjectType({
  name: 'applicationInput',
  type: 'Input',
  fields: {
    sApplicationName: { type: GraphQLString },
    sDescription: { type: GraphQLString },
    dtStartDate: { type: GraphQLString },
    dtEndDate: { type: GraphQLString },
    sImageUrl: { type: GraphQLString },
    sFormUrl: { type: GraphQLString },
    sBootcamp: { type: GraphQLInt }
  }
})

const applicationsType = new GraphQLList(applicationType)

exports.applicationType = applicationType
exports.applicationInput = applicationInput
exports.applicationsType = applicationsType
