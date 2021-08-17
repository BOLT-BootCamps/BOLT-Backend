const graphql = require('graphql')

const { GraphQLString } = graphql

const checkToken = require('../services/tokenAuth')

// const { loginType } = require('../types/auth')

const llist = []

const loginSchema = {
  name: 'Login',
  type: GraphQLString,
  args: { login: { type: GraphQLString }, password: { type: GraphQLString } },
  resolve (_, obj, context) {
    console.log('hello')
    // console.log(context.token)
    console.log(context().token)
    if (llist.includes(obj)) {
      return 'token'
    }
    return 'null'
  }
}

const registerSchema = {
  name: 'Register',
  type: GraphQLString,
  args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
  async resolve (_, obj, context) {
    const { token } = context()
    const { error } = await checkToken(token)
    if (error) {
      throw new Error(error)
    }

    console.log(token)
    llist.push({ email: obj.email, password: obj.password })
    return 'token'
  }
}

exports.loginSchema = loginSchema
exports.registerSchema = registerSchema
