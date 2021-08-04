const { response, request } = require('express')

const usuariosGet = (req=request, res=response) => {

    const { q, nombre, api_key, page=1, limit} = req.query

    res.json({
        msg: 'GET API - Controlador',
        q,
        nombre,
        api_key,
        page,
        limit
    });
}
const usuariosPost = (req, res) => {
    /*{
        "msg": "post API",
        "nombre": "Oscar",
        "edad": 14,
        "id": 31321
    }*/
    const  { nombre, edad, id } = req.body;

    res.json({
        msg: 'post API',
        nombre,
        edad,
        id
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id
    res.json({
        msg: 'put API',
        id
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}