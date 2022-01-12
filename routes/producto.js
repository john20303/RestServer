const express = require('express');
const { validarJWT } = require('../middlewares/validar-JWT')
const { validarCampos } = require('../middlewares/validar-campos')
const { esAdminRol } = require('../middlewares/validar-rol')
const { productoPostController, productosGetAllController, productoGetById, productoPut, productoDelete } = require('../controller/productoController');
const { check } = require('express-validator');
const { existeProductoPorId, ExisteCategoriaPorId } = require('../helpers/db-validators');
const router = express.Router();



// post producto//// Solo un usuario con un jwt válido puede crear un producto
router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio.').not().isEmpty(),
    check('categoria', 'No es un id mongo').isMongoId(),
    check('categoria').custom(ExisteCategoriaPorId),
    validarCampos
], productoPostController);


// GetAll productos
router.get('/', productosGetAllController);


// GetProductoById
router.get('/:id', [
    check('id', 'No es un id mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoGetById);


// Put producto
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoPut);


// delete Producto
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoDelete);




module.exports = router;