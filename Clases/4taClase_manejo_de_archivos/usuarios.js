const ManagerUsuarios = require('./manager_usuarios_ejercicio.js')

async function main() {
    const manager = new ManagerUsuarios()

    // Crear un nuevo usuario
    await manager.crearUsuario({
        Nombre: "Pablo",
        Apellido: "Gauna",
        Edad: 38,
        Curso: "Programación Backend"
    })

    // Consultar usuarios después de crear uno nuevo
    try {
        const usuarios = await manager.consultarUsuarios()
        console.log('Usuarios:', usuarios)
    } catch (error) {
        console.error("Error al consultar usuarios", error)
    }
}

main()


//El profesor resolvió de esta manera, pero tenía conflictos. Cuando iniciaba usuarios.js no me tomaba la primera carga del usuario, y al realizar la segunda, solo me mostraba 1

//El error se produjo cuando le cambié el ruteo a Usuarios.json para q quede dentro de la misma carpeta q el resto de los archivos

//Si no me preocupase donde queda el archivo .json, puedo utilizar el metodo del profesor

//CONCLUSION:
//La función main es asincrónica y se utiliza await para asegurarme de que la operación de creación de usuario se completa antes de intentar consultar los usuarios. De esta manera, debería obtener la lista completa de usuarios, incluyendo el que acabo de crear.



//Resolución del profesor:
/* const manager = new ManagerUsuarios()

//Crear un nuevo usuario
manager.crearUsuario({
    Nombre: "Pablo",
    Apellido: "Gauna",
    Edad: 38,
    Curso: "Programación Backend"
})

//Consultar usuarios
manager.consultarUsuarios()
    .then(usuarios => console.log('Usuarios', usuarios))
    .catch(error => console.error("Error al consultar usuarios", error)) */