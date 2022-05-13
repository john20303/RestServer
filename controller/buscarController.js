const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');




const coleccionPermitidas = [
    'categoria',
    'producto',
    'usuario',
    'role'
];


// Buscamos usuario por Id
const buscarUsuarios = async(termino = '', res) => {
    const mongoId = ObjectId.isValid(termino);
    if (mongoId) {
        const usuario = await Usuario.findById(termino);
        res.json({ //Si el usuario  
            results: (usuario) ? [usuario] : []
        })
    }
    // Con esta expreción regular dejámos la búsqueda de manera insensitive
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }]
    });

    res.json({
        results: usuarios
    })
}



const buscar = (req, res) => {

    const { coleccion, termino } = req.params;

    if (!coleccionPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `la coleccion no es válida, éstas son las permitidas: ${coleccionPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':

            break;
        case 'usuario':

            break;

        default:
            res.status(500).json({
                msg: "No ólvide hacer una búsqueda."
            })
            break;
    }

}


module.exports = {
    buscar
}