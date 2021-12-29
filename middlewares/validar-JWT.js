const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    const token = req.headers['x-token'];

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No ahy token en la petición.'
        });
    }
    // Verificando el token
    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED, { complete: true });
        // req.uid = payload.uid;
        console.log(payload);

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