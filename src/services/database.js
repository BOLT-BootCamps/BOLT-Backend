const db = require('../database/pgAdaptor').db
const { PreparedStatement: PS } = require('pg-promise')

const getUsers = async () => {
  const users = new PS({ name: 'get-users', text: 'SELECT * FROM users' })

  return db.manyOrNone(users)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const getUser = async (email) => {
  const user = new PS({ name: 'get-users', text: 'SELECT * FROM users WHERE email=$1' })
  user.values = [email]
  return db.one(user)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const userExists = async (email) => {
  const user = new PS({ name: 'Check if user exists', text: 'SELECT EXISTS(SELECT email from users where email=$1)' })
  user.values = [email]
  return db.one(user)
    .then(res => res.exists)
    .catch(error => {
      console.log(error)
      return error
    })
}

exports.getUsers = getUsers
exports.getUser = getUser
exports.userExists = userExists
