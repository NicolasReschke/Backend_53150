const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/productsController.js')

router.get('/', ProductsController.getAllProducts)

router.get('/product/:pid', ProductsController.getProductById)

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductsController.getProducts()
        res.render('realTimeProducts', { products })
    } catch (error) {
        console.error('Error al obtener los productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

module.exports = router