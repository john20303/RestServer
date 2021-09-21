const Rol = require('../models/role');
const Usuario = require('../models/user');


const esRolValido = async(rol = '') => {

    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la bade de datos!`)
    }
}

const validarEmail = async(correo = '') => {
    // Validar correo
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado.`)
    }
}

module.exports = {
    esRolValido,
    validarEmail
}