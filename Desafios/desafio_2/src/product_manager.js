const path = require('path')
const fs = require('fs/promises')

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, 'products.json')
    }

    async initFile() {
        try {
            await fs.access(this.path)
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, JSON.stringify([]))
            } else {
                throw error
            }
        }
    }

    async addProduct(product) {
        if (!this.validateProduct(product)) {
            console.error("Error al validar. Todos los campos son obligatorios y deben cumplir con los requisitos.")
            return
        }
        try {
            const products = await this.getProducts()
            if (products.find(p => p.title === product.title)) {
                console.error(`El producto "${product.title}" ya existe.`)
                return
            }

            const newProduct = {...product, id: products.length + 1}
            products.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("Producto agregado correctamente.")
        } catch (error) {
            console.error("Error al agregar el producto:", error.message)
            throw error
        }
    }

    validateProduct({ title, description, price, thumbnail, code, stock }) {
        return title && description && typeof price === 'number' && price > 0 && thumbnail && code && typeof stock === 'number' && stock >= 0
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.error("Error al leer los productos:", error.message)
            throw error
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(p => p.id === id)
            if (!product) {
                throw new Error("Error: Producto no encontrado.")
            }
            return product
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(p => p.id === id)
            if (productIndex === -1) {
                throw new Error("Producto no encontrado.")
            }
            products[productIndex] = { ...products[productIndex], ...updatedProduct, id: products[productIndex].id }
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("Producto actualizado correctamente.")
        } catch (error) {
            console.error("Error al actualizar el producto:", error)
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const filteredProducts = products.filter(p => p.id !== id)
            if (products.length === filteredProducts.length) {
                throw new Error(`El producto con el ID ${id} no se pudo eliminar porque no existe.`)
            }
            await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2))
            console.log("Producto eliminado correctamente.")
        } catch (error) {
            console.error("Error al eliminar el producto:", error)
            throw error
        }
    }
}

module.exports = ProductManager