require('dotenv').config();
const { response } = require("express");
const bcryptjs = require('bcryptjs')
const axios = require('axios');
const Usuario = require('../models/usuario')
const {generarJWT, googleVerify} = require("../helpers")

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

const googleSingin = async (req, res=response) => {
    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            // Crear usuario
            const data = {
                nombre,
                correo,
                img,
                password:' ',
                google:true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        // Si el usuario NO esta activo
        if( !usuario.status ){
            return res.status(401).json({msg:'Hable con el administrador, el usuario esta bloqueado'})
        }

        // Generar JWT
        const token = await generarJWT( usuario.id )



        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({msg:"Token de google no es valido"})
    }
}


const githubSingin = async (req, res=response) => {
    try {
        res.redirect(
            `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
          );
    } catch (error) {
        res.status(401).json({msg:'Hubo un error en la autenticacion con github'})
    }
}


const githubOauthCallback = async ({ query: { code } }, res=response) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      };
      const opts = { headers: { accept: 'application/json' } };
    
      try {
        const result = await axios.post('https://github.com/login/oauth/access_token', body, opts)
        const token = result.data.access_token
        console.log(result.data)
        const auth = Buffer.from(`username:${token}`, 'utf8').toString('base64')
        let config = {
          method: 'get',
          url: 'https://api.github.com/user',
          headers: { 
            'Authorization': `Basic ${auth}` 
          }
        };
        const resultUser = await axios(config)
        const { name, avatar_url, email } = resultUser.data
        // console.log(resultUser.data)
        console.log(name, avatar_url, email)


        

        // let usuario = await Usuario.findOne({correo})
        // if(!usuario){
        //     // Crear usuario
        //     const data = {
        //         nombre,
        //         correo,
        //         img,
        //         password:' ',
        //         github:true
        //     }
        //     usuario = new Usuario(data)
        //     await usuario.save()
        // }

        // // Si el usuario NO esta activo
        // if( !usuario.status ){
        //     return res.status(401).json({msg:'Hable con el administrador, el usuario esta bloqueado'})
        // }

        // // Generar JWT
        // const tokenJWT = await generarJWT( usuario.id )








    
      } catch (error) {
        console.log(error)
      }
}

const renovarToken = async (req, res=response) => {
    const { usuario } = req;
    const token = await generarJWT( usuario.id )
    res.status(200).json({
        token,
        usuario
    })
}
module.exports = {
    login,
    googleSingin,
    githubSingin,
    githubOauthCallback,
    renovarToken
}