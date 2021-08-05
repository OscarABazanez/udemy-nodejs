const express = require('express');
const router = express.Router();
const { check }= require('express-validator')
const { esRoleValido, emailExiste,userIdExiste } = require('../helpers/db-validators')
const { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/user')
const { validarCampos } = require('../midlewares/validar-campos')



router.get('/', usuariosGet)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( userIdExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo').custom( emailExiste ),
    check('password','La contraseña es obligatorio y debe ser mas de 6 letras').isLength(6),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPost)

router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( userIdExiste ),
    validarCampos
], usuariosDelete)

module.exports = router