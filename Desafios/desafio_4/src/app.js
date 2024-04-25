const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const PORT = 8080
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Rutas
const viewsRoutes = require('./routes/viewsRoutes.js')
app.use('/', viewsRoutes)

require('./controllers/socketController')(io)

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})