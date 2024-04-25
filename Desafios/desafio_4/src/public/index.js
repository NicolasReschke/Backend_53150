const socket = io()

document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newProduct = {
        title: formData.get('title'),
        description: formData.get('description'),
        code: formData.get('code'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        category: formData.get('category'),
        thumbnail: formData.get('thumbnail')
    }
    socket.emit('addProduct', newProduct)
    event.target.reset()
})

