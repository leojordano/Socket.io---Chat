const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http)

app.get('/', (req,res) => res.sendFile(__dirname+'/index.html'))

const clients = []

io.on('connection', socket => {
    // console.log(io.clients())
    clients.push(socket.id)
    // console.log(clients)

    socket.join('room1')
    io.emit('conectado', {id: socket.id, clients})

    socket.on('msg', (msg) => {
        console.log(`room${msg.room}`)
        // io.to(socket.id).emit('new', msg)
        io.in(`room${msg.room}`).emit('new', msg)
    })

    socket.on('joinRoom', data => {
        // socket.join(data)
        console.log(`User ${socket.id} talking with ${data}`)
        // socket.emit('joinNewRoom', data)
    })

})

http.listen(3000, () => console.log('Porta: 3000'))