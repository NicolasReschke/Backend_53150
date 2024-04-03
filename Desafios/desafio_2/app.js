const ProductManager = require('./product_manager.js')

const productManager = new ProductManager('products.json');

(async () => {
    const newProduct = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    };
    await productManager.addProduct(newProduct)

    // Obtener todos los productos
    const allProducts = await productManager.getProducts()
    console.log('Todos los productos:', allProducts)
    
    // Obtener un producto por su id
    const productId = 1
    const productById = await productManager.getProductById(productId)
    console.log(`Producto con ID ${productId}:`, productById)

    // Actualizar un producto por su id
    const updateFieldById = 3
    const updatedFields = {
        description:"Raviolones de 4 quesos. Consultar promoción especial: 2 docenas por $4000",
        price: 4000
    }
    const updated = await productManager.updateProduct(updateFieldById, updatedFields)
    console.log(`Producto con ID ${updateFieldById} actualizado:`, updated)

    // Eliminar un producto por su id
    const deleteProductById = 10
    const deleted = await productManager.deleteProduct(deleteProductById)
    console.log(`Producto con ID ${deleteProductById} eliminado:`, deleted)

    // Mostrar el listado actualizado
    const updatedProducts = await productManager.getProducts()
    console.log('Listado de productos actualizado:')
    updatedProducts.forEach(product => {
        console.log(`- ${product.title} \n Precio: $ ${product.price} - ID: ${product.id}`)
    })
})()