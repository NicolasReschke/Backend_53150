const fs = require('fs/promises')
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/products.json')

exports.getAllProducts = async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8')
        let products = JSON.parse(data)

        const limit = parseInt(req.query.limit)
        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit)
        } else if (req.query.limit !== undefined) {
            return res.status(404).send('<p>Error: La cantidad de productos ingresada debe ser un número mayor que 0.</p>')
        }
        res.render('home', { products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

exports.getProducts = async () => {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8')
        let products = JSON.parse(data)

        return products
    } catch (error) {
        console.error(error)
        throw error
    }
}

exports.getProductById = async (req, res) => {
    const productId = parseInt(req.params.pid)

    try {
        const data = await fs.readFile(productsFilePath, 'utf8')
        const products = JSON.parse(data)
        const product = products.find(p => p.id === productId)
        if (!product) {
            const productList = products.map(({ id, title }) => ({ id, title }))
            return res.status(404).render('error', { 
                message: 'Producto no encontrado. Aquí está una lista de productos disponibles.', 
                products: productList
            })
        } else {
            res.render('productDetail', { product })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

exports.addProduct = async (productName) => {
    try {
        let products = []
        const data = await fs.readFile(productsFilePath, 'utf8')
        products = JSON.parse(data)

        const newProductId = products.length + 1
        const productToAdd = {
            id: newProductId,
            ...productName,
            status: true
        }

        products.push(productToAdd)

        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2))
        console.log('Producto agregado correctamente:', productToAdd)
        return productToAdd
    } catch (error) {
        console.error('Error al agregar el producto:', error)
        throw error
    }
}
