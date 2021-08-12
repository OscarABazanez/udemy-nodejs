const express = require('express');
const router = express.Router();
const { check }= require('express-validator');
const { validarCampos, validarJWT, esAdminRole} = require('../midlewares')
const { 
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers')
const { existeCategiriaPorID } = require('../helpers')


// Obtener todas los productos - Publico
router.get('/',[validarJWT], obtenerProductos);

// Obtener un producto por id - Publico
router.get('/:id',[
    validarJWT,
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
], obtenerProducto);

// Crear productos - Privado con un token
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria No es un id de mongo').isMongoId(),
    validarCampos
], crearProducto);

// Actualizar producto- Privado con un token
router.put('/:id',[
    validarJWT,
    check('categoria').custom( existeCategiriaPorID),
    check('categoria','La categoria No es un id de mongo').isMongoId(),
    check('id','El id No es un id de mongo').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProducto);

// Borrar un productos - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
], eliminarProducto);


module.exports = router;