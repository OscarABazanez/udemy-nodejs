const express = require('express');
const router = express.Router();
const { check }= require('express-validator');

const { login, googleSingin, githubSingin, githubOauthCallback } = require('../controllers');

const { validarCampos} = require('../midlewares')

router.post('/login',[
    check("correo", 'El correo es obligatorio').isEmail(),
    check("password", 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check("id_token", 'El id token es obligatorio').not().isEmpty(),
    validarCampos
], googleSingin);

router.get('/github/login', githubSingin);

router.get('/github/oauth-callback', githubOauthCallback);

module.exports = router;