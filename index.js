require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const { route } = require('./routes')

//Setting the socket with all origins allowed
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'] 
    }
})

app.use(cors())

 //Setting routes
const routes = require('./routes/index')
app.use('/', routes)

//Setting port
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Server Lister on port ${port}`))




