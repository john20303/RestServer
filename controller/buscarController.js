const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
//

// Creamos un array de las colecciones permitidas.
const coleccionesPermitidas = [
    'categorias',
    'producto',
    'role',
    'usuario'
];


// const buscarUsuarios = async(termino = '', res) => {

//     const esMongoID = ObjectId.isValid(termino); // TRUE 

//     if (esMongoID) {
//         const usuario = await Usuario.findById(termino);
//         return res.json({
//             results: (usuario) ? [usuario] : []
//         });
//     }

//     const regex = new RegExp(termino, 'i');
//     const usuarios = await Usuario.find({
//         $or: [{ nombre: regex }, { correo: regex }],
//         $and: [{ estado: true }]
//     });

//     res.json({
//         results: usuarios
//     });

// }




const buscar = (req, res) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    // switch (coleccion) {
    //     case 'usuarios':
    //         buscarUsuarios(termino, res);
    //         break;
    //     case 'categorias':
    //         // buscarCategorias(termino, res);
    //         break;
    //     case 'productos':
    //         // buscarProductos(termino, res);
    //         break;

    //     default:
    //         res.status(500).json({
    //             msg: 'Se le olvido hacer esta búsqueda'
    //         })
    // }

}




module.exports = {
    buscar
}