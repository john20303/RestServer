const { Router } = require("express");
const { check } = require("express-validator");
const { controllerGet, controllerPost, controllerPut, controllerDelete, controllerPatch } = require("../controller/controller");
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, validarEmail } = require('../helpers/db-validators');


router.get('/', controllerGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido!').isEmail(),
    check('correo').custom(validarEmail),
    check('password', 'El password debe ser de mas de 6 letras').not().isEmpty().isLength({ min: 6 }),
    // check('rol', 'No es un rol válido!').isIn(['ADMIN_ROLE', 'USER_ROLE']), //aqui podemos validar los roles con lo que tengamos en el array.
    check('rol').custom(esRolValido),
    validarCampos
], controllerPost);

router.put('/:id', controllerPut);

router.delete('/:id', controllerDelete);

router.patch('/:id', controllerPatch);




module.exports = router;