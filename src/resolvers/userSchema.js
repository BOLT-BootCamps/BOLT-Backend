const graphql = require('graphql')

const { GraphQLString, GraphQLNonNull } = graphql

const checkToken = require('../services/tokenAuth')

const { userType, usersType } = require('../types/user')

const { getUsers, getUser } = require('../services/database')

const user = {
  name: 'User',
  type: userType,
  args: { email: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve (_, obj, context) {
    return getUser(obj.email)
    /*
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    } else if (decoded) {
      console.log(decoded['https://apibolt.zhehaizhang.com/roles'])
      if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin' && decoded.email !== obj.email) {
        throw new Error('Not Authorized.')
      } else {
        return getUser(decoded.email)
      }
    }

    return null
    */
  }
}

const users = {
  name: 'Users',
  type: usersType,
  // args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error, decoded } = await checkToken(token)
    if (error) {
      throw new Error(error)
    } else if (decoded) {
      console.log(decoded['https://apibolt.zhehaizhang.com/roles'])
      if (decoded['https://apibolt.zhehaizhang.com/roles'] !== 'Admin') {
        throw new Error('Not Authorized.')
      } else {
        return getUsers()
      }
    }

    return null
  }
}

const updateUser = {
  name: 'Update User',
  type: GraphQLString,
  args: {
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve (_, obj, context) {
    return 'success'
  }
}

exports.user = user
exports.users = users
exports.updateUser = updateUser
