const Usuario = require('../models/user');
const bcrypt = require('bcrypt');
const {generarJWT} = require("../helpers/generar_JWT");

const controllerLogin = async (req, res) => {

    const {correo, password} = req.body;
    try {
        //    Verificar si el correo existe!
        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(400).json({
                msg: "Correo/Password no son válidos-Correo"
            });
        }

        //    Si el usuario esta activo!
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario esta inactivo-estado: false"
            })
        }

        //    Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if (!validarPassword) {
            return res.status(400).json({
                msg: "Usuario/Password no son válidos-Password"
            })
        }

        //    Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: usuario,
            token
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Algo salio mal, hable con el administrador del sitio!"
        })
    }
}

module.exports = {
    controllerLogin
}