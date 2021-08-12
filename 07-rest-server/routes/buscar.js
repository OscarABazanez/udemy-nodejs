const express = require('express');
const router = express.Router();
const { buscar } = require('../controllers');
const { validarJWT } = require('../midlewares')

// Buscador
router.get('/:coleccion/:termino/:min?/:max?',[validarJWT], buscar);

module.exports = router;