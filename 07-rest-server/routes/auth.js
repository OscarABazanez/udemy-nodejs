const express = require('express');
const router = express.Router();
const { check }= require('express-validator');

const { login } = require('../controllers');

const { validarCampos} = require('../midlewares')

router.post('/login',[
    check("correo", 'El correo es obligatorio').isEmail(),
    check("password", 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;