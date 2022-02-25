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
    const result = await sql.query(`select * from [dbo].[Users] WHERE sEmail = ${email}`)
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
    const result = await sql.query(`SELECT COUNT(*) as 'exists' from [dbo].[Users] where sEmail=${email}`)
    const user = result.recordset[0]
    return user.exists
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const addUser = async (user) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query(`INSERT INTO [dbo].[Users] (
    sFirstName,
    sLastName,
    sEmail,
    )
    VALUES (
    ${user.sFirstName}, 
    ${user.sLastName}, 
    ${user.sEmail}, 
    )
    `)
  } catch (err) {
    console.log(err.message)
  }
}
const getEvents = async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query('select * from [dbo].[Events]')
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
    const result = await sql.query(`select * from [dbo].[Events] WHERE pkiEventID = ${id}`)
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
    await sql.query(`UPDATE [dbo].[Events] SET 
    sEventName=${event.sEventName}, 
    sDescription=${event.sDescription}, 
    dtStartDate=${event.dtStartDate}, 
    dtEndDate=${event.dtEndDate}, 
    sImageUrl=${event.sImageUrl}, 
    sZoomUrl=${event.sZoomUrl}, 
    fkiBootcampID=${event.fkiBootcampID}
    WHERE pkiEventID = ${id}
    `)
  } catch (err) {
    console.log(err.message)
  }
}

const addEvent = async (event) => {
  await sql.connect(sqlConfig)
  console.log(event)
  await sql.query`INSERT INTO [dbo].[Events] (
    sEventName,
    sDescription,
    dtStartDate,
    dtEndDate,
    sImageUrl,
    sZoomUrl,
    fkiBootcampID
    )
    VALUES (
    ${event.sEventName}, 
    ${event.sDescription}, 
    CONVERT(DATETIME,${event.dtStartDate}, 120), 
    CONVERT(DATETIME,${event.dtEndDate}, 120), 
    ${event.sImageUrl}, 
    ${event.sZoomUrl},
    ${event.fkiBootcampID})`
}

const deleteEvent = async (id) => {
  try {
    await sql.connect(sqlConfig)
    await sql.query(`DELETE FROM [dbo].[Events] WHERE pkiEventID = ${id}`)
  } catch (err) {
    console.log(err.message)
  }
}

const getApplications = async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query('select * from [dbo].[Applications]')
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
    const result = await sql.query(`select * from [dbo].[Applications] WHERE pkiApplicationID = ${id}`)
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
    await sql.query(`UPDATE [dbo].[Applications] SET 
    sApplicationName=${application.sApplicationName}, 
    sDescription=${application.sDescription}, 
    dtStartDate=${application.dtStartDate}, 
    dtEndDate=${application.dtEndDate}, 
    sImageUrl=${application.sImageUrl}, 
    sFormUrl=${application.sFormUrl}, 
    fkiBootcampID=${application.fkiBootcampID}
    WHERE pkiApplicationID = ${id}
    `)
  } catch (err) {
    console.log(err.message)
  }
}

const addApplication = async (application) => {
  try {
    await sql.connection(sqlConfig)
    await sql.query(`
    INSERT INTO [dbo].[Applications](
      sApplicationName,
      sDescription,
      dtStartDate,
      dtEndDate,
      sImageUrl,
      sFormUrl,
      fkiBootcampID)
    VALUES(
      ${application.sApplicationName},
      ${application.sDescription},
      ${application.dtStartDate},
      ${application.dtEndDate},
      ${application.sImageUrl},
      ${application.sFormUrl},
      ${application.fkiBootcampID})`
    )
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const deleteApplication = async (id) => {
  try {
    await sql.connection(sqlConfig)
    await sql.query(`DELETE FROM [dbo].[Applications] WHERE pkiApplicatiID=${id}`)
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const getBootcamps = async () => {
  try {
    await sql.connection(sqlConfig)
    const result = await sql.query('SELECT * FROM [dbo].[Bootcamps]')
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
    const result = await sql.query(`SELECT * FROM [dbo].[Bootcamps] WHERE pkiBootcampID=${id}`)
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
    await sql.query(`
    UPDATE [dbo].[Bootcamps] SET 
      sBootcampName=${bootcamp.sBootcampName}, 
      sDescription=${bootcamp.sDescription},
      dtStartDate=${bootcamp.dtStartDate},
      dtEndDate=${bootcamp.dtEndDate},
      sImageUrl=${bootcamp.sImageUrl},
      sDefaultZoomUrl=${bootcamp.sDefaultZoomUrl}
    WHERE 
      pkiBootcampID=${id}`)
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

const addBootcamp = async (bootcamp) => {
  try {
    await sql.connection(sqlConfig)
    await sql.query(`
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
    await sql.query(`DELETE FROM [dbo].[Bootcamps] WHERE pkiBootcampsID=${id}`)
  } catch (err) {
    console.log(err.message)
    return err.message
  }
}

exports.userDB = {
  getUsers,
  getUser,
  userExists,
  addUser
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
