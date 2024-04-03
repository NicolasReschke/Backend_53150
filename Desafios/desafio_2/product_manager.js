const path = require('path')
const fs = require('fs/promises')

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, 'products.json')
    }

    async addProduct(product) {
        try {
            let products = await this.getProducts()

            const existingProduct = products.find(p => p.title === product.title)
            if (existingProduct) {
                console.error(`Error: El producto "${product.title}" ya existe.`)
                return
            }
    
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
            product.id = newId
    
            products.push(product)
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8')
        } catch (error) {
            console.error('Error al intentar agregar un producto', error)
        }
    }

    async getProducts() {
        try {
            const exists = await fs.access(this.path)
                .then(() => true)
                .catch(() => false);
    
            if (!exists) {
                await fs.writeFile(this.path, '[]', 'utf8')
                return []
            }
    
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.error('Error al intentar obtener los productos', error)
            return []
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === id)
            return product || console.log(`El producto con ID ${id} no se encuentra`)
        } catch (error) {
            console.error('Error al intentar obtener el producto por su ID:', error)
            return null
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProducts()
            const index = products.findIndex(product => product.id === id)
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedFields }
                await fs.writeFile(this.path, JSON.stringify(products))
                return true
            }
            return false
        } catch (error) {
            console.error('Error al intentar actualizar el producto', error)
            return false
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts()
            const initialLength = products.length
    
            products = products.filter(product => product.id !== id)
    
            if (products.length === initialLength) {
                console.error(`Error al intentar eliminar el producto con el ID ${id}`)
                return false
            }
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
    
            return true
        } catch (error) {
            console.error('Error al intentar eliminar el producto por su ID:', error)
            return false
        }
    }
}

module.exports = ProductManager