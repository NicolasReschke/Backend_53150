const ProductManager = require('./product_manager.js')

async function main() {
    try {
        const productManager = new ProductManager('./products.json')

        await productManager.addProduct({
            title: "Producto Prueba",
            description: "Este es un producto de prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        })

        // Obtener todos los productos
        console.log(await productManager.getProducts())

        // Obtener un producto por ID
        console.log(await productManager.getProductById(1))

        // Actualizar un producto
        await productManager.updateProduct(3, {
            description:"Raviolones de 4 quesos. Consultar promoción especial: 2 docenas por $4000",
            price: 4000
        })

        // Eliminar un producto
        await productManager.deleteProduct(5)

        // Mostrar el listado actualizado
        const products = await productManager.getProducts()
        console.log("Detalle actualizado del listado de productos:")
        products.forEach(product => {
            console.log(`ID: ${product.id} - ${product.title} - ${product.price}`)
        })
        
        } catch (error) {
        console.error("Ocurrió un error durante la ejecución del script:", error.message)
    }
}
main()