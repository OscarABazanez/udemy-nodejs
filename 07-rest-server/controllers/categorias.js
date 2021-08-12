const { request, response } = require("express")
const { Categoria } = require('../models')
// const categoria = require("../models/categoria")

//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req=request, res=response) => {

    try {
        const { limit=5, skip=0 } = req.query
        const query = { status:true }
    
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(skip))
                .limit(Number(limit))
        ])
    
        res.status(200).json({
            total,
            categorias
        });
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al solictar las categorias"
        });
    }

}

//Obtener una  categorias  - populate
const obtenerCategoria = async (req=request, res=response) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    res.status(200).json(
        categoria
    );
}
// Crear categoria
const crearCategoria = async (req=request, res=response) => {

    const nombre = req.body.nombre.toUpperCase()
    
    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({msg:`La categoria ${categoriaDB.nombre} ya existe`})
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria =  new Categoria( data );
    await categoria.save();

    res.status(200).json(categoria)
}

// Actualizar categoria
const actualizarCategoria = async (req=request, res=response) => {
    const { id } = req.params
    const { status, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id
    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true})
    res.status(200).json(categoria)
}

// Borrar categoria
const eliminarCategoria = async (req=request, res=response) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(id,{status:false}, {new:true})
    res.status(200).json(categoria)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}