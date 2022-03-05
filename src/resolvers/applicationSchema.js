const graphql = require('graphql')

const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { applicationType, applicationsType, applicationInput } = require('../types/application.types')

const { applicationDB } = require('../services/database')

const { isRole, getEmail } = require('../services/auth.service')

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
    application: { type: applicationInput },
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
      await applicationDB.updateApplication(obj.application, obj.id)
      return 'success'
    } catch (e) {
      return e.message
    }
  }
}

const addApplication = {
  name: 'Add Application',
  type: GraphQLString,
  args: {
    application: { type: applicationInput }
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

    const userEmail = getEmail(decoded)
    try {
      await applicationDB.addApplication(obj.application, userEmail)
      return 'success'
    } catch (e) {
      return e.message
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
    if (!isRole(decoded, 'Admin')) {
      throw new Error('Not Authorized.')
    }
    try {
      await applicationDB.deleteApplication(obj.id)
      return 'success'
    } catch (e) {
      return e.message
    }
  }
}

exports.application = application
exports.applications = applications
exports.updateApplication = updateApplication
exports.addApplication = addApplication
exports.deleteApplication = deleteApplication
