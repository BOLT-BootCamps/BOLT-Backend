require('dotenv').config()

const http = require('http')

const app = require('./src/app')

const port = process.env.PORT

const server = http.createServer(app)

console.log(port)

server.listen(port)
