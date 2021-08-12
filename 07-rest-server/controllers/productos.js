const { request, response } = require("express")
const { Producto } = require('../models')

//Obtener categorias - paginado - total - populate
const obtenerProductos = async (req=request, res=response) => {

    try {
        const { limit=5, skip=0 } = req.query
        const query = { status:true }
    
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(skip))
                .limit(Number(limit))
        ])
    
        res.status(200).json({
            total,
            productos
        });
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al solictar las productos"
        });
    }

}

//Obtener una  producto  - populate
const obtenerProducto = async (req=request, res=response) => {
    try {
        const { id } = req.params
        const producto = await Producto.findById(id).populate('usuario','nombre')
        res.status(200).json(
            producto
        );
    } catch (error) {
        res.status(500).json({
            msg:"'No se logro obtener el producto'"
        })
    }
}

// Crear producto
const crearProducto = async (req=request, res=response) => {
    try {
        const { nombre, status, precio, categoria, descripcion, disponible } = req.body
        const data = {
            nombre,
            status,
            precio,
            categoria,
            descripcion,
            disponible,
            usuario: req.usuario._id
        }
        const producto = new Producto(data)
        await producto.save()
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({
            msg:"'No se logro crear el producto'"
        })
    }
} 

// Actualizar producto
const actualizarProducto = async (req=request, res=response) => {
    try {
        const { id } = req.params
        const { usuario, ...data } = req.body
        data.usuario = req.usuario._id
        const producto = await Producto.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json(
            producto
        );
    } catch (error) {
        res.status(500).json({
            msg:"'No se logro actualizar el producto'"
        })
    }
}   

// Borrar producto  
const eliminarProducto = async (req=request, res=response) => {
    try {
        const { id } = req.params
        const producto = await Producto.findByIdAndUpdate(id, {status:false},{new:true})
        res.status(200).json(
            producto
        );
    } catch (error) {
        res.status(500).json({
            msg:"'No se logro eliminar el producto'"
        })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}   
