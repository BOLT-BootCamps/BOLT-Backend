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
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from [dbo].[Users]`
  const users = result.recordset
  return users
}

const getUser = async (email) => {
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from [dbo].[Users] WHERE sEmail = ${email}`
  const user = result.recordset[0]
  return user
}

const userExists = async (email) => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT COUNT(*) as 'exists' from [dbo].[Users] where sEmail=${email}`
  const user = result.recordset[0]
  return user.exists
}

const addUser = async (user) => {
  await sql.connect(sqlConfig)
  await sql.query`INSERT INTO [dbo].[Users] (
    sFirstName,
    sLastName,
    sEmail,
    sSchool,
    sProgram,
    sYearOfStudy
    )
    VALUES (
    ${user.sFirstName}, 
    ${user.sLastName}, 
    ${user.sEmail},
    ${user.sSchool},
    ${user.sProgram},
    ${user.sYearOfStudy}
    )
    `
}
const getEvents = async () => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT 
      e.pkiEventID,
      e.sEventName,
      e.sDescription,
      e.dtStartDate,
      e.dtEndDate,
      e.sImageUrl,
      e.sZoomUrl,
      e.fkiBootcampID,
      b.sBootcampName 
      FROM [dbo].[Events] e LEFT JOIN [dbo].[Bootcamps] b 
      ON e.fkiBootcampID = b.pkiBootcampID;`
  const events = result.recordset
  return events
}

const getEvent = async (id) => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT
      e.pkiEventID,
      e.sEventName,
      e.sDescription,
      e.dtStartDate,
      e.dtEndDate,
      e.sImageUrl,
      e.sZoomUrl,
      e.fkiBootcampID,
      b.sBootcampName 
      FROM [dbo].[Events] e LEFT JOIN [dbo].[Bootcamps] b
      ON e.fkiBootcampID = b.pkiBootcampID WHERE pkiEventID = ${id}`
  const event = result.recordset[0]
  return event
}

const updateEvent = async (event, id) => {
  await sql.connect(sqlConfig)
  await sql.query`UPDATE [dbo].[Events] SET 
    sEventName=${event.sEventName}, 
    sDescription=${event.sDescription}, 
    dtStartDate=CONVERT(DATETIME, ${event.dtStartDate}, 127), 
    dtEndDate=CONVERT(DATETIME, ${event.dtEndDate}, 127), 
    sImageUrl=${event.sImageUrl}, 
    sZoomUrl=${event.sZoomUrl}, 
    fkiBootcampID=${event.fkiBootcampID}
    WHERE pkiEventID = ${id}
    `
}

// datetimes
// https://www.mssqltips.com/sqlservertip/1145/date-and-time-conversions-using-sql-server/#:~:text=How%20to%20get%20different%20date%20formats%20in%20SQL,%20%2030%2F12%2F06%20%2026%20more%20rows%20

const addEvent = async (event) => {
  await sql.connect(sqlConfig)
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
    CONVERT(DATETIME,${event.dtStartDate}, 127), 
    CONVERT(DATETIME,${event.dtEndDate}, 127), 
    ${event.sImageUrl}, 
    ${event.sZoomUrl},
    ${event.fkiBootcampID})`
}

const deleteEvent = async (id) => {
  await sql.connect(sqlConfig)
  await sql.query`DELETE FROM [dbo].[Events] WHERE pkiEventID = ${id}`
}

const getApplications = async () => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT
      a.pkiApplicationID,
      a.sApplicationName,
      a.sDescription,
      a.dtStartDate,
      a.dtEndDate,
      a.sImageUrl,
      a.sFormUrl,
      a.fkiBootcampID,
      b.sBootcampName,
      a.iNumApplicants
      FROM [dbo].[Applications] a LEFT JOIN [dbo].[Bootcamps] b
      ON a.fkiBootcampID = b.pkiBootcampID`
  const applications = result.recordset
  return applications
}

const getApplication = async (id) => {
  await sql.connect(sqlConfig)
  const result = await sql.query`
      SELECT
      a.pkiApplicationID,
      a.sApplicationName,
      a.sDescription,
      a.dtStartDate,
      a.dtEndDate,
      a.sImageUrl,
      a.sFormUrl,
      a.fkiBootcampID,
      b.sBootcampName,
      a.iNumApplicants
      FROM [dbo].[Applications] a LEFT JOIN [dbo].[Bootcamps] b
      ON a.pkiApplicationID = b.pkiBootcampID
      WHERE a.pkiApplicationID = ${id}`
  const application = result.recordset[0]
  return application
}

const updateApplication = async (application, id) => {
  await sql.connect(sqlConfig)
  await sql.query`UPDATE [dbo].[Applications] SET 
    sApplicationName=${application.sApplicationName}, 
    sDescription=${application.sDescription}, 
    dtStartDate=CONVERT(DATETIME, ${application.dtStartDate}, 127), 
    dtEndDate=CONVERT(DATETIME, ${application.dtEndDate}, 127), 
    sImageUrl=${application.sImageUrl}, 
    sFormUrl=${application.sFormUrl}, 
    fkiBootcampID=${application.fkiBootcampID}
    WHERE pkiApplicationID = ${id}
    `
}

const addApplication = async (application, email) => {
  await sql.connect(sqlConfig)
  await sql.query`
    DECLARE @count INT
    SELECT @count = COUNT(pkiUserID) FROM [dbo].[Users] WHERE sEmail = ${email}
    IF @count < 1
    BEGIN
      RAISERROR (15600,-1,-1, 'addApplications');
    END
    INSERT INTO [dbo].[Applications](
      sApplicationName,
      sDescription,
      dtStartDate,
      dtEndDate,
      sImageUrl,
      sFormUrl,
      fkiBootcampID,
      fkiUserID)
    SELECT
      ${application.sApplicationName},
      ${application.sDescription},
      CONVERT(DATETIME, ${application.dtStartDate}, 127),
      CONVERT(DATETIME, ${application.dtEndDate}, 127),
      ${application.sImageUrl},
      ${application.sFormUrl},
      ${application.fkiBootcampID},
      users.pkiUserID
      FROM [dbo].[Users] users 
      WHERE users.sEmail = ${email}
      `
}

const deleteApplication = async (id) => {
  await sql.connect(sqlConfig)
  await sql.query`DELETE FROM [dbo].[Applications] WHERE pkiApplicationID=${id}`
}

const getBootcamps = async () => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT * FROM [dbo].[Bootcamps]`
  const bootcamps = result.recordset
  return bootcamps
}

const getBootcamp = async (id) => {
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT * FROM [dbo].[Bootcamps] WHERE pkiBootcampID=${id}`
  const bootcamp = result.recordset[0]
  return bootcamp
}

const updateBootcamp = async (bootcamp, id) => {
  await sql.connect(sqlConfig)
  await sql.query`
    UPDATE [dbo].[Bootcamps] SET 
      sBootcampName=${bootcamp.sBootcampName}, 
      sDescription=${bootcamp.sDescription},
      dtStartDate=CONVERT(DATETIME, ${bootcamp.dtStartDate} 127),
      dtEndDate=CONVERT(DATETIME, ${bootcamp.dtEndDate}, 127),
      sImageUrl=${bootcamp.sImageUrl},
      sDefaultZoomUrl=${bootcamp.sDefaultZoomUrl}
    WHERE 
      pkiBootcampID=${id}`
}

const addBootcamp = async (bootcamp) => {
  await sql.connect(sqlConfig)
  await sql.query`
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
      CONVERT(DATETIME, ${bootcamp.dtStartDate}, 127),
      CONVERT(DATETIME, ${bootcamp.dtEndDate}, 127),
      ${bootcamp.sImageUrl},
      ${bootcamp.sDefaultZoomUrl})`
}

const deleteBootcamp = async (id) => {
  await sql.connect(sqlConfig)
  await sql.query`DELETE FROM [dbo].[Bootcamps] WHERE pkiBootcampsID=${id}`
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
