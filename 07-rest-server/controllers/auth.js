const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const {generarJWT} = require("../helpers/generar-jwt")

const login = async (req, res= response) =>{
    const { correo, password } = req.body
    try {
        // Verifica si el correo existe
        const usuario = await Usuario.findOne({correo})
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -correo'
            })
        }

        // Verifica si el usuario esta activo
        if( !usuario.status ){
            return res.status(400).json({
                msg: 'Usuario ya no esta activo'
            })
        }

        // Validar password
        const validPassword = bcryptjs.compareSync( password, usuario.password)
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -password'
            })
        }

        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: "Algo salio mal. Contacta al Administrador."
        })
    }

}

module.exports = {
    login
}