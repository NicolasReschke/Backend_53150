const fs = require('fs/promises')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retorna un arreglo vacío
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async _writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf8');
    }

    async addProduct(product) {
        const products = await this._readFile();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { ...product, id: newId };
        products.push(newProduct);
        await this._writeFile(products);
        return newProduct;
    }

    async getProducts() {
        return await this._readFile();
    }

    async getProductById(id) {
        const products = await this._readFile();
        return products.find(product => product.id === id);
    }

    async updateProduct(id, updatedProduct) {
        const products = await this._readFile();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        // Actualiza manteniendo el id original
        products[productIndex] = { ...products[productIndex], ...updatedProduct, id };
        await this._writeFile(products);
        return products[productIndex];
    }

    async deleteProduct(id) {
        const products = await this._readFile();
        const newProducts = products.filter(product => product.id !== id);
        if (newProducts.length === products.length) return false; // No se encontró el producto a eliminar

        await this._writeFile(newProducts);
        return true;
    }
}

module.exports = ProductManager;