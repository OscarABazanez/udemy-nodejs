const { request, response } = require('express')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async ( req=request, res=response, next) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json('No hay token en la peticion')
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById( uid )
        if( !usuario ){
            return re.status(401).json({msg:'Token no valido'})
        }
        // Verificar si el uid esta activo
        if( !usuario.status ){
            return re.status(401).json({msg:'Token no valido'})
        }


        req.usuario = usuario

        next()
    } catch (error) {
        // console.log(error)
        res.status(401).json({msg:'Token no valido'})
    }

}

module.exports = {
    validarJWT
}