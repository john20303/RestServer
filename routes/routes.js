const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { controllerGet, controllerPost, controllerPut, controllerDelete } = require("../controller/controller");
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, validarEmail, existeUsuarioId } = require('../helpers/db-validators');
const { validarJWT } = require("../middlewares/validar-JWT");

// Get
router.get('/', controllerGet);


// Post
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido!').isEmail(),
    check('correo').custom(validarEmail),
    check('password', 'El password debe ser de mas de 6 letras').not().isEmpty().isLength({ min: 6 }),
    // check('rol', 'No es un rol válido!').isIn(['ADMIN_ROLE', 'USER_ROLE']), //aqui podemos validar los roles con lo que tengamos en el array.
    check('rol').custom(esRolValido),
    validarCampos
], controllerPost);




// Put
router.put('/:id', [
    check('id', 'No es un id válido!').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
], controllerPut);




// Delete
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id válido!').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], controllerDelete);








module.exports = router;