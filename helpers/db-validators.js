const Rol = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const res = require('express/lib/response');

// Validamos si existe el rol
const esRolValido = async(rol = '') => {

    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la bade de datos!`)
    }
}


// Validamos si el email  tiene el formato correcto
const validarEmail = async(correo = '') => {
    // Validar correo
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado.`)
    }
}



// Válidamos si existe el id del usuario
const existeUsuarioId = async(id) => {
    // Validar usuario id
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id ${id} no existe!.`)
    }
}




// Válidamos si existe una categoria con ese id
const ExisteCategoriaPorId = async(id) => {
    const categoria = await Categoria.findById(id);
    if (!categoria || !categoria.name) {
        throw new Error(`El categoria con el id: ${id} no existe.`)
    }
}

module.exports = {
    esRolValido,
    validarEmail,
    existeUsuarioId,
    ExisteCategoriaPorId
}