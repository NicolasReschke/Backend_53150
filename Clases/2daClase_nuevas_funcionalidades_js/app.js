// Operador exponencial

/* let resultado = 2**3
console.log(resultado)

let base = 5
let exponente = 2
let resultado2 = base ** exponente
console.log(resultado2)

resultado3 = 2**3**2
console.log(resultado3) */


// Includes
/* const numeros = [2, 3, 55, 3, 1]
console.log(numeros.includes(3))

const bebidas = ["te", "coca", "mate", "agua"]
console.log(bebidas.includes("fernet"))
console.log(bebidas.includes("mate")) */

// Operador Nullish(??)

/* const nombre = "Backend"
const nombrePorDefecto = "Coderhouse"
const nombreCompleto = nombre ?? nombrePorDefecto
console.log(nombreCompleto) */

//Object.entries, Object.values, Object.keys

/* const persona = {
    nombre: "Coder",
    edad: 30,
    ciudad: "Córdoba"
}

const entradas = Object.entries(persona)
const valores = Object.values(persona)
const claves = Object.keys(persona)

console.log(claves) */

//Finally

/* function ejemploPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = false

            if (exito) {
                resolve("Éxito")
            } else {
                reject("Error")
            }
        }, 5000)
    })
}

ejemploPromesa()
    .then((resultado) => {
        console.log(resultado)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        console.log("La promesa ha sido finalizada")
    }) */


// Spread Operator

/* const numeros = [1, 2, 3]

const nuevosNumeros = [...numeros, 4, 5]

console.log(nuevosNumeros) */


/* ------------------------------------------------------------------------------------------------------------ */

//Ejercicio q en clase -> Utilización ES6-ES9

/* const objetos = [
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2
    },
    {
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
]

//Realizar una lista nueva  (array) que contenga todos los tipos de productos (no cantidades), consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.
let tiposProductos = [];

objetos.forEach(obj => {
    Object.keys(obj).forEach(key => {
        if (!tiposProductos.includes(key)) {
            tiposProductos.push(key);
        }
    });
});

console.log(tiposProductos);
console.log("---------------------------------------------------------------------\n\n");

// El profesor resolvió:
const tiposDeProductos = objetos.reduce((lista, objeto) => {
    Object.keys(objeto).forEach(producto => {
        if (!lista.includes(producto)) {
            lista.push(producto)
        }
    })
    return lista
}, [])

console.log(tiposDeProductos)
console.log("---------------------------------------------------------------------\n\n");


//Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)
let totalProductosVendidos2 = 0;

objetos.forEach(obj => {
    Object.values(obj).forEach(value => {
        totalProductosVendidos2 += value;
    });
});

console.log(totalProductosVendidos2);
console.log("---------------------------------------------------------------------\n\n");

// El profesor resolvió:
const totalProductosVendidos = objetos.reduce((total, objeto) => {
    const cantidades = Object.values(objeto)
    const suma = cantidades.reduce((a, b) => a + b, 0)
    return total + suma
}, 0)

console.log(`Total de productos vendidos: ${totalProductosVendidos}`)
console.log("---------------------------------------------------------------------\n\n");


// Suma individual de cada uno de los productos
let mapaProductos = {};

objetos.forEach(objeto => {
    Object.keys(objeto).forEach(producto => {
        if (!mapaProductos[producto]) {
            // Si el producto no existe en el mapa, lo inicializa con la cantidad actual.
            mapaProductos[producto] = objeto[producto];
        } else {
            // Si el producto ya existe, suma la cantidad actual a la existente.
            mapaProductos[producto] += objeto[producto];
        }
    });
});

let listaProductos = Object.keys(mapaProductos).map(producto => {
    return { producto: producto, totalVendido: mapaProductos[producto] };
});

console.log(listaProductos); */

/* ------------------------------------------------------------------------------------------------------------ */


//Ejercicio 2 en clase -> Hands on lab

// En esta instancia de la clase repasaremos algunos de los conceptos vistos en clase con una aplicación

// ¿De qué manera?
// El profesor demostrará cómo hacerlo y tú lo puedes ir replicando en tu computadora. Si surgen dudas las puedes compartir para resolverlas en conjunto de la mano de los tutores.

// Registrador de Tickets de evento

// ¿Cómo lo hacemos? Se creará una clase que permitirá llevar una gestión completa de usuarios que deseen acceder a dichos eventos.

// Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
// La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un costo adicional al precio de cada evento.
// Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
// Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
// nombre
// lugar
// precio (deberá agregarse un 0.15 del valor original)
// capacidad (50 por defecto)
// fecha (hoy por defecto)
// El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.

// Debe contar con un método “agregarUsuario” El cual recibirá:
// id del evento (debe existir, agregar validaciones)
// id del usuario
// El método debe evaluar que el evento exista y que el usuario no haya estado registrado previamente (validación de fecha y capacidad se evitará para no alargar el reto)
// Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese evento.
// Debe contar con un método “ponerEventoEnGira” El cual recibirá:
// id del evento
// nueva localidad
// nueva fecha
// El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)


//Resolución:

/* class TicketManager {
    #precioBaseDeGanancia = 1.15; // 15% de ganancia
    constructor() {
        this.eventos = []; // arreglo de eventos vacío
        this.ultimoId = 0; // autoincrementar el ID
    }

    getEventos() {
        return this.eventos;
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const evento = {
            id: ++this.ultimoId, // Incrementa el id automáticamente
            nombre,
            lugar,
            precio: precio * this.#precioBaseDeGanancia, // Añade el 15% de ganancia al precio
            capacidad,
            fecha,
            participantes: [] // Arreglo de participantes vacío
        };
        this.eventos.push(evento);
    }

    agregarUsuario(idEvento, idUsuario) {
        const evento = this.eventos.find(evento => evento.id === idEvento);
        if (!evento) {
            console.log("El evento no existe.");
            return;
        }
        if (evento.participantes.includes(idUsuario)) {
            console.log("El usuario ya está registrado en el evento.");
            return;
        }
        evento.participantes.push(idUsuario);
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const eventoOriginal = this.eventos.find(evento => evento.id === idEvento);
        if (!eventoOriginal) {
            console.log("El evento no existe.");
            return;
        }
        const nuevoEvento = {
            ...eventoOriginal,
            id: ++this.ultimoId,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            participantes: []
        };
        this.eventos.push(nuevoEvento);
    }
}
console.log("---------------------------------------------------------------------\n\n") */

//Resolución del profesor:
class TicketManager {
    constructor() {
        this.eventos = []
        this.precioBaseDeGanancia = 0
    }

    getEventos() {
        return this.eventos
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        precio += precio * 0.15
        const evento_id = this.eventos.length + 1
        const participantes = []
        const evento = {
            id: evento_id,
            nombre,
            lugar,
            precio,
            capacidad,
            fecha,
            participantes
        }
        this.eventos.push(evento)
    }

    agregarUsuario(evento_id, usuario_id) {
        const evento_encontrado = this.eventos.find((evento) => evento.id === evento_id)
        if (!evento_encontrado) {
            console.log("El evento no fué encontrado")
            return
        }

        const participantes = evento_encontrado.participantes
        const usuarioRegistrado = participantes.includes(usuario_id)
        if (usuarioRegistrado) {
            console.log("El usuario ya está registrado en éste evento")
            return
        }

        participantes.push(usuario_id)
        console.log("El usuario ha sido agregado al evento")
    }

    ponerEventoEnGira(evento_id, nueva_localidad, nueva_fecha) {
        const evento_encontrado = this.eventos.find((evento) => evento.id === evento_id)
        if (!evento_encontrado) {
            console.log("El evento con el ID proporcionado no existe")
            return
        }

        const evento_copiado = { ...evento_encontrado }
        evento_copiado.id = this.eventos.length + 1
        evento_copiado.lugar = nueva_localidad
        evento_copiado.fecha = nueva_fecha
        evento_copiado.participantes = []

        this.eventos.push(evento_copiado)
        console.log("El evento ha sido puesto en gira correctamente")
    }
}


const ticketManager = new TicketManager()

//Agregar eventos
ticketManager.agregarEvento("Concierto de Rock", "Estadio Kempes", 100, 2000, new Date("2024-07-20"))
ticketManager.agregarEvento("Concierto de Pop", "Estadio Belgrano", 200, 3000, new Date("2024-10-20"))

const eventos = ticketManager.getEventos()
// console.log(eventos)

//Agregar usuarios
ticketManager.agregarUsuario(1, "usuario 1")
ticketManager.agregarUsuario(2, "usuario 2")
ticketManager.agregarUsuario(1, "usuario 3")

//Poner en gira
ticketManager.ponerEventoEnGira(1, "Microestadio Talleres", new Date("2024-12-20"))

const eventosActualizados = ticketManager.getEventos()
console.log(eventosActualizados)