const express = require('express');
const { buscar } = require('../controller/buscarController');
const router = express.Router();

router.get('/:coleccion', buscar);






module.exports = router;