const express = require('express');
const path = require('path');

const port = 4444
const app = express()
const server = require('http').createServer(app)

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.use(require(path.join(__dirname, 'src/routes/main')))

require(path.join(__dirname, 'src/socket/main'))(io)

server.listen(port, () => {
    console.log(`Server online na porta ${port}`) 
})

