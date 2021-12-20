const graphql = require('graphql')

const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { applicationType, applicationsType, applicationInput } = require('../types/application.types')

const { applicationDB } = require('../services/database')

const application = {
  name: 'Application',
  type: applicationType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return applicationDB.getApplication(obj.id)
  }
}

const applications = {
  name: 'Applications',
  type: applicationsType,
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return applicationDB.getApplications()
  }
}

const updateApplication = {
  name: 'Update Application',
  type: GraphQLString,
  args: {
    event: { type: applicationInput }
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
      await applicationDB.updateApplication(obj)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

const addApplication = {
  name: 'Add Application',
  type: GraphQLString,
  args: {
    event: { type: applicationInput }
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
      await applicationDB.addApplication(obj)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

const deleteApplication = {
  name: 'Delete Application',
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
      await applicationDB.deleteApplication(obj.id)
      return 'success'
    } catch {
      return 'failure'
    }
  }
}

exports.application = application
exports.applications = applications
exports.updateApplication = updateApplication
exports.addApplication = addApplication
exports.deleteApplication = deleteApplication