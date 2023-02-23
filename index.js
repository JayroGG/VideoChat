require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const socketMiddleware = require('./controllers/socket')
const compression = require('compression')

//Filter compression
const filterCompression = (req, res) => {
  if(req.headers['x-no-compression']){
    return false
  }
  return compression.filter(req, res)
}

//Midlwares
app.use(compression({  // Compression above 10 KB
  level: 6,
  threshold: 10 * 1000,
  filter: filterCompression 
}))

app.use(cors()) //Allowing all origins 

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





