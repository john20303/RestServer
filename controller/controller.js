const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');



const controllerGet = (req, res) => {
    const query = req.query;
    res.json({
        msg: "get-api-Controller",
        query
    });
}





// Post
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





// Put
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
    res.json({
        msg: "put-api-Controller",
        usuario
    });
}





// Delete
const controllerDelete = (req, res) => {
    res.json({
        msg: "delete-api-Controller"
    });
}






// Patch
const controllerPatch = (req, res) => {
    res.json({
        msg: "patch-api-Controller"
    });
}








module.exports = {
    controllerGet,
    controllerPost,
    controllerPut,
    controllerDelete,
    controllerPatch
}