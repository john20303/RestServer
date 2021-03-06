const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { response } = require('express');


// Get Usuarios
const controllerGet = async(req, res) => {
    const { limit = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip(desde)
        .limit(Number(limit));
    const total = await Usuario.countDocuments();
    res.json({ total, usuarios });
}


// Post  Usuarios
const controllerPost = async(req, res) => {

    // const { nombre, apellido } = req.body; // De esta manera hacemos que la petición nos regrese solo lo que queremos.
    const { nombre, correo, password, rol, } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol, });


    // Encriptando la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);


    // Guardar en base de datos
    await usuario.save();
    res.json({
        usuario
    });
}


// Put Usuario
const controllerPut = async(req, res) => {
    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;
    // TODO validar contra base de datos!

    if (password) {
        // Encriptando la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
}


// Delete Usuario
const controllerDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    // const userAuthenticated = req.user;
    res.json({
        usuario
    });
}


module.exports = {
    controllerGet,
    controllerPost,
    controllerPut,
    controllerDelete
}