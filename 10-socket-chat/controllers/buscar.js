const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const  { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res= response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const usuario = await Usuario.findById(termino)
            return res.status(200).json({
                results: ( usuario ) ? [ usuario ] : []
            })
        }

        const regexp = new RegExp(termino, 'i')
        const usuarios = await Usuario.find({
            $or: [{ nombre : regexp }, { correo : regexp }],
            $and: [{status:true}]
            
        })
        res.status(200).json({
            results: usuarios
        })
    } catch (error) {
        res.status(500).json({
            msg: 'No se logro la busqueda de los usuarios'
        })
    }
}

const buscarCategorias = async (termino = '', res= response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const categoria = await Categoria.findById(termino)
            return res.status(200).json({
                results: ( categoria ) ? [ categoria ] : []
            })
        }

        const regexp = new RegExp(termino, 'i')
        const categorias = await Categoria.find({
            $or: [{ nombre : regexp }],
            $and: [{status:true}]
            
        })
        res.status(200).json({
            results: categorias
        })
    } catch (error) {
        res.status(500).json({
            msg: 'No se logro la busqueda de las categorias'
        })
    }
}

const buscarProductos = async (termino = '', min=0,max=999999999, res= response) => {
    try {
        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const productos = await Producto.findById(termino).populate('categoria','nombre').populate('usuario','nombre')
            return res.status(200).json({
                results: ( productos ) ? [ productos ] : []
            })
        }

        const regexp = new RegExp(termino, 'i')
        const productos = await Producto.find({
            $or: [
                { nombre : regexp }
            ],
            $and: [{status:true}, {precio: { '$gt': min, '$lt': max}}]
            
        }).populate('categoria','nombre').populate('usuario','nombre')

        // {precio: { '$gt': 0, '$lt': 5}} 
        res.status(200).json({
            results: productos
        })
    } catch (error) {
        res.status(500).json({
            msg: 'No se logro la busqueda de los productos'
        })
    }
}

const buscar = ( req, res = response ) => {
    
    const { coleccion, termino, min, max  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino,min,max, res);
            break;
        default:
            res.status(500).json({
                msg: 'No existe esa ruta'
            })
    }

}

module.exports = {
    buscar
}