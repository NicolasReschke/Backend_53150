/* const nombre = "Coder"
console.log(nombre) */

// Sin "type": "module", (en el package.json)
/* const express = require('express') */

// Con "type": "module", (en el package.json)
import express from 'express'
const app = express()

const PORT = 8080
app.get('/miaplicacion', (req, res) => {
    res.send('Hello Word!')
})

app.listen(8080, () => {
    console.log(`Server is running on port ${PORT}`)
})