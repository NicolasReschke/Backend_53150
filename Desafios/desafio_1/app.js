class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    addProduct({ title, category, description, price, thumbnail, code, stock }) {
        if (!title || !category || !description || !price || !thumbnail || !code || stock == null) {
        console.error("Todos los campos son obligatorios");
        return;
        }

        if (this.products.some(product => product.code === code)) {
        console.error("El código del producto ya existe");
        return;
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

        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Not found");
            return;
        }
        return product;
    }
}

const productManager = new ProductManager();
    productManager.addProduct({
        title: "Ñoquis tradicionales",
        category: "ñoquis",
        description: "Ñoquis tradicionales de papa (1 kg rinde 3 porciones)",
        price: 1800,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/%C3%B1oquisTradicionales1.jpeg",
        code: "4kHfraAciqpy6R2IjIXP",
        stock: 20
    });
    productManager.addProduct({
        title: "Sorrentinos de Verdura",
        category: "sorrentinos",
        description: "Sorrentinos de verdura. Consultar por promoción especial: 2 docenas por $2500",
        price: 2200,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/sorrentinos2.jpeg",
        code: "7mwrPsrFP9gdtlLuphyP",
        stock: 20
    });
    productManager.addProduct({
        title: "Raviolones de 4 quesos",
        category: "raviolones",
        description: "Raviolones de 4 quesos. Consultar promoción especial: 2 docenas por $3000",
        price: 1800,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/raviolones2.jpeg",
        code: "VvSNdiTtBMlAZQ2iosHF",
        stock: 20
    });
    productManager.addProduct({
        title: "Tallarines de morrón",
        category: "tallarines",
        description: "Tallarines de morrón, 1 kg rinde 5/6 porciones",
        price: 2000,
        thumbnail: "https://entrega-final-react-js-reschkenicolas.netlify.app/assets/tallarines3.jpeg",
        code: "WbWhmXsRob2dZUlcHNBm",
        stock: 20
    });
/* console.log(productManager.getProducts()); */


const product = productManager.getProductById();
if (product) {
    console.log(product);
} else {
    console.log("Producto no encontrado");
}