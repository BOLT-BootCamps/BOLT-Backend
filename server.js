require('dotenv').config()

const http = require('http')

const app = require('./src/app')

const port = process.env.PORT

const server = http.createServer(app)

console.log(port)
console.log('This is the API Identifier', process.env.API_IDENTIFIER)

server.listen(port)
