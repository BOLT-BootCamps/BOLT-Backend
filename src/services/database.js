const sql = require('mssql')
const sqlConfig = {
  user: process.env.AZURE_USERNAME,
  password: process.env.AZURE_PASSWORD,
  database: process.env.AZURE_DATABASE,
  server: process.env.AZURE_SERVER_URL,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: process.env.LEVEL === 'development' // change to true for local dev / self-signed certs
  }
}

const getUsers = async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Users]`
    const users = result.recordset
    return users
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getUser = async (email) => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Users] WHERE sEmail = ${email}`
    const user = result.recordset[0]
    return user
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const userExists = async (email) => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`SELECT COUNT(*) as 'exists' from [dbo].[Users] where sEmail=${email}`
    const user = result.recordset[0]
    return user.exists
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getEvents = async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Events]`
    const events = result.recordset
    return events
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getEvent = async (id) => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Events] WHERE pkiEventID = ${id}`
    const event = result.recordset[0]
    return event
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const updateEvent = async (event, id) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query`UPDATE [dbo].[Events] SET 
    sEventName=${event.sEventName}, 
    sDescription=${event.sDescription}, 
    dtStartDate=${event.dtStartDate}, 
    dtEndDate=${event.dtEndDate}, 
    sImageUrl=${event.sImageUrl}, 
    sZoomUrl=${event.sZoomUrl}, 
    fkiBootcampID=${event.fkiBootcampID}
    WHERE pkiEventID = ${id}
    `
  } catch (err) {
    console.log(err.message)
  }
}

const addEvent = async (event) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query`INSERT INTO [dbo].[Events] (
    sEventName
    sDescription,
    dtStartDate,
    dtEndDate,
    sImageUrl,
    sZoomUrl
    )
    VALUES (
    ${event.sEventName}, 
    ${event.sDescription}, 
    ${event.dtStartDate}, 
    ${event.dtEndDate}, 
    ${event.sImageUrl}, 
    ${event.sZoomUrl}
    )
    `
  } catch (err) {
    console.log(err.message)
  }
}

const deleteEvent = async (id) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query`DELETE FROM [dbo].[Events] WHERE pkiEventID = ${id}
    `
  } catch (err) {
    console.log(err.message)
  }
}

const getApplications = async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Applications]`
    const applications = result.recordset
    return applications
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getApplication = async (id) => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from [dbo].[Applications] WHERE pkiApplicationID = ${id}`
    const application = result.recordset[0]
    return application
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const updateApplication = async (application, id) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query`UPDATE [dbo].[Events] SET 
    sEventName=${application.sEventName}, 
    sDescription=${event.sDescription}, 
    dtStartDate=${event.dtStartDate}, 
    dtEndDate=${event.dtEndDate}, 
    sImageUrl=${event.sImageUrl}, 
    sZoomUrl=${event.sZoomUrl}, 
    fkiBootcampID=${event.fkiBootcampID}
    WHERE pkiEventID = ${id}
    `
  } catch (err) {
    console.log(err.message)
  }

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
