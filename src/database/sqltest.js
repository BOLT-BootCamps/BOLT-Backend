require('dotenv').config()

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

const query = async () => {
  try {
  // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from dbo.Bootcamps`
    console.dir(result)
  } catch (err) {
  // ... error checks
  }
}

query()
