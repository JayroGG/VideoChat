const socket = require('socket.io')

module.exports = (server) => {
  const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  //socket conecction
  io.on('connection', (socket) => {
    try {
      socket.emit('me', socket.id)
    } catch (error) {
      console.log(error)
    }


    //Handlers 
    socket.on('disconnect', () => {
      try {
        socket.broadcast.emit('callEnded')
      } catch (error) {
        console.log(error)
      }
    })


    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
      try {
        io.to(userToCall).emit('callUser', { signal: signalData, from, name })
      } catch (error) {
        console.log(error)
      }

    })

    socket.on('answerCall', (data) => {
      try {
        io.to(data.to).emit('callAccepted', data.signal)
      } catch (error) {
        console.log(error)
      }
    })
  })
}