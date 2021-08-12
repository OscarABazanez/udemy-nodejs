const express = require('express');
const router = express.Router();
const { check }= require('express-validator');
const { validarCampos, validarJWT, esAdminRole} = require('../midlewares')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers')
const { existeCategiriaPorID } = require('../helpers')


// Obtener todas las categorias - Publico
router.get('/',[validarJWT], obtenerCategorias);

// Obtener una categoria por id - Publico
router.get('/:id',[
    validarJWT,
    check('id').custom( existeCategiriaPorID),
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
], obtenerCategoria);

// Crear categoria - Privado con un token
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar- Privado con un token
router.put('/:id',[
    validarJWT,
    check('id').custom( existeCategiriaPorID),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
], eliminarCategoria);


module.exports = router;