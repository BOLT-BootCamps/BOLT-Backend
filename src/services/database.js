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

const getEvents = async () => {
  const events = new PS({ name: 'get-events', text: 'SELECT * FROM events' })

  return db.manyOrNone(events)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const getEvent = async (id) => {
  const event = new PS({ name: 'get-event', text: 'SELECT * FROM event WHERE id=$1' })
  event.values = [id]
  return db.one(event)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const updateEvent = async (event) => {
  const updatedEvent = new PS({ name: 'update-event', text: 'UPDATE events SET name=$1, description=$2, date=$3 WHERE id=$4' })
  updatedEvent.values = [event.name, event.description, event.date, event.id]
  return db.none(updatedEvent)
    .catch(error => {
      console.log(error)
    })
}

const addEvent = async (event) => {
  const newEvent = new PS({ name: 'add-event', text: 'INSERT INTO events(name, description, date) VALUES($1, $2, $3)' })
  newEvent.values = [event.name, event.description, event.date]
  return db.none(newEvent)
    .catch(error => {
      console.log(error)
    })
}

exports.userDB = {
  getUsers,
  getUser,
  userExists
}

exports.eventDB = {
  getEvent,
  getEvents,
  updateEvent,
  addEvent
}

