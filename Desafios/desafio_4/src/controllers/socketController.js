const fs = require('fs/promises')
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/products.json')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo Cliente conectado')

        socket.on('addProduct', async (newProduct) => {
            try {
                await saveProductToJSON(newProduct)

                io.emit('newProductAdded', newProduct)

            } catch (error) {
                console.error('Error al agregar el producto:', error)
            }
        })

        socket.on('disconnect', () => {
            console.log('Cliente se desconectó')
        })
    })
}

const saveProductToJSON = async (newProduct) => {
    try {
        let products = []
        const data = await fs.readFile(productsFilePath, 'utf8')
        products = JSON.parse(data)

        const newProductId = products.length + 1
        const productToAdd = {
            id: newProductId,
            ...newProduct,
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