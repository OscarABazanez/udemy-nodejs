const express = require('express');
const router = express.Router();
const { check }= require('express-validator');

const { login, googleSingin, githubSingin, githubOauthCallback, renovarToken } = require('../controllers');

const { validarCampos,validarJWT} = require('../midlewares')

router.get('/',validarJWT, renovarToken);
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