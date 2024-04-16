const express = require('express')
const ProductManager = require('./product_manager.js')

const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const productManager = new ProductManager()

app.get('/products', async (req, res) => {
    try {
        let products = await productManager.getProducts()
        const limit = parseInt(req.query.limit)

        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit)
        } else if (req.query.limit !== undefined) {
            return res.status(404).send('<p>Error: La cantidad de productos debe ser un número mayor q 0.</p>')
        }

        let tableHtml = '<div style="margin: 0 auto; width: 70%;"><table style="border-collapse: collapse; width: 100%; text-align: center; border: 1px solid black;"><thead><tr style="background-color: #f2f2f2;"><th style="border: 1px solid black; padding: 8px;">ID</th><th style="border: 1px solid black; padding: 8px;">Título</th><th style="border: 1px solid black; padding: 8px;">Descripción</th><th style="border: 1px solid black; padding: 8px;">Precio</th><th style="border: 1px solid black; padding: 8px;">Imagen</th><th style="border: 1px solid black; padding: 8px;">Código interno</th><th style="border: 1px solid black; padding: 8px;">Stock</th></tr></thead><tbody>'
        products.forEach(product => {
            const rowColor = product.id % 2 === 0 ? '#f9f9f9' : '#e6e6e6'
            tableHtml += `<tr style="background-color: ${rowColor};"><td style="border: 1px solid black; padding: 8px;">${product.id}</td><td style="border: 1px solid black; padding: 8px;">${product.title}</td><td style="border: 1px solid black; padding: 8px;">${product.description}</td><td style="border: 1px solid black; padding: 8px;">${product.price}</td><td style="border: 1px solid black; padding: 8px;"><img src="${product.thumbnail}" alt="Thumbnail" style="max-width: 100px; max-height: 100px;"></td><td style="border: 1px solid black; padding: 8px;">${product.code}</td><td style="border: 1px solid black; padding: 8px;">${product.stock}</td></tr>`
        })
        tableHtml += '</tbody></table></div>'

        res.send(tableHtml)

    } catch (error) {
        res.status(404).send('<p>Error.</p>')
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        if (isNaN(productId)) {
            return res.status(404).send('<p>El ID proporcionado debe ser un número mayor q 0.</p>')
        }

        const product = await productManager.getProductById(productId)
        if (!product) {
            const products = await productManager.getProducts()
            let productListHtml = '<ul>'
            products.forEach(product => {
                productListHtml += `<li>ID: ${product.id}, Nombre: ${product.title}</li>`
            })
            productListHtml += '</ul>'

            let errorHtml = `<p>Error: El ID proporcionado no corresponde a ningún producto.</p>`
            errorHtml += `<p>Productos disponibles:</p>`
            errorHtml += productListHtml

            return res.status(404).send(errorHtml)
        } else {
            let tableHtml = '<div style="margin: 0 auto; width: 70%;"><table style="border-collapse: collapse; width: 100%; text-align: center;"><thead><tr style="background-color: #f2f2f2;"><th style="border: 1px solid #ddd; padding: 8px;">ID</th><th style="border: 1px solid #ddd; padding: 8px;">Title</th><th style="border: 1px solid #ddd; padding: 8px;">Description</th><th style="border: 1px solid #ddd; padding: 8px;">Price</th><th style="border: 1px solid #ddd; padding: 8px;">Thumbnail</th><th style="border: 1px solid #ddd; padding: 8px;">Code</th><th style="border: 1px solid #ddd; padding: 8px;">Stock</th></tr></thead><tbody>'
            tableHtml += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${product.id}</td><td style="border: 1px solid #ddd; padding: 8px;">${product.title}</td><td style="border: 1px solid #ddd; padding: 8px;">${product.description}</td><td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td><td style="border: 1px solid #ddd; padding: 8px;"><img src="${product.thumbnail}" alt="Thumbnail" style="max-width: 100px; max-height: 100px;"></td><td style="border: 1px solid #ddd; padding: 8px;">${product.code}</td><td style="border: 1px solid #ddd; padding: 8px;">${product.stock}</td></tr>`
            tableHtml += '</tbody></table></div>'
            res.send(tableHtml)
        }
    } catch (error) {
        console.error(error)
        res.status(404).send('<p>Error</p>')
    }
})

app.listen(port, async () => {
    try {
        await productManager.initFile()
        console.log(`Server is running on http://localhost:${port}`)
    } catch (error) {
        console.error('Error initializing file:', error.message)
    }
})