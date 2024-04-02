//ARROW FUNCTIONS

//Simple

/* const saludar = () => {
    console.log("Hola Backend developers")
}

saludar() */

/* const sumar = (a, b) => {
    return a + b
}

console.log(sumar(2, 3)) */

//Funciones con una sola expresion

/* const duplicar = (num) => num * 2

console.log(duplicar(5)) */

//Arrow functions en un arreglo de objetos

/* const usuarios = [
    { nombre: "Alumno A", edad: 20 },
    { nombre: "Alumno B", edad: 30 },
    { nombre: "Alumno C", edad: 50 }
]

const nombres = usuarios.map(u => u.nombre) */

//Arrow function como metodo de un objeto

/* const persona = {
    nombre: "Franco",
    edad: 25,
    saludar: function () {
        console.log(`Hola, mi nombre es ${this.nombre}`)
    }
}

persona.saludar() */


/* function obtenerDatosUsuario(id, callback) {
    //setTimeout se usa solamente para simular una demora en el proceso de información. NO SE USA
    setTimeout(() => {
        const usuario = {
            id: id,
            nombre: "Coder",
            email: "coder@mail.com"
        }
        callback(usuario)
    }, 5000);
}

function mostrarDatosDeUsuario(usuario) {
    console.log(`Nombre: ${usuario.nombre}, Email: ${usuario.email}`)
}

obtenerDatosUsuario(123, mostrarDatosDeUsuario) */


//CallBack Hell

/* obtenerDatosUsuario(function(resultado1){
    procesarDatos(resultado1, function(resultado2){
        realidarOtraOperacion(resultado2, function(resultado3){

        })
    })
}) */

//Promises

/* const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = false

        if (exito) {
            resolve("tarea ejecutada con éxito")
        } else {
            reject("Ocurrió un error")
        }
    }, 2000);
})

promesa.then((mensaje) => {
    console.log("Exito", mensaje)
}).catch((error) => {
    console.log("Error", error)
}
) */

// HANDS ON LABS
/* Calculadora positiva con promesas
¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO  donde podremos ponerlas a prueba

Definir función suma:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos sea 0
En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.
En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo debe devolver valores positivos

Definir función resta:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”

Definir una función multiplicación:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo
Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos

Definir la misma función división utilizada en esta clase.

Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch */


function suma(a, b) {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) {
            reject("Operación innecesaria")
        } else if (a + b < 0) {
            reject("La calculadora solo debe devolver valores positivos")
        } else {
            resolve(a + b)
        }
    })
}

function resta(minuendo, sustraendo) {
    return new Promise((resolve, reject) => {
        if (minuendo === 0 || sustraendo === 0) {
            reject("Operación inválida")
        } else if (minuendo - sustraendo < 0) {
            reject("La calculadora solo debe devolver valores positivos")
        } else {
            resolve(minuendo - sustraendo)
        }
    })
}

function multiplicacion(factor1, factor2) {
    return new Promise((resolve, reject) => {
        if (factor1 < 0 || factor2 < 0) {
            reject("La calculadora solo debe devolver valores positivos")
        } else {
            resolve(factor1 * factor2)
        }
    })
}

function division(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (divisor === 0) {
            reject("No se puede dividir por cero")
        } else {
            resolve(dividendo / divisor)
        }
    })
}

// Función asincrona para realizar los cálculos
async function calculos() {
    try {

        const resultadoSuma = await suma(5, 7)
        console.log("Resultado suma", resultadoSuma)
        const resultadoResta = await resta(10, 3)
        console.log("Resultado resta", resultadoResta)
        const resultadoMultiplicacion = await multiplicacion(4, 0)
        console.log("Resultado multiplicacion", resultadoMultiplicacion)
        const resultadoDivision = await division(10, 0)
        console.log("Resultado división", resultadoDivision)

    } catch (error) {
        console.error("Error", error)
    }
}

calculos()