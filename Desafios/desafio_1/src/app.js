class ProductManager {
    constructor() {
        this.products = []
        this.nextId = 1
    }

    addProduct({ title, category, description, price, thumbnail, code, stock }) {
        if (title && category && description && typeof price === 'number' && price > 1 && thumbnail && code && typeof stock === 'number' && stock >= 1) {
            const exists = this.products.some(product => product.code === code)
            if (!exists) {
                const newId = this.products.reduce((acc, current) => {
                    return current.id > acc ? current.id : acc;
                }, 0) + 1;
                const newProduct = {
                    id: newId,
                    title,
                    category,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                };
                this.products.push(newProduct);
                console.log("Producto agregado de manera correcta:", newProduct)
            } else {
                console.error("Error: El código del producto ya existe.")
            }
        } else {
            console.error("Error: Todos los campos son obligatorios.")
        }
    }

    getProducts() {
        return this.products.length > 0 ? this.products : [];
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            return product
        } else {
            console.error("Error: Producto no encontrado.")
            return null
        }
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts());
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

    const product = productManager.getProductById(2)
    if (product) {
        console.log(`El producto que corresponde al ID ${product.id} es:`, product)
    } else {
        console.log("Not found")
    }