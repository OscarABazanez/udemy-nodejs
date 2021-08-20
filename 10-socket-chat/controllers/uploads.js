const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const path = require("path");
const fs = require("fs")
const { subirArchivo, subirArchivoCloudinary } = require('../helpers')
const { Usuario, Producto} = require('../models')


// Subiendo en el servidor
const cargarArchivo = async (req, res=response) => {

    try {
        const nombreArchivo = await subirArchivo(req.files,undefined,'imgs') 
        res.status(200).json({archivo:nombreArchivo})
    } catch (error) {
        res.status(400).json({error})
    }
};

// Subiendo en el servidor
const actualizarImagen = async (req, res=response) => {

    const { id, coleccion} = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun producto con el id ${id}`});
            }
            break;
    
        default:
           return res.status(500).json({ msg:'No existe esa coleccion'})
    }
    // Limpiar imagenes previas
    try {
        if(modelo.img){
            //Borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img)
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:`Hubo un error al crear el directorio`});
    }


    const nombreArchivo = await subirArchivo(req.files,undefined,coleccion) 
    modelo.img = nombreArchivo
    
    await modelo.save()
    res.status(200).json({modelo})

}

// Subiendo en el servidor
const mostrarImagen = async (req, res=response) => {

    const { id, coleccion} = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun producto con el id ${id}`});
            }
            break;
    
        default:
           return res.status(500).json({ msg:'No existe esa coleccion'})
    }
    // Limpiar imagenes previas
    try {
        if(modelo.img){
            //Borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads',coleccion,modelo.img)
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:`Hubo un error al crear el directorio`});
    }
    const pathPlace = path.join(__dirname, '../assets/no-image.jpg')
    res.status(200).sendFile(pathPlace)
}

// Subiendo en cloudinary
const actualizarImagenCloudinary = async (req, res=response) => {

    const { id, coleccion} = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({msg:`No existe ningun producto con el id ${id}`});
            }
            break;
    
        default:
           return res.status(500).json({ msg:'No existe esa coleccion'})
    }
    // Limpiar imagenes previas
    try {
        if(modelo.img){
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [ public_id ] = nombre.split('.')
            await cloudinary.uploader.destroy(public_id)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:`Hubo un error al crear el directorio`});
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = secure_url
    
    await modelo.save()
    res.status(200).json({modelo})

}
// Subiendo en cloudinary
const cargarArchivoCloudinary = async (req, res=response) => {

    try {
        const nombreArchivo = await subirArchivoCloudinary(req.files,undefined,'imgs') 
        res.status(200).json({archivo:nombreArchivo})
    } catch (error) {
        res.status(400).json({error})
    }
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    cargarArchivoCloudinary
};