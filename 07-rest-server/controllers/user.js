const { response, request } = require('express')

const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req=request, res=response) => {

    const { limit=5, skip=0 } = req.query
    const query = { status:true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async (req, res) => {



    const  { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );


    // Encriptar password
    const salt = bcryptjs.genSaltSync(11)
    usuario.password = bcryptjs.hashSync(password, salt)


    await usuario.save();

    res.json({
        usuario:usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // Validar contra la base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync(11)
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params
    
    const usuario = await Usuario.findByIdAndUpdate(id, {status: false})

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}