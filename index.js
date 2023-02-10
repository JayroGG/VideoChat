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
  try {
    socket.emit('me', socket.id)
  } catch (error) {
    socket.emit(error)
  }


  //Handlers 
  socket.on('disconnect', () => {
    try {
      socket.broadcast.emit('callEnded')
    } catch (error) {
      socket.emit(error)
    }
  })


  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    try {
      io.to(userToCall).emit('callUser', { signal: signalData, from, name })
    } catch (error) {
      socket.emit(error)
    }
    
  })

  socket.on('answerCall', (data) => {
    try {
      io.to(data.to).emit('callAccepted', data.signal)
    } catch (error) {
      socket.emmit(error)
    }
  })
})

//Serving port
const port = process.env.PORT || 4000
try {
  server.listen(port, () => console.log(`Server Lister on port ${port}`))
} catch (error) {
  socket.emit(error)
}





