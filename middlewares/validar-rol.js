const Rol = require('../models/role');


const esAdminRol = async(req, res, next) => {


    if (!req.user) {
        res.status(500).json({
            ok: false,
            msg: 'No se puede válidar el rol antes de JWT.'
        });
    }

    const { rol, nombre } = req.user;

    if (rol !== 'USER_ROLEX') {
        res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no es administrador.`
        })
    }

    next()
}


const tieneRol = (...roles) => {

    return (req, res, next) => {
        const { nombre, rol } = req.user;

        // Validamos si el user tiene un rol
        if (!req.user) {
            res.status(500).json({
                ok: false,
                msg: 'No se puede válidar el rol antes que el token'
            })
        }


        if (!roles.includes(rol)) {
            res.status(401).json({
                ok: false,
                msg: `El usuario ${nombre} no tiene un rol asignado..`
            })
        }
        next();
    }


}




module.exports = {
    esAdminRol,
    tieneRol
}