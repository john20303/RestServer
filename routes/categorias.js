const express = require('express');
const { postCrearCategoria, getCategoriaById, putCategoria, deleteCategoria, getCategoriaAll } = require('../controller/categoriaController');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { ExisteCategoriaPorId } = require('../helpers/db-validators');
const { esAdminRol } = require('../middlewares/validar-rol');

// Solo un usuario con un JWT válido Puede crear una categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCrearCategoria);





// Traemos todas las categorias
router.get('/', getCategoriaAll);


// Traemos una categoria por ID
router.get('/:id', [
    check('id', 'No es un id de Mongo válido.').isMongoId(),
    check('id').custom(ExisteCategoriaPorId),
    validarCampos
], getCategoriaById);


// Actualizar una categoria  por ID
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido!').isMongoId(),
    check('id').custom(ExisteCategoriaPorId),
    validarCampos
], putCategoria);


// Only an admin can delete a categoria
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(ExisteCategoriaPorId),
    validarCampos
], deleteCategoria);




module.exports = router;