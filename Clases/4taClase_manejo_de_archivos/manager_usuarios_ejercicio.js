//EJERCICIO MANAGER DE USUARIOS
/* ¿Cómo lo hacemos? Se creará una clase que permita gestionar usuarios usando fs.promises, éste deberá contar sólo con dos métodos: Crear un usuario y consultar los usuarios guardados.

El Manager debe vivir en una clase en un archivo externo llamado ManagerUsuarios.js
El método “Crear usuario” debe recibir un objeto con los campos:
Nombre
Apellido
Edad
Curso
El método debe guardar un usuario en un archivo “Usuarios.json”, deben guardarlos dentro de un arreglo, ya que se trabajarán con múltiples usuarios

El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json y devolver el arreglo correspondiente a esos usuarios */

const fs = require('fs/promises')
const path = require('path')

class ManagerUsuarios {
    constructor() {
        this.usuariosFile = path.join(__dirname, 'Usuarios.json')
    }

    async crearUsuario(usuario) {
        try {
            let usuarios = await this.leerUsuarios()

            usuarios.push(usuario)
            await fs.writeFile(this.usuariosFile, JSON.stringify(usuarios, null, 2))
            console.log("Usuario creado correctamente")
        } catch (error) {
            console.error("Error al crear el usuario", error)
        }
    }

    async consultarUsuarios() {
        try {
            return await this.leerUsuarios()
        } catch (error) {
            console.error("Error al consultar usuarios", error)
            return []
        }
    }

    async leerUsuarios() {
        try {
            const data = await fs.readFile(this.usuariosFile, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }
}

module.exports = ManagerUsuarios

//Anotaciones importantes en usuarios.js sobre el cambio de ruteo de Usuarios.json