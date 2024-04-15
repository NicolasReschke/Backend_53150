//PROYECTO DE NODE (EJERCICIO)
/* Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.
Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados. */

//RESOLUCION PROPIA:
// Función para generar un número aleatorio entre 1 y 20
/* function randomBetween1And20() {
    return Math.floor(Math.random() * 20) + 1
}

// Generar 10000 números aleatorios y contar las apariciones
let counts = {}

for (let i = 0; i < 10000; i++) {
    let number = randomBetween1And20()
    if (counts[number]) {
        counts[number]++
    } else {
        counts[number] = 1
    }
}

console.log(counts) */


//RESOLUCIÓN DE UN COMPAÑERO:

/* function generarNroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const CANT_NROS = 10000;
const numeros = {};
for (let i = 0; i < CANT_NROS; i++) {
    const nro = generarNroAleatorio(1, 20);
    if (numeros[nro]) {
        numeros[nro]++;
    } else {
        numeros[nro] = 1;
    }
}
for (const numero in numeros) {
    console.log(`Número ${numero}: ${numeros[numero]} veces`);
} */

//----------------------------------------------------------------


//Práctica de módulos nativos: fs + crypto

/* ¿Cómo lo hacemos? Se creará una clase “UserManager” que permitirá guardar usuarios en un archivo. El usuario se recibirá con una contraseña en string plano, y se deberá guardar la contraseña hasheada con crypto. Utilizar los módulos nativos  fs y crypto, El manager debe contar con los siguientes métodos:
El método “Crear usuario” debe recibir un objeto con los campos:
- Nombre
- Apellido
- Nombre de usuario
- Contraseña

El método debe guardar un usuario en un archivo “Usuarios.json”, recordando que la contraseña debe estar hasheada por seguridad

El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la contraseña,  debe poder leer el json previamente generado con el arreglo de usuarios y hacer la comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje “Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide. */


//RESOLUCIÓN POR PARTE DEL PROFESOR:

const path = require('path')
const fs = require("fs/promises")
const crypto = require("crypto")

class UserManager {
    constructor() {
        this.filePath = path.join(__dirname, 'Usuarios.json')
    }

    async createUser(user) {
        const { nombre, apellido, username, password } = user

        //Hashear la contraseña
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        try {
            //Cargar los usuarios desde un archivo
            let users = []
            if (await fs.access(this.filePath).then(() => true).catch(() => false)) {
                const fileContent = await fs.readFile(this.filePath, 'utf8')
                users = JSON.parse(fileContent)
            }

            users.push({ nombre, apellido, username, password: hashedPassword })

            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
        } catch (error) {
            console.error("Error al crear un usuario", error)
        }
    }

    async validateUser(username, password) {
        try {
            //Cargar los datos del archivo
            if (await fs.access(this.filePath).then(() => true).catch(() => false)) {
                const fileContent = await fs.readFile(this.filePath, "utf8")
                const users = JSON.parse(fileContent)

                //Buscar usuarios por el username
                const user = users.find(u => u.username === username)

                if (user) {
                    //Verificar el password
                    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
                    if (hashedPassword === user.password) {
                        console.log("Usuario logueado con éxito")
                    } else {
                        console.log("Contraseña incorrecta")
                    }
                } else {
                    console.log("El usuario no fué encontrado")
                }
            } else {
                console.log("No hay usuarios registrados")
            }
        } catch (error) {
            console.error("Error de validación", error)
        }
    }
}


const userManager = new UserManager()

userManager.createUser({
    nombre: "Coder",
    apellido: "House",
    username: "coder24",
    password: "123456"
}).then(() => {
    userManager.validateUser("coder24", "1234567")
})

console.log(userManager)


//REALIZAR EJERCICIO "CALCULADORA DE EDAD AL FINAL DEL .PPT"