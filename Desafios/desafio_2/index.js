const ProductManager = require('./app.js');
const path = require('path')

// Ruta del archivo donde se guardarán los productos
const filePath = path.join(__dirname, 'products.json')

// Crear una instancia de ProductManager
const productManager = new ProductManager(filePath);

// Ejemplo de uso de los métodos de ProductManager
async function main() {
    // Agregar productos
    await productManager.addProduct({
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 20.99,
        thumbnail: 'path/to/thumbnail1.jpg',
        code: 'ABC123',
        stock: 10
    });

    await productManager.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 30.50,
        thumbnail: 'path/to/thumbnail2.jpg',
        code: 'XYZ456',
        stock: 15
    });

    // Obtener todos los productos
    const allProducts = await productManager.getProducts();
    console.log('Todos los productos:', allProducts);

    // Obtener un producto por su ID
    const productId = 1;
    const productById = await productManager.getProductById(productId);
    console.log(`Producto con ID ${productId}:`, productById);

    // Actualizar un producto
    const updatedProduct = await productManager.updateProduct(productId, {
        price: 25.99,
        stock: 20
    });
    console.log(`Producto actualizado con ID ${productId}:`, updatedProduct);

    // Eliminar un producto
    const deleteResult = await productManager.deleteProduct(productId);
    console.log(`Producto eliminado con ID ${productId}:`, deleteResult);

    // Obtener todos los productos después de la eliminación
    const remainingProducts = await productManager.getProducts();
    console.log('Productos restantes:', remainingProducts);
}

main().catch(console.error);