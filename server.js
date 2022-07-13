// Require express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Modules
const path = require('path')
// Make the server
const http = require('http').createServer(app)
// Set the public folder
app.use(express.static(path.join(__dirname, '/public')))
// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
// Listen the server on the port specified
http.listen(port, () => {
    console.log(`Chat application listening on http://localhost:${port}`)
})

// Socket
const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('sendMessage', msg => {
        socket.broadcast.emit('sendMessage', msg)
    })
})