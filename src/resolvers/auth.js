const graphql = require('graphql')

const { GraphQLString } = graphql

// const { loginType } = require('../types/auth')

const llist = []

const loginSchema = {
  name: 'Login',
  type: GraphQLString,
  args: { login: { type: GraphQLString }, password: { type: GraphQLString } },
  resolve (_, obj) {
    console.log('hello')
    console.log(obj)
    console.log(obj.login)
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
  resolve (_, obj) {
    llist.push({ email: obj.email, password: obj.password })
    return 'token'
  }
}

exports.loginSchema = loginSchema
exports.registerSchema = registerSchema
