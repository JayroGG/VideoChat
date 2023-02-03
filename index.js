require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')

//Setting the socket with all origins allowed
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())

//Setting routes
const routes = require('./routes')
app.use('/', routes)

//socket conecction
io.on('connection', (socket) => {
  socket.emit('me', socket.id)

  //Handelers 
  socket.on('disconnect', () => {
    socket.broadcast.emit('call ended')
  })

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })

  socket.on('answerCall', (data) => {
    io.to(data.to.emit('callAccepted'), data.signal)
  })
})

//Serving port
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Server Lister on port ${port}`))




