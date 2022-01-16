const Rol = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

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
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`No existe el producto con el id: ${ id }`);
    }
}

module.exports = {
    esRolValido,
    validarEmail,
    existeUsuarioId,
    ExisteCategoriaPorId,
    existeProductoPorId
}