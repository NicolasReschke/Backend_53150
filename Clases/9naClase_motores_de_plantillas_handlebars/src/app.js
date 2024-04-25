
import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const users = [
    { nombre: "nombreA", apellido: "apellidoA", edad: 21, correo: "nombreA@example.com", telefono: "12345" },
    { nombre: "nombreB", apellido: "apellidoB", edad: 22, correo: "nombreB@example.com", telefono: "12346" },
    { nombre: "nombreC", apellido: "apellidoC", edad: 23, correo: "nombreC@example.com", telefono: "12347" },
    { nombre: "nombreD", apellido: "apellidoD", edad: 24, correo: "nombreD@example.com", telefono: "12348" },
    { nombre: "nombreE", apellido: "apellidoE", edad: 25, correo: "nombreE@example.com", telefono: "12349" }
]


app.get('/', (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    res.render('index', user);
})

app.listen(PORT, () => {
    console.log(`Server is running on port \PORT`)
})