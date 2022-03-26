const graphql = require('graphql')

const { GraphQLInt, GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { bootcampType, bootcampsType, bootcampInput } = require('../types/bootcamp.types')

const { bootcampDB } = require('../services/database')

const { isRole } = require('../services/auth.service')

const bootcamp = {
  name: 'Bootcamp',
  type: bootcampType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return bootcampDB.getBootcamp(obj.id)
  }
}

const bootcamps = {
  name: 'Bootcamps',
  type: bootcampsType,
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }
    return bootcampDB.getBootcamps()
  }
}

const updateBootcamp = {
  name: 'Update Bootcamp',
  type: GraphQLString,
  args: {
    bootcamp: { type: bootcampInput },
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
      await bootcampDB.updateBootcamp(obj.bootcamp, obj.id)
      return 'success'
    } catch (e) {
      return e.message
    }
  }
}

const addBootcamp = {
  name: 'Add Bootcamp',
  type: GraphQLString,
  args: {
    bootcamp: { type: bootcampInput }
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
      await bootcampDB.addBootcamp(obj.bootcamp)
      return 'success'
    } catch (e) {
      return e.message
    }
  }
}

const deleteBootcamp = {
  name: 'Delete Bootcamp',
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
      await bootcampDB.deleteBootcamp(obj.id)
      return 'success'
    } catch (err) {
      return err.message
    }
  }
}

exports.bootcamp = bootcamp
exports.bootcamps = bootcamps
exports.updateBootcamp = updateBootcamp
exports.addBootcamp = addBootcamp
exports.deleteBootcamp = deleteBootcamp
