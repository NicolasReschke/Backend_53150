class ProductManager {
    constructor() {
        this.products = []
        this.lastId = 0
    }

    getProducts() {
        return this.products
    }
    
    addProduct({ title, category, description, price, thumbnail, code, stock }) {
        if (!title || !category || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios")
        return
        }

        if (this.products.some(product => product.code === code)) {
        console.error("El código del producto proporcionado ya está en uso")
        return
        }

        const newProduct = {
            id: ++this.lastId,
            title,
            category,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct)
        return newProduct
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (!product) {
            return
        }
        return product
    }
}

const productManager = new ProductManager()
    productManager.addProduct({
        title: "Ñoquis tradicionales",
        category: "ñoquis",
        description: "Ñoquis tradicionales de papa (1 kg rinde 3 porciones)",
        price: 1800,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/%C3%B1oquisTradicionales1.jpeg",
        code: "4kHfraAciqpy6R2IjIXP",
        stock: 20
    })
    productManager.addProduct({
        title: "Sorrentinos de Verdura",
        category: "sorrentinos",
        description: "Sorrentinos de verdura. Consultar por promoción especial: 2 docenas por $2500",
        price: 2200,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/sorrentinos2.jpeg",
        code: "7mwrPsrFP9gdtlLuphyP",
        stock: 20
    })
    productManager.addProduct({
        title: "Raviolones de 4 quesos",
        category: "raviolones",
        description: "Raviolones de 4 quesos. Consultar promoción especial: 2 docenas por $3000",
        price: 1800,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/raviolones2.jpeg",
        code: "VvSNdiTtBMlAZQ2iosHF",
        stock: 20
    })
    productManager.addProduct({
        title: "Tallarines de morrón",
        category: "tallarines",
        description: "Tallarines de morrón, 1 kg rinde 5/6 porciones",
        price: 2000,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/tallarines3.jpeg",
        code: "WbWhmXsRob2dZUlcHNBm",
        stock: 20
    })

    //Errores
    //console.error("Todos los campos son obligatorios")
    productManager.addProduct({
        /* title: "Ñoquis rellenos", */
        category: "ñoquis",
        description: "Ñoquis rellenos de muzarella (1 kg rinde 4 porciones)",
        price: 2500,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/%C3%B1oquisRellenos1.jpeg",
        code: "WStu5tVc1Pp7rFlxxoqj",
        stock: 20
    })

    //console.error("El código del producto ya existe/está en uso")
    productManager.addProduct({
        title: "Tallarines al huevo",
        category: "tallarines",
        description: "Los más tradicionales Tallarines al huevo, súper rendidores y sabrosos. 1 kg rinde 5/6 porciones",
        price: 1800,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/tallarines1.jpeg",
        code: "WbWhmXsRob2dZUlcHNBm",
        stock: 20
    })

    const product = productManager.getProductById()
    if (product) {
        console.log(product)
    } else {
        console.log("Not found")
    }
    
    console.log(productManager.getProducts())
