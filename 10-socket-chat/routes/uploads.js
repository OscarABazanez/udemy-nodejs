const express = require('express');
const router = express.Router();
const { check }= require('express-validator');
const { coleccionesPermitidas } = require('../helpers')
const { cargarArchivo,actualizarImagen, mostrarImagen, actualizarImagenCloudinary, cargarArchivoCloudinary } = require('../controllers');

const { validarCampos, validarArchivoSubir } = require('../midlewares')

router.post('/',[
    validarArchivoSubir,
    validarCampos
], cargarArchivoCloudinary); //Guardando enCloudinary
// ], cargarArchivo); //Guardando en local

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check("id", 'No es un MongoId').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos']) ),
    validarCampos
], actualizarImagenCloudinary); //Guardando enCloudinary
// ], actualizarImagen); //Guardando en local

router.get('/:coleccion/:id',[
    check("id", 'No es un MongoId').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos']) ),
    validarCampos
], mostrarImagen);

module.exports = router;