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

const updateEvent = async (event, id) => {
  const updatedEvent = new PS({
    name: 'update-event',
    text: 'UPDATE events SET name=$1, description=$2, start_date=to_timestamp($3), end_date=to_timestamp($4), image_url=$5, zoom_url=$6, bootcamp=$7 WHERE id=$8'
  })

  updatedEvent.values = [
    event.name,
    event.description,
    event.start_date,
    event.end_date,
    event.image_url,
    event.zoom_url,
    event.bootcamp,
    id
  ]

  return db.none(updatedEvent)
    .catch(error => {
      console.log(error)
    })
}

const addEvent = async (event) => {
  const newEvent = new PS({
    name: 'add-event',
    text: 'INSERT INTO events(name, description, start_date, end_date, image_url, zoom_url, bootcamp) VALUES($1, $2, to_timestamp($3), to_timestamp($4), $5, $6, $7)'
  })

  newEvent.values = [
    event.name,
    event.description,
    event.start_date,
    event.end_date,
    event.image_url,
    event.zoom_url,
    event.bootcamp
  ]

  return db.none(newEvent)
    .catch(error => {
      console.log(error)
    })
}

const deleteEvent = async (id) => {
  const event = new PS({
    name: 'delete-event',
    text: 'DELETE FROM events WHERE id=$1'
  })

  event.values = [
    id
  ]

  return db.none(event)
    .catch(error => {
      console.log(error)
    })
}

const getApplications = async () => {
  const applications = new PS({ name: 'get-applications', text: 'SELECT * FROM applications' })

  return db.manyOrNone(applications)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const getApplication = async (id) => {
  const application = new PS({ name: 'get-application', text: 'SELECT * FROM application WHERE id=$1' })
  application.values = [id]
  return db.one(application)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const updateApplication = async (application, id) => {
  const updatedApplication = new PS({
    name: 'update-application',
    text: 'UPDATE applications SET name=$1, description=$2, start_date=to_timestamp($3), end_date=to_timestamp($4), image_url=$5, form_url=$6, bootcamp=$7 WHERE id=$8'
  })

  updatedApplication.values = [
    application.name,
    application.description,
    application.start_date,
    application.end_date,
    application.image_url,
    application.form_url,
    application.bootcamp,
    id
  ]

  return db.none(updatedApplication)
    .catch(error => {
      console.log(error)
    })
}

const addApplication = async (application) => {
  const newApplication = new PS({
    name: 'add-application',
    text: 'INSERT INTO applications(name, description, start_date, end_date, image_url, form_url, bootcamp) VALUES($1, $2, to_timestamp($3), to_timestamp($4), $5, $6, $7)'
  })

  newApplication.values = [
    application.name,
    application.description,
    application.start_date,
    application.end_date,
    application.image_url,
    application.form_url,
    application.bootcamp
  ]

  return db.none(newApplication)
    .catch(error => {
      console.log(error)
    })
}

const deleteApplication = async (id) => {
  const application = new PS({
    name: 'delete-application',
    text: 'DELETE FROM applications WHERE id=$1'
  })

  application.values = [
    id
  ]

  return db.none(application)
    .catch(error => {
      console.log(error)
    })
}

const getBootcamps = async () => {
  const bootcamps = new PS({ name: 'get-bootcamps', text: 'SELECT * FROM bootcamps' })

  return db.manyOrNone(bootcamps)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const getBootcamp = async (id) => {
  const bootcamp = new PS({ name: 'get-bootcamp', text: 'SELECT * FROM bootcamp WHERE id=$1' })
  bootcamp.values = [id]
  return db.one(bootcamp)
    .then(res => {
      return res
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

const updateBootcamp = async (bootcamp, id) => {
  const updatedBootcamp = new PS({
    name: 'update-bootcamp',
    text: 'UPDATE bootcamps SET name=$1, description=$2, start_date=to_timestamp($3), end_date=to_timestamp($4), image_url=$5, default_zoom_url=$6 WHERE id=$7'
  })

  updatedBootcamp.values = [
    bootcamp.name,
    bootcamp.description,
    bootcamp.start_date,
    bootcamp.end_date,
    bootcamp.image_url,
    bootcamp.default_zoom_url,
    id
  ]

  return db.none(updatedBootcamp)
    .catch(error => {
      console.log(error)
    })
}

const addBootcamp = async (bootcamp) => {
  const newBootcamp = new PS({
    name: 'add-bootcamp',
    text: 'INSERT INTO bootcamps(name, description, start_date, end_date, image_url, default_zoom_url) VALUES($1, $2, to_timestamp($3), to_timestamp($4), $5, $6)'
  })

  newBootcamp.values = [
    bootcamp.name,
    bootcamp.description,
    bootcamp.start_date,
    bootcamp.end_date,
    bootcamp.image_url,
    bootcamp.default_zoom_url
  ]

  return db.none(newBootcamp)
    .catch(error => {
      console.log(error)
    })
}

const deleteBootcamp = async (id) => {
  const bootcamp = new PS({
    name: 'delete-bootcamp',
    text: 'DELETE FROM bootcamps WHERE id=$1'
  })

  bootcamp.values = [
    id
  ]

  return db.none(bootcamp)
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
  deleteEvent,
  addEvent
}

exports.applicationDB = {
  getApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  addApplication
}

exports.bootcampDB = {
  getBootcamp,
  getBootcamps,
  updateBootcamp,
  deleteBootcamp,
  addBootcamp
}
