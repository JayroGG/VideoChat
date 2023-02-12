require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const socketMiddleware = require('./controllers/socket')

//Allowing all origins 
app.use(cors())

//Setting routes
const routes = require('./routes')
app.use('/', routes)

//Attaching the server to the socket 
socketMiddleware(server)

//Serving port
const port = process.env.PORT || 4000
try {
  server.listen(port, () => console.log(`Server Lister on port ${port}`))
} catch (error) {
  console.log(error)
}





