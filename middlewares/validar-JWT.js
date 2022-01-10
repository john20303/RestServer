const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { request, response } = require('express');


const validarJWT = async(req = request, res, next) => {
    const token = req.headers['x-token'];

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No ahy token en la petición.'
        });
    }
    // Verificando el token
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED); //Traemos nuestro token, del cual tomamos uid.

        // Buscar el uid asociado al usuario del modelo
        const usuario = await Usuario.findById(uid); //Buscamos el usuario de acuerdo al uid que viene en el request y lo guardamos en una variable.


        // Validamos si el user no existe.
        if (!usuario) {
            res.status(400).json({
                ok: true,
                msg: 'The user does not exist!'
            })
        }

        //Verificar estado del user.
        if (!usuario.estado) {
            res.status(401).json({
                ok: false,
                msg: "Unauthorized User"
            })
        }

        req.usuario = usuario; //Le asignamos el valor de dicho user al de la request.

        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}




module.exports = {
    validarJWT
}