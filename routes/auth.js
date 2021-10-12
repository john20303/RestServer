const {Router} = require('express');
const {check} = require('express-validator')
const {controllerLogin} = require("../controller/auth");
const {validarCampos} = require("../middlewares/validar-campos");
const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria!').not().isEmpty().isLength({min: 6}),
    validarCampos
], controllerLogin);


module.exports = router;