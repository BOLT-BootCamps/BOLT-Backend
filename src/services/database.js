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
  try {
    await sql.connection(sqlConfig)
    const result = await sql.query(`SELECT * FROM bootcamp`)
    const bootcamp = result.resultset[0]
    return bootcamp
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getBootcamp = async (id) => {
  try {
    await sql.connection(sqlConfig)
    const result = await sql.query(`SELECT * FROM bootcamp WHERE pkiBootcampID=${id}`)
    const bootcamp = result.resultset[0]
    return bootcamp
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const updateBootcamp = async (bootcamp, id) => {
  try {
    await sql.connection(sqlConfig)
    const result = `
    UPDATE bootcamps SET 
      sBootcampName=${bootcamp.sBootcampName}, 
      sDescription=${bootcamp.sDescription},
      dtStartDate=${bootcamp.dtStartDate},
      dtEndDate=${bootcamp.dtEndDate},
      sImageUrl=${bootcamp.sImageUrl},
      sDefaultZoomUrl=${bootcamp.sDefaultZoomUrl}
    WHERE 
      pkiBootcampID=${id}`
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const addBootcamp = async (bootcamp) => {
  try {
    await sql.connection(sqlConfig)
    const result = await sql.query(`
    INSERT INTO 
    [dbo].[Bootcamps](
      sBootcampName,
      sDescription,
      dtStartDate,
      dtEndDate,
      sImageUrl,
      sDefaultZoomUrl) 
    VALUES(
      ${bootcamp.sBootcampName},
      ${bootcamp.sDescription},
      ${bootcamp.dtStartDate},
      ${bootcamp.dtEndDate},
      ${bootcamp.sImageUrl},
      ${bootcamp.sDefaultZoomUrl})`
      )
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const deleteBootcamp = async (id) => {
  try {
    await sql.connection(sqlConfig)
    const result = await sql.query(`DELETE FROM [dbo].[Bootcamps] WHERE pkiBootcampsID=${id}`)
  } catch (err) {
    console.log(err.message)
    return err.message
  }
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
